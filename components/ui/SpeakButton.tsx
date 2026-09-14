"use client";

import { canPlayAudio, speak } from "@/lib/tts/tts";
import { useMounted } from "@/hooks/useMounted";

interface SpeakButtonProps {
  text: string;
  /** Accessible label; defaults to English "Hear" plus the text. */
  label?: string;
  className?: string;
}

export function SpeakButton({ text, label, className }: SpeakButtonProps) {
  const mounted = useMounted();
  const available = mounted && canPlayAudio(text);
  const speakable = available && text.trim().length > 0;

  return (
    <button
      type="button"
      disabled={!speakable}
      onClick={() => speak(text)}
      aria-label={label ?? `Hear ${text}`}
      title={label ?? `Hear ${text}`}
      className={`inline-flex h-8 w-8 items-center justify-center rounded-full border border-stone-300 bg-white text-stone-700 transition-colors hover:border-amber-500 hover:text-amber-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-stone-300 disabled:hover:text-stone-700 ${className ?? ""}`}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4"
      >
        <path d="M11 5 6 9H2v6h4l5 4V5Z" />
        <path d="M15.5 8.5a5 5 0 0 1 0 7" />
        <path d="M18.5 5.5a9.5 9.5 0 0 1 0 13" />
      </svg>
    </button>
  );
}