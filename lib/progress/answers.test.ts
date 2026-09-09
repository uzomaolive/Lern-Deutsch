import { describe, expect, it } from "vitest";
import { checkFillBlank, normalizeAnswer } from "./answers";

describe("normalizeAnswer", () => {
  it("lowercases and trims", () => {
    expect(normalizeAnswer("  Hallo ")).toBe("hallo");
  });

  it("collapses inner whitespace", () => {
    expect(normalizeAnswer("guten   morgen")).toBe("guten morgen");
  });

  it("treats umlauts and their transliterations as equal", () => {
    expect(normalizeAnswer("für")).toBe("fuer");
    expect(normalizeAnswer("FÜR")).toBe("fuer");
    expect(normalizeAnswer("öfter")).toBe("oefter");
    expect(normalizeAnswer("Männer")).toBe("maenner");
  });

  it("expands the sharp s", () => {
    expect(normalizeAnswer("Straße")).toBe("strasse");
  });
});

describe("checkFillBlank", () => {
  it("accepts an exact match", () => {
    expect(checkFillBlank({ answers: ["Guten Morgen"] }, "Guten Morgen")).toBe(true);
  });

  it("accepts umlaut transliteration", () => {
    expect(checkFillBlank({ answers: ["für"] }, "fuer")).toBe(true);
    expect(checkFillBlank({ answers: ["fuer"] }, "für")).toBe(true);
  });

  it("accepts case differences", () => {
    expect(checkFillBlank({ answers: ["hallo"] }, "HALLO")).toBe(true);
  });

  it("rejects a wrong answer", () => {
    expect(checkFillBlank({ answers: ["guten"] }, "gute")).toBe(false);
  });

  it("accepts any of several accepted variants", () => {
    expect(
      checkFillBlank({ answers: ["gehe", "geh"] }, "gehe"),
    ).toBe(true);
    expect(checkFillBlank({ answers: ["gehe", "geh"] }, "geh")).toBe(true);
  });

  it("rejects an empty input", () => {
    expect(checkFillBlank({ answers: ["hallo"] }, "   ")).toBe(false);
  });
});