"use client";

import { useEffect, useRef, useState } from "react";
import { normalizeAnswer } from "@/lib/progress/answers";
import { SpeakButton } from "@/components/ui/SpeakButton";

export interface AnswerInputProps {
  /** Accepted answers (normalized with umlaut transliteration). */
  accept: string[];
  /** Optional hint shown below the input after a wrong attempt. */
  hint?: string;
  /** Optional German text to speak next to the prompt. */
  audioText?: string;
  placeholder?: string;
  /** Called with whether the submitted answer was correct. */
  onResult: (correct: boolean) => void;
}

export function AnswerInput({
  accept,
  hint,
  audioText,
  placeholder = "Type your answer…",
  onResult,
}: AnswerInputProps) {
  const [value, setValue] = useState("");
  const [status, setStatus] = useState<"idle" | "correct" | "wrong">("idle");
  const [tries, setTries] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function submit() {
    if (value.trim().length === 0 || status === "correct") return;
    const correct = accept.some((a) => normalizeAnswer(a) === normalizeAnswer(value));
    setTries((t) => t + 1);
    if (correct) {
      setStatus("correct");
      onResult(true);
    } else {
      setStatus("wrong");
      onResult(false);
    }
  }

  return (
    <div className="mt-3">
      <div className="flex flex-wrap items-center gap-2">
        <input
          ref={inputRef}
          type="text"
          value={value}
          disabled={status === "correct"}
          onChange={(event) => {
            setValue(event.target.value);
            setStatus("idle");
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") submit();
          }}
          aria-label="Your answer"
          placeholder={placeholder}
          className="rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 disabled:opacity-60"
        />
        <button
          type="button"
          onClick={submit}
          disabled={value.trim().length === 0 || status === "correct"}
          className="rounded-lg bg-amber-600 px-4 py-2 text-sm font-semibold text-stone-950 transition-colors hover:bg-amber-700 disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
        >
          Check
        </button>
        {audioText ? <SpeakButton text={audioText} /> : null}
      </div>

      {status === "correct" ? (
        <p className="mt-2 font-medium text-emerald-700" role="status">
          Richtig! ✓
        </p>
      ) : status === "wrong" ? (
        <p className="mt-2 text-sm text-rose-700" role="status">
          Not quite. {tries >= 2 && hint ? <span className="text-stone-600">{hint}</span> : "Try again."}
        </p>
      ) : null}
    </div>
  );
}