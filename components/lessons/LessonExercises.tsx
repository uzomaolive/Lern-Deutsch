"use client";

import Link from "next/link";
import { ExerciseHost } from "@/components/exercises/ExerciseHost";
import { Stars } from "@/components/exercises/feedback";
import { useProgress } from "@/components/progress/ProgressProvider";
import { isLessonCompleted } from "@/lib/progress/reducer";
import { starsForScore } from "@/lib/progress/scoring";
import { useMounted } from "@/hooks/useMounted";
import { repository } from "@/content";
import type { Exercise, LessonStatus, LevelId } from "@/content/schema";

export interface NextLesson {
  href: string;
  title: string;
}

interface LessonExercisesProps {
  levelId: LevelId;
  unitId: string;
  lessonId: string;
  exercises: Exercise[];
  nextLesson: NextLesson | null;
  lessonStatus: LessonStatus;
}

export function LessonExercises({
  levelId,
  unitId,
  lessonId,
  exercises,
  nextLesson,
  lessonStatus,
}: LessonExercisesProps) {
  const { state, recordExercise, recordFlashcard } = useProgress();
  const mounted = useMounted();

  const keys = exercises.map((exercise) =>
    repository.exerciseKey(levelId, unitId, lessonId, exercise.id),
  );
  const completed = isLessonCompleted(state, keys);

  return (
    <>
      {exercises.map((exercise, index) => {
        const exerciseKey = repository.exerciseKey(
          levelId,
          unitId,
          lessonId,
          exercise.id,
        );
        const record = state.exercises[exerciseKey];
        const savedAnswer = mounted ? record?.answer : undefined;
        return (
          <div
            key={exercise.id}
            className="rounded-xl border border-stone-200 bg-stone-50 p-5"
          >
            <div className="mb-2 flex items-center justify-between text-xs font-medium uppercase tracking-wide text-stone-500">
              <span>Exercise {index + 1}</span>
              {mounted && record ? (
                <Stars count={starsForScore(record.best)} />
              ) : null}
            </div>
            <ExerciseHost
              key={savedAnswer !== undefined ? `answered:${exercise.id}` : `fresh:${exercise.id}`}
              exercise={exercise}
              exerciseKey={exerciseKey}
              savedAnswer={savedAnswer}
              onResult={(percent, answer) =>
                recordExercise(exerciseKey, percent, answer)
              }
              onFlashcardResult={(itemIndex, correct) =>
                recordFlashcard(`${exerciseKey}:${itemIndex}`, correct)
              }
            />
          </div>
        );
      })}

      {mounted && lessonStatus === "ready" && completed ? (
        <div className="rounded-xl border border-emerald-300 bg-emerald-50 p-5">
          <p className="text-lg font-semibold text-emerald-900">
            Lesson complete! Alle Übungen geschafft.
          </p>
          <p className="mt-1 text-sm text-emerald-800">
            Every exercise in this lesson is done. Come back tomorrow to keep
            your streak alive.
          </p>
          {nextLesson ? (
            <Link
              href={nextLesson.href}
              className="mt-3 inline-block rounded-lg bg-emerald-700 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
            >
              Next lesson: {nextLesson.title}
            </Link>
          ) : null}
        </div>
      ) : null}
    </>
  );
}