"use client";

import { useMemo, useState } from "react";
import { SpeakButton } from "@/components/ui/SpeakButton";
import { shuffleWithSeed } from "@/lib/exercises/shuffle";
import type { MemoryRound } from "@/content/games/schema";

interface CardState {
  id: number;
  label: string;
  isGerman: boolean;
  pairId: number;
  flipped: boolean;
  matched: boolean;
}

export function MemoryCards({ round }: { round: MemoryRound }) {
  const cards = useMemo<CardState[]>(() => {
    const deck = round.cards.flatMap((card, pairId) => [
      { id: pairId * 2, label: card.de, isGerman: true, pairId, flipped: false, matched: false },
      { id: pairId * 2 + 1, label: card.en, isGerman: false, pairId, flipped: false, matched: false },
    ]);
    return shuffleWithSeed(deck, `memory:${round.title}`).items;
  }, [round]);

  const [deck, setDeck] = useState<CardState[]>(cards);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [done, setDone] = useState(false);

  const matchedCount = deck.filter((card) => card.matched).length;
  const total = deck.length;

  function flip(index: number) {
    if (done) return;
    const card = deck[index];
    if (card.matched || card.flipped || flipped.length === 2) return;

    const next = deck.map((c, i) => (i === index ? { ...c, flipped: true } : c));
    const nextFlipped = [...flipped, index];
    setDeck(next);
    setFlipped(nextFlipped);

    if (nextFlipped.length === 2) {
      setMoves((m) => m + 1);
      const [a, b] = nextFlipped;
      const match = next[a].pairId === next[b].pairId;
      window.setTimeout(() => {
        setDeck((current) =>
          current.map((c, i) =>
            i === a || i === b
              ? { ...c, flipped: false, matched: match || c.matched }
              : c,
          ),
        );
        setFlipped([]);
        if (match && next.filter((c) => c.matched || c.pairId === next[a].pairId).length === total) {
          setDone(true);
        }
      }, 600);
    }
  }

  return (
    <div>
      <h3 className="text-base font-semibold text-stone-900">{round.title}</h3>
      <p className="mt-1 text-sm text-stone-600">{round.instruction}</p>

      <p className="mt-2 text-sm text-stone-500" role="status">
        {done
          ? `Geschafft! ${moves} moves.`
          : `${matchedCount} of ${total} cards matched · ${moves} moves`}
      </p>

      <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-4">
        {deck.map((card, index) => (
          <button
            key={card.id}
            type="button"
            onClick={() => flip(index)}
            disabled={card.matched}
            aria-label={
              card.flipped || card.matched
                ? card.label
                : "Hidden card"
            }
            className={`flex aspect-[3/4] items-center justify-center rounded-lg border p-2 text-center text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 ${
              card.matched
                ? "border-emerald-300 bg-emerald-50 text-emerald-900"
                : card.flipped
                  ? "border-amber-400 bg-amber-50 text-amber-900"
                  : "border-stone-300 bg-stone-800 text-stone-100 hover:border-amber-500"
            }`}
          >
            {card.flipped || card.matched ? (
              <span className="break-words">
                {card.isGerman && card.flipped ? (
                  <span className="flex items-center gap-1">
                    <span>{card.label}</span>
                    {card.flipped ? (
                      <SpeakButton text={card.label} className="h-6 w-6 shrink-0" />
                    ) : null}
                  </span>
                ) : (
                  card.label
                )}
              </span>
            ) : (
              "?"
            )}
          </button>
        ))}
      </div>

      {done ? (
        <button
          type="button"
          onClick={() => {
            setDeck(
              shuffleWithSeed(
                cards.map((c) => ({ ...c, flipped: false, matched: false })),
                `memory:${round.title}:again`,
              ).items,
            );
            setFlipped([]);
            setMoves(0);
            setDone(false);
          }}
          className="mt-3 rounded-lg border border-stone-300 px-4 py-2 text-sm font-medium text-stone-700 hover:border-amber-500 hover:text-amber-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
        >
          Play again
        </button>
      ) : null}
    </div>
  );
}