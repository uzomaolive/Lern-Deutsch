import { a1 } from "./a1";
import { a2 } from "./a2";
import { createRepository } from "./repository";
import type { Level } from "./schema";

/**
 * Curriculum registry. Unit data lives in a1/ and a2/; index wires the
 * levels together and exposes the default repository.
 */
export const levels: Level[] = [a1, a2];

export const repository = createRepository(levels);