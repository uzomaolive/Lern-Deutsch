import type {
  ExerciseKey,
  Lesson,
  LessonKey,
  Level,
  LevelId,
  Unit,
} from "./schema";

export interface FlatLesson {
  level: Level;
  unit: Unit;
  lesson: Lesson;
  key: LessonKey;
}

export interface Repository {
  getLevel(id: LevelId): Level | undefined;
  getUnit(levelId: LevelId, unitId: string): Unit | undefined;
  getLesson(
    levelId: LevelId,
    unitId: string,
    lessonId: string,
  ): Lesson | undefined;
  lessonKey(levelId: LevelId, unitId: string, lessonId: string): LessonKey;
  exerciseKey(
    levelId: LevelId,
    unitId: string,
    lessonId: string,
    exerciseId: string,
  ): ExerciseKey;
  allLessons(): FlatLesson[];
  readyLessons(): FlatLesson[];
  nextUp(completed: ReadonlySet<LessonKey>): FlatLesson | null;
}

export function createRepository(levels: Level[]): Repository {
  const levelById = new Map(levels.map((level) => [level.id, level]));

  function findUnit(level: Level, unitId: string): Unit | undefined {
    return level.units.find((unit) => unit.id === unitId);
  }

  function findLesson(unit: Unit, lessonId: string): Lesson | undefined {
    return unit.lessons.find((lesson) => lesson.id === lessonId);
  }

  function lessonKey(levelId: LevelId, unitId: string, lessonId: string) {
    return `${levelId}/${unitId}/${lessonId}`;
  }

  function flat(): FlatLesson[] {
    const result: FlatLesson[] = [];
    for (const level of levels) {
      for (const unit of level.units) {
        for (const lesson of unit.lessons) {
          result.push({
            level,
            unit,
            lesson,
            key: lessonKey(level.id, unit.id, lesson.id),
          });
        }
      }
    }
    return result;
  }

  return {
    getLevel(id) {
      return levelById.get(id);
    },
    getUnit(levelId, unitId) {
      const level = levelById.get(levelId);
      return level ? findUnit(level, unitId) : undefined;
    },
    getLesson(levelId, unitId, lessonId) {
      const unit = this.getUnit(levelId, unitId);
      return unit ? findLesson(unit, lessonId) : undefined;
    },
    lessonKey,
    exerciseKey(levelId, unitId, lessonId, exerciseId) {
      return `${lessonKey(levelId, unitId, lessonId)}:${exerciseId}`;
    },
    allLessons() {
      return flat();
    },
    readyLessons() {
      return flat().filter(({ lesson }) => lesson.status === "ready");
    },
    nextUp(completed) {
      return (
        flat().find(
          ({ lesson, key }) => lesson.status === "ready" && !completed.has(key),
        ) ?? null
      );
    },
  };
}