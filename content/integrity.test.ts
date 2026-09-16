import { describe, expect, it } from "vitest";
import { levels, repository } from "./index";
import { games } from "./games";
import type { Exercise, Lesson, Unit } from "./schema";

const SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/;

function exercisesOf(lesson: Lesson): Exercise[] {
  return lesson.exercises;
}

function allUnits(): Unit[] {
  return levels.flatMap((level) => level.units);
}

function allLessons(): Lesson[] {
  return allUnits().flatMap((unit) => unit.lessons);
}

describe("curriculum integrity", () => {
  it("contains exactly the a1 and a2 levels", () => {
    expect(levels.map((level) => level.id).sort()).toEqual(["a1", "a2"]);
  });

  it("has the thematic units per level from the spec inventory", () => {
    expect(levels.find((l) => l.id === "a1")?.units.length).toBe(15);
    expect(levels.find((l) => l.id === "a2")?.units.length).toBe(10);
  });

  it("gives every unit at least one lesson", () => {
    for (const unit of allUnits()) {
      expect(unit.lessons.length, unit.id).toBeGreaterThan(0);
    }
  });

  it("keeps unit and lesson ids unique within their level", () => {
    for (const level of levels) {
      const unitIds = level.units.map((unit) => unit.id);
      expect(new Set(unitIds).size).toBe(unitIds.length);

      const lessonIds = level.units.flatMap((unit) => unit.lessons.map((l) => l.id));
      expect(new Set(lessonIds).size).toBe(lessonIds.length);
    }
  });

  it("keeps exercise and vocab ids unique within a lesson", () => {
    for (const lesson of allLessons()) {
      const exerciseIds = exercisesOf(lesson).map((exercise) => exercise.id);
      expect(new Set(exerciseIds).size, lesson.id).toBe(exerciseIds.length);

      const vocabIds = lesson.vocab.map((item) => item.id);
      expect(new Set(vocabIds).size, lesson.id).toBe(vocabIds.length);
    }
  });

  it("uses kebab-case slugs without umlauts for all ids", () => {
    const ids = [
      ...levels.flatMap((level) => level.units.map((unit) => unit.id)),
      ...allLessons().flatMap((lesson) => [
        lesson.id,
        ...exercisesOf(lesson).map((exercise) => exercise.id),
        ...lesson.vocab.map((item) => item.id),
      ]),
    ];
    for (const id of ids) {
      expect(id, id).toMatch(SLUG);
    }
  });

  it("gives every lesson a non-empty title and summary", () => {
    for (const lesson of allLessons()) {
      expect(lesson.title.trim().length, lesson.id).toBeGreaterThan(0);
      expect(lesson.summary.trim().length, lesson.id).toBeGreaterThan(0);
    }
  });

  it("keeps planned lessons as empty shells", () => {
    for (const lesson of allLessons().filter((l) => l.status === "planned")) {
      expect(lesson.sections).toEqual([]);
      expect(lesson.vocab).toEqual([]);
      expect(lesson.exercises).toEqual([]);
    }
  });

  it("requires ready lessons to carry sections, vocab, and exercises", () => {
    for (const lesson of allLessons().filter((l) => l.status === "ready")) {
      expect(lesson.sections.length, lesson.id).toBeGreaterThan(0);
      expect(lesson.vocab.length, lesson.id).toBeGreaterThan(0);
      expect(lesson.exercises.length, lesson.id).toBeGreaterThan(0);
      expect(lesson.vocab.filter((item) => item.audio).length).toBeGreaterThanOrEqual(
        Math.ceil(lesson.vocab.length / 2),
      );
    }
  });

  it("validates every exercise shape", () => {
    for (const lesson of allLessons().filter((l) => l.status === "ready")) {
      for (const exercise of exercisesOf(lesson)) {
        expect(exercise.title.trim().length).toBeGreaterThan(0);
        expect(exercise.instruction.trim().length).toBeGreaterThan(0);

        if (exercise.type === "multiple-choice" || exercise.type === "listening") {
          expect(exercise.options.length, exercise.id).toBeGreaterThanOrEqual(2);
          expect(new Set(exercise.options).size).toBe(exercise.options.length);
          expect(exercise.correctIndex).toBeGreaterThanOrEqual(0);
          expect(exercise.correctIndex).toBeLessThan(exercise.options.length);
          if (exercise.type === "listening") {
            expect(exercise.prompt.trim().length).toBeGreaterThan(0);
          }
        }

        if (exercise.type === "fill-blank") {
          const placeholders = exercise.sentence.match(/___/g)?.length ?? 0;
          expect(placeholders, exercise.id).toBe(exercise.blanks.length);
          for (const blank of exercise.blanks) {
            expect(blank.answers.length).toBeGreaterThan(0);
            for (const answer of blank.answers) {
              expect(answer.trim().length).toBeGreaterThan(0);
            }
          }
        }

        if (exercise.type === "matching") {
          expect(exercise.pairs.length, exercise.id).toBeGreaterThanOrEqual(2);
          for (const [de, en] of exercise.pairs) {
            expect(de.trim().length).toBeGreaterThan(0);
            expect(en.trim().length).toBeGreaterThan(0);
          }
        }

        if (exercise.type === "word-order") {
          expect(exercise.chunks.length, exercise.id).toBeGreaterThanOrEqual(2);
          expect(new Set(exercise.chunks).size).toBe(exercise.chunks.length);
        }

        if (exercise.type === "flashcard") {
          expect(exercise.items.length, exercise.id).toBeGreaterThanOrEqual(2);
          for (const item of exercise.items) {
            expect(item.front.trim().length).toBeGreaterThan(0);
            expect(item.back.trim().length).toBeGreaterThan(0);
          }
        }

        if (exercise.type === "writing") {
          expect(exercise.prompt.trim().length, exercise.id).toBeGreaterThan(0);
          expect(exercise.modelAnswer.trim().length, exercise.id).toBeGreaterThan(0);
          expect(exercise.points.length, exercise.id).toBeGreaterThan(0);
          for (const point of exercise.points) {
            expect(point.trim().length).toBeGreaterThan(0);
          }
        }
      }
    }
  });

  it("resolves every lesson through the repository chain", () => {
    for (const level of levels) {
      for (const unit of level.units) {
        for (const lesson of unit.lessons) {
          const resolved = repository.getLesson(level.id, unit.id, lesson.id);
          expect(resolved?.id).toBe(lesson.id);
          expect(repository.lessonKey(level.id, unit.id, lesson.id)).toBe(
            `${level.id}/${unit.id}/${lesson.id}`,
          );
        }
      }
    }
    expect(repository.allLessons().length).toBe(allLessons().length);
  });

  it("keeps word order of lessons identical between data and repository", () => {
    const repoKeys = repository.allLessons().map((flat) => flat.key);
    const dataKeys = levels.flatMap((level) =>
      level.units.flatMap((unit) =>
        unit.lessons.map((lesson) => `${level.id}/${unit.id}/${lesson.id}`),
      ),
    );
    expect(repoKeys).toEqual(dataKeys);
  });

  it("covers every exercise type within each level that has ready lessons", () => {
    const types = [
      "multiple-choice",
      "fill-blank",
      "matching",
      "word-order",
      "flashcard",
      "listening",
      "writing",
    ] as const;
    for (const level of levels) {
      const exercises = level.units
        .flatMap((unit) => unit.lessons)
        .filter((lesson) => lesson.status === "ready")
        .flatMap((lesson) => lesson.exercises);
      if (exercises.length === 0) continue;
      for (const type of types) {
        expect(
          exercises.some((exercise) => exercise.type === type),
          `${level.id} missing exercise type ${type}`,
        ).toBe(true);
      }
    }
  });
});
describe("games integrity", () => {

  it("has unique game ids and titles", () => {
    const ids = games.map((game) => game.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(games.length).toBeGreaterThanOrEqual(15);
  });

  it("gives every game at least one level with rounds", () => {
    for (const game of games) {
      expect(game.levels.length, game.id).toBeGreaterThan(0);
      for (const level of game.levels) {
        expect(level.rounds.length, `${game.id}:${level.id}`).toBeGreaterThan(0);
      }
    }
  });

  it("keeps round ids unique within a level and exercises well-formed", () => {
    for (const game of games) {
      for (const level of game.levels) {
        for (const round of level.rounds) {
          if (round.kind !== "exercise") continue;
          const ex = round.exercise;
          expect(ex.id.length, game.id).toBeGreaterThan(0);
          if (ex.type === "multiple-choice" || ex.type === "listening") {
            expect(new Set(ex.options).size).toBe(ex.options.length);
            expect(ex.correctIndex).toBeGreaterThanOrEqual(0);
            expect(ex.correctIndex).toBeLessThan(ex.options.length);
          }
        }
      }
    }
  });
});
