import { describe, expect, it } from "vitest";
import { levels } from "../../index";
import { wortstellungTief } from "./wortstellung";

function lessonSectionHeadings(): string[] {
  return wortstellungTief.sections.map((section) => section.heading);
}

describe("wortstellung-erklaert lesson integrity", () => {
  it("is registered as a ready lesson in the A1 grammar unit", () => {
    const a1 = levels.find((level) => level.id === "a1");
    const unit = a1?.units.find((candidate) => candidate.id === "grammatik-kompakt-1");
    const lesson = unit?.lessons.find((candidate) => candidate.id === "wortstellung-erklaert");
    expect(lesson?.status).toBe("ready");
    expect(lesson?.title).toBe("Wortstellung erklärt: German word order");
  });

  it("explains every word-order type in its own section", () => {
    const headings = lessonSectionHeadings().join(" ");
    const expected = [
      "Grundmuster", // the four basic patterns
      "Position 2", // the conjugated verb and the second element
      "Standardwortstellung",
      "Inversion",
      "Transposition",
      "Subordination", // subordinate clauses, verb last
      "Relativsätze",
      "Te-ka-mo-lo", // time-manner-place
      "Satzrahmen", // sentence frame
      "Negation",
    ];
    for (const topic of expected) {
      expect(headings, topic).toContain(topic);
    }
  });

  it("joins every word-order exercise to the sentence its instruction describes", () => {
    const wordOrderExercises = wortstellungTief.exercises.filter(
      (exercise) => exercise.type === "word-order",
    );
    expect(wordOrderExercises.length).toBeGreaterThanOrEqual(10);
    for (const exercise of wordOrderExercises) {
      if (exercise.type !== "word-order") continue;
      const sentence = exercise.chunks.join(" ");
      expect(sentence, exercise.id).toMatch(/[.?!]$/);
      expect(exercise.translation?.trim().length, exercise.id).toBeGreaterThan(0);
      expect(exercise.explain?.trim().length, exercise.id).toBeGreaterThan(0);
      expect(exercise.instruction, exercise.id).toContain(exercise.translation!);
    }
  });

  it("covers the lesson types with exercises beyond sentence building", () => {
    const types = new Set(wortstellungTief.exercises.map((exercise) => exercise.type));
    for (const expected of ["multiple-choice", "word-order", "fill-blank", "matching", "flashcard"]) {
      expect(types.has(expected as never), expected).toBe(true);
    }
  });
});