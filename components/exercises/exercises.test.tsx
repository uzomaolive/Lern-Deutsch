import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ExerciseHost } from "./ExerciseHost";
import { PickAnswer } from "./PickAnswer";
import { Matching } from "./Matching";
import { WordOrder } from "./WordOrder";
import { shuffleOptions } from "@/lib/exercises/shuffle";
import type {
  Exercise,
  FillBlankExercise,
  FlashcardExercise,
  MatchingExercise,
  MultipleChoiceExercise,
  WordOrderExercise,
} from "@/content/schema";

function host(exercise: Exercise, onResult = vi.fn()) {
  render(<ExerciseHost exercise={exercise} onResult={onResult} />);
  return onResult;
}

function expectPickResult(onResult: ReturnType<typeof vi.fn>, percent: number) {
  expect(onResult).toHaveBeenCalledWith(percent, { index: expect.any(Number) });
}

const mcExercise: MultipleChoiceExercise = {
  id: "mc1",
  type: "multiple-choice",
  title: "Choose the right greeting",
  instruction: "Pick the correct word for the morning.",
  prompt: "Der Morgen",
  options: ["der Abend", "der Morgen", "der Tag"],
  correctIndex: 1,
};

describe("multiple-choice", () => {
  it("scores 100 on the first correct choice", async () => {
    const onResult = host(mcExercise);
    await userEvent.click(screen.getByRole("button", { name: "der Morgen" }));
    expectPickResult(onResult, 100);
    expect(screen.getByText(/Stark|Sehr gut|Richtig|Prima/)).toBeInTheDocument();
  });

  it("scores 0 on a wrong choice and reveals the correct answer", async () => {
    const onResult = host(mcExercise);
    await userEvent.click(screen.getByRole("button", { name: "der Abend" }));
    expectPickResult(onResult, 0);
    expect(screen.getByText(/Die richtige Antwort:/)).toBeInTheDocument();
    expect(
      screen.getByText("der Morgen", { selector: "span" }),
    ).toBeInTheDocument();
  });

  it("records a fresh attempt after trying again", async () => {
    const onResult = host(mcExercise);
    await userEvent.click(screen.getByRole("button", { name: "der Abend" }));
    await userEvent.click(screen.getByRole("button", { name: "Try again" }));
    await userEvent.click(screen.getByRole("button", { name: "der Morgen" }));
    expectPickResult(onResult, 0);
    expectPickResult(onResult, 100);
  });

  it("shuffles options when an exercise key is provided and tracks the correct one", () => {
    const exerciseKey = "a1/u/l:mc-gruessen";
    const shuffled = shuffleOptions(mcExercise.options, mcExercise.correctIndex, exerciseKey);
    expect(shuffled.options[shuffled.correctIndex]).toBe("der Morgen");
    expect(shuffled.options).toHaveLength(mcExercise.options.length);
  });

  it("restores a saved pick in the answered state", () => {
    render(
      <PickAnswer
        title={mcExercise.title}
        instruction={mcExercise.instruction}
        prompt={mcExercise.prompt}
        options={mcExercise.options}
        correctIndex={mcExercise.correctIndex}
        savedAnswer={{ index: 1 }}
        onResult={vi.fn()}
      />,
    );
    expect(screen.getByText(/Stark|Sehr gut|Richtig|Prima/)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "der Morgen" })).toBeDisabled();
  });
});

describe("listening", () => {
  it("scores a correct answer with the prompt spoken only", async () => {
    const onResult = host({
      id: "ls1",
      type: "listening",
      title: "What did you hear?",
      instruction: "Play the audio and pick what you heard.",
      prompt: "Guten Morgen",
      options: ["Guten Abend", "Guten Morgen"],
      correctIndex: 1,
    });
    await userEvent.click(screen.getByRole("button", { name: "Guten Morgen" }));
    expectPickResult(onResult, 100);
  });
});

describe("fill-blank", () => {
  const fillBlank: FillBlankExercise = {
    id: "fb1",
    type: "fill-blank",
    title: "Fill in the gaps",
    instruction: "Complete the sentence.",
    sentence: "Ich ___ aus Berlin und ich ___ Deutsch.",
    blanks: [
      { answers: ["komme"] },
      { answers: ["lerne", "spreche"], hint: "study or speak" },
    ],
  };

  it("scores per-blank correctness", async () => {
    const onResult = host(fillBlank);
    const [first, second] = screen.getAllByRole("textbox");
    await userEvent.type(first, "komme");
    await userEvent.type(second, "lerne");
    await userEvent.click(screen.getByRole("button", { name: "Check" }));
    expect(onResult).toHaveBeenCalledWith(100, {
      values: ["komme", "lerne"],
    });
  });

  it("shows the correct answers for wrong blanks", async () => {
    const onResult = host(fillBlank);
    const [first, second] = screen.getAllByRole("textbox");
    await userEvent.type(first, "gehe");
    await userEvent.type(second, "lerne");
    await userEvent.click(screen.getByRole("button", { name: "Check" }));
    expect(onResult).toHaveBeenCalledWith(50, { values: ["gehe", "lerne"] });
    expect(screen.getByText(/komme/)).toBeInTheDocument();
  });

  it("accepts umlaut transliterations", async () => {
    const onResult = host({
      ...fillBlank,
      blanks: [{ answers: ["für"] }, { answers: ["dich"] }],
      sentence: "Ein Geschenk ___ ___.",
    });
    const [first, second] = screen.getAllByRole("textbox");
    await userEvent.type(first, "fuer");
    await userEvent.type(second, "dich");
    await userEvent.click(screen.getByRole("button", { name: "Check" }));
    expect(onResult).toHaveBeenCalledWith(100, {
      values: ["fuer", "dich"],
    });
  });
});

describe("matching", () => {
  const matching: MatchingExercise = {
    id: "ma1",
    type: "matching",
    title: "Match the pairs",
    instruction: "Tap a German word, then its English meaning.",
    pairs: [
      ["die Familie", "the family"],
      ["der Hund", "the dog"],
      ["das Haus", "the house"],
    ],
  };

  it("scores 100 when every pair matches first try", async () => {
    const onResult = host(matching);
    for (const [de, en] of matching.pairs) {
      await userEvent.click(screen.getByRole("button", { name: de }));
      await userEvent.click(screen.getByRole("button", { name: en }));
    }
    expect(onResult).toHaveBeenCalledWith(100, {
      matched: [0, 1, 2],
      firstTryErrors: [],
    });
  });

  it("counts a wrong pairing against the first-try score", async () => {
    const onResult = host(matching);
    const [[de1, en1], [de2, en2], [de3, en3]] = matching.pairs;
    await userEvent.click(screen.getByRole("button", { name: de1 }));
    await userEvent.click(screen.getByRole("button", { name: en2 }));
    await userEvent.click(screen.getByRole("button", { name: de1 }));
    await userEvent.click(screen.getByRole("button", { name: en1 }));
    await userEvent.click(screen.getByRole("button", { name: de2 }));
    await userEvent.click(screen.getByRole("button", { name: en2 }));
    await userEvent.click(screen.getByRole("button", { name: de3 }));
    await userEvent.click(screen.getByRole("button", { name: en3 }));
    expect(onResult).toHaveBeenCalledWith(67, {
      matched: [0, 1, 2],
      firstTryErrors: [0],
    });
  });

  it("restores a completed matching in the done state", () => {
    render(
      <Matching
        exercise={matching}
        savedAnswer={{ matched: [0, 1, 2], firstTryErrors: [] }}
        onResult={vi.fn()}
      />,
    );
    expect(screen.getByRole("button", { name: "Try again" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "die Familie" })).toBeDisabled();
  });
});

describe("word-order", () => {
  const wordOrder: WordOrderExercise = {
    id: "wo1",
    type: "word-order",
    title: "Build the sentence",
    instruction: "Put the words in the right order.",
    chunks: ["Ich", "lerne", "Deutsch"],
  };

  it("scores 100 for the correct order", async () => {
    const onResult = host(wordOrder);
    for (const chunk of wordOrder.chunks) {
      await userEvent.click(screen.getByRole("button", { name: chunk }));
    }
    await userEvent.click(screen.getByRole("button", { name: "Check" }));
    expect(onResult).toHaveBeenCalledWith(100, {
      built: ["Ich", "lerne", "Deutsch"],
    });
  });

  it("scores 0 for a wrong order and shows the sentence", async () => {
    const onResult = host(wordOrder);
    for (const chunk of [...wordOrder.chunks].reverse()) {
      await userEvent.click(screen.getByRole("button", { name: chunk }));
    }
    await userEvent.click(screen.getByRole("button", { name: "Check" }));
    expect(onResult).toHaveBeenCalledWith(0, {
      built: ["Deutsch", "lerne", "Ich"],
    });
    expect(screen.getByText("Ich lerne Deutsch")).toBeInTheDocument();
  });

  it("restores a saved order with feedback", () => {
    render(
      <WordOrder
        exercise={wordOrder}
        savedAnswer={{ built: ["Ich", "lerne", "Deutsch"] }}
        onResult={vi.fn()}
      />,
    );
    expect(screen.getByText(/Stark|Sehr gut|Richtig|Prima/)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Try again" })).toBeInTheDocument();
  });
});

describe("flashcard", () => {
  const flashcards: FlashcardExercise = {
    id: "fc1",
    type: "flashcard",
    title: "Vocab drill",
    instruction: "Say the German word, then reveal.",
    items: [
      { front: "der Apfel", back: "the apple", frontAudio: true },
      { front: "das Brot", back: "the bread" },
      { front: "die Milch", back: "the milk" },
    ],
  };

  it("scores the share of cards marked known", async () => {
    const onResult = host(flashcards);
    for (const [index, knewIt] of [true, false, true].entries()) {
      await userEvent.click(screen.getByRole("button", { name: "Show answer" }));
      await userEvent.click(
        screen.getByRole("button", { name: knewIt ? "I knew it" : "Again" }),
      );
      if (index < 2) {
        expect(
          screen.getByText(new RegExp(`Card ${index + 2} of 3`)),
        ).toBeInTheDocument();
      }
    }
    expect(onResult).toHaveBeenCalledWith(67);
  });
});