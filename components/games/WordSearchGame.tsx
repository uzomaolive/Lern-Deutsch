"use client";

import { useEffect, useMemo, useState } from "react";
import { buildWordSearchGrid } from "@/lib/games/wordsearch";
import type { WordSearchRound } from "@/content/games/schema";

interface WordSearchGameProps {
  round: WordSearchRound;
  seed: string;
}

interface Selection {
  row: number;
  col: number;
}

export function WordSearchGame({ round, seed }: WordSearchGameProps) {
  const [mounted, setMounted] = useState(false);
  const [start, setStart] = useState<Selection | null>(null);
  const [found, setFound] = useState<Set<string>>(new Set());

  const board = useMemo(() => {
    const size = 9;
    return buildWordSearchGrid(round.words, size, `${seed}:${round.title}`);
  }, [round, seed]);

  useEffect(() => setMounted(true), []);

  function inBounds(r: number, c: number) {
    return r >= 0 && r < board.size && c >= 0 && c < board.size;
  }

  function tap(r: number, c: number) {
    if (!start) {
      setStart({ row: r, col: c });
      return;
    }
    const { row: sr, col: sc } = start;
    let dir: "h" | "v" | null = null;
    let len = 0;
    if (sr === r && c !== sc) {
      dir = "h";
      len = Math.abs(c - sc) + 1;
    } else if (sc === c && r !== sr) {
      dir = "v";
      len = Math.abs(r - sr) + 1;
    }
    if (!dir) {
      setStart({ row: r, col: c });
      return;
    }
    const col = Math.min(sc, c);
    const row = Math.min(sr, r);
    let letters = "";
    for (let i = 0; i < len; i++) {
      letters += board.grid[dir === "h" ? row : row + i][dir === "h" ? col + i : col];
    }
    const match = board.placements.find(
      (p) => p.word === letters && !found.has(p.word),
    );
    if (match) {
      setFound((f) => new Set(f).add(match.word));
    }
    setStart(null);
  }

  if (!mounted) return <div className="text-sm text-stone-500">Loading…</div>;

  const done = found.size === board.placements.length;
  const lost = board.omitted.length > 0;

  return (
    <div>
      <h3 className="text-base font-semibold text-stone-900">{round.title}</h3>
      <p className="mt-1 text-sm text-stone-600">{round.instruction}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {board.placements.map((p) => (
          <span
            key={p.word}
            className={`rounded-full px-3 py-1 text-sm font-medium ${
              found.has(p.word)
                ? "bg-emerald-100 text-emerald-700 line-through"
                : "bg-stone-100 text-stone-700"
            }`}
          >
            {p.word}
          </span>
        ))}
      </div>

      <div className="mt-4 rounded-lg bg-white p-4">
        {done ? (
          <div className="py-6 text-center">
            <p className="text-lg font-medium text-emerald-700">All words found! 🎉</p>
            <button
              type="button"
              onClick={() => {
                setFound(new Set());
                setStart(null);
              }}
              className="mt-3 rounded-lg border border-stone-300 px-4 py-2 text-sm font-medium text-stone-700 hover:border-amber-500 hover:text-amber-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
            >
              Play again
            </button>
          </div>
        ) : lost ? (
          <p className="text-sm text-rose-700">
            Could not fit all words in this puzzle. Try again.
          </p>
        ) : (
          <div
            className="mx-auto grid max-w-md gap-1"
            style={{ gridTemplateColumns: `repeat(${board.size}, minmax(0, 1fr))` }}
          >
            {board.grid.map((row, r) =>
              row.map((ch, c) => {
                const inFoundWord = board.placements.some(
                  (p) =>
                    found.has(p.word) &&
                    (p.dir === "h"
                      ? p.row === r && c >= p.col && c < p.col + p.word.length
                      : p.col === c && r >= p.row && r < p.row + p.word.length),
                );
                const isStart = start?.row === r && start?.col === c;
                return (
                  <button
                    key={`${r}-${c}`}
                    type="button"
                    onClick={() => tap(r, c)}
                    aria-label={`Row ${r + 1}, column ${c + 1}, letter ${ch}`}
                    className={`flex h-9 w-full items-center justify-center rounded text-sm font-bold uppercase transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 sm:h-10 ${
                      inFoundWord
                        ? "bg-emerald-500 text-white"
                        : isStart
                          ? "bg-amber-200 text-stone-900 ring-2 ring-amber-500"
                          : "bg-stone-100 text-stone-700 hover:bg-amber-100"
                    }`}
                  >
                    {ch}
                  </button>
                );
              }),
            )}
          </div>
        )}
        {!done && !lost ? (
          <p className="mt-3 text-center text-xs text-stone-400">
            Tap the first letter, then the last letter of a word.
          </p>
        ) : null}
      </div>
    </div>
  );
}