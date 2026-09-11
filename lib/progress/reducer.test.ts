import { describe, expect, it } from "vitest";
import {
  isLessonCompleted,
  recordExercise,
  recordFlashcard,
} from "./reducer";
import { emptyState, type ProgressState } from "./store";
import { EXERCISE_COMPLETED_THRESHOLD } from "./scoring";
import { todayKey, yesterdayKey } from "./streak";

describe("recordExercise", () => {
  it("records a first result and stamps activity", () => {
    const state = recordExercise(emptyState(), "a1/k:mc1", 80);
    expect(state.exercises["a1/k:mc1"]).toEqual({ best: 80, attempts: 1 });
    expect(state.lastActiveDay).toBe(todayKey());
    expect(state.streak).toBe(1);
  });

  it("keeps the best score and counts attempts", () => {
    let state = recordExercise(emptyState(), "a1/k:mc1", 40);
    state = recordExercise(state, "a1/k:mc1", 90);
    state = recordExercise(state, "a1/k:mc1", 70);
    expect(state.exercises["a1/k:mc1"]).toEqual({ best: 90, attempts: 3 });
  });

  it("stores the last answer payload on the record", () => {
    let state = recordExercise(emptyState(), "a1/k:mc1", 0, {
      type: "pick",
      index: 1,
    });
    expect(state.exercises["a1/k:mc1"]).toEqual({
      best: 0,
      attempts: 1,
      answer: { type: "pick", index: 1 },
    });
    state = recordExercise(state, "a1/k:mc1", 100, { type: "pick", index: 2 });
    expect(state.exercises["a1/k:mc1"].answer).toEqual({ type: "pick", index: 2 });
  });

  it("extends the streak on consecutive days", () => {
    let state: ProgressState = {
      ...emptyState(),
      lastActiveDay: yesterdayKey(new Date()),
      streak: 2,
    };
    state = recordExercise(state, "a1/k:mc1", 100);
    expect(state.streak).toBe(3);
  });
});

describe("recordFlashcard", () => {
  it("marks an item known after three correct responses", () => {
    const key = "a1/k:fc1:0";
    let state = recordFlashcard(emptyState(), key, true);
    expect(state.vocab[key]).toEqual({ correct: 1, known: false });
    state = recordFlashcard(state, key, true);
    state = recordFlashcard(state, key, true);
    expect(state.vocab[key]).toEqual({ correct: 3, known: true });
  });

  it("tracks wrong answers without advancing mastery", () => {
    const key = "a1/k:fc1:0";
    let state = recordFlashcard(emptyState(), key, false);
    state = recordFlashcard(state, key, true);
    expect(state.vocab[key]).toEqual({ correct: 1, known: false });
  });

  it("records seen cards without duplicates", () => {
    const key = "a1/k:fc1:1";
    let state = recordFlashcard(emptyState(), key, true);
    state = recordFlashcard(state, key, true);
    expect(state.seenFlashcards).toEqual([key]);
  });
});

describe("isLessonCompleted", () => {
  it("is false with no exercises", () => {
    expect(isLessonCompleted(emptyState(), [])).toBe(false);
  });

  it("requires every exercise to reach the completion threshold", () => {
    let state = recordExercise(emptyState(), "a1/k:mc1", EXERCISE_COMPLETED_THRESHOLD);
    expect(isLessonCompleted(state, ["a1/k:mc1"])).toBe(true);
    state = recordExercise(state, "a1/k:mc2", 10);
    expect(isLessonCompleted(state, ["a1/k:mc1", "a1/k:mc2"])).toBe(false);
  });
});