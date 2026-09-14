/**
 * Browser text-to-speech wrapper for German. All playback funnels through
 * speak(); components decide whether to render a SpeakButton via canSpeak().
 *
 * Chrome loads the voice list asynchronously: getVoices() is empty on the
 * first call and fills after a "voiceschanged" event. speak() therefore
 * waits for voices before reading, so playback never falls back to a
 * non-German default voice.
 */

const GERMAN_LANG = "de-DE";
/** Slightly slow on purpose: learners understand clearer speech better. */
const LEARNER_RATE = 0.9;

import { ttsHash } from "./hash";
import { ttsAudioVoices } from "./audio-manifest";

/** voiceId -> { ext, hashes } for generated (recorded) audio. */
const generatedVoices = new Map(
  ttsAudioVoices.map((voice) => [
    voice.id,
    { ext: voice.ext, hashes: new Set(voice.hashes) },
  ]),
);

/** Preference value for a generated voice, e.g. "generated:Gemini". */
export const GENERATED_PREFIX = "generated:";

/** Generated voices that have at least one clip, for the picker. */
export function getGeneratedVoices(): { id: string; label: string }[] {
  return ttsAudioVoices
    .filter((voice) => voice.hashes.length > 0)
    .map((voice) => ({ id: voice.id, label: voice.label }));
}

/** True when a pre-generated audio file exists for this text and voice. */
export function hasGeneratedAudio(text: string, voiceId: string): boolean {
  const voice = generatedVoices.get(voiceId);
  return voice ? voice.hashes.has(ttsHash(text.trim())) : false;
}

/** Order in which generated voices are tried in auto mode. */
const AUTO_GENERATED_ORDER = ttsAudioVoices.map((voice) => voice.id);

function playFile(voiceId: string, hash: string): boolean {
  const voice = generatedVoices.get(voiceId);
  if (!voice) return false;
  const base = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");
  const audio = new Audio(`${base}/tts/${voiceId}/${hash}.${voice.ext}`);
  audio.play().catch(() => {
    /* fall through to browser voices */
  });
  return true;
}

function playGeneratedAudio(text: string, preference: string | null): boolean {
  if (typeof window === "undefined") return false;
  const hash = ttsHash(text);

  // Explicit generated-voice preference.
  if (preference && preference.startsWith(GENERATED_PREFIX)) {
    const voiceId = preference.slice(GENERATED_PREFIX.length);
    const voice = generatedVoices.get(voiceId);
    if (voice?.hashes.has(hash)) return playFile(voiceId, hash);
    return false;
  }

  // Auto mode: first generated voice that has this clip.
  if (!preference) {
    for (const voiceId of AUTO_GENERATED_ORDER) {
      const voice = generatedVoices.get(voiceId);
      if (voice?.hashes.has(hash)) return playFile(voiceId, hash);
    }
  }

  return false;
}

export interface SpeechLike {
  name: string;
  lang: string;
}

/** Voice quality hints, best first. Google's neural voice is the best on
 * Chrome. On macOS the modern enhanced voices (Eddy, Flo, Rocko, Reed, Sandy,
 * Shelley, Grandma, Grandpa) are Siri-quality and much clearer than the
 * legacy Anna voice, which can sound robotic and muddled. */
const PREFERRED_VOICE_HINTS = [
  "Google",
  "Eddy",
  "Flo",
  "Rocko",
  "Reed",
  "Sandy",
  "Shelley",
  "Grandma",
  "Grandpa",
  "Anna",
  "Katja",
  "Markus",
  "Vicki",
  "Steffi",
];

/**
 * Picks the best German voice: prefers an exact de-DE match, then ranks by
 * quality hints, then any German voice. Pure, unit tested.
 */
export function pickGermanVoice<T extends SpeechLike>(
  voices: readonly T[],
): T | null {
  const german = voices.filter((voice) =>
    voice.lang.toLowerCase().startsWith("de"),
  );
  if (german.length === 0) return null;

  const exact = german.filter(
    (voice) => voice.lang.toLowerCase() === GERMAN_LANG.toLowerCase(),
  );
  const pool = exact.length > 0 ? exact : german;

  for (const hint of PREFERRED_VOICE_HINTS) {
    const match = pool.find((voice) =>
      voice.name.toLowerCase().includes(hint.toLowerCase()),
    );
    if (match) return match;
  }
  return pool[0];
}

export function canSpeak(): boolean {
  return (
    (typeof window !== "undefined" && "speechSynthesis" in window) ||
    ttsAudioVoices.some((voice) => voice.hashes.length > 0)
  );
}

export interface GermanVoice {
  name: string;
  lang: string;
  uri: string;
}

const VOICE_PREFERENCE_KEY = "lern-deutsch:tts:voice";

export function preferredVoiceUri(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(VOICE_PREFERENCE_KEY);
}

export function setPreferredVoiceUri(uri: string): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(VOICE_PREFERENCE_KEY, uri);
}

function waitForVoices(timeoutMs = 2000): Promise<SpeechSynthesisVoice[]> {
  return new Promise((resolve) => {
    if (!canSpeak()) {
      resolve([]);
      return;
    }
    const synth = window.speechSynthesis;
    const loaded = synth.getVoices();
    if (loaded.length > 0) {
      resolve(loaded);
      return;
    }
    const finish = (voices: SpeechSynthesisVoice[]): void => {
      synth.removeEventListener("voiceschanged", onChanged);
      resolve(voices);
    };
    const onChanged = (): void => finish(synth.getVoices());
    synth.addEventListener("voiceschanged", onChanged);
    setTimeout(() => finish(synth.getVoices()), timeoutMs);
  });
}

/** All German voices on this device, for the voice picker. */
export async function getGermanVoices(): Promise<GermanVoice[]> {
  const voices = await waitForVoices();
  return voices
    .filter((voice) => voice.lang.toLowerCase().startsWith("de"))
    .map((voice) => ({
      name: voice.name,
      lang: voice.lang,
      uri: voice.voiceURI,
    }));
}

function pickVoice(
  voices: SpeechSynthesisVoice[],
): SpeechSynthesisVoice | null {
  const preferred = preferredVoiceUri();
  if (preferred && !preferred.startsWith(GENERATED_PREFIX)) {
    const match = voices.find(
      (voice) =>
        voice.voiceURI === preferred &&
        voice.lang.toLowerCase().startsWith("de"),
    );
    if (match) return match;
  }
  return pickGermanVoice(voices);
}

function speakWithVoice(
  synth: SpeechSynthesis,
  text: string,
  rate: number,
  voice: SpeechSynthesisVoice | null,
): void {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = GERMAN_LANG;
  utterance.rate = rate;
  utterance.pitch = 1;
  utterance.volume = 1;
  if (voice) utterance.voice = voice;
  synth.speak(utterance);
}

/** Cancels any in-flight speech and reads the text aloud in German. */
export function speak(text: string, rate: number = LEARNER_RATE): void {
  const trimmed = text.trim();
  if (trimmed.length === 0) return;

  if (playGeneratedAudio(trimmed, preferredVoiceUri())) return;

  if (!canSpeak()) return;
  const synth = window.speechSynthesis;
  const voices = synth.getVoices();

  if (voices.length > 0) {
    synth.cancel();
    speakWithVoice(synth, text, rate, pickVoice(voices));
    return;
  }

  // Voice list not loaded yet: wait for it (Chrome fires "voiceschanged"
  // shortly after load) so the German voice is used from the start.
  void waitForVoices().then((loaded) => {
    if (loaded.length === 0) return;
    synth.cancel();
    speakWithVoice(synth, text, rate, pickVoice(loaded));
  });
}