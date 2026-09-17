"use client";

import { useState } from "react";
import { AnswerInput } from "./AnswerInput";
import type { TimeRound } from "@/content/games/schema";

interface TimeGameProps {
  round: TimeRound;
}

export function TimeGame({ round }: TimeGameProps) {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [locked, setLocked] = useState(false);
  const [done, setDone] = useState(false);

  const item = round.items[index];

  function onResult(correct: boolean) {
    if (correct) {
      setScore((s) => s + 1);
      setLocked(true);
    }
  }

  function next() {
    if (index + 1 >= round.items.length) setDone(true);
    else {
      setIndex((i) => i + 1);
      setLocked(false);
    }
  }

  function retry() {
    setIndex(0);
    setScore(0);
    setLocked(false);
    setDone(false);
  }

  if (done) {
    return (
      <div>
        <h3 className="text-base font-semibold text-stone-900">{round.title}</h3>
        <div className="mt-4 rounded-lg bg-white p-6 text-center">
          <p className="text-lg font-medium text-stone-800">
            {score} of {round.items.length} correct
          </p>
        </div>
        <button
          type="button"
          onClick={retry}
          className="mt-3 rounded-lg border border-stone-300 px-4 py-2 text-sm font-medium text-stone-700 hover:border-amber-500 hover:text-amber-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
        >
          Play again
        </button>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-base font-semibold text-stone-900">{round.title}</h3>
      <div className="mt-1 flex flex-wrap items-center justify-between gap-2 text-sm text-stone-500">
        <span>
          {index + 1} of {round.items.length}
        </span>
        <span>Score: {score}</span>
      </div>
      <p className="mt-1 text-sm text-stone-600">{round.instruction}</p>

      <div className="mt-4 rounded-lg bg-white p-5">
        <Clock minutes={item.minutes} />
        <AnswerInput key={index} accept={item.accept} hint={item.hint} onResult={onResult} />
        {locked ? (
          <button
            type="button"
            onClick={next}
            className="mt-3 rounded-lg bg-amber-600 px-4 py-2 text-sm font-semibold text-stone-950 transition-colors hover:bg-amber-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
          >
            Next →
          </button>
        ) : null}
      </div>
    </div>
  );
}

/** Analog clock rendered as SVG. `minutes` since midnight. */
export function Clock({ minutes }: { minutes: number }) {
  const hour = (minutes / 60) % 12;
  const minute = minutes % 60;
  const hourAngle = (hour + minute / 60) * 30;
  const minuteAngle = minute * 6;

  function hand(angle: number, length: number, width: number) {
    const rad = ((angle - 90) * Math.PI) / 180;
    return {
      x2: 50 + length * Math.cos(rad),
      y2: 50 + length * Math.sin(rad),
      width,
    };
  }

  const h = hand(hourAngle, 24, 4);
  const m = hand(minuteAngle, 34, 2.5);

  return (
    <div className="flex justify-center">
      <svg viewBox="0 0 100 100" className="h-48 w-48" role="img" aria-label={`Clock showing ${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`}>
        <circle cx="50" cy="50" r="46" fill="white" stroke="#d6d3d1" strokeWidth="3" />
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((tick) => {
          const angle = tick * 30;
          const rad = ((angle - 90) * Math.PI) / 180;
          const major = tick % 3 === 0;
          return (
            <line
              key={tick}
              x1={50 + 40 * Math.cos(rad)}
              y1={50 + 40 * Math.sin(rad)}
              x2={50 + (major ? 34 : 37) * Math.cos(rad)}
              y2={50 + (major ? 34 : 37) * Math.sin(rad)}
              stroke={major ? "#44403c" : "#a8a29e"}
              strokeWidth={major ? 3 : 1.5}
            />
          );
        })}
        <line x1="50" y1="50" x2={h.x2} y2={h.y2} stroke="#44403c" strokeWidth={h.width} strokeLinecap="round" />
        <line x1="50" y1="50" x2={m.x2} y2={m.y2} stroke="#d97706" strokeWidth={m.width} strokeLinecap="round" />
        <circle cx="50" cy="50" r="3" fill="#44403c" />
      </svg>
    </div>
  );
}