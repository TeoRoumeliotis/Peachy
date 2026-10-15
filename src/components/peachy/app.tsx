import { useEffect, useMemo, useRef, useState } from "react";
import { CalendarDays, House, Plus, Settings } from "lucide-react";
import { AddSheet, type Draft } from "@/components/peachy/add-sheet";
import { CalendarView } from "@/components/peachy/calendar-view";
import { GiftOverlay } from "@/components/peachy/gift-overlay";
import { RangeCopySheet } from "@/components/peachy/range-copy-sheet";
import { SettingsSheet } from "@/components/peachy/settings-sheet";
import { TodayView } from "@/components/peachy/today-view";
import { buildBackup, downloadBackup, parseBackup } from "@/lib/backup";
import { cn } from "@/lib/cn";
import { copyDayText, copyRangeText } from "@/lib/copy-day";
import { defaultMeal, formatNowTime, toYmd } from "@/lib/dates";
import { emojiForName } from "@/lib/food-emoji";
import { t } from "@/lib/i18n";
import { playMascot, subscribeMascot } from "@/lib/mascot-bus";
import type { Bite, MascotMood, MealId, TabId, TriggerMood } from "@/lib/types";
import { useDiary } from "@/store/diary";

function prefersReduced(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function registerServiceWorker() {
  if (typeof navigator === "undefined" || !("serviceWorker" in navigator)) return;
  const register = () => {
    navigator.serviceWorker.register("/sw.js").catch(() => {});
  };
  if (document.readyState === "complete") register();
  else window.addEventListener("load", register, { once: true });
}

function parseKcal(raw: string): number | null {
  const n = Number.parseInt(raw, 10);
  return Number.isFinite(n) && n > 0 ? n : null;
}

export function PeachyApp() {
  const hydrated = useDiary((s) => s.hydrated);
  const hydrate = useDiary((s) => s.hydrate);
  const remapEmojis = useDiary((s) => s.remapEmojis);
  const days = useDiary((s) => s.days);
  const settings = useDiary((s) => s.settings);
  const addBite = useDiary((s) => s.addBite);
  const updateBite = useDiary((s) => s.updateBite);
  const deleteBite = useDiary((s) => s.deleteBite);
  const resetAll = useDiary((s) => s.resetAll);
  const importDiary = useDiary((s) => s.importDiary);
  const setDisplayName = useDiary((s) => s.setDisplayName);
  const markGreeting = useDiary((s) => s.markGreeting);

  const [now, setNow] = useState(() => new Date());
  const [tab, setTab] = useState<TabId>("today");
  const [tabDir, setTabDir] = useState<"left" | "right">("right");
  const [compact, setCompact] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [rangeOpen, setRangeOpen] = useState(false);
  const [editing, setEditing] = useState<Bite | null>(null);
  const [sheetDate, setSheetDate] = useState("");
  const [sheetMeal, setSheetMeal] = useState<MealId>("snack");
  const [toast, setToast] = useState<string | null>(null);
  const [mood, setMood] = useState<MascotMood>("idle");
  const [justAddedId, setJustAddedId] = useState<string | null>(null);
  const [giftOpen, setGiftOpen] = useState(true);
  const canvasRef = useRef<HTMLDivElement>(null);
  const [container, setContainer] = useState<HTMLElement | null>(null);
  const busy = useRef(false);
  const greeted = useRef(false);
  const toastTimer = useRef<number | null>(null);
  const sheetLock = useRef(false);
  const sheetLockTimer = useRef<number | null>(null);

  // Android back-button virtual history. We push a marker when a sheet opens
  // or when the user switches to the calendar tab. On popstate we close the
  // topmost layer. Only the root (Today + nothing open) lets the app exit.
  const historyDepth = useRef(0);
  const ignoringPop = useRef(false);

  const today = toYmd(now);
  const hour = now.getHours();
  const [calDate, setCalDate] = useState(today);

  useEffect(() => {
    hydrate();
    remapEmojis();
    setContainer(canvasRef.current);
    registerServiceWorker();
    document.documentElement.dataset.motion = prefersReduced() ? "reduce" : "ok";
    if (document.documentElement.classList.contains("gift-done")) setGiftOpen(false);
  }, [hydrate, remapEmojis]);

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 60_000);
    return () => window.clearInterval(id);
  }, []);

  const idleMood = useMemo<MascotMood>(() => {
    if (hour >= 21) return "sleepy";
    const empty = (days[today]?.length ?? 0) === 0;
    if (tab === "today" && empty) return "lean";
    return "idle";
  }, [hour, days, today, tab]);

  function trigger(next: TriggerMood) {
    if (prefersReduced()) {
      setMood(idleMood);
      return;
    }
    if (busy.current && next !== "oops") return;
    busy.current = true;
    setMood(next);
    window.setTimeout(
      () => {
        busy.current = false;
        setMood(idleMood);
      },
      next === "wave" ? 600 : 520,
    );
  }

  useEffect(() => subscribeMascot(trigger), [idleMood]);

  useEffect(() => {
    if (!hydrated || greeted.current) return;
    greeted.current = true;
    const already = useDiary.getState().settings.lastGreetingDate === today;
    if (already) {
      setMood(idleMood);
      return;
    }
    markGreeting(today);
    if (!prefersReduced()) trigger("wave");
  }, [hydrated, today, idleMood, markGreeting]);

  useEffect(() => {
    if (!busy.current) setMood(idleMood);
  }, [idleMood]);

  // --- Android back button -------------------------------------------------
  function pushLayer() {
    if (typeof window === "undefined") return;
    history.pushState({ peachy: historyDepth.current + 1 }, "");
    historyDepth.current += 1;
  }

  function popLayer() {
    if (typeof window === "undefined" || historyDepth.current <= 0) return;
    ignoringPop.current = true;
    history.back();
    historyDepth.current -= 1;
    // Clear the flag after the popstate has been processed.
    window.setTimeout(() => {
      ignoringPop.current = false;
    }, 50);
  }

  useEffect(() => {
    function onPop() {
      if (ignoringPop.current) return;
      historyDepth.current = Math.max(0, historyDepth.current - 1);

      if (sheetOpen) {
        setSheetOpen(false);
        setEditing(null);
        return;
      }
      if (settingsOpen) {
        setSettingsOpen(false);
        return;
      }
      if (rangeOpen) {
        setRangeOpen(false);
        return;
      }
      if (tab === "calendar") {
        setTab("today");
        setTabDir("left");
        return;
      }
      // Root state: let the browser exit the PWA.
    }

    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, [sheetOpen, settingsOpen, rangeOpen, tab]);

  function ping(message: string) {
    setToast(message);
    if (toastTimer.current) window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 1800);
  }

  function dismissSheet() {
    sheetLock.current = true;
    if (sheetOpen) popLayer();
    setSheetOpen(false);
    setEditing(null);
    if (sheetLockTimer.current) window.clearTimeout(sheetLockTimer.current);
    sheetLockTimer.current = window.setTimeout(() => {
      sheetLock.current = false;
    }, 450);
  }

  function handleSheetOpenChange(next: boolean) {
    if (next) {
      if (sheetLock.current) return;
      pushLayer();
      setSheetOpen(true);
      return;
    }
    if (sheetOpen) popLayer();
    setSheetOpen(false);
  }

  function openNew(meal?: MealId, date?: string) {
    if (sheetLock.current) return;
    setEditing(null);
    setSheetDate(date ?? (tab === "calendar" ? calDate : today));
    setSheetMeal(meal ?? defaultMeal(hour));
    pushLayer();
    setSheetOpen(true);
  }

  function openEdit(bite: Bite, date: string) {
    if (sheetLock.current) return;
    setEditing(bite);
    setSheetDate(date);
    setSheetMeal(bite.meal);
    pushLayer();
    setSheetOpen(true);
  }

  function saveDraft(draft: Draft) {
    const payload = {
      meal: draft.meal,
      name: draft.name.trim(),
      note: draft.note.trim(),
      kcal: parseKcal(draft.kcal),
      time: draft.time || formatNowTime(now),
      emoji: emojiForName(draft.name.trim()),
    };
    if (editing) {
      updateBite(sheetDate, editing.id, payload);
    } else {
      const created = addBite(sheetDate, payload);
      setJustAddedId(created.id);
      window.setTimeout(() => setJustAddedId(null), 400);
    }
    dismissSheet();
    playMascot("bounce");
    ping(t.saved);
  }

  function removeEditing() {
    if (!editing) return;
    deleteBite(sheetDate, editing.id);
    dismissSheet();
    playMascot("oops");
    ping(t.deleted);
  }

  async function copySelectedDay() {
    const text = copyDayText(calDate, days[calDate] ?? []);
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      /* still acknowledge */
    }
    ping(t.copied);
  }

  async function copyRange(from: string, to: string) {
    const text = copyRangeText(from, to, days);
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      /* still acknowledge */
    }
    setRangeOpen(false);
    ping(t.copied);
  }

  function exportBackup() {
    const state = useDiary.getState();
    downloadBackup(
      buildBackup({
        version: 1,
        initialized: true,
        settings: state.settings,
        days: state.days,
      }),
    );
    setSettingsOpen(false);
    ping(t.exportDone);
  }

  async function importBackupFile(file: File) {
    const raw = await file.text();
    const diary = parseBackup(raw);
    if (!diary) {
      ping(t.backupInvalid);
      return;
    }
    importDiary(diary);
    setSettingsOpen(false);
    ping(t.importDone);
  }

  function changeTab(next: TabId) {
    if (next === tab) return;
    if (next === "calendar" && tab === "today") {
      pushLayer();
    } else if (next === "today" && tab === "calendar") {
      popLayer();
    }
    setTabDir(next === "calendar" ? "right" : "left");
    setTab(next);
    if (next === "calendar") playMascot("wink");
  }

  const title = tab === "today" ? t.today : t.calendar;

  return (
    <div className="app-root">
      <div className="phone-canvas" ref={canvasRef}>
        <div className="canvas-blobs" aria-hidden="true">
          <span className="blob blob-a" />
          <span className="blob blob-b" />
          <span className="blob blob-c" />
        </div>
        <div className="canvas-grain" aria-hidden="true" />

        <div className="canvas-content">
          <header className="nav-bar">
            <span className="w-11" />
            <span className={cn("compact-title", compact && "on")}>{title}</span>
            <button
              type="button"
              className="icon-btn"
              aria-label={t.settings}
              onClick={() => {
                pushLayer();
                setSettingsOpen(true);
              }}
            >
              <Settings size={22} strokeWidth={1.8} />
            </button>
          </header>

          <div className="scroll-pane" onScroll={(e) => setCompact(e.currentTarget.scrollTop > 24)}>
            {tab === "today" ? (
              <div className={cn("tab-panel", tabDir === "right" ? "tab-panel-right" : "tab-panel-left")}>
                <TodayView
                  today={today}
                  name={settings.displayName}
                  hour={hour}
                  bites={days[today] ?? []}
                  mood={mood}
                  onOpenBite={(bite) => openEdit(bite, today)}
                  onAddMeal={(meal) => openNew(meal, today)}
                  justAddedId={justAddedId}
                />
              </div>
            ) : (
              <div className={cn("tab-panel", tabDir === "right" ? "tab-panel-right" : "tab-panel-left")}>
                <div className="px-5 pb-3 pt-1">
                  <h1 className="large-title">{t.calendar}</h1>
                </div>
                <CalendarView
                  today={today}
                  selected={calDate}
                  onSelect={setCalDate}
                  days={days}
                  onOpenBite={(bite) => openEdit(bite, calDate)}
                  onAddMeal={(meal) => openNew(meal, calDate)}
                  onCopyDay={() => {
                    void copySelectedDay();
                  }}
                  onCopyRange={() => {
                    pushLayer();
                    setRangeOpen(true);
                  }}
                />
              </div>
            )}
          </div>
        </div>

        <button
          type="button"
          className="fab"
          aria-label={t.addBite}
          onClick={() => openNew()}
          disabled={sheetOpen}
        >
          <Plus size={26} strokeWidth={2.2} />
        </button>

        <nav className="tab-bar" aria-label="Peachy">
          <button
            type="button"
            className={cn("tab-item", tab === "today" && "is-on")}
            onClick={() => changeTab("today")}
          >
            <House size={24} strokeWidth={tab === "today" ? 2.2 : 1.8} />
            {t.today}
          </button>
          <button
            type="button"
            className={cn("tab-item", tab === "calendar" && "is-on")}
            onClick={() => changeTab("calendar")}
          >
            <CalendarDays size={24} strokeWidth={tab === "calendar" ? 2.2 : 1.8} />
            {t.calendar}
          </button>
        </nav>

        {toast ? <div className="toast-pill">{toast}</div> : null}

        <AddSheet
          open={sheetOpen}
          onOpenChange={handleSheetOpenChange}
          container={container}
          editing={editing}
          initialMeal={sheetMeal}
          initialTime={formatNowTime(now)}
          onSave={saveDraft}
          onDelete={editing ? removeEditing : undefined}
        />

        <SettingsSheet
          open={settingsOpen}
          onOpenChange={(next) => {
            if (next) {
              pushLayer();
              setSettingsOpen(true);
            } else {
              if (settingsOpen) popLayer();
              setSettingsOpen(false);
            }
          }}
          container={container}
          displayName={settings.displayName}
          onDisplayName={setDisplayName}
          onExport={exportBackup}
          onImportFile={(file) => {
            void importBackupFile(file);
          }}
          onReset={() => {
            resetAll();
            setSettingsOpen(false);
            ping(t.resetDone);
          }}
        />

        <RangeCopySheet
          open={rangeOpen}
          onOpenChange={(next) => {
            if (next) {
              pushLayer();
              setRangeOpen(true);
            } else {
              if (rangeOpen) popLayer();
              setRangeOpen(false);
            }
          }}
          container={container}
          today={today}
          onCopy={(from, to) => {
            void copyRange(from, to);
          }}
        />
      </div>
      {giftOpen ? <GiftOverlay onDone={() => setGiftOpen(false)} /> : null}
    </div>
  );
}
