import { create } from "zustand";
import { formatNowTime, toYmd } from "@/lib/dates";
import { applyFoodEmojis } from "@/lib/food-emoji";
import { t } from "@/lib/i18n";
import type { Bite, MealId, PersistedDiary, Settings } from "@/lib/types";

const STORAGE_KEY = "peachy.v1";

type DiaryStore = PersistedDiary & {
  hydrated: boolean;
  hydrate: () => void;
  remapEmojis: () => void;
  addBite: (date: string, bite: Omit<Bite, "id">) => Bite;
  updateBite: (date: string, id: string, patch: Partial<Bite>) => void;
  deleteBite: (date: string, id: string) => void;
  resetAll: () => void;
  importDiary: (diary: PersistedDiary) => void;
  setDisplayName: (name: string) => void;
  markGreeting: (date: string) => void;
};

function makeId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function defaultSettings(): Settings {
  return {
    displayName: t.defaultName,
    lastGreetingDate: "",
  };
}

function persistable(state: DiaryStore): PersistedDiary {
  return {
    version: 1,
    initialized: state.initialized,
    settings: state.settings,
    days: state.days,
  };
}

function write(state: DiaryStore) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(persistable(state)));
  } catch {
    // private mode / quota — keep working in memory
  }
}

function read(): PersistedDiary | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<PersistedDiary>;
    if (parsed?.version !== 1 || !parsed.settings || !parsed.days) return null;
    return {
      version: 1,
      initialized: Boolean(parsed.initialized),
      settings: {
        displayName: parsed.settings.displayName?.trim() ?? "",
        lastGreetingDate: parsed.settings.lastGreetingDate ?? "",
      },
      days: parsed.days,
    };
  } catch {
    return null;
  }
}

export function kcalTotal(bites: Bite[]): number | null {
  let sum = 0;
  let any = false;
  for (const bite of bites) {
    if (bite.kcal != null) {
      sum += bite.kcal;
      any = true;
    }
  }
  return any ? sum : null;
}

export function bitesOn(days: Record<string, Bite[]>, ymd: string): Bite[] {
  return days[ymd] ?? [];
}

export const useDiary = create<DiaryStore>((set, get) => ({
  version: 1,
  hydrated: false,
  initialized: true,
  settings: defaultSettings(),
  days: {},

  hydrate: () => {
    if (typeof window === "undefined") return;
    if (get().hydrated) {
      const days = applyFoodEmojis(get().days);
      if (days !== get().days) {
        set({ days });
        write(get());
      }
      return;
    }
    const existing = read();
    if (existing?.initialized) {
      const days = applyFoodEmojis(existing.days);
      set({ ...existing, days, hydrated: true });
      if (days !== existing.days) write(get());
      return;
    }
    set({ hydrated: true, days: applyFoodEmojis(get().days) });
    write(get());
  },

  remapEmojis: () => {
    const days = applyFoodEmojis(get().days);
    if (days === get().days) return;
    set({ days });
    write(get());
  },

  addBite: (date, bite) => {
    const next: Bite = { ...bite, id: makeId() };
    set((state) => ({
      days: { ...state.days, [date]: [...(state.days[date] ?? []), next] },
    }));
    write(get());
    return next;
  },

  updateBite: (date, id, patch) => {
    set((state) => ({
      days: {
        ...state.days,
        [date]: (state.days[date] ?? []).map((b) => (b.id === id ? { ...b, ...patch } : b)),
      },
    }));
    write(get());
  },

  deleteBite: (date, id) => {
    set((state) => ({
      days: {
        ...state.days,
        [date]: (state.days[date] ?? []).filter((b) => b.id !== id),
      },
    }));
    write(get());
  },

  resetAll: () => {
    set({
      initialized: true,
      days: {},
    });
    write(get());
  },

  importDiary: (diary) => {
    set({
      initialized: true,
      settings: {
        displayName: diary.settings.displayName?.trim() ?? "",
        lastGreetingDate: diary.settings.lastGreetingDate ?? "",
      },
      days: applyFoodEmojis(diary.days),
    });
    write(get());
  },

  setDisplayName: (name) => {
    const displayName = name.trim();
    set((state) => ({ settings: { ...state.settings, displayName } }));
    write(get());
  },

  markGreeting: (date) => {
    set((state) => ({ settings: { ...state.settings, lastGreetingDate: date } }));
    write(get());
  },
}));

export function sortBites(bites: Bite[], meal: MealId): Bite[] {
  return bites
    .filter((b) => b.meal === meal)
    .slice()
    .sort((a, b) => a.time.localeCompare(b.time) || a.name.localeCompare(b.name, "el"));
}

export { formatNowTime };
