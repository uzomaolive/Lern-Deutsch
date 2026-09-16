"use client";

import { useState } from "react";
import type { WritingExercise } from "@/content/schema";

interface WritingProps {
  exercise: WritingExercise;
  /** Saved answer payload: { text } with the learner's draft. */
  savedAnswer?: unknown;
  onResult: (percent: number, answer?: unknown) => void;
}

interface WritingSaved {
  text: string;
  finished: boolean;
}

function isWritingSaved(value: unknown): value is WritingSaved {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof (value as WritingSaved).text === "string"
  );
}

function countWords(text: string): number {
  const trimmed = text.trim();
  if (trimmed.length === 0) return 0;
  return trimmed.split(/\s+/).length;
}

export function Writing({ exercise, savedAnswer, onResult }: WritingProps) {
  const saved = isWritingSaved(savedAnswer) ? savedAnswer : null;
  const [text, setText] = useState(() => saved?.text ?? "");
  const [finished, setFinished] = useState(() => saved?.finished ?? false);

  const words = countWords(text);

  function finish() {
    setFinished(true);
    onResult(100, { text, finished: true });
  }

  return (
    <div>
      <h3 className="text-base font-semibold text-stone-900">{exercise.title}</h3>
      <p className="mt-1 text-sm text-stone-600">{exercise.instruction}</p>

      <div className="mt-4 rounded-lg border border-stone-200 bg-white p-4">
        <p className="text-sm font-medium text-stone-900">{exercise.prompt}</p>
        {exercise.wordCount ? (
          <p className="mt-1 text-sm text-stone-500">{exercise.wordCount}</p>
        ) : null}
        {exercise.points.length > 0 ? (
          <ul className="mt-3 space-y-1 text-sm text-stone-700">
            {exercise.points.map((point) => (
              <li key={point} className="flex items-start gap-2">
                <span aria-hidden="true" className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                {point}
              </li>
            ))}
          </ul>
        ) : null}

        <textarea
          aria-label="Ihr Text auf Deutsch"
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="Schreiben Sie hier auf Deutsch …"
          rows={6}
          className="mt-3 w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm text-stone-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
        />

        <p className="mt-2 text-xs text-stone-500">
          {words} {words === 1 ? "Wort" : "Wörter"}
        </p>

        {!finished ? (
          <button
            type="button"
            disabled={text.trim().length === 0}
            onClick={finish}
            className="mt-3 rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-stone-950 transition-colors hover:bg-amber-500 disabled:cursor-not-allowed disabled:bg-stone-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
          >
            Fertig, Musterlösung zeigen
          </button>
        ) : null}
      </div>

      {finished ? (
        <div role="status" className="mt-3 rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
          <p className="font-medium">Ihr Text ist gespeichert.</p>
          <p className="mt-1 text-emerald-800">
            Vergleichen Sie jetzt mit der Musterlösung und prüfen Sie die Punkte:
          </p>
          <div className="mt-3 rounded-lg border border-emerald-200 bg-white p-3 text-stone-800">
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
              Musterlösung
            </p>
            <p className="mt-1 whitespace-pre-wrap">{exercise.modelAnswer}</p>
          </div>
          {exercise.explain ? (
            <p className="mt-2 text-emerald-800">Tipp: {exercise.explain}</p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}