import { useEffect, useRef, useState } from "react";
import { Drawer } from "vaul";
import { t } from "@/lib/i18n";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  container: HTMLElement | null;
  displayName: string;
  onDisplayName: (name: string) => void;
  onExport: () => void;
  onImportFile: (file: File) => void;
  onReset: () => void;
};

type Confirm = "export" | "import" | null;

export function SettingsSheet({
  open,
  onOpenChange,
  container,
  displayName,
  onDisplayName,
  onExport,
  onImportFile,
  onReset,
}: Props) {
  const [name, setName] = useState(displayName);
  const [resetStep, setResetStep] = useState(0);
  const [confirm, setConfirm] = useState<Confirm>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    setName(displayName);
    setResetStep(0);
    setConfirm(null);
  }, [open, displayName]);

  function confirmExport() {
    setConfirm(null);
    onExport();
  }

  function confirmImport() {
    setConfirm(null);
    fileRef.current?.click();
  }

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
              placeholder="το όνομά σου"
            />

            <div className="mt-6">
              <p className="text-sm font-semibold">{t.backupTitle}</p>
              <p className="mt-1 text-sm leading-5 text-muted">{t.backupHint}</p>

              {confirm === "export" ? (
                <div className="confirm-row mt-3">
                  <span className="text-sm">{t.exportConfirm}</span>
                  <span className="flex">
                    <button type="button" className="ghost-btn" onClick={() => setConfirm(null)}>
                      {t.cancel}
                    </button>
                    <button type="button" className="ghost-btn" onClick={confirmExport}>
                      {t.exportYes}
                    </button>
                  </span>
                </div>
              ) : (
                <button type="button" className="primary-btn mt-3" onClick={() => setConfirm("export")}>
                  {t.exportBackup}
                </button>
              )}

              {confirm === "import" ? (
                <div className="confirm-row mt-2">
                  <span className="text-sm">{t.importConfirm}</span>
                  <span className="flex">
                    <button type="button" className="ghost-btn" onClick={() => setConfirm(null)}>
                      {t.cancel}
                    </button>
                    <button type="button" className="ghost-btn" onClick={confirmImport}>
                      {t.importYes}
                    </button>
                  </span>
                </div>
              ) : (
                <button
                  type="button"
                  className="pressable mt-2 min-h-[52px] w-full rounded-[16px] border border-[color:color-mix(in_oklab,var(--color-peach)_50%,transparent)] bg-card text-[1.0625rem] font-semibold"
                  onClick={() => setConfirm("import")}
                >
                  {t.importBackup}
                </button>
              )}

              <input
                ref={fileRef}
                type="file"
                accept="application/json,.json"
                className="sr-only"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  e.target.value = "";
                  if (file) onImportFile(file);
                }}
              />
            </div>

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
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
