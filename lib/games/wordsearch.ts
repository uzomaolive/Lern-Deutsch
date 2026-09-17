/**
 * Deterministic word-search grid generation for the Buchstabensalat game.
 * Words are placed left-to-right and top-to-bottom without overlapping
 * letters; leftover cells are filled with weighted German letters.
 */

export interface WordPlacement {
  word: string;
  row: number;
  col: number;
  dir: "h" | "v";
}

export interface WordSearchGrid {
  size: number;
  grid: string[][];
  placements: WordPlacement[];
  /** Words that could not be placed (caller should usually pick another set). */
  omitted: string[];
}

/** Mulberry32 seeded PRNG. */
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function hashSeed(text: string): number {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

const LETTER_POOL = "aaabbbccdddeeeeefggghhiijklmmnnnooooprrsssstttuuuvwxyzäöü".split("");

export function buildWordSearchGrid(
  words: string[],
  size: number,
  seed: string,
): WordSearchGrid {
  const rand = mulberry32(hashSeed(seed));
  const grid: string[][] = Array.from({ length: size }, () => Array(size).fill(""));
  const placements: WordPlacement[] = [];
  const omitted: string[] = [];

  const sorted = [...words].sort((a, b) => b.length - a.length);

  for (const raw of sorted) {
    const word = raw.toLowerCase();
    let placed = false;
    for (let attempt = 0; attempt < 60 && !placed; attempt++) {
      const dir: "h" | "v" = rand() < 0.5 ? "h" : "v";
      const maxRow = dir === "h" ? size - 1 : size - word.length;
      const maxCol = dir === "v" ? size - 1 : size - word.length;
      if (maxRow < 0 || maxCol < 0) continue;
      const row = Math.floor(rand() * (maxRow + 1));
      const col = Math.floor(rand() * (maxCol + 1));
      let fits = true;
      for (let i = 0; i < word.length; i++) {
        const r = dir === "h" ? row : row + i;
        const c = dir === "h" ? col + i : col;
        const existing = grid[r][c];
        if (existing !== "" && existing !== word[i]) {
          fits = false;
          break;
        }
      }
      if (!fits) continue;
      for (let i = 0; i < word.length; i++) {
        const r = dir === "h" ? row : row + i;
        const c = dir === "h" ? col + i : col;
        grid[r][c] = word[i];
      }
      placements.push({ word, row, col, dir });
      placed = true;
    }
    if (!placed) omitted.push(word);
  }

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (grid[r][c] === "") {
        grid[r][c] = LETTER_POOL[Math.floor(rand() * LETTER_POOL.length)];
      }
    }
  }

  return { size, grid, placements, omitted };
}