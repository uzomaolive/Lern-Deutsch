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
      title: "Level 1: Everyday words",
      rounds: [
        {
          kind: "wordle",
          title: "Wordle",
          instruction: "Guess the 5-letter German word.",
          plays: 5,
          words: ["isst","trinkt","kommst","ziehen","möchte","solch","kaufe","gäste","wollen","tanzt","schläft","halten","sagst","bauen","bären","jeder","genau","stehen","nähte","haben","warte","glaube","küche","feier","fährst","tragen","magst","sehen","kenne","suchen","liebt","müssen","frage","liest","werfen"],
        },
      ],
    },
    {
      id: "wordle-2",
      title: "Level 2: Verbs and actions",
      rounds: [
        {
          kind: "wordle",
          title: "Wordle",
          instruction: "Guess the 5-letter German word.",
          plays: 5,
          words: ["kaufe","küche","wollen","glaube","suchen","werfen","sagst","liebt","haben","tragen","bären","magst","fährst","ziehen","trinkt","frage","isst","feier","möchte","solch","kenne","halten","bauen","nähte","gäste","sehen","kommst","müssen","jeder","schläft","warte","genau","tanzt","stehen","liest"],
        },
      ],
    },
    {
      id: "wordle-3",
      title: "Level 3: Nouns and umlauts",
      rounds: [
        {
          kind: "wordle",
          title: "Wordle",
          instruction: "Guess the 5-letter German word.",
          plays: 5,
          words: ["isst","werfen","schläft","stehen","bären","ziehen","kenne","solch","haben","bauen","glaube","genau","sagst","küche","frage","müssen","magst","suchen","möchte","nähte","liebt","gäste","kommst","tragen","fährst","feier","halten","trinkt","jeder","sehen","liest","warte","kaufe","tanzt","wollen"],
        },
      ],
    },

  ],
};
