import { describe, expect, it } from "vitest";
import { canSpeak, pickGermanVoice, speak } from "./tts";

describe("pickGermanVoice", () => {
  it("prefers an exact de-DE voice", () => {
    const voice = { lang: "de-DE" };
    expect(
      pickGermanVoice([{ lang: "en-US" }, { lang: "fr-FR" }, voice]),
    ).toBe(voice);
  });

  it("falls back to any German voice", () => {
    const voice = { lang: "de" };
    expect(pickGermanVoice([{ lang: "en-US" }, voice])).toBe(voice);
  });

  it("matches case-insensitively", () => {
    const voice = { lang: "De-DE" };
    expect(pickGermanVoice([voice])).toBe(voice);
  });

  it("returns null when no German voice exists", () => {
    expect(pickGermanVoice([{ lang: "en-US" }, { lang: "es-ES" }])).toBeNull();
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