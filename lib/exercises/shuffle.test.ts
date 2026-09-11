import { describe, expect, it } from "vitest";
import {
  createRandom,
  hashSeed,
  shuffleOptions,
  shuffleWithSeed,
} from "./shuffle";

describe("hashSeed", () => {
  it("is stable for the same key", () => {
    expect(hashSeed("a1/u/l:ex")).toBe(hashSeed("a1/u/l:ex"));
  });

  it("differs for different keys", () => {
    expect(hashSeed("a1/u/l:ex1")).not.toBe(hashSeed("a1/u/l:ex2"));
  });
});

describe("createRandom", () => {
  it("produces values in [0, 1) and is reproducible", () => {
    const a = createRandom(42);
    const b = createRandom(42);
    const values = Array.from({ length: 10 }, () => a());
    expect(values.every((value) => value >= 0 && value < 1)).toBe(true);
    expect(values).toEqual(Array.from({ length: 10 }, () => b()));
  });
});

describe("shuffleWithSeed", () => {
  it("keeps all items and never returns identity order for 2+ items", () => {
    const items = ["a", "b", "c", "d"];
    const result = shuffleWithSeed(items, "seed-1");
    expect(result.items).toHaveLength(items.length);
    expect([...result.items].sort()).toEqual([...items].sort());
    expect(result.order).not.toEqual([0, 1, 2, 3]);
  });

  it("is deterministic for the same seed", () => {
    const a = shuffleWithSeed(["a", "b", "c", "d", "e"], "k:1");
    const b = shuffleWithSeed(["a", "b", "c", "d", "e"], "k:1");
    expect(a.items).toEqual(b.items);
    expect(a.order).toEqual(b.order);
  });

  it("varies the order across different seeds", () => {
    const orders = new Set(
      Array.from({ length: 20 }, (_, i) =>
        shuffleWithSeed(["a", "b", "c", "d", "e"], `k:${i}`).order.join(","),
      ),
    );
    expect(orders.size).toBeGreaterThan(1);
  });
});

describe("shuffleOptions", () => {
  it("tracks the correct option through the shuffle", () => {
    const options = ["a", "b", "c", "d"];
    const { options: shuffled, correctIndex } = shuffleOptions(options, 2, "k:1");
    expect(shuffled[correctIndex]).toBe("c");
  });

  it("does not always place the correct option first", () => {
    const firstPositions = new Set(
      Array.from({ length: 30 }, (_, i) => {
        const { options: shuffled, correctIndex } = shuffleOptions(
          ["a", "b", "c", "d"],
          0,
          `k:${i}`,
        );
        return shuffled[correctIndex] === "a" && correctIndex === 0 ? "first" : "other";
      }),
    );
    expect(firstPositions).toContain("other");
  });
});