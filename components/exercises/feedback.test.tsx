import { describe, expect, it } from "vitest";
import { findTranslations } from "./feedback";

describe("findTranslations", () => {
  it("matches whole words only, never substrings", () => {
    const entries = findTranslations("Der Lehrer liest das Buch.");
    const german = entries.map(([de]) => de);
    expect(german).not.toContain("er");
    expect(german).not.toContain("mal");
  });

  it("does not show mal for words that merely contain it", () => {
    const entries = findTranslations("Wir malen ein Bild.");
    expect(entries.map(([de]) => de)).not.toContain("mal");
  });

  it("shows mal with a context-aware gloss when it stands alone", () => {
    const entries = findTranslations("Ich mache mal Pause.");
    const mal = entries.find(([de]) => de === "mal");
    expect(mal).toEqual(["mal", "once, times; (particle) just"]);
  });

  it("glosses er in a way that fits sentences, not just dictionary entries", () => {
    const entries = findTranslations("Er kommt heute.");
    const er = entries.find(([de]) => de === "er");
    expect(er).toEqual(["er", "he, it (for masculine nouns)"]);
  });

  it("returns the breakdown in sentence order", () => {
    const entries = findTranslations("Heute lerne ich Deutsch.");
    const indices = entries.map(([de]) => de);
    expect(indices.indexOf("Heute") === 0 || indices.indexOf("heute") === 0).toBe(true);
  });
});