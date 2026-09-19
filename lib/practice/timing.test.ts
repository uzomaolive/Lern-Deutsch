import { describe, expect, it } from "vitest";
import { countWords, formatCountdown } from "./timing";

describe("formatCountdown", () => {
  it("formats minutes and seconds", () => {
    expect(formatCountdown(65)).toBe("1:05");
    expect(formatCountdown(120)).toBe("2:00");
    expect(formatCountdown(30)).toBe("0:30");
  });

  it("clamps negative values to zero", () => {
    expect(formatCountdown(-5)).toBe("0:00");
  });
});

describe("countWords", () => {
  it("counts whitespace-separated words", () => {
    expect(countWords("Ich möchte gern einen Termin")).toBe(5);
  });

  it("returns 0 for empty or whitespace-only text", () => {
    expect(countWords("")).toBe(0);
    expect(countWords("   ")).toBe(0);
  });
});