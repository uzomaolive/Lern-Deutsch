"use client";

import { useState } from "react";
import { Flashcard } from "@/components/exercises/Flashcard";
import type { FlashcardExercise } from "@/content/schema";
import type { WordListEntry } from "@/content/wordlists";

interface WordListPracticeProps {
  words: WordListEntry[];
  title: string;
}

/** Inline flashcard practice for a word list, reusing the course Flashcard. */
export function WordListPractice({ words, title }: WordListPracticeProps) {
  const [active, setActive] = useState(false);

  const exercise: FlashcardExercise = {
    id: `wordlist-${title}`,
    type: "flashcard",
    title: "Flashcard practice",
    instruction: "Say the German aloud, then reveal.",
    items: words.map((word) => ({
      front: word.de,
      back: word.plural ? `${word.en} · ${word.plural}` : word.en,
      frontAudio: true,
    })),
  };

  return (
    <div className="mt-4">
      <button
        type="button"
        onClick={() => setActive((value) => !value)}
        className="rounded-lg border border-stone-300 px-4 py-2 text-sm font-medium text-stone-700 transition-colors hover:border-amber-500 hover:text-amber-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
      >
        {active ? "Hide flashcards" : "Practice as flashcards"}
      </button>
      {active ? (
        <div className="mt-4 rounded-xl border border-stone-200 bg-stone-50 p-5">
          <Flashcard exercise={exercise} onResult={() => {}} />
        </div>
      ) : null}
    </div>
  );
}