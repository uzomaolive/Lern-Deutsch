/**
 * Exercise scoring rules. Pure functions; components and tests share them.
 */

export const EXERCISE_COMPLETED_THRESHOLD = 60;

export function percentCorrect(correct: number, total: number): number {
  if (total <= 0) return 0;
  return Math.min(100, Math.round((correct / total) * 100));
}

export function starsForScore(percent: number): 0 | 1 | 2 | 3 {
  if (percent >= 95) return 3;
  if (percent >= 80) return 2;
  if (percent >= 60) return 1;
  return 0;
}

export function isExerciseCompleted(percent: number): boolean {
  return percent >= EXERCISE_COMPLETED_THRESHOLD;
}