"use client";

import Link from "next/link";
import { useProgress } from "@/components/progress/ProgressProvider";
import { useMounted } from "@/hooks/useMounted";
import { isLessonCompleted } from "@/lib/progress/reducer";
import { repository } from "@/content";
import type { LevelId } from "@/content/schema";

export interface LessonSummary {
  id: string;
  title: string;
  status: "ready" | "planned";
}

export interface UnitSummary {
  id: string;
  title: string;
  theme: string;
  lessons: LessonSummary[];
}

export interface LevelSummary {
  id: LevelId;
  title: string;
  subtitle: string;
  description: string;
  units: UnitSummary[];
}

interface CourseMapProps {
  levels: LevelSummary[];
}

export function CourseMap({ levels }: CourseMapProps) {
  const { state } = useProgress();
  const mounted = useMounted();

  const completedKeys = new Set<string>();
  if (mounted) {
    for (const level of levels) {
      for (const unit of level.units) {
        for (const lesson of unit.lessons) {
          if (lesson.status !== "ready") continue;
          const keys = lessonExercisesOf(level.id, unit.id, lesson.id);
          if (isLessonCompleted(state, keys)) {
            completedKeys.add(repository.lessonKey(level.id, unit.id, lesson.id));
          }
        }
      }
    }
  }

  const next = repository.nextUp(completedKeys);

  return (
    <div className="space-y-12">
      <section
        aria-label="Continue learning"
        className={`rounded-xl border border-amber-200 bg-amber-50 p-5 ${mounted ? "" : "min-h-[86px]"}`}
      >
        {mounted ? (
          next ? (
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-amber-700">
                  {state.streak > 0
                    ? `${state.streak} day streak`
                    : "Continue learning"}
                </p>
                <p className="mt-1 text-lg font-medium text-amber-950">
                  {next.lesson.title}
                </p>
              </div>
              <Link
                href={`/l/${next.level.id}/${next.unit.id}/${next.lesson.id}`}
                className="rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-stone-950 transition-colors hover:bg-amber-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
              >
                Continue
              </Link>
            </div>
          ) : (
            <p className="text-lg font-medium text-amber-950">
              You finished everything! Kommst du bald wieder?
            </p>
          )
        ) : null}
      </section>

      {levels.map((level) => (
        <section key={level.id} aria-labelledby={`level-${level.id}`}>
          <h2 id={`level-${level.id}`} className="text-2xl font-bold text-stone-900">
            {level.title} <span className="font-normal text-stone-500">· {level.subtitle}</span>
          </h2>
          <p className="mt-1 max-w-2xl text-stone-600">{level.description}</p>

          <div className="mt-6 space-y-6">
            {level.units.map((unit, unitIndex) => {
              const readyLessons = unit.lessons.filter((lesson) => lesson.status === "ready");
              const doneCount = readyLessons.filter((lesson) =>
                completedKeys.has(repository.lessonKey(level.id, unit.id, lesson.id)),
              ).length;
              const percent =
                readyLessons.length > 0
                  ? Math.round((doneCount / readyLessons.length) * 100)
                  : 0;

              return (
                <div
                  key={unit.id}
                  className="rounded-xl border border-stone-200 bg-white p-5"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-lg font-semibold text-stone-900">
                      <span className="mr-2 text-sm font-normal text-stone-500">
                        {level.title} · Unit {unitIndex + 1}
                      </span>
                      {unit.title}
                    </h3>
                    <span className="text-sm text-stone-500">{unit.theme}</span>
                  </div>

                  {readyLessons.length > 0 ? (
                    <div className="mt-3">
                      <div
                        role="progressbar"
                        aria-label={`${unit.title} progress`}
                        aria-valuenow={mounted ? percent : 0}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        className="h-2 w-full overflow-hidden rounded-full bg-stone-200"
                      >
                        <div
                          className="h-full rounded-full bg-amber-500 transition-all"
                          style={{ width: `${mounted ? percent : 0}%` }}
                        />
                      </div>
                      <p className="mt-1 h-5 text-xs text-stone-500">
                        {mounted
                          ? `${doneCount} of ${readyLessons.length} lessons done`
                          : ""}
                      </p>
                    </div>
                  ) : null}

                  <ul className="mt-4 space-y-1.5">
                    {unit.lessons.map((lesson) => {
                      const key = repository.lessonKey(level.id, unit.id, lesson.id);
                      const done = completedKeys.has(key);
                      const started = mounted && !done && lesson.status === "ready" && lessonHasProgress(state, key);
                      if (lesson.status !== "ready") {
                        return (
                          <li
                            key={lesson.id}
                            className="flex items-center gap-2 rounded-lg bg-stone-50 px-3 py-2 text-sm text-stone-500"
                          >
                            <span aria-hidden="true" className="text-stone-300">◌</span>
                            {lesson.title}
                            <span className="ml-auto rounded-full bg-stone-100 px-2 py-0.5 text-xs font-medium text-stone-600">
                              Coming soon
                            </span>
                          </li>
                        );
                      }
                      return (
                        <li key={lesson.id}>
                          <Link
                            href={`/l/${level.id}/${unit.id}/${lesson.id}`}
                            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-stone-800 transition-colors hover:bg-amber-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
                          >
                            <span aria-hidden="true" className={done ? "text-emerald-600" : started ? "text-amber-500" : "text-stone-300"}>
                              {done ? "✓" : started ? "●" : "○"}
                            </span>
                            {lesson.title}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}

function lessonExercisesOf(levelId: LevelId, unitId: string, lessonId: string): string[] {
  const lesson = repository.getLesson(levelId, unitId, lessonId);
  if (!lesson) return [];
  return lesson.exercises.map((exercise) =>
    repository.exerciseKey(levelId, unitId, lessonId, exercise.id),
  );
}

function lessonHasProgress(state: ReturnType<typeof useProgress>["state"], lessonKey: string): boolean {
  const prefix = `${lessonKey}:`;
  return Object.keys(state.exercises).some((key) => key.startsWith(prefix));
}