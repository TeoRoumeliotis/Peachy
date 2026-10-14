import type { Bite, MealId, PersistedDiary, Settings } from "./types";

const MEALS: MealId[] = ["breakfast", "lunch", "dinner", "snack"];

export type BackupFile = {
  app: "peachy";
  version: 1;
  exportedAt: string;
  settings: Settings;
  days: Record<string, Bite[]>;
};

export function buildBackup(diary: PersistedDiary): BackupFile {
  return {
    app: "peachy",
    version: 1,
    exportedAt: new Date().toISOString(),
    settings: {
      displayName: diary.settings.displayName?.trim() ?? "",
      lastGreetingDate: diary.settings.lastGreetingDate ?? "",
    },
    days: diary.days,
  };
}

export function downloadBackup(backup: BackupFile) {
  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "peachy-backup.json";
  link.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function cleanBite(value: unknown): Bite | null {
  if (!value || typeof value !== "object") return null;
  const bite = value as Partial<Bite>;
  if (typeof bite.id !== "string" || typeof bite.name !== "string") return null;
  if (!MEALS.includes(bite.meal as MealId)) return null;
  const kcal = typeof bite.kcal === "number" && Number.isFinite(bite.kcal) ? bite.kcal : null;
  return {
    id: bite.id,
    meal: bite.meal as MealId,
    name: bite.name.trim(),
    emoji: typeof bite.emoji === "string" ? bite.emoji : "",
    note: typeof bite.note === "string" ? bite.note : "",
    kcal,
    time: typeof bite.time === "string" ? bite.time : "",
  };
}

export function parseBackup(raw: string): PersistedDiary | null {
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return null;
  }
  if (!parsed || typeof parsed !== "object") return null;
  const file = parsed as Partial<BackupFile>;
  if (file.app !== "peachy" || file.version !== 1) return null;
  if (!file.settings || typeof file.settings !== "object" || !file.days || typeof file.days !== "object") {
    return null;
  }

  const days: Record<string, Bite[]> = {};
  for (const [date, bites] of Object.entries(file.days)) {
    if (!/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(date) || !Array.isArray(bites)) continue;
    const clean = bites.map(cleanBite).filter((bite): bite is Bite => bite != null);
    if (clean.length) days[date] = clean;
  }

  const settings = file.settings as Partial<Settings>;
  return {
    version: 1,
    initialized: true,
    settings: {
      displayName: settings.displayName?.trim() ?? "",
      lastGreetingDate: settings.lastGreetingDate ?? "",
    },
    days,
  };
}
