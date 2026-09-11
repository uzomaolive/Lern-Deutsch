import { describe, expect, it, beforeEach } from "vitest";
import { LocalStorageProgress, ProgressState, emptyState } from "./store";

const SAMPLE_EXERCISE_KEY = "a1/kennenlernen/hallo-und-guten-tag:mc-gruessen";

const SAMPLE: ProgressState = {
  exercises: {
    [SAMPLE_EXERCISE_KEY]: {
      best: 100,
      attempts: 2,
      answer: { type: "pick", index: 0 },
    },
  },
  vocab: {
    "a1/kennenlernen/hallo-und-guten-tag:flashcard-gruesse:0": {
      correct: 3,
      known: true,
    },
  },
  lastActiveDay: "2026-09-09",
  streak: 2,
  seenFlashcards: ["a1/kennenlernen/hallo-und-guten-tag:flashcard-gruesse:0"],
};

describe("LocalStorageProgress", () => {
  beforeEach(() => localStorage.clear());

  it("returns the empty state when nothing is stored", () => {
    const store = new LocalStorageProgress();
    expect(store.load()).toEqual(emptyState());
  });

  it("round-trips saved state", () => {
    const store = new LocalStorageProgress();
    store.save(SAMPLE);
    expect(store.load()).toEqual(SAMPLE);
  });

  it("falls back to empty state on corrupt JSON", () => {
    localStorage.setItem("lern-deutsch:progress:v1", "{not json");
    const store = new LocalStorageProgress();
    expect(store.load()).toEqual(emptyState());
  });

  it("drops unknown top-level fields but keeps well-formed entries", () => {
    localStorage.setItem(
      "lern-deutsch:progress:v1",
      JSON.stringify({
        ...SAMPLE,
        hacker: true,
        exercises: {
          ...SAMPLE.exercises,
          "bogus:key": { best: 100, attempts: 1 },
        },
      }),
    );
    const store = new LocalStorageProgress();
    const state = store.load();
    expect((state as ProgressState & { hacker?: boolean }).hacker).toBeUndefined();
    expect(state.exercises["bogus:key"]).toEqual({ best: 100, attempts: 1 });
    expect(state.exercises[SAMPLE_EXERCISE_KEY]).toEqual(
      SAMPLE.exercises[SAMPLE_EXERCISE_KEY],
    );
  });

  it("coerces malformed entries to defaults", () => {
    localStorage.setItem(
      "lern-deutsch:progress:v1",
      JSON.stringify({
        exercises: { "k:1": { best: "huge", attempts: null } },
        vocab: { "v:1": { correct: -5, known: "yes" } },
      }),
    );
    const store = new LocalStorageProgress();
    const state = store.load();
    expect(state.exercises["k:1"]).toEqual({ best: 0, attempts: 0 });
    expect(state.vocab["v:1"]).toEqual({ correct: 0, known: false });
  });
});