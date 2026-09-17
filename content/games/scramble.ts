import type { Game } from "./schema";

export const scrambleGame: Game = {
  id: "nine-words",
  title: "9 Words",
  emoji: "🧩",
  description:
    "Nine scrambled German words, 30 seconds each. Tap the letters in the right order before the clock runs out.",
  category: "vocabulary",
  tags: ["A1", "A2"],
  levels: [
    {
      id: "nine-words-1",
      title: "Level 1: Basic verbs",
      rounds: [
        {
          kind: "scramble",
          title: "Scramble: basic verbs",
          instruction: "Tap the letter tiles to spell the word. Beat the clock!",
          items: [
            { de: "essen", en: "to eat", timeLimit: 30, audio: true },
            { de: "trinken", en: "to drink", timeLimit: 30, audio: true },
            { de: "spielen", en: "to play", timeLimit: 30, audio: true },
            { de: "lesen", en: "to read", timeLimit: 30, audio: true },
            { de: "schlafen", en: "to sleep", timeLimit: 30, audio: true },
            { de: "kaufen", en: "to buy", timeLimit: 30, audio: true },
            { de: "gehen", en: "to go", timeLimit: 30, audio: true },
            { de: "kommen", en: "to come", timeLimit: 30, audio: true },
            { de: "sprechen", en: "to speak", timeLimit: 30, audio: true },
          ],
        },
      ],
    },
    {
      id: "nine-words-2",
      title: "Level 2: Everyday words",
      rounds: [
        {
          kind: "scramble",
          title: "Scramble: everyday words",
          instruction: "Tap the letter tiles to spell the word. Beat the clock!",
          items: [
            { de: "Frühstück", en: "breakfast", timeLimit: 30, audio: true },
            { de: "Mittagessen", en: "lunch", timeLimit: 30, audio: true },
            { de: "Einkaufen", en: "shopping", timeLimit: 30, audio: true },
            { de: "Hausaufgaben", en: "homework", timeLimit: 30, audio: true },
            { de: "Fernsehen", en: "television", timeLimit: 30, audio: true },
            { de: "Geburtstag", en: "birthday", timeLimit: 30, audio: true },
            { de: "Wochenende", en: "weekend", timeLimit: 30, audio: true },
            { de: "Schularbeit", en: "school work", timeLimit: 30, audio: true },
            { de: "Wiedersehen", en: "reunion", timeLimit: 30, audio: true },
          ],
        },
      ],
    },
    {
      id: "nine-words-3",
      title: "Level 3: Long words",
      rounds: [
        {
          kind: "scramble",
          title: "Scramble: long words",
          instruction: "Tap the letter tiles to spell the word. Beat the clock!",
          items: [
            { de: "Weihnachten", en: "Christmas", timeLimit: 35, audio: true },
            { de: "Krankenhaus", en: "hospital", timeLimit: 35, audio: true },
            { de: "Supermarkt", en: "supermarket", timeLimit: 35, audio: true },
            { de: "Kühlschrank", en: "fridge", timeLimit: 35, audio: true },
            { de: "Regenschirm", en: "umbrella", timeLimit: 35, audio: true },
            { de: "Fahrradfahren", en: "cycling", timeLimit: 40, audio: true },
            { de: "Geschwister", en: "siblings", timeLimit: 35, audio: true },
            { de: "Handschuhe", en: "gloves", timeLimit: 35, audio: true },
            { de: "Sonnenbrille", en: "sunglasses", timeLimit: 40, audio: true },
          ],
        },
      ],
    },
  ],
};