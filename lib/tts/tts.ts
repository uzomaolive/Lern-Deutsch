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
const LEARNER_RATE = 0.95;

export interface SpeechLike {
  name: string;
  lang: string;
}

/** Voice quality hints, best first. Platform-dependent; the top hits are
 * Google's neural voice, the newer macOS system voices, then the classics. */
const PREFERRED_VOICE_HINTS = [
  "Google",
  "Flo",
  "Eddy",
  "Reed",
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
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

let cachedVoices: SpeechSynthesisVoice[] | null = null;

function loadVoices(): SpeechSynthesisVoice[] {
  if (!canSpeak()) return [];
  const voices = window.speechSynthesis.getVoices();
  if (voices.length > 0) {
    cachedVoices = voices;
  } else if (cachedVoices) {
    return cachedVoices;
  }
  return voices;
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
  if (voice) utterance.voice = voice;
  synth.speak(utterance);
}

/** Cancels any in-flight speech and reads the text aloud in German. */
export function speak(text: string, rate: number = LEARNER_RATE): void {
  if (!canSpeak() || text.trim().length === 0) return;

  const synth = window.speechSynthesis;
  const voices = loadVoices();

  if (voices.length > 0) {
    synth.cancel();
    speakWithVoice(synth, text, rate, pickGermanVoice(voices));
    return;
  }

  // Voice list not loaded yet: wait for it (Chrome fires "voiceschanged"
  // shortly after load) so the German voice is used from the start.
  let attempts = 0;
  const waitForVoices = (): void => {
    const loaded = loadVoices();
    attempts += 1;
    if (loaded.length > 0 || attempts >= 10) {
      synth.removeEventListener("voiceschanged", waitForVoices);
      synth.cancel();
      speakWithVoice(synth, text, rate, pickGermanVoice(loaded));
      return;
    }
    setTimeout(waitForVoices, 150);
  };
  synth.addEventListener("voiceschanged", waitForVoices);
  waitForVoices();
}