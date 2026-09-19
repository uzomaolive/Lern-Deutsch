"use client";

import { useEffect, useState } from "react";
import { shuffleWithSeed } from "@/lib/exercises/shuffle";
import { SpeakButton } from "@/components/ui/SpeakButton";
import type { ScrambleRound } from "@/content/games/schema";

interface ScrambleGameProps {
  round: ScrambleRound;
  seed: string;
}

export function ScrambleGame({ round, seed }: ScrambleGameProps) {
  const [mounted, setMounted] = useState(false);
  const [index, setIndex] = useState(0);
  const [tiles, setTiles] = useState<string[]>([]);
  const [chosen, setChosen] = useState<number[]>([]);
  const [secondsLeft, setSecondsLeft] = useState(round.items[0]?.timeLimit ?? 30);
  const [status, setStatus] = useState<"playing" | "correct" | "wrong" | "timeout">("playing");
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const item = round.items[index];

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted || done) return;
    const scrambled = shuffleWithSeed(item.de.split(""), `${seed}:${item.de}:${index}`).items;
    setTiles(scrambled);
    setChosen([]);
    setSecondsLeft(item.timeLimit ?? 30);
    setStatus("playing");
  }, [mounted, index, item, seed, done]);

  useEffect(() => {
    if (status !== "playing" || done) return;
    const timer = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(timer);
          setStatus("timeout");
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [status, done, index]);

  function tileFor(i: number) {
    return tiles[i];
  }

  function clickTile(i: number) {
    if (status !== "playing" || chosen.includes(i)) return;
    const next = [...chosen, i];
    setChosen(next);
    const word = next.map(tileFor).join("");
    if (word.length === item.de.length) {
      if (word === item.de) {
        setStatus("correct");
        setScore((s) => s + Math.max(1, secondsLeft));
      } else {
        setStatus("wrong");
      }
    }
  }

  function clearChosen() {
    if (status === "playing") setChosen([]);
  }

  function nextWord() {
    if (index + 1 >= round.items.length) {
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
        <p className="mt-1 text-sm text-stone-600">{round.instruction}</p>
        <div className="mt-4 rounded-lg bg-white p-6 text-center">
          <p className="text-lg font-medium text-stone-800">
            You unscrambled {round.items.length} words · {score} points
          </p>
          <p className="mt-1 text-sm text-stone-500">Fast answers earn more points.</p>
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

  const chosenWord = chosen.map(tileFor).join("");
  const revealed = status === "timeout";

  return (
    <div>
      <h3 className="text-base font-semibold text-stone-900">{round.title}</h3>
      <div className="mt-1 flex flex-wrap items-center justify-between gap-2 text-sm text-stone-500">
        <span>
          Word {index + 1} of {round.items.length}
        </span>
        <span aria-live="polite" className={secondsLeft <= 10 ? "font-semibold text-rose-600" : ""}>
          {secondsLeft}s left
        </span>
      </div>
      <p className="mt-1 text-sm text-stone-600">{round.instruction}</p>

      <div className="mt-4 rounded-lg bg-white p-5 text-center">
        {revealed ? (
          <p className="text-xl font-semibold text-stone-900">{item.de}</p>
        ) : (
          <div className="flex flex-wrap justify-center gap-1.5">
            {item.de.split("").map((_, i) => (
              <span
                key={i}
                aria-hidden="true"
                className={`flex h-10 w-9 items-center justify-center rounded border text-lg font-bold uppercase ${
                  chosen[i] !== undefined
                    ? "border-amber-500 bg-amber-50 text-stone-900"
                    : "border-dashed border-stone-300 bg-stone-50"
                }`}
              >
                {chosen[i] !== undefined ? tileFor(chosen[i]) : ""}
              </span>
            ))}
          </div>
        )}

        <div className="mt-4 flex flex-wrap justify-center gap-1.5">
          {tiles.map((ch, i) => {
            const used = chosen.includes(i);
            const inWord = chosen.indexOf(i) !== -1;
            return (
              <button
                key={i}
                type="button"
                disabled={used || status !== "playing"}
                onClick={() => clickTile(i)}
                aria-label={`Letter ${ch}${used ? ", used" : ""}`}
                className={`flex h-12 w-11 items-center justify-center rounded-lg border text-xl font-bold uppercase transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 ${
                  inWord
                    ? "border-amber-500 bg-amber-500 text-white"
                    : used
                      ? "border-stone-200 bg-stone-100 text-stone-300"
                      : "border-stone-300 bg-white text-stone-900 hover:border-amber-500 hover:bg-amber-50"
                }`}
              >
                {ch}
              </button>
            );
          })}
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={clearChosen}
            disabled={status !== "playing" || chosen.length === 0}
            className="rounded-lg border border-stone-300 px-3 py-1.5 text-sm text-stone-700 transition-colors hover:border-amber-500 hover:text-amber-700 disabled:opacity-40"
          >
            Clear
          </button>
          <button
            type="button"
            onClick={nextWord}
            className="rounded-lg bg-amber-600 px-4 py-1.5 text-sm font-semibold text-stone-950 transition-colors hover:bg-amber-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
          >
            {status === "correct" ? "Next word →" : status === "timeout" || status === "wrong" ? "Continue" : ""}
          </button>
        </div>

        {status === "correct" ? (
          <p className="mt-3 font-medium text-emerald-700">Richtig! +{Math.max(1, secondsLeft)} points</p>
        ) : status === "wrong" ? (
          <p className="mt-3 font-medium text-rose-700">
            Not quite. The word was <span className="font-semibold">{item.de}</span> — {item.en}.
          </p>
        ) : status === "timeout" ? (
          <p className="mt-3 font-medium text-rose-700">
            Time! {item.de} — {item.en}.
          </p>
        ) : (
          <p className="mt-3 flex items-center justify-center gap-2 text-sm text-stone-500">
            {chosenWord.length > 0 ? <span className="font-medium text-stone-700">{chosenWord}</span> : null}
            {item.audio ? <SpeakButton text={item.de} /> : null}
            <span className="text-stone-400">{item.en}</span>
          </p>
        )}
      </div>
    </div>
  );
}