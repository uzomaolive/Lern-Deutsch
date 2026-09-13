import { describe, expect, it } from "vitest";
import { canSpeak, pickGermanVoice, speak } from "./tts";

const voice = (name: string, lang: string) => ({ name, lang });

describe("pickGermanVoice", () => {
  it("prefers an exact de-DE voice over other German dialects", () => {
    const chosen = voice("Anna", "de-DE");
    expect(pickGermanVoice([voice("Hanna", "de-AT"), chosen])).toBe(chosen);
  });

  it("ranks Google Deutsch above the classic voices", () => {
    const google = voice("Google Deutsch", "de-DE");
    expect(
      pickGermanVoice([voice("Anna", "de-DE"), google, voice("Katja", "de-DE")]),
    ).toBe(google);
  });

  it("prefers the modern enhanced voice over the legacy Anna", () => {
    const anna = voice("Anna", "de-DE");
    const flo = voice("Flo (German (Germany))", "de-DE");
    expect(
      pickGermanVoice([anna, flo, voice("Reed (German (Germany))", "de-DE")]),
    ).toBe(flo);
  });

  it("falls back to any German voice", () => {
    const voice2 = { name: "Jemand", lang: "de" };
    expect(pickGermanVoice([{ name: "John", lang: "en-US" }, voice2])).toBe(voice2);
  });

  it("matches case-insensitively", () => {
    const anna = voice("anna", "de-de");
    expect(pickGermanVoice([anna])).toBe(anna);
  });

  it("returns null when no German voice exists", () => {
    expect(pickGermanVoice([voice("John", "en-US"), voice("Lucía", "es-ES")])).toBeNull();
  });

  it("returns null for an empty list", () => {
    expect(pickGermanVoice([])).toBeNull();
  });
});

describe("speak and canSpeak", () => {
  it("reports TTS unavailable in non-browser environments", () => {
    expect(canSpeak()).toBe(false);
  });

  it("is a safe no-op when TTS is unavailable", () => {
    expect(() => speak("Hallo")).not.toThrow();
    expect(() => speak("")).not.toThrow();
  });
});