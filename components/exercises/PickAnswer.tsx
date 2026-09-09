"use client";

import { useState } from "react";
import { SpeakButton } from "@/components/ui/SpeakButton";
import { FeedbackBanner } from "./feedback";

interface PickAnswerProps {
  title: string;
  instruction: string;
  /** Optional written prompt (hidden for listening-only exercises). */
  prompt?: string;
  /** Speak the prompt via TTS. */
  promptAudio?: boolean;
  /** When true the prompt is only audible, not shown. */
  listenOnly?: boolean;
  options: string[];
  correctIndex: number;
  explain?: string;
  onResult: (percent: number) => void;
}

export function PickAnswer({
  title,
  instruction,
  prompt,
  promptAudio,
  listenOnly,
  options,
  correctIndex,
  explain,
  onResult,
}: PickAnswerProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<"idle" | "correct" | "wrong">("idle");

  const correctText = options[correctIndex];

  function choose(index: number) {
    if (feedback !== "idle") return;
    setSelected(index);
    const correct = index === correctIndex;
    setFeedback(correct ? "correct" : "wrong");
    onResult(correct ? 100 : 0);
  }

  function retry() {
    setSelected(null);
    setFeedback("idle");
  }

  return (
    <div>
      <h3 className="text-base font-semibold text-stone-900">{title}</h3>
      <p className="mt-1 text-sm text-stone-600">{instruction}</p>

      <div className="mt-3 flex items-start gap-3">
        {listenOnly ? (
          <SpeakButton text={prompt ?? ""} label="Play audio" className="h-12 w-12" />
        ) : prompt ? (
          <>
            <p className="flex-1 text-lg text-stone-800">{prompt}</p>
            {promptAudio ? <SpeakButton text={prompt} /> : null}
          </>
        ) : null}
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-2" role="group" aria-label="Answer options">
        {options.map((option, index) => {
          const isCorrectOption = index === correctIndex;
          const isSelected = index === selected;
          let styles =
            "border-stone-300 bg-white text-stone-800 hover:border-amber-500";
          if (feedback !== "idle") {
            if (isCorrectOption) {
              styles = "border-emerald-500 bg-emerald-50 text-emerald-900";
            } else if (isSelected) {
              styles = "border-rose-400 bg-rose-50 text-rose-900";
            } else {
              styles = "border-stone-200 bg-stone-50 text-stone-500";
            }
          }
          return (
            <button
              key={option}
              type="button"
              disabled={feedback !== "idle"}
              onClick={() => choose(index)}
              className={`rounded-lg border px-4 py-3 text-left text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 ${styles}`}
            >
              {option}
            </button>
          );
        })}
      </div>

      {feedback !== "idle" ? (
        <FeedbackBanner
          kind={feedback}
          correctText={correctText}
          explain={explain}
        />
      ) : null}

      {feedback !== "idle" ? (
        <button
          type="button"
          onClick={retry}
          className="mt-3 rounded-lg border border-stone-300 px-4 py-2 text-sm font-medium text-stone-700 hover:border-amber-500 hover:text-amber-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
        >
          Try again
        </button>
      ) : null}
    </div>
  );
}