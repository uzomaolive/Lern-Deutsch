import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import { ProgressProvider } from "@/components/progress/ProgressProvider";
import { GameLevelView } from "./GameLevelView";
import { shuffleOptions } from "@/lib/exercises/shuffle";
import { STORAGE_KEY } from "@/lib/progress/store";
import type { Game } from "@/content/games/schema";

const game: Game = {
  id: "article-challenge",
  title: "Article Challenge",
  emoji: "🅰️",
  description: "Pick the right article.",
  category: "grammar",
  levels: [
    {
      id: "level-1",
      title: "Level 1",
      rounds: [
        {
          kind: "exercise",
          exercise: {
            id: "article-1",
            type: "multiple-choice",
            title: "Choose",
            instruction: "Pick the correct article.",
            prompt: "___ Unternehmen",
            options: ["die", "der", "das"],
            correctIndex: 2,
          },
        },
        {
          kind: "memory",
          title: "Memory",
          instruction: "Find the pairs.",
          cards: [{ de: "Haus", en: "house" }],
        },
      ],
    },
  ],
};

const ROUND_KEY = "games/article-challenge/level-1:0:article-1";

function renderGame() {
  render(
    <ProgressProvider>
      <GameLevelView game={game} />
    </ProgressProvider>,
  );
}

describe("GameLevelView with ProgressProvider", () => {
  beforeEach(() => localStorage.clear());

  it("persists game answers to localStorage", async () => {
    renderGame();

    const buttons = screen.getAllByRole("button");
    const dasIndex = buttons.findIndex((button) => button.textContent === "das");
    await userEvent.click(buttons[dasIndex]);

    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}");
    expect(saved.exercises[ROUND_KEY]).toEqual({
      best: 100,
      attempts: 1,
      answer: { index: dasIndex },
    });
  });

  it("restores the saved answer on remount", async () => {
    const { options } = shuffleOptions(
      ["die", "der", "das"],
      2,
      ROUND_KEY,
    );
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        exercises: {
          [ROUND_KEY]: {
            best: 100,
            attempts: 1,
            answer: { index: options.indexOf("das") },
          },
        },
        vocab: {},
        lastActiveDay: null,
        streak: 0,
        seenFlashcards: [],
      }),
    );

    renderGame();

    const correct = screen.getByRole("button", { name: "das" });
    expect(correct).toBeDisabled();
    expect(screen.getByText(/Stark|Sehr gut|Richtig|Prima/)).toBeInTheDocument();
  });
});