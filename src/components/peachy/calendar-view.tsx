import { useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { t } from "@/lib/i18n";
import {
  addDays,
  addMonths,
  formatGreekDate,
  formatMonthTitle,
  mondayIndex,
  parseYmd,
  startOfMonth,
  toYmd,
} from "@/lib/dates";
import { cn } from "@/lib/cn";
import { CountUp } from "@/components/peachy/count-up";
import { DayMeals } from "@/components/peachy/day-meals";
import { kcalTotal } from "@/store/diary";
import type { Bite } from "@/lib/types";

type Props = {
  today: string;
  selected: string;
  onSelect: (ymd: string) => void;
  days: Record<string, Bite[]>;
  onOpenBite: (bite: Bite) => void;
};

function monthCells(month: Date): (string | null)[] {
  const start = startOfMonth(month);
  const pad = mondayIndex(start);
  const last = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  const cells: (string | null)[] = [];
  for (let i = 0; i < pad; i++) cells.push(null);
  for (let d = 1; d <= last; d++) {
    cells.push(toYmd(new Date(month.getFullYear(), month.getMonth(), d)));
  }
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

function sameMonthDay(from: Date, month: Date): string {
  const last = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  const day = Math.min(from.getDate(), last);
  return toYmd(new Date(month.getFullYear(), month.getMonth(), day));
}

export function CalendarView({
  today,
  selected,
  onSelect,
  days,
  onOpenBite,
}: Props) {
  const selectedDate = parseYmd(selected);
  const month = startOfMonth(selectedDate);
  const [fadeKey, setFadeKey] = useState(selected);
  const touch = useRef<{ x: number; y: number } | null>(null);

  const cells = useMemo(
    () => monthCells(month),
    [month.getFullYear(), month.getMonth()],
  );
  const bites = days[selected] ?? [];
  const total = kcalTotal(bites);

  function pickDay(ymd: string) {
    onSelect(ymd);
    setFadeKey(ymd);
  }

  function shiftDay(delta: number) {
    pickDay(addDays(selected, delta));
  }

  function shiftMonth(delta: number) {
    pickDay(sameMonthDay(selectedDate, addMonths(month, delta)));
  }

  return (
    <div>
      <div className="flex items-center justify-between px-3 pb-2">
        <button
          type="button"
          className="icon-btn"
          aria-label={t.prevMonth}
          onClick={() => shiftMonth(-1)}
        >
          <ChevronLeft size={22} strokeWidth={2} />
        </button>
        <h2 className="text-lg font-semibold tracking-tight">{formatMonthTitle(month)}</h2>
        <button
          type="button"
          className="icon-btn"
          aria-label={t.nextMonth}
          onClick={() => shiftMonth(1)}
        >
          <ChevronRight size={22} strokeWidth={2} />
        </button>
      </div>

      <div className="grid grid-cols-7 px-2">
        {t.weekdaysShort.map((d) => (
          <div key={d} className="grid h-8 place-items-center text-xs font-medium text-muted">
            {d}
          </div>
        ))}
        {cells.map((ymd, i) => {
          if (!ymd) return <div key={`e-${i}`} className="h-11" />;
          const has = (days[ymd]?.length ?? 0) > 0;
          const isToday = ymd === today;
          const isSelected = ymd === selected;
          const dateNum = parseYmd(ymd).getDate();
          return (
            <div key={ymd} className="grid place-items-center">
              <button
                type="button"
                className={cn(
                  "cal-day pressable",
                  isToday && "is-today",
                  isSelected && "is-selected",
                )}
                onClick={() => pickDay(ymd)}
              >
                {dateNum}
                {has ? <span className="cal-dot" /> : null}
              </button>
            </div>
          );
        })}
      </div>

      <div
        className="day-fade mt-4"
        key={fadeKey}
        onTouchStart={(e) => {
          const p = e.changedTouches[0];
          if (p) touch.current = { x: p.clientX, y: p.clientY };
        }}
        onTouchEnd={(e) => {
          const start = touch.current;
          touch.current = null;
          const p = e.changedTouches[0];
          if (!start || !p) return;
          const dx = p.clientX - start.x;
          const dy = p.clientY - start.y;
          if (Math.abs(dx) < 56 || Math.abs(dx) < Math.abs(dy) * 1.4) return;
          shiftDay(dx < 0 ? 1 : -1);
        }}
      >
        <div className="mb-3 flex items-center justify-between px-5">
          <button type="button" className="icon-btn" aria-label={t.prevDay} onClick={() => shiftDay(-1)}>
            <ChevronLeft size={20} />
          </button>
          <div className="text-center">
            <p className="font-semibold tracking-tight">{formatGreekDate(selected)}</p>
            {total != null ? (
              <p className="kcal-soft mt-0.5">
                {t.kcalDayPrefix} <CountUp value={total} /> kcal
              </p>
            ) : null}
          </div>
          <button type="button" className="icon-btn" aria-label={t.nextDay} onClick={() => shiftDay(1)}>
            <ChevronRight size={20} />
          </button>
        </div>
        <DayMeals bites={bites} onOpenBite={onOpenBite} />
      </div>
    </div>
  );
}
