import { useEffect, useMemo, useRef, useState } from "react";
import { Drawer } from "vaul";
import { t } from "@/lib/i18n";
import { MEAL_ORDER, type Bite, type MealId } from "@/lib/types";
import { emojiForName } from "@/lib/food-emoji";
import { quickAddsFromDays } from "@/lib/quick-adds";
import { cn } from "@/lib/cn";
import { useDiary } from "@/store/diary";

export type Draft = {
  meal: MealId;
  name: string;
  note: string;
  kcal: string;
  time: string;
  emoji: string;
};

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  container: HTMLElement | null;
  editing: Bite | null;
  initialMeal?: MealId;
  initialTime: string;
  onSave: (draft: Draft) => void;
  onDelete?: () => void;
};

function emptyDraft(meal: MealId, time: string): Draft {
  return { meal, name: "", note: "", kcal: "", time, emoji: "🍽️" };
}

export function AddSheet({
  open,
  onOpenChange,
  container,
  editing,
  initialMeal,
  initialTime,
  onSave,
  onDelete,
}: Props) {
  const days = useDiary((s) => s.days);
  const chips = useMemo(() => quickAddsFromDays(days), [days]);
  const [draft, setDraft] = useState<Draft>(emptyDraft(initialMeal ?? "snack", initialTime));
  const [confirmDelete, setConfirmDelete] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    setConfirmDelete(false);
    if (editing) {
      setDraft({
        meal: editing.meal,
        name: editing.name,
        note: editing.note,
        kcal: editing.kcal != null ? String(editing.kcal) : "",
        time: editing.time,
        emoji: emojiForName(editing.name),
      });
    } else {
      setDraft(emptyDraft(initialMeal ?? "snack", initialTime));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- open is the session gate
  }, [open]);

  // Lock the page scroll and expand bottom padding so the keyboard never covers inputs.
  useEffect(() => {
    if (!open) return;
    const vv = window.visualViewport;
    if (!vv) return;

    const lock = () => {
      if (vv.offsetTop !== 0 || window.scrollY !== 0) {
        window.scrollTo(0, 0);
      }
    };

    const pad = () => {
      const keyboard = Math.max(0, window.innerHeight - vv.height);
      if (scrollRef.current) {
        scrollRef.current.style.paddingBottom = `${Math.max(24, keyboard + 24)}px`;
      }
    };

    const onResize = () => {
      lock();
      pad();
    };

    vv.addEventListener("scroll", lock);
    window.addEventListener("scroll", lock);
    vv.addEventListener("resize", onResize);
    pad();

    return () => {
      vv.removeEventListener("scroll", lock);
      window.removeEventListener("scroll", lock);
      vv.removeEventListener("resize", onResize);
      if (scrollRef.current) scrollRef.current.style.paddingBottom = "";
    };
  }, [open]);

  const canSave = draft.name.trim().length > 0;

  const keepVisible = (e: React.FocusEvent<HTMLInputElement>) => {
    const input = e.target;
    const scroller = scrollRef.current;
    if (!scroller) return;
    // Give the keyboard a moment to appear, then scroll the field into the visible area above it.
    window.setTimeout(() => {
      const vv = window.visualViewport;
      const keyboard = vv ? Math.max(0, window.innerHeight - vv.height) : 0;
      const inputRect = input.getBoundingClientRect();
      const visibleBottom = window.innerHeight - keyboard - 16;
      if (inputRect.bottom > visibleBottom) {
        const delta = inputRect.bottom - visibleBottom + 8;
        scroller.scrollBy({ top: delta, behavior: "smooth" });
      }
    }, 120);
  };

  return (
    <Drawer.Root
      open={open}
      onOpenChange={onOpenChange}
      container={container ?? undefined}
      shouldScaleBackground={false}
      noBodyStyles
      repositionInputs={false}
    >
      <Drawer.Portal>
        <Drawer.Overlay className="sheet-overlay" />
        <Drawer.Content className="sheet-content" aria-describedby={undefined}>
          <Drawer.Handle className="sheet-handle" />
          <Drawer.Description className="sr-only">{t.appName}</Drawer.Description>
          <div className="flex items-center justify-between px-5 pb-2 pt-1">
            <Drawer.Title className="text-xl font-semibold tracking-tight">
              {editing ? t.editBite : t.newBite}
            </Drawer.Title>
            <Drawer.Close className="ghost-btn pressable">{t.close}</Drawer.Close>
          </div>
          <div className="meal-chips px-5 pb-3">
            {MEAL_ORDER.map((meal) => (
              <button
                key={meal}
                type="button"
                className={cn("chip", draft.meal === meal && "chip-on")}
                onClick={() => setDraft((d) => ({ ...d, meal }))}
              >
                {t.meals[meal]}
              </button>
            ))}
          </div>

          <div
            ref={scrollRef}
            className="min-h-0 flex-1 overflow-y-auto px-5 pb-[calc(env(safe-area-inset-bottom,0px)+20px)]"
          >
            <label className="block text-sm font-medium text-muted">{t.whatAte}</label>
            <input
              className="field mt-1.5"
              value={draft.name}
              onChange={(e) => {
                const name = e.target.value;
                setDraft((d) => ({ ...d, name, emoji: emojiForName(name) }));
              }}
              onFocus={keepVisible}
              placeholder={t.whatAtePlaceholder}
              autoCapitalize="sentences"
              enterKeyHint="done"
            />

            <div className="quick-adds mt-4">
              {chips.map((chip) => (
                <button
                  key={`${chip.personal ? "me" : "base"}:${chip.label}`}
                  type="button"
                  className={cn("chip", chip.personal && draft.name.trim() === chip.label && "chip-on")}
                  onClick={() =>
                    setDraft((d) => ({
                      ...d,
                      name: chip.label,
                      emoji: chip.emoji || emojiForName(chip.label),
                      note: chip.personal ? chip.note : d.note,
                      kcal: chip.personal ? chip.kcal : d.kcal,
                    }))
                  }
                >
                  <span className="mr-1">{chip.emoji}</span>
                  {chip.label}
                </button>
              ))}
            </div>

            <label className="mt-5 block text-sm font-medium text-muted">{t.note}</label>
            <input
              className="field mt-1.5"
              value={draft.note}
              onChange={(e) => setDraft((d) => ({ ...d, note: e.target.value }))}
              onFocus={keepVisible}
              placeholder={t.notePlaceholder}
            />

            <div className="mt-5 grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-muted">{t.kcalOptional}</label>
                <div className="relative mt-1.5">
                  <input
                    className="field pr-14"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={draft.kcal}
                    onChange={(e) =>
                      setDraft((d) => ({ ...d, kcal: e.target.value.replace(/[^\d]/g, "") }))
                    }
                    onFocus={keepVisible}
                    placeholder="—"
                  />
                  <span className="pointer-events-none absolute inset-y-0 right-3 grid place-items-center text-sm text-muted">
                    {t.kcalHelper}
                  </span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-muted">{t.time}</label>
                <input
                  className="field mt-1.5"
                  type="time"
                  value={draft.time}
                  onChange={(e) => setDraft((d) => ({ ...d, time: e.target.value }))}
                  onFocus={keepVisible}
                />
              </div>
            </div>

            <button
              type="button"
              className="primary-btn mt-6"
              disabled={!canSave}
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                onSave(draft);
              }}
            >
              {t.save}
            </button>

            {editing && onDelete ? (
              <div className="mt-3">
                {confirmDelete ? (
                  <div className="confirm-row">
                    <span className="text-sm">{t.confirmDelete}</span>
                    <span className="flex items-center gap-1">
                      <button type="button" className="ghost-btn" onClick={() => setConfirmDelete(false)}>
                        {t.cancel}
                      </button>
                      <button
                        type="button"
                        className="ghost-btn danger-text"
                        onClick={(event) => {
                          event.preventDefault();
                          event.stopPropagation();
                          onDelete();
                        }}
                      >
                        {t.confirmDeleteYes}
                      </button>
                    </span>
                  </div>
                ) : (
                  <button
                    type="button"
                    className="ghost-btn danger-text mx-auto flex"
                    onClick={() => setConfirmDelete(true)}
                  >
                    {t.delete}
                  </button>
                )}
              </div>
            ) : null}
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
