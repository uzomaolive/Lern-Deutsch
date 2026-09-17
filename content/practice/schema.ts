/**
 * Speaking practice content model. Topic banks drive the /practice page:
 * the learner draws a topic, studies its cheat sheet, prepares, then speaks
 * for one minute while the browser transcribes them.
 */

export type PracticeLevel = "a1" | "a2";

export interface CheatSheet {
  /** Key words or phrases for this topic, e.g. "der Termin". */
  words: string[];
  /** Sentence starters, e.g. "Ich möchte …". */
  sentenceStarters: string[];
  /** Linking words, e.g. "und", "aber", "weil". */
  connectors: string[];
}

export interface SpeakingTopic {
  /** Kebab-case, unique within the level. */
  id: string;
  /** German topic title shown on the card, e.g. "Sich vorstellen". */
  title: string;
  /** The speaking task, e.g. "Erzählen Sie über sich selbst." */
  prompt: string;
  /** One example sentence the learner can imitate. */
  example: string;
  /** English gloss of the example, matching the site's pattern. */
  exampleEn: string;
  cheat: CheatSheet;
}

export interface SpeakingTopicBank {
  level: PracticeLevel;
  /** Label shown to the learner, e.g. "A1". */
  label: string;
  topics: SpeakingTopic[];
}