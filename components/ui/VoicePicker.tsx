"use client";

import { useEffect, useState } from "react";
import {
  canSpeak,
  getGeneratedVoices,
  getGermanVoices,
  preferredVoiceUri,
  setPreferredVoiceUri,
  speak,
  GENERATED_PREFIX,
  DEVICE_PREFIX,
  type GermanVoice,
} from "@/lib/tts/tts";
import { useMounted } from "@/hooks/useMounted";

// Must be a string present in the pre-generated audio set so every
// "Natural voice" option plays its own distinct MP3 when selected.
// Verified to exist in all six Edge TTS voice directories.
const TEST_PHRASE = "Wie geht es Ihnen?";

export function VoicePicker() {
  const generated = getGeneratedVoices();
  const mounted = useMounted();
  const [voices, setVoices] = useState<GermanVoice[]>([]);
  const [selected, setSelected] = useState("");

  useEffect(() => {
    if (!mounted || !canSpeak()) return;
    let active = true;
    void getGermanVoices().then((list) => {
      if (!active) return;
      setVoices(list);
    });
    return () => {
      active = false;
    };
  }, [mounted]);

  // Reflect the stored preference once mounted. A legacy raw device URI (saved
  // before the "device:" prefix existed) does not match any option, so it
  // renders as Auto; speak() treats it as auto too.
  const stored = mounted ? preferredVoiceUri() : null;
  const value = selected || stored || "";

  if (generated.length === 0 && voices.length < 2) return null;

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
        {generated.length > 0 ? (
          <optgroup label="Natural voices">
            {generated.map((voice) => (
              <option key={voice.id} value={`${GENERATED_PREFIX}${voice.id}`}>
                {voice.label}
              </option>
            ))}
          </optgroup>
        ) : null}
        {voices.length > 0 ? (
          <optgroup label="Device voices">
            {voices.map((voice) => (
              <option key={voice.uri} value={`${DEVICE_PREFIX}${voice.uri}`}>
                {voice.name}
              </option>
            ))}
          </optgroup>
        ) : null}
      </select>
    </label>
  );
}