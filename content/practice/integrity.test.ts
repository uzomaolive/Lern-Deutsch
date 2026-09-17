import { describe, expect, it } from "vitest";
import { practiceTopics, randomTopic } from "./index";

const SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/;

describe("practice topic bank integrity", () => {
  it("has exactly the a1 and a2 banks", () => {
    expect(practiceTopics.map((bank) => bank.level).sort()).toEqual(["a1", "a2"]);
  });

  it("gives every bank at least 12 topics", () => {
    for (const bank of practiceTopics) {
      expect(bank.topics.length, bank.level).toBeGreaterThanOrEqual(12);
    }
  });

  it("keeps topic ids unique within a bank and kebab-case", () => {
    for (const bank of practiceTopics) {
      const ids = bank.topics.map((topic) => topic.id);
      expect(new Set(ids).size, bank.level).toBe(ids.length);
      for (const id of ids) expect(id, id).toMatch(SLUG);
    }
  });

  it("gives every topic a title, prompt, example, and complete cheat sheet", () => {
    for (const bank of practiceTopics) {
      for (const topic of bank.topics) {
        expect(topic.title.trim().length, topic.id).toBeGreaterThan(0);
        expect(topic.prompt.trim().length, topic.id).toBeGreaterThan(0);
        expect(topic.example.trim().length, topic.id).toBeGreaterThan(0);
        expect(topic.exampleEn.trim().length, topic.id).toBeGreaterThan(0);
        expect(topic.cheat.words.length, topic.id).toBeGreaterThan(0);
        expect(topic.cheat.sentenceStarters.length, topic.id).toBeGreaterThan(0);
        expect(topic.cheat.connectors.length, topic.id).toBeGreaterThan(0);
        for (const word of topic.cheat.words) {
          expect(word.trim().length).toBeGreaterThan(0);
        }
      }
    }
  });

  it("resolves randomTopic to a topic in the bank", () => {
    for (const bank of practiceTopics) {
      const drawn = randomTopic(bank.level);
      expect(bank.topics.some((topic) => topic.id === drawn?.id)).toBe(true);
    }
  });
});