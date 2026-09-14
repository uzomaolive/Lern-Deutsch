import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SpeakButton } from "./SpeakButton";
import { ttsHash } from "@/lib/tts/hash";
import { ttsAudioVoices } from "@/lib/tts/audio-manifest";

const hasClip = (text: string) =>
  ttsAudioVoices.some((voice) => voice.hashes.includes(ttsHash(text)));

describe("SpeakButton", () => {
  it("renders disabled when neither a clip nor speech synthesis is available", () => {
    const text = hasClip("Hallo") ? "Ein ganz einzigartiger Text ohne Audio." : "Hallo";
    render(<SpeakButton text={text} />);
    expect(screen.getByRole("button", { name: `Hear ${text}` })).toBeDisabled();
  });
});