import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { TopicCard } from "./TopicCard";
import { FeedbackReport } from "./FeedbackReport";
import type { SpeakingTopic } from "@/content/practice/schema";
import { buildCoverage } from "@/lib/practice/coverage";

const topic: SpeakingTopic = {
  id: "sich-vorstellen",
  title: "Sich vorstellen",
  prompt: "Erzählen Sie über sich selbst.",
  example: "Mein Name ist Anna.",
  exampleEn: "My name is Anna.",
  cheat: {
    words: ["der Name"],
    sentenceStarters: ["Mein Name ist …"],
    connectors: ["und"],
  },
};

describe("TopicCard", () => {
  it("shows the topic, prompt, example, and cheat sheet", () => {
    render(<TopicCard topic={topic} />);
    expect(screen.getByRole("heading", { name: "Sich vorstellen" })).toBeInTheDocument();
    expect(screen.getByText("Erzählen Sie über sich selbst.")).toBeInTheDocument();
    expect(screen.getByText("Mein Name ist Anna.")).toBeInTheDocument();
    expect(screen.getByText("Wörter")).toBeInTheDocument();
    expect(screen.getByText("Satzanfänge")).toBeInTheDocument();
    expect(screen.getByText("Verbindungswörter")).toBeInTheDocument();
  });

  it("hides the cheat sheet when toggled", async () => {
    render(<TopicCard topic={topic} />);
    await userEvent.click(
      screen.getByRole("button", { name: "Cheat Sheet verstecken" }),
    );
    expect(screen.queryByText("Wörter")).toBeNull();
    expect(
      screen.getByRole("button", { name: "Cheat Sheet zeigen" }),
    ).toBeInTheDocument();
  });
});

describe("FeedbackReport", () => {
  const coverage = buildCoverage(topic.cheat, "Mein Name ist Anna, und ich bin aus Berlin.");
  const props = {
    topic,
    coverage,
    transcript: "Mein Name ist Anna, und ich bin aus Berlin.",
    speakingSeconds: 45,
    playbackUrl: "",
  };

  beforeEach(() => {
    vi.stubGlobal("Audio", class { play() {} });
  });

  it("reports coverage percent, word count, and speaking time", () => {
    render(<FeedbackReport {...props} />);
    expect(screen.getByText(/Abdeckung: 100% der Vorgaben/)).toBeInTheDocument();
    expect(screen.getByText(/9 Wörter in 45 Sekunden/)).toBeInTheDocument();
  });

  it("shows the transcript and marks used items", () => {
    render(<FeedbackReport {...props} />);
    expect(screen.getByText("Mein Name ist Anna, und ich bin aus Berlin.")).toBeInTheDocument();
    expect(screen.getByText("✓ Mein Name ist …")).toBeInTheDocument();
  });

  it("lists missed items when coverage is incomplete", () => {
    const partial = buildCoverage(topic.cheat, "Hallo.");
    render(
      <FeedbackReport
        {...props}
        coverage={partial}
        transcript="Hallo."
        playbackUrl=""
      />,
    );
    expect(screen.getByText(/Nicht verwendet/)).toBeInTheDocument();
  });

  it("renders a playback element when a recording exists", () => {
    const { container } = render(
      <FeedbackReport {...props} playbackUrl="blob:recording" />,
    );
    expect(container.querySelector("audio")).not.toBeNull();
  });
});