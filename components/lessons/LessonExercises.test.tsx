import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import { ProgressProvider } from "@/components/progress/ProgressProvider";
import { LessonExercises } from "./LessonExercises";
import { STORAGE_KEY } from "@/lib/progress/store";
import type { Exercise } from "@/content/schema";

const exercises: Exercise[] = [
  {
    id: "mc-gruessen",
    type: "multiple-choice",
    title: "Der richtige Gruß",
    instruction: "Pick the morning greeting.",
    prompt: "It is 9 a.m.",
    options: ["Guten Abend!", "Guten Morgen!", "Gute Nacht!"],
    correctIndex: 1,
  },
  {
    id: "flashcard-gruesse",
    type: "flashcard",
    title: "Grußkarten",
    instruction: "Drill the greetings.",
    items: [
      { front: "Guten Morgen", back: "good morning", frontAudio: true },
      { front: "Tschüss", back: "bye", frontAudio: true },
    ],
  },
];

function renderLesson() {
  render(
    <ProgressProvider>
      <LessonExercises
        levelId="a1"
        unitId="kennenlernen"
        lessonId="hallo-und-guten-tag"
        exercises={exercises}
        nextLesson={{ href: "/l/a1/kennenlernen/alphabet-und-aussprache", title: "Alphabet und Aussprache" }}
        lessonStatus="ready"
      />
    </ProgressProvider>,
  );
}

describe("LessonExercises with ProgressProvider", () => {
  beforeEach(() => localStorage.clear());

  it("persists scores to localStorage and shows stars", async () => {
    renderLesson();
    await userEvent.click(screen.getByRole("button", { name: "Guten Morgen!" }));

    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}");
    expect(
      saved.exercises["a1/kennenlernen/hallo-und-guten-tag:mc-gruessen"],
    ).toEqual({ best: 100, attempts: 1, answer: { index: 1 } });

    expect(screen.getByLabelText("3 of 3 stars")).toBeInTheDocument();
  });

  it("restores the saved answer on remount", async () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        exercises: {
          "a1/kennenlernen/hallo-und-guten-tag:mc-gruessen": {
            best: 100,
            attempts: 1,
            answer: { index: 1 },
          },
        },
        vocab: {},
        lastActiveDay: null,
        streak: 0,
        seenFlashcards: [],
      }),
    );
    renderLesson();
    expect(screen.getByText(/Stark|Sehr gut|Richtig|Prima/)).toBeInTheDocument();
    const morning = screen.getByRole("button", { name: "Guten Morgen!" });
    expect(morning).toBeDisabled();
  });

  it("shows the completion banner and next-lesson link when all exercises are done", async () => {
    renderLesson();

    await userEvent.click(screen.getByRole("button", { name: "Guten Morgen!" }));

    await userEvent.click(screen.getByRole("button", { name: "Show answer" }));
    await userEvent.click(screen.getByRole("button", { name: "I knew it" }));
    await userEvent.click(screen.getByRole("button", { name: "Show answer" }));
    await userEvent.click(screen.getByRole("button", { name: "I knew it" }));

    expect(screen.getByText(/Lesson complete!/)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Next lesson: Alphabet und Aussprache" }),
    ).toHaveAttribute("href", "/l/a1/kennenlernen/alphabet-und-aussprache");
  });

  it("records flashcard mastery per card", async () => {
    renderLesson();
    await userEvent.click(screen.getByRole("button", { name: "Show answer" }));
    await userEvent.click(screen.getByRole("button", { name: "I knew it" }));
    await userEvent.click(screen.getByRole("button", { name: "Show answer" }));
    await userEvent.click(screen.getByRole("button", { name: "Again" }));

    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}");
    const prefix = "a1/kennenlernen/hallo-und-guten-tag:flashcard-gruesse:";
    expect(saved.vocab[`${prefix}0`]).toEqual({ correct: 1, known: false });
    expect(saved.vocab[`${prefix}1`]).toEqual({ correct: 0, known: false });
    expect(saved.seenFlashcards).toEqual([`${prefix}0`, `${prefix}1`]);
  });
});