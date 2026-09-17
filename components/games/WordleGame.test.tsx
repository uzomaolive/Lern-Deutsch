import { describe, expect, it } from "vitest";
import { gradeGuess } from "@/components/games/WordleGame";

describe("gradeGuess", () => {
  it("grades a perfect guess all green", () => {
    expect(gradeGuess("heute", "heute")).toEqual({
      states: ["correct", "correct", "correct", "correct", "correct"],
      won: true,
    });
  });

  it("grades letters in the wrong position as present", () => {
    expect(gradeGuess("nlese", "lesen")).toEqual({
      states: ["present", "present", "present", "present", "present"],
      won: false,
    });
  });

  it("grades wrong letters as absent", () => {
    expect(gradeGuess("xxxxx", "heute")).toEqual({
      states: ["absent", "absent", "absent", "absent", "absent"],
      won: false,
    });
  });

  it("does not over-count duplicate letters (wordle rule)", () => {
    // "affe" style duplicates: guess has two e, target has one
    expect(gradeGuess("keele", "keule")).toEqual({
      states: ["correct", "correct", "absent", "correct", "correct"],
      won: false,
    });
  });

  it("handles umlauts case-insensitively", () => {
    expect(gradeGuess("SCHÖN", "schön")).toEqual({
      states: ["correct", "correct", "correct", "correct", "correct"],
      won: true,
    });
  });

  it("handles the double letter split: one correct, one absent", () => {
    expect(gradeGuess("essen", "eisen")).toEqual({
      states: ["correct", "absent", "correct", "correct", "correct"],
      won: false,
    });
  });
});