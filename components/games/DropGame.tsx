"use client";

import { useEffect, useRef, useState } from "react";
import type { DropRound } from "@/content/games/schema";

interface DropGameProps {
  round: DropRound;
  seed: string;
}

/**
 * Arcade game: a word falls from the top; send it to the correct gate
 * before it lands. Each item falls faster than the last.
 */
export function DropGame({ round, seed }: DropGameProps) {
  const [mounted, setMounted] = useState(false);
  const [index, setIndex] = useState(0);
  const [falling, setFalling] = useState(false);
  const [status, setStatus] = useState<"playing" | "correct" | "wrong" | "landed">("playing");
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [order, setOrder] = useState<typeof round.items>([]);
  const baseFall = round.fallMs ?? 4000;
  const fallMs = Math.max(800, baseFall - index * 250);
  const item = order[index];
  const containerRef = useRef<HTMLDivElement>(null);
  const fallTimer = useRef<number | null>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;
    // Deterministic shuffle so SSR and client render match.
    const shuffled = [...round.items];
    let h = 2166136261;
    for (const ch of `${seed}:${round.title}`) {
      h ^= ch.charCodeAt(0);
      h = Math.imul(h, 16777619);
    }
    shuffled.sort(() => ((h = (h ^ (h >>> 13)) * 2654435761) & 0xffffffff) > 0x80000000 ? -1 : 1);
    setOrder(shuffled);
  }, [mounted, round, seed]);

  useEffect(() => {
    if (!item || done) return;
    setStatus("playing");
    setFalling(true);
    fallTimer.current = window.setTimeout(() => {
      setFalling(false);
      setStatus("landed");
    }, fallMs);
    return () => {
      if (fallTimer.current) window.clearTimeout(fallTimer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item, done, index]);

  function sendToGate(gateId: string) {
    if (status !== "playing" || !item) return;
    if (fallTimer.current) window.clearTimeout(fallTimer.current);
    const correct = gateId === item.gateId;
    if (correct) {
      setScore((s) => s + 1);
      setStatus("correct");
    } else {
      setStatus("wrong");
    }
  }

  function next() {
    if (index + 1 >= order.length) {
      setDone(true);
      return;
    }
    setIndex((i) => i + 1);
  }

  function retry() {
    setIndex(0);
    setScore(0);
    setDone(false);
  }

  if (!mounted) return <div className="text-sm text-stone-500">Loading…</div>;

  if (done) {
    return (
      <div>
        <h3 className="text-base font-semibold text-stone-900">{round.title}</h3>
        <div className="mt-4 rounded-lg bg-white p-6 text-center">
          <p className="text-lg font-medium text-stone-800">
            {score} of {order.length} caught
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
          {index + 1} of {order.length} · {round.instruction}
        </span>
        <span>Caught: {score}</span>
      </div>

      <div className="mt-4 rounded-lg bg-white p-5">
        <div
          ref={containerRef}
          className="relative h-40 overflow-hidden rounded-lg border border-stone-200 bg-stone-50"
        >
          {item ? (
            <div
              className={`absolute left-1/2 top-0 -translate-x-1/2 rounded-lg border px-4 py-2 text-lg font-semibold shadow-sm transition-transform duration-0 ${
                status === "correct"
                  ? "border-emerald-500 bg-emerald-100 text-emerald-800"
                  : status === "wrong"
                    ? "border-rose-500 bg-rose-100 text-rose-800"
                    : "border-amber-400 bg-white text-stone-900"
              }`}
              style={{
                transform: falling
                  ? `translate(-50%, ${containerRef.current ? containerRef.current.clientHeight - 48 : 120}px)`
                  : "translate(-50%, 0px)",
                transition: falling ? `transform ${fallMs}ms linear` : "none",
              }}
            >
              {item.text}
            </div>
          ) : null}
          {status === "correct" ? (
            <p className="absolute bottom-2 right-3 font-medium text-emerald-700">Richtig! ✓</p>
          ) : status === "wrong" ? (
            <p className="absolute bottom-2 right-3 font-medium text-rose-700">
              {item.text} → {round.gates.find((g) => g.id === item.gateId)?.label}
            </p>
          ) : status === "landed" ? (
            <p className="absolute bottom-2 right-3 font-medium text-rose-700">Too slow!</p>
          ) : null}
        </div>

        <div className="mt-4 grid gap-2" style={{ gridTemplateColumns: `repeat(${round.gates.length}, 1fr)` }}>
          {round.gates.map((gate) => (
            <button
              key={gate.id}
              type="button"
              onClick={() => sendToGate(gate.id)}
              disabled={status !== "playing"}
              className="rounded-lg border border-stone-300 bg-white py-3 text-lg font-bold text-stone-800 transition-colors hover:border-amber-500 hover:bg-amber-50 disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
            >
              {gate.label}
            </button>
          ))}
        </div>

        {status !== "playing" ? (
          <button
            type="button"
            onClick={next}
            className="mt-4 rounded-lg bg-amber-600 px-4 py-2 text-sm font-semibold text-stone-950 transition-colors hover:bg-amber-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
          >
            Next →
          </button>
        ) : null}
      </div>
    </div>
  );
}