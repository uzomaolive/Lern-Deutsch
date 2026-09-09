"use client";

import type { Exercise } from "@/content/schema";
import { PickAnswer } from "./PickAnswer";
import { FillBlank } from "./FillBlank";
import { Matching } from "./Matching";
import { WordOrder } from "./WordOrder";
import { Flashcard } from "./Flashcard";

interface ExerciseHostProps {
  exercise: Exercise;
  /** Fired once per attempt session with the first-attempt score. */
  onResult: (percent: number) => void;
  /** Flashcard-only: per-card mastery reports. */
  onFlashcardResult?: (itemIndex: number, correct: boolean) => void;
}

export function ExerciseHost({ exercise, onResult, onFlashcardResult }: ExerciseHostProps) {
  switch (exercise.type) {
    case "multiple-choice":
      return (
        <PickAnswer
          title={exercise.title}
          instruction={exercise.instruction}
          prompt={exercise.prompt}
          promptAudio={exercise.promptAudio}
          options={exercise.options}
          correctIndex={exercise.correctIndex}
          explain={exercise.explain}
          onResult={onResult}
        />
      );
    case "listening":
      return (
        <PickAnswer
          title={exercise.title}
          instruction={exercise.instruction}
          prompt={exercise.prompt}
          listenOnly
          options={exercise.options}
          correctIndex={exercise.correctIndex}
          explain={exercise.explain}
          onResult={onResult}
        />
      );
    case "fill-blank":
      return <FillBlank exercise={exercise} onResult={onResult} />;
    case "matching":
      return <Matching exercise={exercise} onResult={onResult} />;
    case "word-order":
      return <WordOrder exercise={exercise} onResult={onResult} />;
    case "flashcard":
      return (
        <Flashcard
          exercise={exercise}
          onResult={onResult}
          onFlashcardResult={onFlashcardResult}
        />
      );
  }
}