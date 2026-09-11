import { useEffect, useRef, useState } from "react";
import { PeachMascot } from "@/components/peachy/mascot";
import { t } from "@/lib/i18n";

export const GIFT_FLAG = "peachy_first_gift";

type Props = {
  onDone: () => void;
};

function isGiftPreview(): boolean {
  return new URLSearchParams(window.location.search).get("gift") === "1";
}

function markGiftLeaving() {
  document.documentElement.classList.add("gift-leaving");
}

function markGiftDone() {
  document.documentElement.classList.remove("show-gift", "gift-leaving");
  document.documentElement.classList.add("gift-done");
}

export function GiftOverlay({ onDone }: Props) {
  const [leaving, setLeaving] = useState(false);
  const [intro, setIntro] = useState(false);
  const done = useRef(false);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  function dismiss() {
    if (done.current) return;
    done.current = true;
    if (!isGiftPreview()) {
      try {
        window.localStorage.setItem(GIFT_FLAG, "1");
      } catch {
        /* still dismiss */
      }
    }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      markGiftDone();
      onDoneRef.current();
      return;
    }
    markGiftLeaving();
    setLeaving(true);
    window.setTimeout(() => {
      markGiftDone();
      onDoneRef.current();
    }, 300);
  }

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduce) {
      setIntro(true);
      const rest = window.setTimeout(() => setIntro(false), 1400);
      const failSafe = window.setTimeout(dismiss, 4000);
      return () => {
        window.clearTimeout(rest);
        window.clearTimeout(failSafe);
      };
    }
    const failSafe = window.setTimeout(dismiss, 4000);
    return () => window.clearTimeout(failSafe);
    // First HTML has no is-intro / is-leaving. Bounce + dismiss bind after paint.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={["gift-overlay", intro && "is-intro", leaving && "is-leaving"].filter(Boolean).join(" ")}
      role="dialog"
      aria-modal="true"
      aria-label={`${t.giftLine1} ${t.giftLine2}`}
      onClick={dismiss}
    >
      <div className="gift-scene">
        <PeachMascot mood="idle" size={104} />
        <p className="gift-quote">
          <span>{t.giftLine1}</span>
          <span>{t.giftLine2}</span>
        </p>
      </div>
    </div>
  );
}
