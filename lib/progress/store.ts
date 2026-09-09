/**
 * Typed progress state persisted to localStorage behind a small interface.
 * Swapping to accounts and cloud sync later means replacing
 * LocalStorageProgress and the provider wiring, not components.
 */

export interface ExerciseRecord {
  best: number;
  attempts: number;
}

export interface VocabRecord {
  correct: number;
  known: boolean;
}

export interface ProgressState {
  /** Keyed by exercise key: "<lessonKey>:<exerciseId>". */
  exercises: Record<string, ExerciseRecord>;
  /** Keyed by flashcard item key: "<exerciseKey>:<itemIndex>". */
  vocab: Record<string, VocabRecord>;
  /** YYYY-MM-DD in local time. */
  lastActiveDay: string | null;
  streak: number;
  seenFlashcards: string[];
}

export function emptyState(): ProgressState {
  return {
    exercises: {},
    vocab: {},
    lastActiveDay: null,
    streak: 0,
    seenFlashcards: [],
  };
}

export const STORAGE_KEY = "lern-deutsch:progress:v1";

function toRecord(value: unknown, fallback: () => Record<string, unknown>): Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : fallback();
}

function parseExercise(value: unknown): ExerciseRecord {
  const record = toRecord(value, () => ({}));
  const best = Number(record.best);
  const attempts = Number(record.attempts);
  return {
    best: Number.isFinite(best) && best >= 0 ? best : 0,
    attempts: Number.isFinite(attempts) && attempts >= 0 ? attempts : 0,
  };
}

function parseVocab(value: unknown): VocabRecord {
  const record = toRecord(value, () => ({}));
  const correct = Number(record.correct);
  return {
    correct: Number.isFinite(correct) && correct >= 0 ? correct : 0,
    known: record.known === true,
  };
}

export interface ProgressStore {
  load(): ProgressState;
  save(state: ProgressState): void;
}

export class LocalStorageProgress implements ProgressStore {
  load(): ProgressState {
    if (typeof window === "undefined") return emptyState();
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyState();

    let parsed: unknown;
    try {
      parsed = JSON.parse(raw);
    } catch {
      return emptyState();
    }

    const root = toRecord(parsed, () => ({}));
    const exercisesRaw = toRecord(root.exercises, () => ({}));
    const vocabRaw = toRecord(root.vocab, () => ({}));
    const seen = Array.isArray(root.seenFlashcards)
      ? root.seenFlashcards.filter((key): key is string => typeof key === "string")
      : [];

    return {
      exercises: Object.fromEntries(
        Object.entries(exercisesRaw).map(([key, value]) => [
          key,
          parseExercise(value),
        ]),
      ),
      vocab: Object.fromEntries(
        Object.entries(vocabRaw).map(([key, value]) => [key, parseVocab(value)]),
      ),
      lastActiveDay:
        typeof root.lastActiveDay === "string" ? root.lastActiveDay : null,
      streak:
        typeof root.streak === "number" && Number.isFinite(root.streak)
          ? Math.max(0, root.streak)
          : 0,
      seenFlashcards: seen,
    };
  }

  save(state: ProgressState): void {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }
}