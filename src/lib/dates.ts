const WEEKDAYS = [
  "Κυριακή",
  "Δευτέρα",
  "Τρίτη",
  "Τετάρτη",
  "Πέμπτη",
  "Παρασκευή",
  "Σάββατο",
];

const MONTHS_GENITIVE = [
  "Ιανουαρίου",
  "Φεβρουαρίου",
  "Μαρτίου",
  "Απριλίου",
  "Μαΐου",
  "Ιουνίου",
  "Ιουλίου",
  "Αυγούστου",
  "Σεπτεμβρίου",
  "Οκτωβρίου",
  "Νοεμβρίου",
  "Δεκεμβρίου",
];

const MONTHS_NOMINATIVE = [
  "Ιανουάριος",
  "Φεβρουάριος",
  "Μάρτιος",
  "Απρίλιος",
  "Μάιος",
  "Ιούνιος",
  "Ιούλιος",
  "Αύγουστος",
  "Σεπτέμβριος",
  "Οκτώβριος",
  "Νοέμβριος",
  "Δεκέμβριος",
];

export function pad2(n: number): string {
  return n < 10 ? `0${n}` : String(n);
}

export function toYmd(date: Date): string {
  return `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}`;
}

export function parseYmd(ymd: string): Date {
  const [y, m, d] = ymd.split("-").map(Number);
  return new Date(y ?? 1970, (m ?? 1) - 1, d ?? 1);
}

export function addDays(ymd: string, delta: number): string {
  const date = parseYmd(ymd);
  date.setDate(date.getDate() + delta);
  return toYmd(date);
}

export function formatGreekDate(date: Date | string): string {
  const d = typeof date === "string" ? parseYmd(date) : date;
  return `${WEEKDAYS[d.getDay()]} ${d.getDate()} ${MONTHS_GENITIVE[d.getMonth()]}`;
}

export function formatMonthTitle(date: Date): string {
  return `${MONTHS_NOMINATIVE[date.getMonth()]} ${date.getFullYear()}`;
}

export function formatNowTime(date = new Date()): string {
  return `${pad2(date.getHours())}:${pad2(date.getMinutes())}`;
}

export function defaultMeal(hour: number) {
  if (hour < 11) return "breakfast" as const;
  if (hour < 16) return "lunch" as const;
  if (hour < 18) return "snack" as const;
  return "dinner" as const;
}

/** Monday-first weekday index 0..6 */
export function mondayIndex(date: Date): number {
  return (date.getDay() + 6) % 7;
}

export function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export function addMonths(date: Date, delta: number): Date {
  return new Date(date.getFullYear(), date.getMonth() + delta, 1);
}
