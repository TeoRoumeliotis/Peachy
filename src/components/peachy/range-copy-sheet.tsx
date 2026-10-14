import { useEffect, useState } from "react";
import { Drawer } from "vaul";
import { t } from "@/lib/i18n";
import { addDays } from "@/lib/dates";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  container: HTMLElement | null;
  today: string;
  onCopy: (from: string, to: string) => void;
};

export function RangeCopySheet({
  open,
  onOpenChange,
  container,
  today,
  onCopy,
}: Props) {
  const [from, setFrom] = useState(() => addDays(today, -6));
  const [to, setTo] = useState(today);

  useEffect(() => {
    if (!open) return;
    setFrom(addDays(today, -6));
    setTo(today);
  }, [open, today]);

  return (
    <Drawer.Root
      open={open}
      onOpenChange={onOpenChange}
      container={container ?? undefined}
      shouldScaleBackground={false}
      noBodyStyles
    >
      <Drawer.Portal>
        <Drawer.Overlay className="sheet-overlay" />
        <Drawer.Content className="sheet-content" aria-describedby={undefined}>
          <Drawer.Handle className="sheet-handle" />
          <Drawer.Description className="sr-only">{t.copyRangeTitle}</Drawer.Description>
          <div className="flex items-center justify-between px-5 pb-2 pt-1">
            <Drawer.Title className="text-xl font-semibold tracking-tight">{t.copyRangeTitle}</Drawer.Title>
            <Drawer.Close className="ghost-btn pressable">{t.close}</Drawer.Close>
          </div>
          <div className="px-5 pb-[calc(env(safe-area-inset-bottom,0px)+24px)]">
            <label className="block text-sm font-medium text-muted" htmlFor="copy-from">
              {t.fromDate}
            </label>
            <input
              id="copy-from"
              type="date"
              className="field mt-1.5"
              value={from}
              max={today}
              onChange={(e) => setFrom(e.target.value)}
            />

            <label className="mt-4 block text-sm font-medium text-muted" htmlFor="copy-to">
              {t.toDate}
            </label>
            <input
              id="copy-to"
              type="date"
              className="field mt-1.5"
              value={to}
              max={today}
              onChange={(e) => setTo(e.target.value)}
            />

            <p className="mt-3 text-sm leading-normal text-muted">{t.copyRangeHint}</p>

            <button
              type="button"
              className="primary-btn mt-5"
              disabled={!from || !to}
              onClick={() => onCopy(from, to)}
            >
              {t.copyRange}
            </button>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
