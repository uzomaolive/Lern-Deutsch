"use client";

import { useState } from "react";
import {
  getGeneratedVoices,
  preferredVoiceUri,
  setPreferredVoiceUri,
  speak,
  GENERATED_PREFIX,
} from "@/lib/tts/tts";
import { useMounted } from "@/hooks/useMounted";

const TEST_PHRASE = "Hallo, ich bin deine deutsche Stimme.";

export function VoicePicker() {
  const generated = getGeneratedVoices();
  const mounted = useMounted();
  const [selected, setSelected] = useState("");

  // Reflect the stored preference once mounted (localStorage is client-only).
  const value = mounted ? (selected || preferredVoiceUri() || "") : "";

  if (generated.length === 0) return null;

  return (
    <label className="flex items-center gap-2 text-sm text-stone-600">
      <span className="sr-only">Voice</span>
      <select
        aria-label="Voice"
        name="voice"
        value={value}
        onChange={(event) => {
          const uri = event.target.value;
          setSelected(uri);
          setPreferredVoiceUri(uri);
          speak(TEST_PHRASE);
        }}
        className="rounded-lg border border-stone-300 bg-white px-2 py-1 text-sm text-stone-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
      >
        <option value="">Auto (best voice)</option>
        {generated.map((voice) => (
          <option key={voice.id} value={`${GENERATED_PREFIX}${voice.id}`}>
            {voice.label}
          </option>
        ))}
      </select>
    </label>
  );
}