"use client";

import { useState } from "react";
import Link from "next/link";
import { useProgress } from "@/components/progress/ProgressProvider";
import { useMounted } from "@/hooks/useMounted";
import { isLessonCompleted } from "@/lib/progress/reducer";
import { repository } from "@/content";
import type { LevelId } from "@/content/schema";

export interface SidebarLesson {
  id: string;
  title: string;
  status: "ready" | "planned";
}

export interface SidebarUnit {
  id: string;
  title: string;
  lessons: SidebarLesson[];
}

export interface SidebarLevel {
  id: LevelId;
  title: string;
  units: SidebarUnit[];
}

interface SidebarProps {
  levels: SidebarLevel[];
  /** The lesson key of the page being viewed, e.g. "a1/kennenlernen/hallo". */
  currentKey?: string;
}

export function Sidebar({ levels, currentKey }: SidebarProps) {
  const { state } = useProgress();
  const mounted = useMounted();
  const [open, setOpen] = useState(false);

  const completedKeys = new Set<string>();
  if (mounted) {
    for (const level of levels) {
      for (const unit of level.units) {
        for (const lesson of unit.lessons) {
          if (lesson.status !== "ready") continue;
          const keys = lessonExerciseKeys(level.id, unit.id, lesson.id);
          if (isLessonCompleted(state, keys)) {
            completedKeys.add(repository.lessonKey(level.id, unit.id, lesson.id));
          }
        }
      }
    }
  }

  const tree = (
    <nav aria-label="Course menu" className="space-y-6">
      {levels.map((level) => (
        <div key={level.id}>
          <h2 className="text-xs font-semibold uppercase tracking-wide text-stone-500">
            {level.title}
          </h2>
          <ul className="mt-2 space-y-3">
            {level.units.map((unit) => {
              const readyLessons = unit.lessons.filter(
                (lesson) => lesson.status === "ready",
              );
              const doneCount = readyLessons.filter((lesson) =>
                completedKeys.has(repository.lessonKey(level.id, unit.id, lesson.id)),
              ).length;
              return (
                <li key={unit.id}>
                  <p className="text-sm font-medium text-stone-700">
                    {unit.title}
                    <span className="ml-1.5 text-xs font-normal text-stone-400">
                      {mounted ? `${doneCount}/${readyLessons.length}` : ""}
                    </span>
                  </p>
                  <ul className="mt-1 space-y-0.5 border-l border-stone-200 pl-2">
                    {unit.lessons.map((lesson) => {
                      const key = repository.lessonKey(level.id, unit.id, lesson.id);
                      const done = completedKeys.has(key);
                      const isCurrent = key === currentKey;
                      const started =
                        mounted && !done && lesson.status === "ready" &&
                        lessonHasProgress(state, key);
                      if (lesson.status !== "ready") {
                        return (
                          <li
                            key={lesson.id}
                            className="flex items-center gap-2 rounded px-2 py-1 text-xs text-stone-400"
                          >
                            <span aria-hidden="true" className="text-stone-300">◌</span>
                            <span className="truncate">{lesson.title}</span>
                          </li>
                        );
                      }
                      return (
                        <li key={lesson.id}>
                          <Link
                            href={`/l/${level.id}/${unit.id}/${lesson.id}`}
                            aria-current={isCurrent ? "page" : undefined}
                            className={`flex items-center gap-2 rounded px-2 py-1 text-xs transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 ${
                              isCurrent
                                ? "bg-amber-100 font-semibold text-amber-900"
                                : "text-stone-700 hover:bg-stone-100 hover:text-stone-900"
                            }`}
                          >
                            <span
                              aria-hidden="true"
                              className={
                                done
                                  ? "text-emerald-600"
                                  : started
                                    ? "text-amber-500"
                                    : "text-stone-300"
                              }
                            >
                              {done ? "✓" : started ? "●" : "○"}
                            </span>
                            <span className="truncate">{lesson.title}</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );

  return (
    <>
      <div className="lg:hidden">
        <button
          type="button"
          aria-expanded={open}
          aria-label={open ? "Close course topics" : "Browse course topics"}
          onClick={() => setOpen(!open)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-stone-300 bg-white text-stone-700 transition-colors hover:border-amber-500 hover:text-amber-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
        >
          <span aria-hidden="true" className="text-base leading-none">☰</span>
        </button>
        {open ? (
          <div className="mt-3 max-h-[70vh] overflow-y-auto rounded-xl border border-stone-200 bg-white p-4">
            {tree}
          </div>
        ) : null}
      </div>

      <aside className="hidden h-full lg:block">
        <div className="h-full overflow-y-auto pr-2">
          {tree}
        </div>
      </aside>
    </>
  );
}

function lessonExerciseKeys(levelId: LevelId, unitId: string, lessonId: string): string[] {
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