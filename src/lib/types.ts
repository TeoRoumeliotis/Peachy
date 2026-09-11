export type MealId = "breakfast" | "lunch" | "dinner" | "snack";

export type Bite = {
  id: string;
  meal: MealId;
  name: string;
  emoji: string;
  note: string;
  kcal: number | null;
  time: string;
};

export type Settings = {
  displayName: string;
  lastGreetingDate: string;
};

export type PersistedDiary = {
  version: 1;
  initialized: boolean;
  settings: Settings;
  days: Record<string, Bite[]>;
};

export const MEAL_ORDER: MealId[] = ["breakfast", "lunch", "dinner", "snack"];

export type TabId = "today" | "calendar";

export type MascotMood = "idle" | "wave" | "bounce" | "lean" | "wink" | "sleepy" | "oops";

export type TriggerMood = Exclude<MascotMood, "idle" | "lean" | "sleepy">;
