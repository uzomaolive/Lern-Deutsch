import type { SpeakingTopicBank } from "./schema";
import { a1Topics } from "./topics-a1";
import { a2Topics } from "./topics-a2";

export const practiceTopics: SpeakingTopicBank[] = [
  { level: "a1", label: "A1", topics: a1Topics },
  { level: "a2", label: "A2", topics: a2Topics },
];

export function topicsForLevel(level: string): SpeakingTopicBank | undefined {
  return practiceTopics.find((bank) => bank.level === level);
}

/** Draws a random topic from a bank without mutating the source. */
export function randomTopic(level: string): SpeakingTopicBank["topics"][number] | undefined {
  const bank = topicsForLevel(level);
  if (!bank || bank.topics.length === 0) return undefined;
  return bank.topics[Math.floor(Math.random() * bank.topics.length)];
}