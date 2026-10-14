import { addDays } from "./dates";
import { t } from "./i18n";
import { formatGreekDate } from "./dates";
import { MEAL_ORDER, type Bite, type MealId } from "./types";

export const MAX_COPY_DAYS = 31;

export function copyDayText(ymd: string, bites: Bite[]): string {
  const lines: string[] = [formatGreekDate(ymd), ""];
  let any = false;
  for (const meal of MEAL_ORDER) {
    const items = bites
      .filter((b) => b.meal === meal)
      .slice()
      .sort((a, b) => a.time.localeCompare(b.time));
    if (items.length === 0) continue;
    any = true;
    lines.push(t.meals[meal as MealId]);
    for (const bite of items) {
      const bits = [`${bite.emoji} ${bite.name}`];
      if (bite.note) bits.push(bite.note);
      bits.push(bite.time);
      if (bite.kcal != null) bits.push(`${bite.kcal.toLocaleString("el-GR")} kcal`);
      lines.push(`• ${bits.join(" · ")}`);
    }
    lines.push("");
  }
  if (!any) lines.push(t.emptyMeal);
  return lines.join("\n").trim() + "\n";
}

/** Inclusive range, swapped if needed, capped at 31 days. Empty days are omitted. */
export function copyRangeText(
  fromYmd: string,
  toYmd: string,
  days: Record<string, Bite[]>,
): string {
  let from = fromYmd;
  let to = toYmd;
  if (from > to) [from, to] = [to, from];

  const lines: string[] = [];
  let cursor = from;
  let count = 0;
  while (cursor <= to && count < MAX_COPY_DAYS) {
    const bites = days[cursor] ?? [];
    if (bites.length > 0) {
      lines.push(copyDayText(cursor, bites).trimEnd());
      lines.push("");
    }
    cursor = addDays(cursor, 1);
    count += 1;
  }
  if (lines.length === 0) return `${t.copyRangeEmpty}\n`;
  return `${lines.join("\n").trim()}\n`;
}
