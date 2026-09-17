import { describe, expect, it } from "vitest";
import { buildCoverage, findCoveredItems, normalizeTranscript } from "./coverage";
import type { CheatSheet } from "@/content/practice/schema";

const cheat: CheatSheet = {
  words: ["der Termin", "das Formular", "anrufen"],
  sentenceStarters: ["Ich möchte gern …", "Wann passt es Ihnen?"],
  connectors: ["und", "deshalb"],
};

describe("normalizeTranscript", () => {
  it("lowercases, strips punctuation, and collapses whitespace", () => {
    expect(normalizeTranscript("  Ich MÖCHTE gern, einen Termin!  ")).toBe(
      "ich möchte gern einen termin",
    );
  });

  it("keeps umlauts", () => {
    expect(normalizeTranscript("Können Sie morgen?")).toBe("können sie morgen");
  });

  it("returns empty for empty input", () => {
    expect(normalizeTranscript("")).toBe("");
  });
});

describe("findCoveredItems", () => {
  it("finds words, starters, and connectors in the transcript", () => {
    const result = findCoveredItems(
      cheat,
      "Ich möchte gern einen Termin, deshalb rufe ich an.",
    );
    expect(result.usedWords).toContain("der Termin");
    expect(result.usedWords).toContain("anrufen");
    expect(result.usedStarters).toContain("Ich möchte gern …");
    expect(result.usedConnectors).toContain("deshalb");
  });

  it("matches case-insensitively with punctuation variations", () => {
    const result = findCoveredItems(
      cheat,
      "ICH MÖCHTE GERN einen Termin. Wann passt es Ihnen?",
    );
    expect(result.usedStarters).toContain("Ich möchte gern …");
    expect(result.usedStarters).toContain("Wann passt es Ihnen?");
  });

  it("returns empty lists for an empty transcript", () => {
    const result = findCoveredItems(cheat, "");
    expect(result).toEqual({ usedWords: [], usedStarters: [], usedConnectors: [] });
  });
});

describe("buildCoverage", () => {
  it("reports used, missed, and a percent", () => {
    const report = buildCoverage(
      cheat,
      "Ich möchte gern einen Termin, deshalb rufe ich an.",
    );
    // 3 of 5 checklist items (der Termin, anrufen via separable verb "rufe
    // ich an", and the starter).
    expect(report.coveragePercent).toBe(60);
    expect(report.usedWords).toContain("anrufen");
    expect(report.missed).toContain("das Formular");
    expect(report.missed).toContain("Wann passt es Ihnen?");
  });

  it("scores 100 when everything is used", () => {
    const report = buildCoverage(
      cheat,
      "Ich möchte gern einen Termin und das Formular. Wann passt es Ihnen? Ich rufe an.",
    );
    expect(report.coveragePercent).toBe(100);
    expect(report.missed).toHaveLength(0);
  });

  it("scores 0 for an empty transcript", () => {
    const report = buildCoverage(cheat, "");
    expect(report.coveragePercent).toBe(0);
    expect(report.missed).toHaveLength(cheat.words.length + cheat.sentenceStarters.length);
  });
});