import { describe, expect, it } from "vitest";
import {
  EXERCISE_COMPLETED_THRESHOLD,
  isExerciseCompleted,
  percentCorrect,
  starsForScore,
} from "./scoring";

describe("percentCorrect", () => {
  it("computes a percentage", () => {
    expect(percentCorrect(3, 4)).toBe(75);
  });

  it("is zero for a total of zero", () => {
    expect(percentCorrect(0, 0)).toBe(0);
  });

  it("is never above 100", () => {
    expect(percentCorrect(5, 4)).toBe(100);
  });
});

describe("starsForScore", () => {
  it("awards three stars at 95 percent", () => {
    expect(starsForScore(95)).toBe(3);
    expect(starsForScore(100)).toBe(3);
  });

  it("awards two stars from 80 percent", () => {
    expect(starsForScore(80)).toBe(2);
    expect(starsForScore(94)).toBe(2);
  });

  it("awards one star from 60 percent", () => {
    expect(starsForScore(60)).toBe(1);
    expect(starsForScore(79)).toBe(1);
  });

  it("awards no stars below 60 percent", () => {
    expect(starsForScore(0)).toBe(0);
    expect(starsForScore(59)).toBe(0);
  });
});

describe("isExerciseCompleted", () => {
  it("uses the 60 percent threshold", () => {
    expect(EXERCISE_COMPLETED_THRESHOLD).toBe(60);
    expect(isExerciseCompleted(60)).toBe(true);
    expect(isExerciseCompleted(59)).toBe(false);
  });
});