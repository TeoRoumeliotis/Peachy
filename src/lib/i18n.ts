import type { MealId } from "./types";

/** All user-visible copy. Keep Greek here so the UI stays consistent. */
export const t = {
  appName: "Peachy",
  shortName: "Peachy",
  today: "Σήμερα",
  calendar: "Ημερολόγιο",
  settings: "Ρυθμίσεις",
  newBite: "Νέα μπουκιά",
  editBite: "Μπουκιά",
  defaultName: "Δήμητρα",
  greetingMorning: "Καλημέρα",
  greetingAfternoon: "Καλό απόγευμα",
  greetingEvening: "Καλό βράδυ",
  firstOpenCaption: "Καλημέρα Δήμητρα",
  meals: {
    breakfast: "Πρωινό",
    lunch: "Μεσημεριανό",
    dinner: "Βραδινό",
    snack: "Σνακ",
  } satisfies Record<MealId, string>,
  emptyMeal: "ακόμα τίποτα εδώ… πρώτο μπουκάκι;",
  saved: "σημειώθηκε ✨",
  deleted: "οκ, το έβγαλα",
  copied: "αντιγράφηκε",
  resetDone: "καθαρό τετράδιο",
  whatAte: "Τι έφαγες;",
  whatAtePlaceholder: "π.χ. ελληνικός, σαλάτα…",
  note: "σημείωση",
  notePlaceholder: "μια μικρή σημείωση…",
  kcalOptional: "Θερμίδες (προαιρετικά)",
  kcalHelper: "kcal",
  time: "ώρα",
  save: "Αποθήκευση",
  delete: "Διαγραφή",
  cancel: "Άκυρο",
  confirmDelete: "Να το σβήσω;",
  confirmDeleteYes: "Ναι, σβήσ’ το",
  displayName: "Όνομα",
  copyToday: "Αντιγραφή σημερινής ημέρας",
  resetData: "Επαναφορά όλων",
  resetHint: "Θα σβηστούν όλες οι μπουκιές σ’ αυτή τη συσκευή.",
  resetConfirm1: "Να τα σβήσω όλα;",
  resetConfirm2: "Σίγουρα; Δεν γυρίζει πίσω.",
  resetFinal: "Ναι, όλα",
  dedication: "φτιάχτηκε για τη Δήμητρα",
  close: "Κλείσιμο",
  prevMonth: "Προηγούμενος μήνας",
  nextMonth: "Επόμενος μήνας",
  prevDay: "Προηγούμενη μέρα",
  nextDay: "Επόμενη μέρα",
  addBite: "Νέα μπουκιά",
  weekdaysShort: ["Δε", "Τρ", "Τε", "Πε", "Πα", "Σα", "Κυ"],
  kcalTodayPrefix: "σήμερα σημείωσες",
  kcalDayPrefix: "σημείωσες",
  giftLine1: "Δεν χρειάζεται κάθε μέρα να είναι τέλεια.",
  giftLine2: "Απλώς να είναι δική σου.",
} as const;

export const QUICK_ADDS: { label: string; emoji: string }[] = [
  { label: "καφές", emoji: "☕" },
  { label: "ελληνικός", emoji: "☕" },
  { label: "γιαούρτι", emoji: "🥛" },
  { label: "σαλάτα", emoji: "🥗" },
  { label: "τοστ", emoji: "🥪" },
  { label: "αυγά", emoji: "🍳" },
  { label: "φρούτο", emoji: "🍎" },
  { label: "smoothie", emoji: "🥤" },
  { label: "κοτόπουλο", emoji: "🍗" },
  { label: "ζυμαρικά", emoji: "🍝" },
  { label: "ρύζι", emoji: "🍚" },
  { label: "σουβλάκι", emoji: "🥙" },
  { label: "σοκολάτα", emoji: "🍫" },
];

export function greetWord(hour: number): string {
  if (hour < 12) return t.greetingMorning;
  if (hour < 18) return t.greetingAfternoon;
  return t.greetingEvening;
}

export function greetLine(name: string, hour: number): string {
  return `${greetWord(hour)} ${name}`;
}

export function todayKcalLine(total: number): string {
  return `σήμερα σημείωσες ${total.toLocaleString("el-GR")} kcal`;
}

export function dayKcalLine(total: number): string {
  return `σημείωσες ${total.toLocaleString("el-GR")} kcal`;
}
