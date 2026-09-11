/**
 * Deterministic shuffling for exercises. The seed is the exercise key, so
 * option order is stable across reloads (saved answers stay valid) but
 * varies from exercise to exercise (the correct option is not always first,
 * matching Goethe exam layout).
 */

/** 32-bit string hash (FNV-1a), stable across platforms. */
export function hashSeed(key: string): number {
  let hash = 2166136261;
  for (let i = 0; i < key.length; i++) {
    hash ^= key.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

/** Small deterministic PRNG (mulberry32) from a 32-bit seed. */
export function createRandom(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export interface Shuffled<T> {
  items: T[];
  /** Mapping from new index to original index. */
  order: number[];
}

/** Fisher-Yates with the seeded PRNG; never returns the identity order. */
export function shuffleWithSeed<T>(items: readonly T[], seed: string): Shuffled<T> {
  const random = createRandom(hashSeed(seed));
  const order = items.map((_, index) => index);
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  const identity = order.every((value, index) => value === index);
  if (identity && order.length > 1) {
    const first = order.shift() as number;
    order.push(first);
  }
  return {
    items: order.map((index) => items[index]),
    order,
  };
}

export interface ShuffledOptions {
  options: string[];
  /** Index of the correct option in the shuffled `options` array. */
  correctIndex: number;
}

export function shuffleOptions(
  options: readonly string[],
  correctIndex: number,
  seed: string,
): ShuffledOptions {
  const { items, order } = shuffleWithSeed(options, seed);
  return { options: items, correctIndex: order.indexOf(correctIndex) };
}