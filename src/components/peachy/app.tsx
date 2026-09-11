import { useEffect, useMemo, useRef, useState } from "react";
import { CalendarDays, House, Plus, Settings } from "lucide-react";
import { AddSheet, type Draft } from "@/components/peachy/add-sheet";
import { CalendarView } from "@/components/peachy/calendar-view";
import { GiftOverlay } from "@/components/peachy/gift-overlay";
import { SettingsSheet } from "@/components/peachy/settings-sheet";
import { TodayView } from "@/components/peachy/today-view";
import { cn } from "@/lib/cn";
import { copyDayText } from "@/lib/copy-day";
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
  const setDisplayName = useDiary((s) => s.setDisplayName);
  const markGreeting = useDiary((s) => s.markGreeting);

  const [now, setNow] = useState(() => new Date());
  const [tab, setTab] = useState<TabId>("today");
  const [tabDir, setTabDir] = useState<"left" | "right">("right");
  const [compact, setCompact] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
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

  function ping(message: string) {
    setToast(message);
    if (toastTimer.current) window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 1800);
  }

  function dismissSheet() {
    sheetLock.current = true;
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
      setSheetOpen(true);
      return;
    }
    setSheetOpen(false);
  }

  function openNew(meal?: MealId, date?: string) {
    if (sheetLock.current) return;
    setEditing(null);
    setSheetDate(date ?? (tab === "calendar" ? calDate : today));
    setSheetMeal(meal ?? defaultMeal(hour));
    setSheetOpen(true);
  }

  function openEdit(bite: Bite, date: string) {
    if (sheetLock.current) return;
    setEditing(bite);
    setSheetDate(date);
    setSheetMeal(bite.meal);
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

  async function copyToday() {
    const text = copyDayText(today, days[today] ?? []);
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      /* still acknowledge */
    }
    ping(t.copied);
  }

  function changeTab(next: TabId) {
    if (next === tab) return;
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
              onClick={() => setSettingsOpen(true)}
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
          onOpenChange={setSettingsOpen}
          container={container}
          displayName={settings.displayName}
          onDisplayName={setDisplayName}
          onCopyToday={() => {
            void copyToday();
            setSettingsOpen(false);
          }}
          onReset={() => {
            resetAll();
            setSettingsOpen(false);
            ping(t.resetDone);
          }}
        />
      </div>
      {giftOpen ? <GiftOverlay onDone={() => setGiftOpen(false)} /> : null}
    </div>
  );
}
