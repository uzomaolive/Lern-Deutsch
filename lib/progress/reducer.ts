import type { ProgressState } from "./store";
import { nextStreak, todayKey } from "./streak";
import { EXERCISE_COMPLETED_THRESHOLD } from "./scoring";

function stampActivity(state: ProgressState): ProgressState {
  const today = todayKey();
  return {
    ...state,
    lastActiveDay: today,
    streak: nextStreak(state.lastActiveDay, today, state.streak),
  };
}

export function recordExercise(
  state: ProgressState,
  exerciseKey: string,
  percent: number,
): ProgressState {
  const previous = state.exercises[exerciseKey];
  return stampActivity({
    ...state,
    exercises: {
      ...state.exercises,
      [exerciseKey]: {
        best: Math.max(previous?.best ?? 0, percent),
        attempts: (previous?.attempts ?? 0) + 1,
      },
    },
  });
}

export function recordFlashcard(
  state: ProgressState,
  itemKey: string,
  correct: boolean,
): ProgressState {
  const previous = state.vocab[itemKey];
  const totalCorrect = (previous?.correct ?? 0) + (correct ? 1 : 0);
  const seen = state.seenFlashcards.includes(itemKey)
    ? state.seenFlashcards
    : [...state.seenFlashcards, itemKey];
  return stampActivity({
    ...state,
    vocab: {
      ...state.vocab,
      [itemKey]: {
        correct: totalCorrect,
        known: (previous?.known ?? false) || totalCorrect >= 3,
      },
    },
    seenFlashcards: seen,
  });
}

/** A lesson is complete when every one of its exercises reached the threshold. */
export function isLessonCompleted(
  state: ProgressState,
  exerciseKeys: readonly string[],
): boolean {
  return (
    exerciseKeys.length > 0 &&
    exerciseKeys.every(
      (key) => (state.exercises[key]?.best ?? 0) >= EXERCISE_COMPLETED_THRESHOLD,
    )
  );
}