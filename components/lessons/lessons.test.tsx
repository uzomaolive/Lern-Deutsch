import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ContentBlocks } from "./blocks";
import { VocabTable } from "./VocabTable";
import type { ContentBlock, VocabItem } from "@/content/schema";

describe("ContentBlocks", () => {
  it("renders paragraphs, examples, tips, and tables", () => {
    const blocks: ContentBlock[] = [
      { type: "paragraph", text: "Ein Absatz." },
      { type: "example", de: "Guten Morgen", en: "Good morning" },
      { type: "tip", text: "Denke daran." },
      {
        type: "table",
        caption: "sein",
        head: ["ich", "du"],
        rows: [["bin", "bist"]],
      },
    ];
    render(<ContentBlocks blocks={blocks} />);
    expect(screen.getByText("Ein Absatz.")).toBeInTheDocument();
    expect(screen.getByText("Guten Morgen")).toBeInTheDocument();
    expect(screen.getByText("Good morning")).toBeInTheDocument();
    expect(screen.getByText("Denke daran.")).toBeInTheDocument();
    expect(screen.getByText("sein", { selector: "caption" })).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: "ich" })).toBeInTheDocument();
    expect(screen.getByRole("cell", { name: "bin" })).toBeInTheDocument();
  });

  it("renders a speaker button per row when rowSpeak is set", () => {
    const blocks: ContentBlock[] = [
      {
        type: "table",
        head: ["Letter", "Name"],
        rows: [["A a", "ah"]],
        rowSpeak: ["ah"],
      },
    ];
    render(<ContentBlocks blocks={blocks} />);
    expect(screen.getByRole("button", { name: "Hear ah" })).toBeInTheDocument();
  });
});

describe("VocabTable", () => {
  it("lists vocab with German, English, part, and plural", () => {
    const items: VocabItem[] = [
      {
        id: "familie",
        de: "die Familie",
        en: "the family",
        part: "noun f.",
        plural: "die Familien",
        tip: "stress on the first syllable",
      },
      { id: "hallo", de: "Hallo", en: "hello", part: "interjection", phrase: true },
    ];
    render(<VocabTable items={items} />);
    expect(screen.getByText("die Familie")).toBeInTheDocument();
    expect(screen.getByText("the family")).toBeInTheDocument();
    expect(screen.getByText("noun f.")).toBeInTheDocument();
    expect(screen.getByText("die Familien")).toBeInTheDocument();
    expect(screen.getByText("Hallo")).toBeInTheDocument();
    expect(screen.getByText("hello")).toBeInTheDocument();
  });
});