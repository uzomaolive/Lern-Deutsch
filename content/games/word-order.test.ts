import { describe, expect, it } from "vitest";
import { games } from "./index";

const game = games.find((candidate) => candidate.id === "satzbau");

describe("satzbau game integrity", () => {
  it("is registered in the games catalog", () => {
    expect(game).toBeDefined();
    expect(game!.title).toBe("Word Order (Satzbau)");
    expect(game!.category).toBe("grammar");
  });

  it("has four levels, one per word-order type", () => {
    expect(game!.levels.map((level) => level.title)).toEqual([
      "Level 1: Verb second (Aussagesatz)",
      "Level 2: Questions (Fragen)",
      "Level 3: Sentence frame (Satzklammer)",
      "Level 4: Time, manner, place and Nebensätze",
    ]);
    for (const level of game!.levels) {
      expect(level.rounds.length, level.id).toBeGreaterThanOrEqual(10);
    }
  });

  it("builds every round from word-order exercises that join to a sentence", () => {
    for (const level of game!.levels) {
      for (const round of level.rounds) {
        expect(round.kind, level.id).toBe("exercise");
        if (round.kind !== "exercise") continue;
        const ex = round.exercise;
        expect(ex.type).toBe("word-order");
        if (ex.type !== "word-order") continue;
        const sentence = ex.chunks.join(" ");
        expect(sentence, ex.id).toMatch(/[.?!]$/);
        expect(ex.translation?.trim().length, ex.id).toBeGreaterThan(0);
        expect(ex.explain?.trim().length, ex.id).toBeGreaterThan(0);
        expect(ex.instruction, ex.id).toContain(ex.translation!);
      }
    }
  });

  it("keeps exercise ids unique across the game", () => {
    const ids = game!.levels.flatMap((level) =>
      level.rounds.map((round) => (round.kind === "exercise" ? round.exercise.id : "")),
    );
    expect(new Set(ids).size).toBe(ids.length);
  });
});