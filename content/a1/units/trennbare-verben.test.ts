import { describe, expect, it } from "vitest";
import { levels } from "../../index";
import { trennbareVerbenTief } from "./trennbare-verben";

describe("trennbare-untrennbare-verben lesson integrity", () => {
  it("is registered as a ready lesson in the A2 grammar unit", () => {
    const a1 = levels.find((level) => level.id === "a1");
    const unit = a1?.units.find((candidate) => candidate.id === "grammatik-kompakt-2");
    const lesson = unit?.lessons.find(
      (candidate) => candidate.id === "trennbare-untrennbare-verben-erklaert",
    );
    expect(lesson?.status).toBe("ready");
    expect(lesson?.title).toBe("Trennbare und untrennbare Verben erklärt");
  });

  it("covers separable and inseparable verbs in their own sections", () => {
    const headings = trennbareVerbenTief.sections.map((section) => section.heading).join(" ");
    for (const topic of ["trennbare Verben", "trennbaren Präfixe", "Perfekt", "Modalverben", "Imperativ", "untrennbaren Verben", "beiden Formen"]) {
      expect(headings, topic).toContain(topic);
    }
  });

  it("joins every word-order exercise to a complete sentence", () => {
    const wordOrderExercises = trennbareVerbenTief.exercises.filter(
      (exercise) => exercise.type === "word-order",
    );
    expect(wordOrderExercises.length).toBeGreaterThanOrEqual(6);
    for (const exercise of wordOrderExercises) {
      if (exercise.type !== "word-order") continue;
      expect(exercise.chunks.join(" "), exercise.id).toMatch(/[.?!]$/);
      expect(exercise.translation?.trim().length, exercise.id).toBeGreaterThan(0);
      expect(exercise.explain?.trim().length, exercise.id).toBeGreaterThan(0);
      expect(exercise.instruction, exercise.id).toContain(exercise.translation!);
    }
  });

  it("covers more than sentence building with other exercise types", () => {
    const types = new Set(trennbareVerbenTief.exercises.map((exercise) => exercise.type));
    for (const expected of ["multiple-choice", "word-order", "fill-blank", "matching", "listening", "flashcard"]) {
      expect(types.has(expected as never), expected).toBe(true);
    }
  });
});