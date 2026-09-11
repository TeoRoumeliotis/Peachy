import { create } from "zustand";
import { addDays, formatNowTime, toYmd } from "@/lib/dates";
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

function seedBites(today: string): Record<string, Bite[]> {
  const yesterday = addDays(today, -1);
  const twoAgo = addDays(today, -2);
  return {
    [today]: [
      {
        id: "seed-today-coffee",
        meal: "breakfast",
        name: "Ελληνικός",
        emoji: "☕",
        note: "σκέτος, όπως πάντα",
        kcal: null,
        time: "08:12",
      },
      {
        id: "seed-today-chicken",
        meal: "lunch",
        name: "Κοτόπουλο με σαλάτα",
        emoji: "🍗",
        note: "με λεμόνι",
        kcal: 520,
        time: "13:40",
      },
      {
        id: "seed-today-yogurt",
        meal: "snack",
        name: "Γιαούρτι με μέλι",
        emoji: "🥛",
        note: "",
        kcal: 180,
        time: "16:20",
      },
    ],
    [yesterday]: [
      {
        id: "seed-yday-smoothie",
        meal: "breakfast",
        name: "Smoothie φράουλα",
        emoji: "🥤",
        note: "",
        kcal: 220,
        time: "09:00",
      },
      {
        id: "seed-yday-pasta",
        meal: "lunch",
        name: "Ζυμαρικά",
        emoji: "🍝",
        note: "σπιτικά",
        kcal: null,
        time: "14:10",
      },
      {
        id: "seed-yday-choco",
        meal: "snack",
        name: "Σοκολάτα",
        emoji: "🍫",
        note: "",
        kcal: 90,
        time: "17:45",
      },
    ],
    [twoAgo]: [
      {
        id: "seed-2ago-toast",
        meal: "breakfast",
        name: "Τοστ με αυγό",
        emoji: "🥪",
        note: "",
        kcal: 340,
        time: "08:40",
      },
      {
        id: "seed-2ago-souvlaki",
        meal: "dinner",
        name: "Σουβλάκι",
        emoji: "🥙",
        note: "με πίτα",
        kcal: null,
        time: "21:05",
      },
    ],
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
        displayName: parsed.settings.displayName?.trim() || t.defaultName,
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
  days: seedBites(toYmd(new Date())),

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

  setDisplayName: (name) => {
    const displayName = name.trim() || t.defaultName;
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
