"use client";

import { useEffect, useState } from "react";
import { formatCountdown } from "@/lib/practice/timing";

interface PrepTimerProps {
  /** Preparation time in seconds. */
  seconds: number;
  /** Fired when the countdown reaches zero. */
  onComplete: () => void;
}

/**
 * Countdown timer for the preparation phase. Pauses are not supported:
 * the learner chooses a time, studies, and the timer runs to zero.
 */
export function PrepTimer({ seconds, onComplete }: PrepTimerProps) {
  const [remaining, setRemaining] = useState(seconds);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    if (remaining <= 0) {
      onComplete();
      return;
    }
    const id = setTimeout(() => setRemaining((value) => value - 1), 1000);
    return () => clearTimeout(id);
  }, [running, remaining, onComplete]);

  return (
    <div className="rounded-lg border border-stone-200 bg-white p-4 text-center">
      <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">
        Vorbereitungszeit
      </p>
      <p
        aria-live="polite"
        className="mt-1 text-3xl font-semibold tabular-nums text-stone-900"
      >
        {formatCountdown(remaining)}
      </p>
      {!running ? (
        <button
          type="button"
          onClick={() => setRunning(true)}
          className="mt-3 rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-stone-950 transition-colors hover:bg-amber-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
        >
          Timer starten
        </button>
      ) : null}
    </div>
  );
}