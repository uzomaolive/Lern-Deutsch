import type { Game } from "./schema";

/** Five-letter German words. Umlauts count as single letters. */
export const wordleGame: Game = {
  id: "german-wordle",
  title: "German Wordle",
  emoji: "🟩",
  description:
    "Guess the 5-letter German word in six tries. Green = right spot, yellow = wrong spot, grey = not in the word.",
  category: "vocabulary",
  tags: ["A1", "A2"],
  levels: [
    {
      id: "wordle-1",
      title: "Level 1: Everyday verbs",
      rounds: [
        {
          kind: "wordle",
          title: "Wordle: everyday words",
          instruction: "Guess the 5-letter German word.",
          plays: 3,
          words: [
            "heute", "danke", "lesen", "spiel", "sagen",
            "holen", "kaufe", "wohne", "liebe", "fahre",
            "warte", "suche", "kenne",
          ],
        },
      ],
    },
    {
      id: "wordle-2",
      title: "Level 2: Actions",
      rounds: [
        {
          kind: "wordle",
          title: "Wordle: actions",
          instruction: "Guess the 5-letter German word.",
          plays: 3,
          words: [
            "singt", "tanzt", "gehst", "lauft", "weint",
            "kocht", "trink", "geben", "tritt", "heben",
            "zogen", "trägt", "sagt",
          ],
        },
      ],
    },
    {
      id: "wordle-3",
      title: "Level 3: Umlaut words",
      rounds: [
        {
          kind: "wordle",
          title: "Wordle: umlauts",
          instruction: "Guess the 5-letter German word. Ä, Ö, Ü and ß are on the keyboard.",
          plays: 3,
          words: [
            "schön", "küche", "grüße", "müsst", "füsse",
            "hände", "sätze", "äpfel", "gäste", "bären",
            "lüfte", "prüfe", "hölle",
          ],
        },
      ],
    },
  ],
};