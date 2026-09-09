"use client";

import { useEffect, useState } from "react";
import {
  canSpeak,
  getGermanVoices,
  preferredVoiceUri,
  setPreferredVoiceUri,
  speak,
  type GermanVoice,
} from "@/lib/tts/tts";

const TEST_PHRASE = "Hallo, ich bin deine deutsche Stimme.";

export function VoicePicker() {
  const [voices, setVoices] = useState<GermanVoice[]>([]);
  const [selected, setSelected] = useState("");

  useEffect(() => {
    if (!canSpeak()) return;
    let active = true;
    void getGermanVoices().then((list) => {
      if (!active) return;
      setVoices(list);
      setSelected(preferredVoiceUri() ?? "");
    });
    return () => {
      active = false;
    };
  }, []);

  if (voices.length < 2) return null;

  return (
    <label className="flex items-center gap-2 text-sm text-stone-600">
      <span className="sr-only">Voice</span>
      <select
        aria-label="Voice"
        value={selected}
        onChange={(event) => {
          const uri = event.target.value;
          setSelected(uri);
          setPreferredVoiceUri(uri);
          speak(TEST_PHRASE);
        }}
        className="rounded-lg border border-stone-300 bg-white px-2 py-1 text-sm text-stone-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
      >
        <option value="">Auto (best voice)</option>
        {voices.map((voice) => (
          <option key={voice.uri} value={voice.uri}>
            {voice.name}
          </option>
        ))}
      </select>
    </label>
  );
}