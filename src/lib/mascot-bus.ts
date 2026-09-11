import type { TriggerMood } from "./types";

type Listener = (mood: TriggerMood) => void;

const listeners = new Set<Listener>();

export function playMascot(mood: TriggerMood) {
  listeners.forEach((fn) => fn(mood));
}

export function subscribeMascot(fn: Listener) {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}
