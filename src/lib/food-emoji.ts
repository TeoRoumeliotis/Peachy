import type { Bite } from "@/lib/types";

const UNKNOWN = "🍽️";

/** Normalized (lowercase, no diacritics) → emoji. Contains-match, longer + leftmost win. */
const DICT: [string, string][] = [
  ["chocolate", "🍫"],
  ["σοκολατα", "🍫"],
  ["κοτοπουλο", "🍗"],
  ["chicken", "🍗"],
  ["ζυμαρικα", "🍝"],
  ["smoothie", "🥤"],
  ["πορτοκαλι", "🍊"],
  ["γιαουρτι", "🥛"],
  ["yogurt", "🥛"],
  ["ελληνικος", "☕"],
  ["ροδακινο", "🍑"],
  ["σουβλακι", "🥙"],
  ["μπανανα", "🍌"],
  ["cracker", "🍘"],
  ["\u03ba\u03c1\u03b1\u03ba\u03b5\u03c1", "🍘"],
  ["φραουλα", "🥤"],
  ["banana", "🍌"],
  ["orange", "🍊"],
  ["cheese", "🧀"],
  ["ελληνικ", "☕"],
  ["σαλατα", "🥗"],
  ["φρουτο", "🍎"],
  ["coffee", "☕"],
  ["peach", "🍑"],
  ["pasta", "🍝"],
  ["salad", "🥗"],
  ["toast", "🥪"],
  ["fruit", "🍎"],
  ["water", "💧"],
  ["apple", "🍎"],
  ["bread", "🍞"],
  ["eggs", "🍳"],
  ["milk", "🥛"],
  ["rice", "🍚"],
  ["καφες", "☕"],
  ["αυγα", "🍳"],
  ["αυγο", "🍳"],
  ["τυρι", "🧀"],
  ["ψωμι", "🍞"],
  ["γαλα", "🥛"],
  ["καφε", "☕"],
  ["μηλο", "🍎"],
  ["νερο", "💧"],
  ["τοστ", "🥪"],
  ["ρυζι", "🍚"],
  ["egg", "🍳"],
];

const RULES = [...DICT].sort((a, b) => b[0].length - a[0].length);

export function normalizeFood(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/ς/g, "σ");
}

export function emojiForName(name: string): string {
  const value = normalizeFood(name);
  if (!value) return UNKNOWN;
  let bestIndex = Infinity;
  let bestLen = -1;
  let bestEmoji = UNKNOWN;
  for (const [key, emoji] of RULES) {
    const index = value.indexOf(key);
    if (index < 0) continue;
    if (index < bestIndex || (index === bestIndex && key.length > bestLen)) {
      bestIndex = index;
      bestLen = key.length;
      bestEmoji = emoji;
    }
  }
  return bestEmoji;
}

export function applyFoodEmojis(days: Record<string, Bite[]>): Record<string, Bite[]> {
  let changed = false;
  const next: Record<string, Bite[]> = {};
  for (const [date, bites] of Object.entries(days)) {
    next[date] = bites.map((bite) => {
      const emoji = emojiForName(bite.name);
      if (emoji === bite.emoji) return bite;
      changed = true;
      return { ...bite, emoji };
    });
  }
  return changed ? next : days;
}
