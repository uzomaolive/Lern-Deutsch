import type { Game } from "./schema";

export const numberDropGame: Game = {
  id: "number-drop",
  title: "Number Drop",
  emoji: "🌧️",
  description:
    "German number words rush toward you from the distance. Send each one to the gate with the matching numeral before it gets too close. Fast arcade-style number practice that speeds up as you play.",
  category: "grammar",
  tags: ["A1"],
  levels: [
    {
      id: "numdrop-1",
      title: "Level 1: 0–9",
      rounds: [
        {
          kind: "drop",
          title: "Number Drop: 0–9",
          instruction: "Send each number word to its numeral before it lands.",
          fallMs: 4000,
          gates: [
            { id: "0", label: "0" },
            { id: "1", label: "1" },
            { id: "2", label: "2" },
            { id: "3", label: "3" },
            { id: "4", label: "4" },
            { id: "5", label: "5" },
            { id: "6", label: "6" },
            { id: "7", label: "7" },
            { id: "8", label: "8" },
            { id: "9", label: "9" },
          ],
          items: [
            { text: "null", gateId: "0" },
            { text: "eins", gateId: "1" },
            { text: "zwei", gateId: "2" },
            { text: "drei", gateId: "3" },
            { text: "vier", gateId: "4" },
            { text: "fünf", gateId: "5" },
            { text: "sechs", gateId: "6" },
            { text: "sieben", gateId: "7" },
            { text: "acht", gateId: "8" },
            { text: "neun", gateId: "9" },
          ],
        },
      ],
    },
    {
      id: "numdrop-2",
      title: "Level 2: 10–19",
      rounds: [
        {
          kind: "drop",
          title: "Number Drop: 10–19",
          instruction: "Send each number word to its numeral before it lands.",
          fallMs: 3800,
          gates: [
            { id: "10", label: "10" },
            { id: "11", label: "11" },
            { id: "12", label: "12" },
            { id: "13", label: "13" },
            { id: "14", label: "14" },
            { id: "15", label: "15" },
            { id: "16", label: "16" },
            { id: "17", label: "17" },
            { id: "18", label: "18" },
            { id: "19", label: "19" },
          ],
          items: [
            { text: "zehn", gateId: "10" },
            { text: "elf", gateId: "11" },
            { text: "zwölf", gateId: "12" },
            { text: "dreizehn", gateId: "13" },
            { text: "vierzehn", gateId: "14" },
            { text: "fünfzehn", gateId: "15" },
            { text: "sechzehn", gateId: "16" },
            { text: "siebzehn", gateId: "17" },
            { text: "achtzehn", gateId: "18" },
            { text: "neunzehn", gateId: "19" },
          ],
        },
      ],
    },
    {
      id: "numdrop-3",
      title: "Level 3: 20–29",
      rounds: [
        {
          kind: "drop",
          title: "Number Drop: 20–29",
          instruction: "Send each number word to its numeral before it lands.",
          fallMs: 3600,
          gates: [
            { id: "20", label: "20" },
            { id: "21", label: "21" },
            { id: "22", label: "22" },
            { id: "23", label: "23" },
            { id: "24", label: "24" },
            { id: "25", label: "25" },
            { id: "26", label: "26" },
            { id: "27", label: "27" },
            { id: "28", label: "28" },
            { id: "29", label: "29" },
          ],
          items: [
            { text: "zwanzig", gateId: "20" },
            { text: "einundzwanzig", gateId: "21" },
            { text: "zweiundzwanzig", gateId: "22" },
            { text: "dreiundzwanzig", gateId: "23" },
            { text: "vierundzwanzig", gateId: "24" },
            { text: "fünfundzwanzig", gateId: "25" },
            { text: "sechsundzwanzig", gateId: "26" },
            { text: "siebenundzwanzig", gateId: "27" },
            { text: "achtundzwanzig", gateId: "28" },
            { text: "neunundzwanzig", gateId: "29" },
          ],
        },
      ],
    },
  ],
};

export const mathInGermanGame: Game = {
  id: "math-in-german",
  title: "Math in German",
  emoji: "🧮",
  description:
    "Solve calculations and build the result as a German word. The sum is shown as numerals (8 × 4) or in German words (acht mal vier).",
  category: "grammar",
  tags: ["A1", "A2"],
  levels: [
    {
      id: "math-1",
      title: "Level 1: Plus and minus",
      rounds: [
        {
          kind: "typing",
          title: "Math in German: + and −",
          instruction: "Solve the calculation and type the result (German word or digits).",
          items: [
            { prompt: "3 + 3 = ?", accept: ["sechs", "6"], hint: "sechs" },
            { prompt: "12 + 7 = ?", accept: ["neunzehn", "19"], hint: "neunzehn" },
            { prompt: "20 − 5 = ?", accept: ["fünfzehn", "15"], hint: "fünfzehn" },
            { prompt: "15 + 15 = ?", accept: ["dreißig", "30"], hint: "dreißig" },
            { prompt: "50 + 50 = ?", accept: ["hundert", "einhundert", "100"], hint: "hundert" },
            { prompt: "40 − 8 = ?", accept: ["zweiunddreißig", "32"], hint: "zweiunddreißig" },
            { prompt: "7 + 6 = ?", accept: ["dreizehn", "13"], hint: "dreizehn" },
            { prompt: "30 − 6 = ?", accept: ["vierundzwanzig", "24"], hint: "vierundzwanzig" },
          ],
        },
      ],
    },
    {
      id: "math-2",
      title: "Level 2: Multiplizieren",
      rounds: [
        {
          kind: "typing",
          title: "Math in German: ×",
          instruction: "Solve the calculation and type the result (German word or digits).",
          items: [
            { prompt: "8 × 4 = ?", accept: ["zweiunddreißig", "32"], hint: "zweiunddreißig" },
            { prompt: "6 × 7 = ?", accept: ["zweiundvierzig", "42"], hint: "zweiundvierzig" },
            { prompt: "9 × 9 = ?", accept: ["einundachtzig", "81"], hint: "einundachtzig" },
            { prompt: "5 × 5 = ?", accept: ["fünfundzwanzig", "25"], hint: "fünfundzwanzig" },
            { prompt: "3 × 4 = ?", accept: ["zwölf", "12"], hint: "zwölf" },
            { prompt: "10 × 10 = ?", accept: ["hundert", "einhundert", "100"], hint: "hundert" },
            { prompt: "7 × 8 = ?", accept: ["sechsundfünfzig", "56"], hint: "sechsundfünfzig" },
            { prompt: "4 × 6 = ?", accept: ["vierundzwanzig", "24"], hint: "vierundzwanzig" },
          ],
        },
      ],
    },
    {
      id: "math-3",
      title: "Level 3: Geteilt",
      rounds: [
        {
          kind: "typing",
          title: "Math in German: ÷",
          instruction: "Solve the calculation and type the result (German word or digits).",
          items: [
            { prompt: "100 ÷ 4 = ?", accept: ["fünfundzwanzig", "25"], hint: "fünfundzwanzig" },
            { prompt: "50 ÷ 2 = ?", accept: ["fünfundzwanzig", "25"], hint: "fünfundzwanzig" },
            { prompt: "81 ÷ 9 = ?", accept: ["neun", "9"], hint: "neun" },
            { prompt: "64 ÷ 8 = ?", accept: ["acht", "8"], hint: "acht" },
            { prompt: "120 ÷ 12 = ?", accept: ["zehn", "10"], hint: "zehn" },
            { prompt: "100 ÷ 10 = ?", accept: ["zehn", "10"], hint: "zehn" },
            { prompt: "200 ÷ 2 = ?", accept: ["hundert", "einhundert", "100"], hint: "hundert" },
            { prompt: "45 ÷ 5 = ?", accept: ["neun", "9"], hint: "neun" },
          ],
        },
      ],
    },
  ],
};

export const numberTapGame: Game = {
  id: "number-tap",
  title: "Number Tap Game",
  emoji: "🔢",
  description:
    "See a German number word and tap the correct number on the keypad. Mobile-friendly number practice.",
  category: "grammar",
  tags: ["A1"],
  levels: [
    {
      id: "numtap-1",
      title: "Level 1: 0–9",
      rounds: [
        {
          kind: "keypad",
          title: "Number Tap: 0–9",
          instruction: "Read the word and tap the matching number.",
          items: [
            { word: "null", target: 0 },
            { word: "eins", target: 1 },
            { word: "zwei", target: 2 },
            { word: "drei", target: 3 },
            { word: "vier", target: 4 },
            { word: "fünf", target: 5 },
            { word: "sechs", target: 6 },
            { word: "sieben", target: 7 },
            { word: "acht", target: 8 },
            { word: "neun", target: 9 },
          ],
        },
      ],
    },
    {
      id: "numtap-2",
      title: "Level 2: 10–20",
      rounds: [
        {
          kind: "keypad",
          title: "Number Tap: 10–20",
          instruction: "Read the word and tap the matching number.",
          items: [
            { word: "zehn", target: 10 },
            { word: "elf", target: 11 },
            { word: "zwölf", target: 12 },
            { word: "dreizehn", target: 13 },
            { word: "vierzehn", target: 14 },
            { word: "fünfzehn", target: 15 },
            { word: "sechzehn", target: 16 },
            { word: "siebzehn", target: 17 },
            { word: "achtzehn", target: 18 },
            { word: "neunzehn", target: 19 },
            { word: "zwanzig", target: 20 },
          ],
        },
      ],
    },
    {
      id: "numtap-3",
      title: "Level 3: Tens",
      rounds: [
        {
          kind: "keypad",
          title: "Number Tap: tens",
          instruction: "Read the word and tap the matching number.",
          items: [
            { word: "dreißig", target: 30 },
            { word: "vierzig", target: 40 },
            { word: "fünfzig", target: 50 },
            { word: "sechzig", target: 60 },
            { word: "siebzig", target: 70 },
            { word: "achtzig", target: 80 },
            { word: "neunzig", target: 90 },
            { word: "einhundert", target: 100 },
            { word: "eintausend", target: 1000 },
          ],
        },
      ],
    },
  ],
};

export const timeShortFormGame: Game = {
  id: "time-short-form",
  title: "Time Short Form Game",
  emoji: "⏰",
  description:
    "Practice German time with short forms: nach, vor, halb, viertel, and punkt.",
  category: "grammar",
  tags: ["A1", "A2"],
  levels: [
    {
      id: "tsf-1",
      title: "Level 1: nach and vor",
      rounds: [
        {
          kind: "exercise",
          exercise: {
            id: "tsf-1a",
            type: "multiple-choice",
            title: "Time short forms",
            instruction: "Choose how a German speaker reads the clock.",
            prompt: "14:05",
            options: ["fünf nach zwei", "fünf vor zwei", "halb zwei"],
            correctIndex: 0,
            explain: "14:05 = fünf nach zwei: five past two.",
          },
        },
        {
          kind: "exercise",
          exercise: {
            id: "tsf-1b",
            type: "multiple-choice",
            title: "Time short forms",
            instruction: "Choose how a German speaker reads the clock.",
            prompt: "14:55",
            options: ["fünf vor drei", "fünf nach drei", "halb drei"],
            correctIndex: 0,
            explain: "14:55 = fünf vor drei: five to three.",
          },
        },
        {
          kind: "exercise",
          exercise: {
            id: "tsf-1c",
            type: "multiple-choice",
            title: "Time short forms",
            instruction: "Choose how a German speaker reads the clock.",
            prompt: "15:15",
            options: ["viertel nach drei", "viertel vor drei", "halb drei"],
            correctIndex: 0,
            explain: "15:15 = viertel nach drei: quarter past three.",
          },
        },
        {
          kind: "exercise",
          exercise: {
            id: "tsf-1d",
            type: "multiple-choice",
            title: "Time short forms",
            instruction: "Choose how a German speaker reads the clock.",
            prompt: "15:45",
            options: ["viertel vor vier", "viertel nach vier", "halb vier"],
            correctIndex: 0,
            explain: "15:45 = viertel vor vier: quarter to four.",
          },
        },
        {
          kind: "exercise",
          exercise: {
            id: "tsf-1e",
            type: "multiple-choice",
            title: "Time short forms",
            instruction: "Choose how a German speaker reads the clock.",
            prompt: "17:10",
            options: ["zehn nach fünf", "zehn vor fünf", "halb sechs"],
            correctIndex: 0,
            explain: "17:10 = zehn nach fünf: ten past five.",
          },
        },
        {
          kind: "exercise",
          exercise: {
            id: "tsf-1f",
            type: "multiple-choice",
            title: "Time short forms",
            instruction: "Choose how a German speaker reads the clock.",
            prompt: "17:50",
            options: ["zehn vor sechs", "zehn nach sechs", "halb sechs"],
            correctIndex: 0,
            explain: "17:50 = zehn vor sechs: ten to six.",
          },
        },
      ],
    },
    {
      id: "tsf-2",
      title: "Level 2: halb and punkt",
      rounds: [
        {
          kind: "exercise",
          exercise: {
            id: "tsf-2a",
            type: "multiple-choice",
            title: "Time short forms",
            instruction: "Choose how a German speaker reads the clock.",
            prompt: "14:30",
            options: ["halb drei", "halb zwei", "viertel nach zwei"],
            correctIndex: 0,
            explain: "14:30 = halb drei: half past two (half to three).",
          },
        },
        {
          kind: "exercise",
          exercise: {
            id: "tsf-2b",
            type: "multiple-choice",
            title: "Time short forms",
            instruction: "Choose how a German speaker reads the clock.",
            prompt: "13:30",
            options: ["halb zwei", "halb drei", "viertel nach eins"],
            correctIndex: 0,
            explain: "13:30 = halb zwei: half to two.",
          },
        },
        {
          kind: "exercise",
          exercise: {
            id: "tsf-2c",
            type: "multiple-choice",
            title: "Time short forms",
            instruction: "Choose how a German speaker reads the clock.",
            prompt: "18:30",
            options: ["halb sieben", "halb sechs", "halb acht"],
            correctIndex: 0,
            explain: "18:30 = halb sieben: half to seven.",
          },
        },
        {
          kind: "exercise",
          exercise: {
            id: "tsf-2d",
            type: "multiple-choice",
            title: "Time short forms",
            instruction: "Choose how a German speaker reads the clock.",
            prompt: "16:00",
            options: ["punkt vier", "punkt fünf", "halb vier"],
            correctIndex: 0,
            explain: "16:00 = punkt vier: exactly four o'clock.",
          },
        },
        {
          kind: "exercise",
          exercise: {
            id: "tsf-2e",
            type: "multiple-choice",
            title: "Time short forms",
            instruction: "Choose how a German speaker reads the clock.",
            prompt: "12:00",
            options: ["punkt zwölf", "punkt elf", "halb zwölf"],
            correctIndex: 0,
            explain: "12:00 = punkt zwölf: exactly noon.",
          },
        },
        {
          kind: "exercise",
          exercise: {
            id: "tsf-2f",
            type: "multiple-choice",
            title: "Time short forms",
            instruction: "Choose how a German speaker reads the clock.",
            prompt: "14:45",
            options: ["viertel vor drei", "viertel nach drei", "halb drei"],
            correctIndex: 0,
            explain: "14:45 = viertel vor drei: quarter to three.",
          },
        },
      ],
    },
  ],
};

export const germanTimeGame: Game = {
  id: "german-time",
  title: "German Time Game",
  emoji: "🕑",
  description:
    "Learn to tell time in German by reading analog clocks and typing time expressions.",
  category: "grammar",
  tags: ["A1", "A2"],
  levels: [
    {
      id: "time-1",
      title: "Level 1: Full hours",
      rounds: [
        {
          kind: "time",
          title: "Read the clock",
          instruction: "Type the time in German.",
          items: [
            { minutes: 9 * 60, accept: ["neun uhr", "es ist neun uhr", "punkt neun"], hint: "neun Uhr" },
            { minutes: 14 * 60, accept: ["vierzehn uhr", "zwei uhr", "punkt zwei", "es ist zwei uhr"], hint: "vierzehn Uhr / zwei Uhr" },
            { minutes: 18 * 60, accept: ["achtzehn uhr", "sechs uhr", "punkt sechs", "es ist sechs uhr"], hint: "achtzehn Uhr / sechs Uhr" },
            { minutes: 12 * 60, accept: ["zwölf uhr", "punkt zwölf", "es ist zwölf uhr"], hint: "zwölf Uhr" },
            { minutes: 7 * 60, accept: ["sieben uhr", "es ist sieben uhr", "punkt sieben"], hint: "sieben Uhr" },
          ],
        },
      ],
    },
    {
      id: "time-2",
      title: "Level 2: nach and vor",
      rounds: [
        {
          kind: "time",
          title: "Read the clock",
          instruction: "Type the time in German.",
          items: [
            { minutes: 14 * 60 + 5, accept: ["fünf nach zwei", "vierzehn uhr fünf"], hint: "fünf nach zwei" },
            { minutes: 14 * 60 + 55, accept: ["fünf vor drei", "vierzehn uhr fünfundfünfzig"], hint: "fünf vor drei" },
            { minutes: 15 * 60 + 15, accept: ["viertel nach drei", "fünfzehn uhr fünfzehn"], hint: "viertel nach drei" },
            { minutes: 15 * 60 + 45, accept: ["viertel vor vier", "fünfzehn uhr fünfundvierzig"], hint: "viertel vor vier" },
            { minutes: 18 * 60 + 10, accept: ["zehn nach sechs", "achtzehn uhr zehn"], hint: "zehn nach sechs" },
            { minutes: 18 * 60 + 50, accept: ["zehn vor sieben", "achtzehn uhr fünfzig"], hint: "zehn vor sieben" },
          ],
        },
      ],
    },
    {
      id: "time-3",
      title: "Level 3: halb",
      rounds: [
        {
          kind: "time",
          title: "Read the clock",
          instruction: "Type the time in German.",
          items: [
            { minutes: 14 * 60 + 30, accept: ["halb drei", "vierzehn uhr dreißig", "vierzehn uhr dreissig"], hint: "halb drei" },
            { minutes: 13 * 60 + 30, accept: ["halb zwei", "dreizehn uhr dreißig", "dreizehn uhr dreissig"], hint: "halb zwei" },
            { minutes: 18 * 60 + 30, accept: ["halb sieben", "achtzehn uhr dreißig", "achtzehn uhr dreissig"], hint: "halb sieben" },
            { minutes: 10 * 60 + 30, accept: ["halb elf", "zehn uhr dreißig", "zehn uhr dreissig"], hint: "halb elf" },
            { minutes: 16 * 60 + 30, accept: ["halb fünf", "sechzehn uhr dreißig", "sechzehn uhr dreissig"], hint: "halb fünf" },
            { minutes: 8 * 60 + 30, accept: ["halb neun", "acht uhr dreißig", "acht uhr dreissig"], hint: "halb neun" },
          ],
        },
      ],
    },
  ],
};

export const wordsToNumbersGame: Game = {
  id: "words-to-numbers",
  title: "Words to Numbers Game",
  emoji: "➡️",
  description:
    "Practice recognizing German number words and converting them to digits.",
  category: "grammar",
  tags: ["A1", "A2"],
  levels: [
    {
      id: "w2n-1",
      title: "Level 1: 0–30",
      rounds: [
        {
          kind: "typing",
          title: "Words to numbers",
          instruction: "Type the number as digits.",
          items: [
            { prompt: "eins", accept: ["1"] },
            { prompt: "drei", accept: ["3"] },
            { prompt: "zwölf", accept: ["12"] },
            { prompt: "fünfzehn", accept: ["15"] },
            { prompt: "zwanzig", accept: ["20"] },
            { prompt: "einundzwanzig", accept: ["21"] },
            { prompt: "vierundzwanzig", accept: ["24"] },
            { prompt: "dreißig", accept: ["30"] },
            { prompt: "neunzehn", accept: ["19"] },
            { prompt: "sechzehn", accept: ["16"] },
          ],
        },
      ],
    },
    {
      id: "w2n-2",
      title: "Level 2: up to 100",
      rounds: [
        {
          kind: "typing",
          title: "Words to numbers",
          instruction: "Type the number as digits.",
          items: [
            { prompt: "fünfundvierzig", accept: ["45"] },
            { prompt: "neunundneunzig", accept: ["99"] },
            { prompt: "einhundert", accept: ["100"] },
            { prompt: "einhunderteins", accept: ["101"] },
            { prompt: "einhundertfünfundzwanzig", accept: ["125"] },
            { prompt: "zweihundertfünfzig", accept: ["250"] },
            { prompt: "vierhundert", accept: ["400"] },
            { prompt: "achthundertachtzig", accept: ["880"] },
          ],
        },
      ],
    },
    {
      id: "w2n-3",
      title: "Level 3: thousands",
      rounds: [
        {
          kind: "typing",
          title: "Words to numbers",
          instruction: "Type the number as digits.",
          items: [
            { prompt: "eintausend", accept: ["1000"] },
            { prompt: "zweitausend", accept: ["2000"] },
            { prompt: "viertausend", accept: ["4000"] },
            { prompt: "eintausendzweihundertvierunddreißig", accept: ["1234"] },
            { prompt: "zweitausendfünfhundert", accept: ["2500"] },
            { prompt: "dreitausendneunhundert", accept: ["3900"] },
            { prompt: "fünftausend", accept: ["5000"] },
            { prompt: "zehntausend", accept: ["10000"] },
          ],
        },
      ],
    },
  ],
};

export const numbersToWordsGame: Game = {
  id: "numbers-to-words",
  title: "Numbers to Words Game",
  emoji: "⬅️",
  description:
    "See a number and type the German word. Perfect for learning German number vocabulary.",
  category: "grammar",
  tags: ["A1", "A2"],
  levels: [
    {
      id: "n2w-1",
      title: "Level 1: 0–30",
      rounds: [
        {
          kind: "typing",
          title: "Numbers to words",
          instruction: "Type the number in German.",
          items: [
            { prompt: "1", accept: ["eins"] },
            { prompt: "2", accept: ["zwei"] },
            { prompt: "11", accept: ["elf"] },
            { prompt: "12", accept: ["zwölf", "zwoelf"] },
            { prompt: "16", accept: ["sechzehn"] },
            { prompt: "17", accept: ["siebzehn"] },
            { prompt: "20", accept: ["zwanzig"] },
            { prompt: "21", accept: ["einundzwanzig"] },
            { prompt: "30", accept: ["dreißig", "dreissig"] },
            { prompt: "24", accept: ["vierundzwanzig"] },
          ],
        },
      ],
    },
    {
      id: "n2w-2",
      title: "Level 2: up to 100",
      rounds: [
        {
          kind: "typing",
          title: "Numbers to words",
          instruction: "Type the number in German.",
          items: [
            { prompt: "44", accept: ["vierundvierzig"] },
            { prompt: "99", accept: ["neunundneunzig"] },
            { prompt: "100", accept: ["hundert", "einhundert"] },
            { prompt: "101", accept: ["einhunderteins"] },
            { prompt: "250", accept: ["zweihundertfünfzig"] },
            { prompt: "400", accept: ["vierhundert"] },
            { prompt: "880", accept: ["achthundertachtzig"] },
          ],
        },
      ],
    },
    {
      id: "n2w-3",
      title: "Level 3: thousands",
      rounds: [
        {
          kind: "typing",
          title: "Numbers to words",
          instruction: "Type the number in German.",
          items: [
            { prompt: "1000", accept: ["tausend", "eintausend"] },
            { prompt: "2000", accept: ["zweitausend"] },
            { prompt: "4000", accept: ["viertausend"] },
            { prompt: "1234", accept: ["eintausendzweihundertvierunddreißig", "eintausendzweihundertvierunddreissig"] },
            { prompt: "2500", accept: ["zweitausendfünfhundert"] },
            { prompt: "3900", accept: ["dreitausendneunhundert"] },
            { prompt: "5000", accept: ["fünftausend"] },
            { prompt: "10000", accept: ["zehntausend"] },
          ],
        },
      ],
    },
  ],
};

export const numberGames: Game[] = [
  numberDropGame,
  mathInGermanGame,
  numberTapGame,
  timeShortFormGame,
  germanTimeGame,
  wordsToNumbersGame,
  numbersToWordsGame,
];