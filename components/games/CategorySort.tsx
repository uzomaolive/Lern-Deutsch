"use client";

import { useMemo, useState } from "react";
import { SpeakButton } from "@/components/ui/SpeakButton";
import type { SortRound } from "@/content/games/schema";

interface CategorizedItem {
  text: string;
  category: string | null;
  locked: boolean;
}

export function CategorySort({ round }: { round: SortRound }) {
  const items = useMemo<CategorizedItem[]>(
    () =>
      round.categories
        .flatMap((category) =>
          category.items.map((text) => ({ text, category: null as string | null, locked: false })),
        )
        .map((item) => ({ ...item }))
        .sort(() => Math.random() - 0.5),
    [round],
  );
  const [state, setState] = useState<CategorizedItem[]>(items);
  const [message, setMessage] = useState<string | null>(null);

  const total = state.length;
  const placed = state.filter((item) => item.category !== null).length;
  const allPlaced = placed === total;

  function place(text: string, categoryName: string) {
    setState((current) =>
      current.map((item) => (item.text === text ? { ...item, category: categoryName, locked: false } : item)),
    );
    setMessage(null);
  }

  function check() {
    let correct = 0;
    const next = state.map((item) => {
      const belongs = round.categories.find((category) =>
        category.items.includes(item.text),
      )?.name;
      const ok = item.category === belongs;
      if (ok) correct++;
      return { ...item, locked: true };
    });
    setState(next);
    setMessage(
      correct === total
        ? `Alles richtig! ${correct} of ${total} correct.`
        : `${correct} of ${total} correct. Fix the red ones.`,
    );
  }

  function reset() {
    setState(items.map((item) => ({ ...item, category: null, locked: false })));
    setMessage(null);
  }

  return (
    <div>
      <h3 className="text-base font-semibold text-stone-900">{round.title}</h3>
      <p className="mt-1 text-sm text-stone-600">{round.instruction}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {state.map((item) => {
          if (item.category !== null) return null;
          const category = round.categories.find((c) => c.items.includes(item.text));
          return (
            <span
              key={item.text}
              className="inline-flex items-center gap-1 rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm font-medium text-stone-800"
            >
              <span>{item.text}</span>
              {category ? <SpeakButton text={item.text} className="h-6 w-6" /> : null}
            </span>
          );
        })}
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {round.categories.map((category) => {
          const placedItems = state.filter((item) => item.category === category.name);
          return (
            <div key={category.name} className="rounded-lg border border-stone-200 bg-stone-50 p-3">
              <p className="text-sm font-semibold text-stone-900">{category.name}</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {placedItems.map((item) => {
                  const correct = item.locked && item.category === category.name &&
                    round.categories.find((c) => c.items.includes(item.text))?.name === category.name;
                  const wrong = item.locked && !correct;
                  return (
                    <button
                      key={item.text}
                      type="button"
                      disabled={item.locked}
                      onClick={() => place(item.text, category.name)}
                      className={`rounded-md border px-2.5 py-1.5 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 ${
                        wrong
                          ? "border-rose-400 bg-rose-50 text-rose-900"
                          : item.locked
                            ? "border-emerald-400 bg-emerald-50 text-emerald-900"
                            : "border-amber-300 bg-amber-50 text-amber-900 hover:border-amber-500"
                      }`}
                    >
                      {item.text}
                    </button>
                  );
                })}
                {placedItems.length === 0 ? (
                  <span className="text-xs text-stone-400">Tap a word above to place it here</span>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>

      {message ? <p className="mt-3 text-sm text-stone-700">{message}</p> : null}

      <div className="mt-3 flex gap-2">
        {!allPlaced && !state.every((item) => item.locked) ? (
          <button
            type="button"
            onClick={check}
            disabled={!allPlaced}
            className="rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-stone-950 transition-colors hover:bg-amber-500 disabled:cursor-not-allowed disabled:bg-stone-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
          >
            Check
          </button>
        ) : null}
        {state.some((item) => item.locked) ? (
          <button
            type="button"
            onClick={reset}
            className="rounded-lg border border-stone-300 px-4 py-2 text-sm font-medium text-stone-700 hover:border-amber-500 hover:text-amber-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
          >
            Try again
          </button>
        ) : null}
      </div>
    </div>
  );
}