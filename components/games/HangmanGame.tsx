"use client";

import { useEffect, useState } from "react";
import { shuffleWithSeed } from "@/lib/exercises/shuffle";
import type { HangmanRound } from "@/content/games/schema";

const ALPHABET = "abcdefghijklmnopqrstuvwxyzäöüß".split("");

interface HangmanGameProps {
  round: HangmanRound;
  seed: string;
}

export function HangmanGame({ round, seed }: HangmanGameProps) {
  const [mounted, setMounted] = useState(false);
  const [index, setIndex] = useState(0);
  const [word, setWord] = useState("");
  const [used, setUsed] = useState<Set<string>>(new Set());
  const [wrongCount, setWrongCount] = useState(0);
  const [score, setScore] = useState(0);
  const [lost, setLost] = useState(false);
  const [done, setDone] = useState(false);
  const lives = round.lives ?? 6;

  useEffect(() => setMounted(true), []);

  function pickWord() {
    const items = shuffleWithSeed(round.words, `${seed}:${index}`).items;
    setWord(items[0].word.toLowerCase());
    setUsed(new Set());
    setWrongCount(0);
    setLost(false);
  }

  useEffect(() => {
    if (mounted && word === "") pickWord();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted]);

  function guess(letter: string) {
    if (lost || done) return;
    if (used.has(letter)) return;
    const next = new Set(used);
    next.add(letter);
    setUsed(next);
    if (!word.includes(letter)) {
      const nextWrong = wrongCount + 1;
      setWrongCount(nextWrong);
      if (nextWrong >= lives) setLost(true);
    }
  }

  function continueRound() {
    if (lost) {
      // next word regardless; accumulate nothing for lost words
      if (index + 1 >= round.words.length) {
        setDone(true);
      } else {
        setIndex((i) => i + 1);
        pickWord();
      }
      return;
    }
    setScore((s) => s + 1);
    if (index + 1 >= round.words.length) {
      setDone(true);
    } else {
      setIndex((i) => i + 1);
      pickWord();
    }
  }

  function retry() {
    setIndex(0);
    setScore(0);
    setWord("");
    setDone(false);
    pickWord();
  }

  if (!mounted || word === "") {
    return <div className="text-sm text-stone-500">Loading…</div>;
  }

  const allLetters = new Set(word.split(""));
  const won = !lost && [...allLetters].every((l) => used.has(l));
  const revealed = lost || won;
  const wrongLetters = [...used].filter((l) => !word.includes(l));

  if (done) {
    return (
      <div>
        <h3 className="text-base font-semibold text-stone-900">{round.title}</h3>
        <div className="mt-4 rounded-lg bg-white p-6 text-center">
          <p className="text-lg font-medium text-stone-800">
            {score} of {round.words.length} words guessed
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
          Word {index + 1} of {round.words.length} · {round.instruction}
        </span>
        <span>
          Score: {score} · Wrong: {wrongCount}/{lives}
        </span>
      </div>

      <div className="mt-4 rounded-lg bg-white p-5 text-center">
        {round.words[index].hint ? (
          <p className="text-sm text-stone-500">Hint: {round.words[index].hint}</p>
        ) : null}

        <p className="mt-3 text-3xl font-bold tracking-[0.3em] text-stone-900" aria-live="polite">
          {word.split("").map((ch, i) => (
            <span key={i} className="mx-0.5">
              {revealed ? ch : used.has(ch) ? ch : "·"}
            </span>
          ))}
        </p>

        {wrongLetters.length > 0 ? (
          <p className="mt-2 text-sm text-rose-700">Wrong: {wrongLetters.join(" ")}</p>
        ) : null}

        {revealed ? (
          <div className="mt-4">
            <p className={`font-medium ${won ? "text-emerald-700" : "text-rose-700"}`}>
              {won ? "Richtig! ✓" : `The word was ${word}.`}
            </p>
            <button
              type="button"
              onClick={continueRound}
              className="mt-2 rounded-lg bg-amber-600 px-4 py-2 text-sm font-semibold text-stone-950 transition-colors hover:bg-amber-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
            >
              {won ? "Next word →" : "Continue"}
            </button>
          </div>
        ) : (
          <div className="mt-4 flex flex-wrap justify-center gap-1.5">
            {ALPHABET.map((letter) => {
              const isUsed = used.has(letter);
              const isInWord = word.includes(letter);
              return (
                <button
                  key={letter}
                  type="button"
                  disabled={isUsed}
                  onClick={() => guess(letter)}
                  className={`h-9 min-w-8 rounded px-1 text-sm font-semibold uppercase transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 ${
                    isUsed
                      ? isInWord
                        ? "bg-emerald-100 text-emerald-500"
                        : "bg-rose-100 text-rose-400"
                      : "bg-stone-100 text-stone-700 hover:bg-amber-100 hover:text-amber-800"
                  }`}
                >
                  {letter}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}