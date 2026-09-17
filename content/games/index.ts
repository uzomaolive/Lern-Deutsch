import type { Game } from "./schema";
import { wordleGame } from "./wordle";
import { ninewordsGame as scrambleGame, wordmatchgridGame as gridMatchGame } from "./scramble";
import { casedetectiveGame as caseDetectiveGame } from "./case-detective";
import { nounGames } from "./noun-games";
import { verbGames } from "./verb-games";
import { numberGames } from "./number-games";
import { vocabSentenceGames } from "./vocab-games";
import { legacyGames } from "./legacy-games";

export const games: Game[] = [
  ...legacyGames,
  caseDetectiveGame,
  wordleGame,
  scrambleGame,
  gridMatchGame,
  ...nounGames,
  ...verbGames,
  ...numberGames,
  ...vocabSentenceGames,
];