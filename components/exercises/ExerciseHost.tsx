"use client";

import { useMemo } from "react";
import type { Exercise } from "@/content/schema";
import { shuffleOptions } from "@/lib/exercises/shuffle";
import { PickAnswer } from "./PickAnswer";
import { FillBlank } from "./FillBlank";
import { Matching } from "./Matching";
import { WordOrder } from "./WordOrder";
import { Flashcard } from "./Flashcard";
import { Writing } from "./Writing";

interface ExerciseHostProps {
  exercise: Exercise;
  /** Stable key used to seed option shuffling; undefined keeps authored order. */
  exerciseKey?: string;
  /** Saved answer payload from progress state, restored on revisit. */
  savedAnswer?: unknown;
  /** Fired once per attempt session with the first-attempt score and answer. */
  onResult: (percent: number, answer?: unknown) => void;
  /** Flashcard-only: per-card mastery reports. */
  onFlashcardResult?: (itemIndex: number, correct: boolean) => void;
}

export function ExerciseHost({
  exercise,
  exerciseKey,
  savedAnswer,
  onResult,
  onFlashcardResult,
}: ExerciseHostProps) {
  const shuffled = useMemo(() => {
    if (exercise.type !== "multiple-choice" && exercise.type !== "listening") {
      return null;
    }
    if (!exerciseKey) return null;
    return shuffleOptions(exercise.options, exercise.correctIndex, exerciseKey);
  }, [exercise, exerciseKey]);

  switch (exercise.type) {
    case "multiple-choice":
      return (
        <PickAnswer
          title={exercise.title}
          instruction={exercise.instruction}
          prompt={exercise.prompt}
          promptAudio={exercise.promptAudio}
          options={shuffled ? shuffled.options : exercise.options}
          correctIndex={shuffled ? shuffled.correctIndex : exercise.correctIndex}
          explainCorrect={exercise.explainCorrect}
          explainWrong={exercise.explainWrong}
          explain={exercise.explain}
          savedAnswer={savedAnswer}
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
          options={shuffled ? shuffled.options : exercise.options}
          correctIndex={shuffled ? shuffled.correctIndex : exercise.correctIndex}
          explainCorrect={exercise.explainCorrect}
          explainWrong={exercise.explainWrong}
          explain={exercise.explain}
          savedAnswer={savedAnswer}
          onResult={onResult}
        />
      );
    case "fill-blank":
      return (
        <FillBlank exercise={exercise} savedAnswer={savedAnswer} onResult={onResult} />
      );
    case "matching":
      return (
        <Matching exercise={exercise} savedAnswer={savedAnswer} onResult={onResult} />
      );
    case "word-order":
      return (
        <WordOrder exercise={exercise} savedAnswer={savedAnswer} onResult={onResult} />
      );
    case "flashcard":
      return (
        <Flashcard
          exercise={exercise}
          onResult={onResult}
          onFlashcardResult={onFlashcardResult}
        />
      );
    case "writing":
      return (
        <Writing exercise={exercise} savedAnswer={savedAnswer} onResult={onResult} />
      );
  }
}