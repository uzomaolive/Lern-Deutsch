import { describe, expect, it } from "vitest";
import { createRepository } from "./repository";
import type { Level, Lesson, Unit } from "./schema";

const unit = (id: string, lessons: Lesson[]): Unit => ({ id, title: id, theme: id, lessons });

const lesson = (
  id: string,
  status: "ready" | "planned",
  exercises: Lesson["exercises"] = [],
): Lesson => ({
  id,
  title: id,
  summary: "s",
  status,
  sections: [],
  vocab: [],
  exercises,
});

const levels: Level[] = [
  {
    id: "a1",
    title: "A1",
    subtitle: "Beginner",
    description: "d",
    units: [
      unit("u1", [lesson("l1", "ready"), lesson("l2", "planned"), lesson("l3", "ready")]),
      unit("u2", [lesson("l4", "ready")]),
    ],
  },
  {
    id: "a2",
    title: "A2",
    subtitle: "Elementary",
    description: "d",
    units: [unit("u1", [lesson("l5", "ready")])],
  },
];

const repo = createRepository(levels);

describe("createRepository lookups", () => {
  it("returns a level by id", () => {
    expect(repo.getLevel("a1")?.title).toBe("A1");
  });

  it("returns undefined for an unknown level", () => {
    expect(repo.getLevel("b2" as never)).toBeUndefined();
  });

  it("returns a unit within a level", () => {
    expect(repo.getUnit("a1", "u2")?.id).toBe("u2");
  });

  it("returns undefined for an unknown unit", () => {
    expect(repo.getUnit("a1", "nope")).toBeUndefined();
  });

  it("returns a lesson within its unit", () => {
    expect(repo.getLesson("a1", "u1", "l1")?.id).toBe("l1");
  });

  it("returns undefined for an unknown lesson", () => {
    expect(repo.getLesson("a1", "u1", "nope")).toBeUndefined();
  });
});

describe("keys", () => {
  it("builds lesson keys as level/unit/lesson", () => {
    expect(repo.lessonKey("a1", "u1", "l1")).toBe("a1/u1/l1");
  });

  it("builds exercise keys from the lesson key", () => {
    expect(repo.exerciseKey("a1", "u1", "l1", "e1")).toBe("a1/u1/l1:e1");
  });
});

describe("allLessons", () => {
  it("flattens lessons in course order across levels and units", () => {
    expect(repo.allLessons().map((l) => l.lesson.id)).toEqual([
      "l1",
      "l2",
      "l3",
      "l4",
      "l5",
    ]);
  });
});

describe("readyLessons", () => {
  it("excludes planned lessons", () => {
    expect(repo.readyLessons().map((l) => l.lesson.id)).toEqual([
      "l1",
      "l3",
      "l4",
      "l5",
    ]);
  });
});

describe("nextUp", () => {
  it("returns the first lesson when nothing is completed", () => {
    expect(repo.nextUp(new Set())?.lesson.id).toBe("l1");
  });

  it("skips completed lessons", () => {
    expect(repo.nextUp(new Set(["a1/u1/l1", "a1/u1/l3"]))?.lesson.id).toBe("l4");
  });

  it("skips planned lessons even when incomplete", () => {
    expect(repo.nextUp(new Set(["a1/u1/l1", "a1/u2/l4"]))?.lesson.id).toBe("l3");
  });

  it("returns null when every ready lesson is completed", () => {
    expect(
      repo.nextUp(
        new Set(["a1/u1/l1", "a1/u1/l3", "a1/u2/l4", "a2/u1/l5"]),
      ),
    ).toBeNull();
  });
});