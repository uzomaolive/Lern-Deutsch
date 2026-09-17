import type { Game } from "./schema";

export const sentenceToEnglishGame: Game = {
  id: "sentence-to-english",
  title: "German to English Sentence",
  emoji: "💬",
  description:
    "Read a German sentence and type its English translation. Practise reading comprehension at A1 or A2 level.",
  category: "mixed",
  tags: ["A1", "A2"],
  levels: [
    {
      id: "s2e-1",
      title: "Level 1: Basics",
      rounds: [
        {
          kind: "typing",
          title: "German to English",
          instruction: "Type the English translation.",
          items: [
            { prompt: "Ich heiße Anna.", accept: ["my name is anna", "i am called anna", "i am named anna"], hint: "My name is Anna.", audio: true },
            { prompt: "Ich komme aus Nigeria.", accept: ["i come from nigeria", "i am from nigeria"], hint: "I come from Nigeria.", audio: true },
            { prompt: "Wie geht es dir?", accept: ["how are you", "how are you doing"], hint: "How are you?", audio: true },
            { prompt: "Ich spreche ein bisschen Deutsch.", accept: ["i speak a little german"], hint: "I speak a little German.", audio: true },
            { prompt: "Wo wohnst du?", accept: ["where do you live", "where do you stay"], hint: "Where do you live?", audio: true },
            { prompt: "Ich habe eine Schwester.", accept: ["i have a sister"], hint: "I have a sister.", audio: true },
          ],
        },
      ],
    },
    {
      id: "s2e-2",
      title: "Level 2: Everyday life",
      rounds: [
        {
          kind: "typing",
          title: "German to English",
          instruction: "Type the English translation.",
          items: [
            { prompt: "Wo ist der Bahnhof?", accept: ["where is the station", "where is the train station"], hint: "Where is the train station?", audio: true },
            { prompt: "Ich möchte einen Kaffee, bitte.", accept: ["i would like a coffee please", "i want a coffee please"], hint: "I would like a coffee, please.", audio: true },
            { prompt: "Der Mann kauft ein neues Auto.", accept: ["the man is buying a new car", "the man buys a new car"], hint: "The man is buying a new car.", audio: true },
            { prompt: "Das Mädchen spielt im Garten.", accept: ["the girl is playing in the garden", "the girl plays in the garden"], hint: "The girl is playing in the garden.", audio: true },
            { prompt: "Entschuldigung, können Sie mir bitte helfen?", accept: ["excuse me can you help me please"], hint: "Excuse me, can you help me please?", audio: true },
            { prompt: "Was machst du heute Abend?", accept: ["what are you doing this evening", "what are you doing tonight"], hint: "What are you doing this evening?", audio: true },
          ],
        },
      ],
    },
    {
      id: "s2e-3",
      title: "Level 3: Past tense",
      rounds: [
        {
          kind: "typing",
          title: "German to English",
          instruction: "Type the English translation.",
          items: [
            { prompt: "Ich habe gestern mit meiner Freundin gesprochen.", accept: ["i spoke with my friend yesterday", "i talked to my girlfriend yesterday", "i spoke to my friend yesterday"], hint: "I spoke with my friend yesterday.", audio: true },
            { prompt: "Wir sind nach Berlin gefahren.", accept: ["we drove to berlin", "we went to berlin by car", "we traveled to berlin"], hint: "We drove to Berlin.", audio: true },
            { prompt: "Sie hat ein Buch gelesen.", accept: ["she read a book", "she has read a book"], hint: "She read a book.", audio: true },
            { prompt: "Ich war gestern müde.", accept: ["i was tired yesterday"], hint: "I was tired yesterday.", audio: true },
          ],
        },
      ],
    },
  ],
};

export const buchstabensalatGame: Game = {
  id: "buchstabensalat",
  title: "Word Salad Game (Buchstabensalat)",
  emoji: "🥗",
  description:
    "Unscramble the jumbled letters to find the German word! A fun word puzzle game to test your vocabulary.",
  category: "vocabulary",
  tags: ["A1", "A2"],
  levels: [
    {
      id: "salat-1",
      title: "Level 1: Basics",
      rounds: [
        {
          kind: "wordsearch",
          title: "Word salad: basics",
          instruction: "Tap the first and last letter of each hidden word.",
          words: ["haus", "maus", "baum", "kuh", "tisch", "stuhl"],
        },
      ],
    },
    {
      id: "salat-2",
      title: "Level 2: Around the house",
      rounds: [
        {
          kind: "wordsearch",
          title: "Word salad: house",
          instruction: "Tap the first and last letter of each hidden word.",
          words: ["fenster", "lampe", "bett", "spiegel", "teppich", "küche"],
        },
      ],
    },
    {
      id: "salat-3",
      title: "Level 3: Places",
      rounds: [
        {
          kind: "wordsearch",
          title: "Word salad: places",
          instruction: "Tap the first and last letter of each hidden word.",
          words: ["schule", "straße", "bahnhof", "kirche", "museum", "park"],
        },
      ],
    },
  ],
};

export const wordGuessingGame: Game = {
  id: "word-guessing",
  title: "Word Guessing Game",
  emoji: "🙋",
  description:
    "Guess German words letter by letter (hangman style)! Games continue until you lose, and you accumulate points for each word.",
  category: "vocabulary",
  tags: ["A1", "A2"],
  levels: [
    {
      id: "hangman-1",
      title: "Level 1: Everyday words",
      rounds: [
        {
          kind: "hangman",
          title: "Hangman: everyday words",
          instruction: "Guess the letters of the hidden word.",
          words: [
            { word: "haus", hint: "a building to live in" },
            { word: "wasser", hint: "you drink it" },
            { word: "brot", hint: "food made from flour" },
            { word: "katze", hint: "a small pet that says miau" },
            { word: "tisch", hint: "furniture you eat at" },
            { word: "straße", hint: "cars drive on it" },
          ],
        },
      ],
    },
    {
      id: "hangman-2",
      title: "Level 2: Places and things",
      rounds: [
        {
          kind: "hangman",
          title: "Hangman: places and things",
          instruction: "Guess the letters of the hidden word.",
          words: [
            { word: "schule", hint: "where you learn" },
            { word: "bahnhof", hint: "the train comes here" },
            { word: "buch", hint: "you read it" },
            { word: "garten", hint: "flowers grow here" },
            { word: "küche", hint: "where you cook" },
            { word: "zug", hint: "travels on rails" },
          ],
        },
      ],
    },
    {
      id: "hangman-3",
      title: "Level 3: Longer words",
      rounds: [
        {
          kind: "hangman",
          title: "Hangman: longer words",
          instruction: "Guess the letters of the hidden word.",
          words: [
            { word: "kühlschrank", hint: "keeps food cold" },
            { word: "weihnachten", hint: "a December holiday" },
            { word: "frühstück", hint: "the first meal of the day" },
            { word: "schwester", hint: "a female sibling" },
            { word: "zeitschrift", hint: "a magazine" },
            { word: "montag", hint: "the first workday" },
          ],
        },
      ],
    },
  ],
};

export const vocabSentenceGames: Game[] = [
  sentenceToEnglishGame,
  buchstabensalatGame,
  wordGuessingGame,
];