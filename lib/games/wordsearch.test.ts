import { describe, expect, it } from "vitest";
import { buildWordSearchGrid } from "./wordsearch";

describe("buildWordSearchGrid", () => {
  const words = ["haus", "maus", "baum", "brief", "straße"];
  const result = buildWordSearchGrid(words, 10, "test-seed");

  it("places all words", () => {
    expect(result.omitted).toEqual([]);
    expect(result.placements.map((p) => p.word).sort()).toEqual([...words].sort());
  });

  it("places each word letter-by-letter on the grid", () => {
    for (const p of result.placements) {
      for (let i = 0; i < p.word.length; i++) {
        const r = p.dir === "h" ? p.row : p.row + i;
        const c = p.dir === "h" ? p.col + i : p.col;
        expect(result.grid[r][c]).toBe(p.word[i]);
      }
    }
  });

  it("is deterministic for the same seed", () => {
    const a = buildWordSearchGrid(words, 10, "same");
    const b = buildWordSearchGrid(words, 10, "same");
    expect(a.grid).toEqual(b.grid);
    expect(a.placements).toEqual(b.placements);
  });

  it("produces a fully filled grid", () => {
    for (const row of result.grid) {
      expect(row.every((cell) => cell !== "")).toBe(true);
    }
  });

  it("fits words into small grids", () => {
    const small = buildWordSearchGrid(["haus", "kuh"], 5, "x");
    expect(small.omitted).toEqual([]);
  });
});