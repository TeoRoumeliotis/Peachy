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
  ["ελληνικοσ", "☕"],
  ["ροδακινο", "🍑"],
  ["σουβλακι", "🥙"],
  ["μπανανα", "🍌"],
  ["cracker", "🍘"],
  ["κρακερ", "🍘"],
  ["φραουλα", "🍓"],
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
  ["καφεσ", "☕"],
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

  ["τσαι", "🍵"],
  ["tea", "🍵"],
  ["χυμοσ", "🥤"],
  ["juice", "🥤"],
  ["freddo", "☕"],
  ["φρεντο", "☕"],
  ["espresso", "☕"],
  ["cappuccino", "☕"],
  ["latte", "☕"],
  ["matcha", "🍵"],
  ["πρωτεινη", "🥤"],
  ["protein", "🥤"],

  ["μελι", "🍯"],
  ["honey", "🍯"],
  ["βουτυρο", "🧈"],
  ["butter", "🧈"],
  ["μαρμελαδα", "🍯"],
  ["granola", "🥣"],
  ["μουσλι", "🥣"],
  ["muesli", "🥣"],
  ["βρωμη", "🌾"],
  ["oat", "🌾"],
  ["βρωμε", "🌾"],

  ["πιτσα", "🍕"],
  ["pizza", "🍕"],
  ["burger", "🍔"],
  ["μπεργκερ", "🍔"],
  ["μπιφτεκι", "🍔"],
  ["τηγανιτ", "🍟"],
  ["fries", "🍟"],
  ["πατατ", "🥔"],
  ["potato", "🥔"],
  ["sushi", "🍣"],
  ["σουσι", "🍣"],
  ["ramen", "🍜"],
  ["noodle", "🍜"],
  ["νουντλ", "🍜"],
  ["wrap", "🌯"],
  ["burrito", "🌯"],
  ["taco", "🌮"],
  ["hummus", "🫕"],
  ["χουμουσ", "🫕"],

  ["τυροπιτα", "🥠"],
  ["σπανακοπιτα", "🥦"],
  ["πιτα", "🫓"],
  ["pita", "🫓"],
  ["κρεπα", "🧇"],
  ["crepe", "🧇"],
  ["waffle", "🧇"],
  ["βαφλ", "🧇"],
  ["pancake", "🥞"],
  ["πανκεικ", "🥞"],

  ["ψαρι", "🐟"],
  ["fish", "🐟"],
  ["τονοσ", "🐟"],
  ["tuna", "🐟"],
  ["σολομοσ", "🐟"],
  ["salmon", "🐟"],
  ["γαριδ", "🦐"],
  ["shrimp", "🦐"],
  ["μπεικον", "🥓"],
  ["bacon", "🥓"],
  ["λουκανικ", "🌭"],
  ["sausage", "🌭"],
  ["κρεασ", "🥩"],
  ["steak", "🥩"],
  ["μπριζολ", "🥩"],
  ["χοιρινο", "🍖"],

  ["σουπα", "🍲"],
  ["soup", "🍲"],
  ["φακεσ", "🫘"],
  ["φακη", "🫖"],
  ["φακι", "🫘"],
  ["lentil", "🫕"],
  ["bean", "🫘"],
  ["ρεβυθ", "🫜"],
  ["chickpea", "🫜"],

  ["ντοματ", "🍅"],
  ["tomato", "🍅"],
  ["αγγουρ", "🥒"],
  ["cucumber", "🥒"],
  ["καροτ", "🥕"],
  ["carrot", "🥕"],
  ["μπροκολ", "🥦"],
  ["broccoli", "🥦"],
  ["αβοκαντ", "🥑"],
  ["avocado", "🥑"],
  ["καλαμποκ", "🌽"],
  ["corn", "🌽"],
  ["μανιταρ", "🍄"],
  ["mushroom", "🍄"],
  ["πιπερ", "🍆"],
  ["pepper", "🍆"],

  ["σταφυλ", "🍇"],
  ["grape", "🍇"],
  ["καρπουζ", "🍉"],
  ["watermelon", "🍉"],
  ["κερασ", "🍒"],
  ["cherry", "🍒"],
  ["αχλαδ", "🍐"],
  ["pear", "🍐"],
  ["λεμον", "🍋"],
  ["lemon", "🍋"],
  ["μανταριν", "🍍"],
  ["mango", "🥭"],
  ["μανγκο", "🥭"],
  ["kiwi", "🥝"],
  ["κιουι", "🥝"],
  ["blueberry", "🫐"],
  ["μυρτιλ", "🫐"],

  ["παγωτ", "🍦"],
  ["ice cream", "🍦"],
  ["icecream", "🍦"],
  ["κεικ", "🍰"],
  ["cake", "🍰"],
  ["τουρτ", "🎂"],
  ["μπισκοτ", "🍪"],
  ["cookie", "🍪"],
  ["ντονατ", "🍩"],
  ["donut", "🍩"],
  ["doughnut", "🍩"],

  ["αμυγδαλ", "🥜"],
  ["almond", "🥜"],
  ["φιστικ", "🥜"],
  ["peanut", "🥜"],
  ["ξηρο", "🥜"],
  ["nuts", "🥜"],
  ["καρυδ", "🥜"],

  ["μπυρα", "🍺"],
  ["beer", "🍺"],
  ["κρασι", "🍷"],
  ["wine", "🍷"],
  ["αναψυκτ", "🧃"],
  ["coca", "🧃"],
  ["cola", "🧃"],
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
