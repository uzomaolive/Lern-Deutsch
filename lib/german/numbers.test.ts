import { describe, expect, it } from "vitest";
import { germanNumberWord, under100, under1000 } from "./numbers";

describe("germanNumberWord", () => {
  it("handles the tricky teens", () => {
    expect(under100(16)).toBe("sechzehn");
    expect(under100(17)).toBe("siebzehn");
    expect(under100(11)).toBe("elf");
    expect(under100(12)).toBe("zwölf");
  });

  it("handles tricky tens", () => {
    expect(under100(30)).toBe("dreißig");
    expect(under100(60)).toBe("sechzig");
    expect(under100(70)).toBe("siebzig");
    expect(under100(21)).toBe("einundzwanzig");
    expect(under100(24)).toBe("vierundzwanzig");
  });

  it("builds hundreds", () => {
    expect(under1000(101)).toBe("einhunderteins");
    expect(under1000(125)).toBe("einhundertfünfundzwanzig");
    expect(under1000(199)).toBe("einhundertneunundneunzig");
    expect(under1000(200)).toBe("zweihundert");
    expect(under1000(999)).toBe("neunhundertneunundneunzig");
  });

  it("builds thousands", () => {
    expect(germanNumberWord(1000)).toBe("eintausend");
    expect(germanNumberWord(2000)).toBe("zweitausend");
    expect(germanNumberWord(1234)).toBe("eintausendzweihundertvierunddreißig");
    expect(germanNumberWord(2500)).toBe("zweitausendfünfhundert");
    expect(germanNumberWord(4000)).toBe("viertausend");
  });

  it("builds big numbers", () => {
    expect(germanNumberWord(45789)).toBe("fünfundvierzigtausendsiebenhundertneunundachtzig");
    expect(germanNumberWord(999999)).toBe(
      "neunhundertneunundneunzigtausendneunhundertneunundneunzig",
    );
  });

  it("matches the A1 curriculum vocabulary", () => {
    const vocab = [
      ["21", "einundzwanzig"],
      ["44", "vierundvierzig"],
      ["100", "einhundert"],
      ["250", "zweihundertfünfzig"],
      ["1989", "eintausendneunhundertneunundachtzig"],
      ["2026", "zweitausendsechsundzwanzig"],
    ] as const;
    for (const [n, word] of vocab) {
      expect(germanNumberWord(Number(n))).toBe(word);
    }
  });
});