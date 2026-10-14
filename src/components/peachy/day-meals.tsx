import { t } from "@/lib/i18n";
import { MEAL_ORDER, type Bite, type MealId } from "@/lib/types";
import { sortBites } from "@/store/diary";
import { cn } from "@/lib/cn";

type Props = {
  bites: Bite[];
  onOpenBite: (bite: Bite) => void;
  onAddMeal?: (meal: MealId) => void;
  justAddedId?: string | null;
};

export function DayMeals({ bites, onOpenBite, onAddMeal, justAddedId }: Props) {
  return (
    <div className="flex flex-col gap-3 px-5">
      {MEAL_ORDER.map((meal) => {
        const items = sortBites(bites, meal);
        return (
          <section key={meal} className="meal-card">
            <header className="mb-2">
              <button
                type="button"
                className="pressable -mx-1 rounded-md px-1 text-left"
                onClick={() => onAddMeal?.(meal)}
                aria-label={`${t.addBite}: ${t.meals[meal]}`}
              >
                <h2 className="text-base font-semibold tracking-tight">{t.meals[meal]}</h2>
              </button>
            </header>
            {items.length === 0 ? (
              <button
                type="button"
                className="pressable w-full rounded-md py-2 text-left text-sm leading-normal text-muted"
                onClick={() => onAddMeal?.(meal)}
              >
                {t.emptyMeal}
              </button>
            ) : (
              <ul className="flex flex-col">
                {items.map((bite, i) => (
                  <li key={bite.id}>
                    {i > 0 ? (
                      <div className="hairline my-1" />
                    ) : null}
                    <button
                      type="button"
                      onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        onOpenBite(bite);
                      }}
                      className={cn(
                        "pressable relative z-[1] flex w-full min-h-11 items-start gap-3 rounded-md py-2 text-left",
                        justAddedId === bite.id && "bite-enter",
                      )}
                    >
                      <span className="mt-0.5 w-7 shrink-0 text-center text-xl leading-none">
                        {bite.emoji}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-medium tracking-tight">{bite.name}</span>
                        {bite.note ? (
                          <span className="mt-0.5 block truncate text-sm text-muted">{bite.note}</span>
                        ) : null}
                      </span>
                      <span className="shrink-0 text-right">
                        <span className="block text-sm tabular-nums text-muted">{bite.time}</span>
                        {bite.kcal != null ? (
                          <span className="mt-0.5 block text-xs tabular-nums text-muted">
                            {bite.kcal.toLocaleString("el-GR")} kcal
                          </span>
                        ) : null}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>
        );
      })}
    </div>
  );
}
