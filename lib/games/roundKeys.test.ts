import { describe, expect, it } from "vitest";
import { gameRoundExerciseKey } from "./roundKeys";

describe("gameRoundExerciseKey", () => {
  it("mirrors the lesson exercise key shape", () => {
    expect(
      gameRoundExerciseKey("article-challenge", "level-1", 0, "article-1"),
    ).toBe("games/article-challenge/level-1:0:article-1");
  });

  it("is unique across rounds, levels and games", () => {
    const keys = new Set([
      gameRoundExerciseKey("article-challenge", "level-1", 0, "a"),
      gameRoundExerciseKey("article-challenge", "level-1", 1, "a"),
      gameRoundExerciseKey("article-challenge", "level-2", 0, "a"),
      gameRoundExerciseKey("noun-plurals", "level-1", 0, "a"),
    ]);
    expect(keys.size).toBe(4);
  });
});