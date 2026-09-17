"use client";

import { useEffect, useState } from "react";
import { shuffleWithSeed } from "@/lib/exercises/shuffle";
import type { GridMatchRound } from "@/content/games/schema";

interface Tile {
  key: string;
  text: string;
  kind: "de" | "en";
  pairIndex: number;
}

interface WordMatchGridProps {
  round: GridMatchRound;
  seed: string;
}

export function WordMatchGrid({ round, seed }: WordMatchGridProps) {
  const [mounted, setMounted] = useState(false);
  const [tiles, setTiles] = useState<Tile[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [matched, setMatched] = useState<Set<number>>(new Set());
  const [flash, setFlash] = useState<{ key: string; ok: boolean } | null>(null);
  const [secondsLeft, setSecondsLeft] = useState(round.timeLimit ?? 45);
  const [status, setStatus] = useState<"playing" | "won" | "lost">("playing");

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;
    const shuffled = shuffleWithSeed(round.pairs, `${seed}:${round.title}`).items;
    const flat: Tile[] = [];
    shuffled.forEach(([de, en], i) => {
      flat.push({ key: `de-${i}`, text: de, kind: "de", pairIndex: i });
      flat.push({ key: `en-${i}`, text: en, kind: "en", pairIndex: i });
    });
    const ordered = shuffleWithSeed(flat, `${seed}:${round.title}:grid`).items;
    setTiles(ordered);
    setMatched(new Set());
    setSelected(null);
    setSecondsLeft(round.timeLimit ?? 45);
    setStatus("playing");
  }, [mounted, round, seed]);

  useEffect(() => {
    if (status !== "playing") return;
    const timer = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(timer);
          setStatus("lost");
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [status]);

  function tap(tile: Tile) {
    if (status !== "playing" || matched.has(tile.pairIndex)) return;
    if (!selected) {
      setSelected(tile.key);
      return;
    }
    if (selected === tile.key) {
      setSelected(null);
      return;
    }
    const first = tiles.find((t) => t.key === selected)!;
    if (first.pairIndex === tile.pairIndex && first.kind !== tile.kind) {
      const next = new Set(matched);
      next.add(tile.pairIndex);
      setMatched(next);
      setSelected(null);
      setFlash({ key: tile.key, ok: true });
      setTimeout(() => setFlash(null), 400);
      if (next.size === round.pairs.length) {
        setStatus("won");
      }
    } else {
      setFlash({ key: tile.key, ok: false });
      setFlash({ key: first.key, ok: false });
      setTimeout(() => setFlash(null), 500);
      setSelected(null);
    }
  }

  if (!mounted) return <div className="text-sm text-stone-500">Loading…</div>;

  const won = status === "won";

  return (
    <div>
      <h3 className="text-base font-semibold text-stone-900">{round.title}</h3>
      <div className="mt-1 flex flex-wrap items-center justify-between gap-2 text-sm text-stone-500">
        <span>{round.instruction}</span>
        <span
          aria-live="polite"
          className={secondsLeft <= 10 && status === "playing" ? "font-semibold text-rose-600" : ""}
        >
          {status === "won" ? `Cleared with ${secondsLeft}s to spare!` : status === "lost" ? "Time up" : `${secondsLeft}s left`}
        </span>
      </div>

      {status !== "playing" ? (
        <div className="mt-4 rounded-lg bg-white p-6 text-center">
          {won ? (
            <>
              <p className="text-lg font-medium text-emerald-700">All matched! 🎉</p>
              <p className="mt-1 text-sm text-stone-500">Tap each tile again to replay.</p>
            </>
          ) : (
            <div className="space-y-1.5">
              <p className="text-lg font-medium text-rose-700">Time up!</p>
              {round.pairs.map(([de, en], i) => (
                <p key={i} className="text-sm text-stone-700">
                  <span className="font-semibold">{de}</span> — {en}
                </p>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {tiles.map((tile) => {
            const isMatched = matched.has(tile.pairIndex);
            const isSelected = selected === tile.key;
            const isFlashing = flash?.key === tile.key;
            return (
              <button
                key={tile.key}
                type="button"
                onClick={() => tap(tile)}
                disabled={isMatched}
                aria-pressed={isSelected}
                className={`rounded-lg border px-3 py-3 text-sm font-medium transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 ${
                  isMatched
                    ? "scale-95 border-transparent bg-stone-50 text-stone-300"
                    : isFlashing
                      ? flash?.ok
                        ? "border-emerald-500 bg-emerald-50 text-emerald-800"
                        : "border-rose-500 bg-rose-50 text-rose-800"
                      : isSelected
                        ? "border-amber-600 bg-amber-100 text-stone-900 ring-2 ring-amber-500"
                        : tile.kind === "de"
                          ? "border-stone-300 bg-amber-50/50 text-stone-900 hover:border-amber-500 hover:bg-amber-50"
                          : "border-stone-300 bg-white text-stone-700 hover:border-amber-500 hover:bg-amber-50"
                }`}
              >
                {tile.text}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}