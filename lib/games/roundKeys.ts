/**
 * Stable progress-store key for an exercise round inside a game.
 * Mirrors the lesson exercise key shape "<lessonKey>:<exerciseId>" so game
 * answers persist and restore through the same ProgressProvider. The key is
 * deterministic across reloads, which keeps saved answers valid: it also
 * seeds option shuffling in ExerciseHost.
 */
export function gameRoundExerciseKey(
  gameId: string,
  levelId: string,
  roundIndex: number,
  exerciseId: string,
): string {
  return `games/${gameId}/${levelId}:${roundIndex}:${exerciseId}`;
}