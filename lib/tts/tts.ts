/**
 * Browser text-to-speech wrapper for German. All playback funnels through
 * speak(); components decide whether to render a SpeakButton via canSpeak().
 */

const GERMAN_LANG = "de-DE";
const LEARNER_RATE = 0.95;

export interface SpeechLike {
  lang: string;
}

/** Prefers a de-DE voice, then any German voice. Pure, unit tested. */
export function pickGermanVoice<T extends SpeechLike>(
  voices: readonly T[],
): T | null {
  const exact = voices.find((voice) => voice.lang.toLowerCase() === GERMAN_LANG.toLowerCase());
  if (exact) return exact;
  const anyGerman = voices.find((voice) =>
    voice.lang.toLowerCase().startsWith("de"),
  );
  return anyGerman ?? null;
}

export function canSpeak(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

/** Cancels any in-flight speech and reads the text aloud in German. */
export function speak(text: string, rate: number = LEARNER_RATE): void {
  if (!canSpeak() || text.trim().length === 0) return;

  const synthesis = window.speechSynthesis;
  synthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = GERMAN_LANG;
  utterance.rate = rate;

  const voice = pickGermanVoice(synthesis.getVoices());
  if (voice) utterance.voice = voice;

  synthesis.speak(utterance);
}