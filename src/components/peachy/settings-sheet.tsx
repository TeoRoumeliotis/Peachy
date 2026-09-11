import { useEffect, useState } from "react";
import { Drawer } from "vaul";
import { t } from "@/lib/i18n";
import { cn } from "@/lib/cn";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  container: HTMLElement | null;
  displayName: string;
  onDisplayName: (name: string) => void;
  onCopyToday: () => void;
  onReset: () => void;
};

export function SettingsSheet({
  open,
  onOpenChange,
  container,
  displayName,
  onDisplayName,
  onCopyToday,
  onReset,
}: Props) {
  const [name, setName] = useState(displayName);
  const [resetStep, setResetStep] = useState(0);

  useEffect(() => {
    if (!open) return;
    setName(displayName);
    setResetStep(0);
  }, [open, displayName]);

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
          <Drawer.Description className="sr-only">{t.appName}</Drawer.Description>
          <div className="flex items-center justify-between px-5 pb-2 pt-1">
            <Drawer.Title className="text-xl font-semibold tracking-tight">{t.settings}</Drawer.Title>
            <Drawer.Close className="ghost-btn pressable">{t.close}</Drawer.Close>
          </div>
          <div className="px-5 pb-[calc(env(safe-area-inset-bottom,0px)+24px)]">
            <label className="block text-sm font-medium text-muted">{t.displayName}</label>
            <input
              className="field mt-1.5"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={() => onDisplayName(name)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  (e.target as HTMLInputElement).blur();
                }
              }}
            />

            <button type="button" className="primary-btn mt-6" onClick={onCopyToday}>
              {t.copyToday}
            </button>

            <div className="mt-4">
              {resetStep === 0 ? (
                <button
                  type="button"
                  className="ghost-btn danger-text mx-auto flex"
                  onClick={() => setResetStep(1)}
                >
                  {t.resetData}
                </button>
              ) : resetStep === 1 ? (
                <div className="confirm-row">
                  <span className="text-sm">{t.resetConfirm1}</span>
                  <span className="flex">
                    <button type="button" className="ghost-btn" onClick={() => setResetStep(0)}>
                      {t.cancel}
                    </button>
                    <button
                      type="button"
                      className="ghost-btn danger-text"
                      onClick={() => setResetStep(2)}
                    >
                      {t.resetConfirm2}
                    </button>
                  </span>
                </div>
              ) : (
                <div className="confirm-row">
                  <span className="text-sm">{t.resetHint}</span>
                  <span className="flex">
                    <button type="button" className="ghost-btn" onClick={() => setResetStep(0)}>
                      {t.cancel}
                    </button>
                    <button
                      type="button"
                      className="ghost-btn danger-text"
                      onClick={() => {
                        onReset();
                        setResetStep(0);
                      }}
                    >
                      {t.resetFinal}
                    </button>
                  </span>
                </div>
              )}
            </div>

            <p className={cn("mt-8 text-center text-xs tracking-wide text-muted")}>{t.dedication}</p>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
