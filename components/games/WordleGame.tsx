"use client";

import { useEffect, useState } from "react";
import { shuffleWithSeed } from "@/lib/exercises/shuffle";
import type { WordleRound } from "@/content/games/schema";

export type LetterState = "correct" | "present" | "absent" | "unset";

export interface WordleFeedback {
  states: LetterState[];
  won: boolean;
}

/** Standard Wordle feedback: greens first, then yellows among leftovers. */
export function gradeGuess(guess: string, target: string): WordleFeedback {
  const g = guess.toLowerCase();
  const t = target.toLowerCase();
  const states: LetterState[] = new Array(g.length).fill("absent");
  const remaining = t.split("");

  for (let i = 0; i < g.length; i++) {
    if (g[i] === remaining[i]) {
      states[i] = "correct";
      remaining[i] = "";
    }
  }
  for (let i = 0; i < g.length; i++) {
    if (states[i] === "correct") continue;
    const j = remaining.indexOf(g[i]);
    if (j !== -1) {
      states[i] = "present";
      remaining[j] = "";
    }
  }
  return { states, won: g === t };
}

const LETTER_ROWS = [
  "qwertzuiop".split(""),
  "asdfghjkl".split(""),
  "äöüyxcvbnm".split(""),
];

const KEY_CLASSES: Record<LetterState, string> = {
  correct: "bg-emerald-600 text-white",
  present: "bg-amber-500 text-white",
  absent: "bg-stone-400 text-white",
  unset: "bg-stone-100 text-stone-700",
};

interface WordleGameProps {
  round: WordleRound;
  seed: string;
}

export function WordleGame({ round, seed }: WordleGameProps) {
  const [mounted, setMounted] = useState(false);
  const [target, setTarget] = useState("");
  const [guesses, setGuesses] = useState<string[]>([]);
  const [current, setCurrent] = useState("");
  const [playsLeft, setPlaysLeft] = useState(round.plays ?? 1);
  const [finished, setFinished] = useState(false);
  const [won, setWon] = useState(false);

  useEffect(() => setMounted(true), []);

  function pickWord() {
    const items = shuffleWithSeed(round.words, `${seed}:${playsLeft}`).items;
    setTarget(items[0].toLowerCase());
    setGuesses([]);
    setCurrent("");
    setFinished(false);
    setWon(false);
  }

  useEffect(() => {
    if (mounted && target === "") pickWord();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (finished) return;
      if (/^[a-zäöüß]$/i.test(event.key)) {
        if (current.length < target.length) setCurrent((c) => c + event.key.toLowerCase());
      } else if (event.key === "Backspace") {
        setCurrent((c) => c.slice(0, -1));
      } else if (event.key === "Enter" && current.length === target.length) {
        submit();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, finished, target]);

  function submit() {
    if (current.length !== target.length || finished) return;
    const { states, won: isWon } = gradeGuess(current, target);
    const next = [...guesses, current];
    setGuesses(next);
    setCurrent("");
    if (isWon) {
      setWon(true);
      setFinished(true);
    } else if (next.length >= 6) {
      setFinished(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }

  function playAgain() {
    if (playsLeft > 1) setPlaysLeft((p) => p - 1);
    pickWord();
  }

  if (!mounted || target === "") {
    return <div className="text-sm text-stone-500">Loading word…</div>;
  }

  const keyboardState: Record<string, LetterState> = {};
  for (const guess of guesses) {
    const { states } = gradeGuess(guess, target);
    for (let i = 0; i < guess.length; i++) {
      const ch = guess[i];
      const currentState = keyboardState[ch] ?? "unset";
      const priority = { correct: 3, present: 2, absent: 1, unset: 0 } as const;
      if (priority[states[i]] > priority[currentState]) keyboardState[ch] = states[i];
    }
  }

  const grid: string[][] = [];
  for (let r = 0; r < 6; r++) grid.push((guesses[r] ?? (r === guesses.length ? current : "")).padEnd(target.length, " ").split(""));
  const lastStates = guesses.length > 0 ? gradeGuess(guesses[guesses.length - 1], target).states : [];

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-xs text-stone-500">
          {finished
            ? won
              ? "Richtig! 👍"
              : `The word was ${target.toUpperCase()}.`
            : `${playsLeft} word${playsLeft === 1 ? "" : "s"} left · Guess the 5-letter word.`}
        </p>
        {finished ? (
          <button
            type="button"
            onClick={playAgain}
            className="rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-stone-950 transition-colors hover:bg-amber-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
          >
            {playsLeft > 1 ? "Next word" : "Play again"}
          </button>
        ) : null}
      </div>

      <div className="mt-4 grid justify-center gap-1.5">
        {grid.map((row, r) => {
          const rowStates = r < guesses.length ? gradeGuess(guesses[r], target).states : r === guesses.length ? lastStates : [];
          return (
            <div key={r} className="flex gap-1.5">
              {row.map((ch, c) => {
                const state = r < guesses.length ? rowStates[c] : "unset";
                return (
                  <span
                    key={c}
                    aria-hidden="true"
                    className={`flex h-10 w-10 items-center justify-center rounded border text-lg font-bold uppercase ${
                      state === "correct"
                        ? "border-emerald-600 bg-emerald-600 text-white"
                        : state === "present"
                          ? "border-amber-500 bg-amber-500 text-white"
                          : state === "absent"
                            ? "border-stone-400 bg-stone-400 text-white"
                            : "border-stone-300 bg-white text-stone-900"
                    }`}
                  >
                    {ch === " " ? "" : ch}
                  </span>
                );
              })}
            </div>
          );
        })}
      </div>

      <div className="mt-5 flex flex-col items-center gap-1.5">
        {LETTER_ROWS.map((row, i) => (
          <div key={i} className="flex gap-1">
            {i === 2 ? (
              <>
                <KeyButton
                  label="⌫"
                  onClick={() => setCurrent((c) => c.slice(0, -1))}
                  className="bg-stone-100 px-3"
                  ariaLabel="Delete letter"
                />
                {row.map((ch) => (
                  <KeyButton key={ch} label={ch} state={keyboardState[ch] ?? "unset"} onClick={() => !finished && current.length < target.length && setCurrent((c) => c + ch)} />
                ))}
              </>
            ) : (
              row.map((ch) => (
                <KeyButton key={ch} label={ch} state={keyboardState[ch] ?? "unset"} onClick={() => !finished && current.length < target.length && setCurrent((c) => c + ch)} />
              ))
            )}
          </div>
        ))}
        <div className="flex gap-1">
          <button
            type="button"
            onClick={submit}
            disabled={current.length !== target.length || finished}
            className="rounded bg-stone-100 px-6 py-2 text-xs font-bold uppercase tracking-wide text-stone-700 transition-colors hover:bg-stone-200 disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
          >
            Enter
          </button>
        </div>
      </div>
    </div>
  );
}

function KeyButton({
  label,
  state,
  onClick,
  className,
  ariaLabel,
}: {
  label: string;
  state?: LetterState;
  onClick: () => void;
  className?: string;
  ariaLabel?: string;
}) {
  return (
    <button
      type="button"
      aria-label={ariaLabel ?? `Letter ${label}`}
      onClick={onClick}
      className={`flex h-10 min-w-8 items-center justify-center rounded px-1 text-sm font-semibold uppercase transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 ${KEY_CLASSES[state ?? "unset"]} ${className ?? ""}`}
    >
      {label}
    </button>
  );
}