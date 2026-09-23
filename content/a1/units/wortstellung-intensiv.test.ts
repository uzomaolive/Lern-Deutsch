import { describe, expect, it } from "vitest";
import { levels } from "../../index";
import { wortstellungIntensiv } from "./wortstellung-intensiv";

describe("wortstellung-intensiv lesson integrity", () => {
  it("is registered as a ready lesson in the A2 grammar unit", () => {
    const a1 = levels.find((level) => level.id === "a1");
    const unit = a1?.units.find((candidate) => candidate.id === "grammatik-kompakt-2");
    const lesson = unit?.lessons.find((candidate) => candidate.id === "wortstellung-intensiv");
    expect(lesson?.status).toBe("ready");
    expect(lesson?.title).toBe("Wortstellung intensiv: alle Verbpositionen im Überblick");
  });

  it("covers every advanced word order topic in its own section", () => {
    const headings = wortstellungIntensiv.sections.map((section) => section.heading).join(" ");
    for (const topic of ["Positionen des Verbs", "Satzrahmen", "Reihenfolge der Objekte", "nicht", "Nebensätze", "Relativsätze", "Imperativ"]) {
      expect(headings, topic).toContain(topic);
    }
  });

  it("joins every word-order exercise to the sentence its instruction describes", () => {
    const wordOrderExercises = wortstellungIntensiv.exercises.filter(
      (exercise) => exercise.type === "word-order",
    );
    expect(wordOrderExercises.length).toBeGreaterThanOrEqual(8);
    for (const exercise of wordOrderExercises) {
      if (exercise.type !== "word-order") continue;
      expect(exercise.chunks.join(" "), exercise.id).toMatch(/[.?!]$/);
      expect(exercise.translation?.trim().length, exercise.id).toBeGreaterThan(0);
      expect(exercise.explain?.trim().length, exercise.id).toBeGreaterThan(0);
      expect(exercise.instruction, exercise.id).toContain(exercise.translation!);
    }
  });

  it("covers more than sentence building with other exercise types", () => {
    const types = new Set(wortstellungIntensiv.exercises.map((exercise) => exercise.type));
    for (const expected of ["multiple-choice", "word-order", "fill-blank", "matching", "listening", "flashcard"]) {
      expect(types.has(expected as never), expected).toBe(true);
    }
  });
});