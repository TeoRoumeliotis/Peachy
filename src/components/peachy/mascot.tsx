import { useId } from "react";
import type { MascotMood } from "@/lib/types";

type Props = {
  mood?: MascotMood;
  size?: number;
  className?: string;
};

/** Ροδάκι — tiny smiling peach with one leaf. Name is not printed on screen. */
export function PeachMascot({ mood = "idle", size = 56, className }: Props) {
  const raw = useId().replace(/:/g, "");
  const gid = `p-${raw}`;
  return (
    <span className={["rodaki", className].filter(Boolean).join(" ")} data-mood={mood} aria-hidden="true">
      <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
        <defs>
          <radialGradient id={`${gid}-body`} cx="38%" cy="32%" r="70%">
            <stop offset="0%" stopColor="#FFD8C4" />
            <stop offset="55%" stopColor="#F4A27F" />
            <stop offset="100%" stopColor="#E88962" />
          </radialGradient>
          <radialGradient id={`${gid}-cheek`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F08B8B" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#F08B8B" stopOpacity="0" />
          </radialGradient>
        </defs>
        <g className="rodaki-bob">
          <g className="rodaki-pose">
            <g className="rodaki-leaf">
              <path
                d="M44 10c10-1 18 7 16 16-8 2-16-6-16-16Z"
                fill="#C9DDC8"
              />
              <path
                d="M44 10c6 4 10 10 12 16"
                stroke="#8FB58C"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
              <path d="M40 22c2-6 4-10 4-12" stroke="#6F8F6C" strokeWidth="2" strokeLinecap="round" />
            </g>
            <ellipse cx="40" cy="48" rx="24" ry="22.5" fill={`url(#${gid}-body)`} />
            <path
              d="M40 27c-1.2 7-1.2 14 0 21"
              stroke="#E88962"
              strokeOpacity="0.45"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            <ellipse cx="30" cy="40" rx="7" ry="4.5" fill="#FFF7F1" opacity="0.35" />
            <ellipse cx="28" cy="52" rx="6" ry="4" fill={`url(#${gid}-cheek)`} />
            <ellipse cx="52" cy="52" rx="6" ry="4" fill={`url(#${gid}-cheek)`} />
            <g className="eye-left">
              <ellipse cx="31.5" cy="46" rx="3.1" ry="3.6" fill="#2B2420" />
              <ellipse cx="30.4" cy="44.8" rx="1" ry="1.2" fill="#FFF7F1" />
              <rect className="rodaki-lid" x="27.8" y="42" width="7.4" height="8.4" rx="3.2" fill="#F4A27F" />
            </g>
            <g className="eye-right">
              <ellipse cx="48.5" cy="46" rx="3.1" ry="3.6" fill="#2B2420" />
              <ellipse cx="47.4" cy="44.8" rx="1" ry="1.2" fill="#FFF7F1" />
              <rect className="rodaki-lid" x="44.8" y="42" width="7.4" height="8.4" rx="3.2" fill="#F4A27F" />
            </g>
            <path
              d="M35 56c2.4 2.6 7.6 2.6 10 0"
              stroke="#2B2420"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <g className="rodaki-sparkle s1" transform="translate(12 18)">
              <path d="M4 0l1.1 2.9L8 4 5.1 5.1 4 8 2.9 5.1 0 4l2.9-1.1Z" fill="#FFF7F1" />
            </g>
            <g className="rodaki-sparkle s2" transform="translate(62 28)">
              <path d="M3.2 0l.9 2.3L6.4 3.2 4.1 4.1 3.2 6.4 2.3 4.1 0 3.2l2.3-.9Z" fill="#FFD4C2" />
            </g>
            <g className="rodaki-sparkle s3" transform="translate(58 54)">
              <path d="M2.6 0l.7 1.8 1.9.8-1.9.8-.7 1.8-.7-1.8-1.9-.8 1.9-.8Z" fill="#C9DDC8" />
            </g>
            <g className="rodaki-zzz" transform="translate(56 14)" fill="#7A716C">
              <path d="M1 1h7L1 9h7" stroke="#7A716C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </g>
          </g>
        </g>
      </svg>
    </span>
  );
}
