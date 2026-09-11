import { t } from "./i18n";
import { formatGreekDate } from "./dates";
import { MEAL_ORDER, type Bite, type MealId } from "./types";

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
