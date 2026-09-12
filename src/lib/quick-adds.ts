import { emojiForName } from "@/lib/food-emoji";
import { QUICK_ADDS } from "@/lib/i18n";
import type { Bite } from "@/lib/types";

export type QuickChip = {
  label: string;
  emoji: string;
  note: string;
  kcal: string;
  personal: boolean;
};

const MAX_CHIPS = 10;
const MIN_BEFORE_DROPPING_STARTERS = 1;

function norm(name: string): string {
  return name.trim().toLocaleLowerCase("el").replace(/\s+/g, " ");
}

function isSeed(bite: Bite): boolean {
  return bite.id.startsWith("seed-");
}

function allBites(days: Record<string, Bite[]>): { bite: Bite; date: string }[] {
  const out: { bite: Bite; date: string }[] = [];
  for (const [date, list] of Object.entries(days)) {
    for (const bite of list) {
      if (bite.name.trim()) out.push({ bite, date });
    }
  }
  return out;
}

function fromBites(rows: { bite: Bite; date: string }[]): QuickChip[] {
  const groups = new Map<
    string,
    { label: string; emoji: string; note: string; kcal: string; count: number; last: string }
  >();

  for (const { bite, date } of rows) {
    const key = norm(bite.name);
    if (!key) continue;
    const stamp = `${date}T${bite.time || "00:00"}`;
    const existing = groups.get(key);
    if (!existing) {
      groups.set(key, {
        label: bite.name.trim(),
        emoji: bite.emoji || emojiForName(bite.name),
        note: bite.note.trim(),
        kcal: bite.kcal != null ? String(bite.kcal) : "",
        count: 1,
        last: stamp,
      });
      continue;
    }
    existing.count += 1;
    if (stamp >= existing.last) {
      existing.label = bite.name.trim();
      existing.emoji = bite.emoji || emojiForName(bite.name);
      existing.note = bite.note.trim();
      existing.kcal = bite.kcal != null ? String(bite.kcal) : "";
      existing.last = stamp;
    }
  }

  return [...groups.values()]
    .sort((a, b) => b.count - a.count || b.last.localeCompare(a.last))
    .map((g) => ({
      label: g.label,
      emoji: g.emoji,
      note: g.note,
      kcal: g.kcal,
      personal: true,
    }));
}

export function quickAddsFromDays(days: Record<string, Bite[]>): QuickChip[] {
  const rows = allBites(days);
  const personal = fromBites(rows.filter((row) => !isSeed(row.bite)));
  if (personal.length >= MIN_BEFORE_DROPPING_STARTERS) {
    const seen = new Set(personal.map((chip) => norm(chip.label)));
    const starters = QUICK_ADDS.filter((chip) => !seen.has(norm(chip.label))).map((chip) => ({
      label: chip.label,
      emoji: chip.emoji,
      note: "",
      kcal: "",
      personal: false,
    }));
    return [...personal, ...starters].slice(0, MAX_CHIPS);
  }

  return QUICK_ADDS.map((chip) => ({
    label: chip.label,
    emoji: chip.emoji,
    note: "",
    kcal: "",
    personal: false,
  })).slice(0, MAX_CHIPS);
}
