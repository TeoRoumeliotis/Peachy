import { t, greetLine } from "@/lib/i18n";
import { formatGreekDate } from "@/lib/dates";
import { CountUp } from "@/components/peachy/count-up";
import { DayMeals } from "@/components/peachy/day-meals";
import { PeachMascot } from "@/components/peachy/mascot";
import { kcalTotal } from "@/store/diary";
import type { Bite, MascotMood } from "@/lib/types";

type Props = {
  today: string;
  name: string;
  hour: number;
  bites: Bite[];
  mood: MascotMood;
  onOpenBite: (bite: Bite) => void;
  justAddedId?: string | null;
};

export function TodayView({
  today,
  name,
  hour,
  bites,
  mood,
  onOpenBite,
  justAddedId,
}: Props) {
  const total = kcalTotal(bites);

  return (
    <div>
      <div className="px-5 pb-4 pt-1">
        <h1 className="large-title">{t.today}</h1>
        <p className="mt-1 text-muted" suppressHydrationWarning>{formatGreekDate(today)}</p>
        <div className="mt-4 flex items-center gap-3">
          <PeachMascot mood={mood} size={64} />
          <div className="min-w-0">
            <p className="text-xl font-semibold tracking-tight" suppressHydrationWarning>{greetLine(name, hour)}</p>
            {total != null ? (
              <p className="kcal-soft mt-1">
                {t.kcalTodayPrefix} <CountUp value={total} /> kcal
              </p>
            ) : null}
          </div>
        </div>
      </div>
      <DayMeals
        bites={bites}
        onOpenBite={onOpenBite}
        justAddedId={justAddedId}
      />
    </div>
  );
}
