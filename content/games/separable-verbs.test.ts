import { describe, expect, it } from "vitest";
import { games } from "./index";

const game = games.find((candidate) => candidate.id === "trennbare-verben");

describe("trennbare-verben game integrity", () => {
  it("is registered in the games catalog", () => {
    expect(game).toBeDefined();
    expect(game!.title).toBe("Separable & Inseparable Verbs");
    expect(game!.category).toBe("grammar");
  });

  it("has four levels, one per verb pattern", () => {
    expect(game!.levels.map((level) => level.title)).toEqual([
      "Level 1: Which prefix splits?",
      "Level 2: The sentence frame (Satzklammer)",
      "Level 3: The perfect tense",
      "Level 4: Modal verbs and imperatives",
    ]);
    for (const level of game!.levels) {
      expect(level.rounds.length, level.id).toBeGreaterThanOrEqual(4);
    }
  });

  it("builds every word-order round from chunks that join to a sentence", () => {
    for (const level of game!.levels) {
      for (const round of level.rounds) {
        if (round.kind !== "exercise") continue;
        const ex = round.exercise;
        if (ex.type !== "word-order") continue;
        const sentence = ex.chunks.join(" ");
        expect(sentence, ex.id).toMatch(/[.?!]$/);
        expect(ex.translation?.trim().length, ex.id).toBeGreaterThan(0);
        expect(ex.explain?.trim().length, ex.id).toBeGreaterThan(0);
        expect(ex.instruction, ex.id).toContain(ex.translation!);
      }
    }
  });

  it("keeps every exercise well-formed", () => {
    for (const level of game!.levels) {
      for (const round of level.rounds) {
        if (round.kind !== "exercise") continue;
        const ex = round.exercise;
        expect(ex.id.length, game!.id).toBeGreaterThan(0);
        if (ex.type === "multiple-choice" || ex.type === "listening") {
          expect(new Set(ex.options).size, ex.id).toBe(ex.options.length);
          expect(ex.correctIndex, ex.id).toBeGreaterThanOrEqual(0);
          expect(ex.correctIndex, ex.id).toBeLessThan(ex.options.length);
        }
        if (ex.type === "fill-blank") {
          expect(ex.blanks.length, ex.id).toBeGreaterThan(0);
        }
        if (ex.type === "matching") {
          expect(ex.pairs.length, ex.id).toBeGreaterThanOrEqual(2);
        }
        if (ex.type === "flashcard") {
          expect(ex.items.length, ex.id).toBeGreaterThanOrEqual(2);
        }
      }
    }
  });

  it("keeps exercise ids unique across the game", () => {
    const ids = game!.levels.flatMap((level) =>
      level.rounds
        .filter((round) => round.kind === "exercise")
        .map((round) => (round.kind === "exercise" ? round.exercise.id : "")),
    );
    expect(ids.length).toBeGreaterThan(0);
    expect(new Set(ids).size).toBe(ids.length);
  });
});