import type { Game } from "./schema";

export const gridMatchGame: Game = {
  id: "word-match-grid",
  title: "Word Match Grid",
  emoji: "🔗",
  description:
    "Tap matching German and English tiles in a single grid to clear the board. Beat the clock across rounds that get faster each time!",
  category: "vocabulary",
  tags: ["A1", "A2"],
  levels: [
    {
      id: "grid-match-1",
      title: "Level 1: Family",
      rounds: [
        {
          kind: "grid-match",
          title: "Grid match: family",
          instruction: "Tap a German word, then its English match.",
          timeLimit: 45,
          pairs: [
            ["der Vater", "the father"],
            ["die Mutter", "the mother"],
            ["der Bruder", "the brother"],
            ["die Schwester", "the sister"],
            ["der Opa", "the grandpa"],
            ["die Oma", "the grandma"],
          ],
        },
      ],
    },
    {
      id: "grid-match-2",
      title: "Level 2: Food",
      rounds: [
        {
          kind: "grid-match",
          title: "Grid match: food",
          instruction: "Tap a German word, then its English match.",
          timeLimit: 40,
          pairs: [
            ["das Brot", "the bread"],
            ["die Milch", "the milk"],
            ["der Käse", "the cheese"],
            ["der Apfel", "the apple"],
            ["das Wasser", "the water"],
            ["der Kaffee", "the coffee"],
            ["der Zucker", "the sugar"],
            ["das Ei", "the egg"],
          ],
        },
      ],
    },
    {
      id: "grid-match-3",
      title: "Level 3: Around the house",
      rounds: [
        {
          kind: "grid-match",
          title: "Grid match: house",
          instruction: "Tap a German word, then its English match.",
          timeLimit: 35,
          pairs: [
            ["das Fenster", "the window"],
            ["die Tür", "the door"],
            ["der Tisch", "the table"],
            ["der Stuhl", "the chair"],
            ["das Bett", "the bed"],
            ["der Schrank", "the cupboard"],
            ["die Lampe", "the lamp"],
            ["der Herd", "the stove"],
            ["die Waschmaschine", "the washing machine"],
            ["der Kühlschrank", "the fridge"],
          ],
        },
      ],
    },
  ],
};