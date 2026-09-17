"use client";

import { useState } from "react";
import { SpeakButton } from "@/components/ui/SpeakButton";
import type { SpeakingTopic } from "@/content/practice/schema";

interface TopicCardProps {
  topic: SpeakingTopic;
}

/**
 * The topic card: the speaking task, an example sentence with audio, and
 * the cheat sheet (words, starters, connectors). The cheat sheet can be
 * hidden for a harder challenge.
 */
export function TopicCard({ topic }: TopicCardProps) {
  const [showCheat, setShowCheat] = useState(true);

  return (
    <div className="rounded-lg border border-stone-200 bg-white p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-amber-700">
        Thema
      </p>
      <h2 className="mt-1 text-xl font-semibold text-stone-900">{topic.title}</h2>
      <p className="mt-2 text-stone-700">{topic.prompt}</p>

      <div className="mt-3 flex items-start gap-3 rounded-lg bg-stone-50 p-3">
        <p className="flex-1 text-stone-800">
          <span className="text-stone-500">{topic.exampleEn}: </span>
          {topic.example}
        </p>
        <SpeakButton text={topic.example} />
      </div>

      <div className="mt-3 flex items-center justify-between">
        <button
          type="button"
          aria-pressed={showCheat}
          onClick={() => setShowCheat((value) => !value)}
          className="rounded-lg border border-stone-300 px-3 py-1.5 text-sm font-medium text-stone-700 hover:border-amber-500 hover:text-amber-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
        >
          {showCheat ? "Cheat Sheet verstecken" : "Cheat Sheet zeigen"}
        </button>
      </div>

      {showCheat ? (
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">
              Wörter
            </p>
            <ul className="mt-1 space-y-1 text-sm text-stone-700">
              {topic.cheat.words.map((word) => (
                <li key={word} className="flex items-center gap-2">
                  <span className="flex-1">{word}</span>
                  <SpeakButton text={word} />
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">
              Satzanfänge
            </p>
            <ul className="mt-1 space-y-1 text-sm text-stone-700">
              {topic.cheat.sentenceStarters.map((starter) => (
                <li key={starter}>{starter}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">
              Verbindungswörter
            </p>
            <ul className="mt-1 space-y-1 text-sm text-stone-700">
              {topic.cheat.connectors.map((connector) => (
                <li key={connector}>{connector}</li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </div>
  );
}