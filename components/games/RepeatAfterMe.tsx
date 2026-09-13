"use client";

import { useState } from "react";
import { SpeakButton } from "@/components/ui/SpeakButton";
import type { RepeatRound } from "@/content/games/schema";

interface PhraseState {
  phrase: string;
  revealed: boolean;
}

export function RepeatAfterMe({ round }: { round: RepeatRound }) {
  const [phrases, setPhrases] = useState<PhraseState[]>(
    () => round.phrases.map((phrase) => ({ phrase, revealed: false })),
  );

  function reveal(index: number) {
    setPhrases((current) =>
      current.map((item, i) => (i === index ? { ...item, revealed: true } : item)),
    );
  }

  return (
    <div>
      <h3 className="text-base font-semibold text-stone-900">{round.title}</h3>
      <p className="mt-1 text-sm text-stone-600">{round.instruction}</p>

      <ol className="mt-4 space-y-3">
        {phrases.map((item, index) => (
          <li
            key={item.phrase}
            className="flex flex-wrap items-center gap-3 rounded-lg border border-stone-200 bg-white p-3"
          >
            <span className="text-sm font-semibold text-stone-400">
              {index + 1}
            </span>
            <SpeakButton text={item.phrase} className="h-8 w-8" />
            <p className="flex-1 text-base font-medium text-stone-900">
              {item.phrase}
            </p>
            <button
              type="button"
              onClick={() => reveal(index)}
              className="rounded-md border border-stone-300 px-3 py-1.5 text-xs font-medium text-stone-600 transition-colors hover:border-amber-500 hover:text-amber-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
            >
              {item.revealed ? "Hide" : "Show meaning"}
            </button>
            {item.revealed ? (
              <p className="w-full text-sm text-stone-500">
                {roundPhraseMeaning(round, item.phrase)}
              </p>
            ) : null}
          </li>
        ))}
      </ol>
    </div>
  );
}

/** Meanings are derived from the audio phrase itself; without a lookup we
 * show a gentle prompt to keep repeating. Content rounds could later carry
 * explicit translations. */
function roundPhraseMeaning(round: RepeatRound, phrase: string): string {
  const meanings: Record<string, string> = {
    "Guten Morgen!": "good morning",
    "Guten Tag!": "good day",
    "Guten Abend!": "good evening",
    "Auf Wiedersehen!": "goodbye",
    "Bis bald!": "see you soon",
    "Wie geht es dir?": "how are you?",
    "Mir geht es gut.": "I am fine.",
    "Und dir?": "and you?",
    "Bis morgen!": "see you tomorrow",
    "Schönen Tag noch!": "have a nice day",
    "Ich lerne Deutsch.": "I am learning German",
    "Ich wohne in Berlin.": "I live in Berlin",
    "Ich arbeite heute.": "I work today",
    "Wir essen jetzt.": "we eat now",
    "Kommst du mit?": "are you coming along?",
  };
  return meanings[phrase] ?? "keep repeating until it feels natural";
}