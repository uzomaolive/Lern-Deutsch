import type { Lesson, Unit } from "../../schema";

function planned(id: string, title: string, summary: string): Lesson {
  return { id, title, summary, status: "planned", sections: [], vocab: [], exercises: [] };
}

const halloUndGutenTag: Lesson = {
  id: "hallo-und-guten-tag",
  title: "Hallo und Guten Tag",
  summary: "Greetings and leave-takings, formal and informal register.",
  status: "ready",
  sections: [
    {
      heading: "Begrüßungen (Greetings)",
      blocks: [
        {
          type: "paragraph",
          text: "You greet people differently depending on the time of day and on how well you know them. In German, the informal du and the formal Sie change which greeting fits.",
        },
        {
          type: "table",
          caption: "Greetings through the day",
          head: ["German", "English", "When"],
          rows: [
            ["Hallo!", "Hello!", "any time, informal"],
            ["Guten Morgen!", "Good morning!", "until about 11 a.m."],
            ["Guten Tag!", "Good day!", "during the day, neutral"],
            ["Guten Abend!", "Good evening!", "after about 6 p.m."],
            ["Gute Nacht!", "Good night!", "when going to bed"],
          ],
        },
        {
          type: "tip",
          text: "Hallo works at any hour and is the safest choice with people you know. Guten Morgen and Guten Tag are the neutral, polite defaults.",
        },
      ],
    },
    {
      heading: "Verabschiedungen (Leave-takings)",
      blocks: [
        {
          type: "table",
          caption: "Saying goodbye",
          head: ["German", "English", "Register"],
          rows: [
            ["Tschüss!", "Bye!", "informal"],
            ["Ciao!", "Bye!", "informal"],
            ["Bis bald!", "See you soon!", "informal"],
            ["Bis morgen!", "See you tomorrow!", "informal"],
            ["Auf Wiedersehen!", "Goodbye!", "formal"],
            ["Schönen Tag noch!", "Have a nice day!", "neutral"],
          ],
        },
        {
          type: "example",
          de: "Tschüss, bis morgen!",
          en: "Bye, see you tomorrow!",
        },
      ],
    },
    {
      heading: "Wie geht es dir?",
      blocks: [
        {
          type: "paragraph",
          text: "After greeting someone, Germans often ask how they are. The informal form uses du; the formal form uses Sie.",
        },
        {
          type: "example",
          de: "Wie geht es dir? Mir geht es gut, danke!",
          en: "How are you? I am fine, thanks!",
        },
        {
          type: "example",
          de: "Wie geht es Ihnen? Es geht so.",
          en: "How are you (formal)? So so.",
        },
        {
          type: "table",
          caption: "Answers",
          head: ["German", "English"],
          rows: [
            ["Sehr gut!", "Very good!"],
            ["Gut, danke!", "Good, thanks!"],
            ["Es geht.", "So so."],
            ["Nicht so gut.", "Not so good."],
          ],
        },
        {
          type: "tip",
          text: "Ask back with Und dir? (informal) or Und Ihnen? (formal). Mir geht es is always with mir, not ich.",
        },
      ],
    },
  ],
  vocab: [
    { id: "hallo", de: "Hallo", en: "hello", part: "interjection", phrase: true, audio: true },
    { id: "guten-morgen", de: "Guten Morgen", en: "good morning", part: "phrase", phrase: true, audio: true },
    { id: "guten-tag", de: "Guten Tag", en: "good day", part: "phrase", phrase: true, audio: true },
    { id: "guten-abend", de: "Guten Abend", en: "good evening", part: "phrase", phrase: true, audio: true },
    { id: "gute-nacht", de: "Gute Nacht", en: "good night", part: "phrase", phrase: true, audio: true },
    { id: "tschuss", de: "Tschüss", en: "bye", part: "interjection", phrase: true, audio: true },
    { id: "auf-wiedersehen", de: "Auf Wiedersehen", en: "goodbye", part: "phrase", phrase: true, audio: true },
    { id: "bis-bald", de: "Bis bald", en: "see you soon", part: "phrase", phrase: true, audio: true },
    { id: "wie-geht-es-dir", de: "Wie geht es dir?", en: "how are you?", part: "phrase", phrase: true, audio: true },
    { id: "mir-geht-es-gut", de: "Mir geht es gut.", en: "I am fine.", part: "phrase", phrase: true, audio: true },
    { id: "und-dir", de: "Und dir?", en: "and you?", part: "phrase", phrase: true, audio: true },
  ],
  exercises: [
    {
      id: "mc-gruessen",
      type: "multiple-choice",
      title: "Der richtige Gruß",
      instruction: "Choose the right greeting.",
      prompt: "It is 9 a.m. and you meet a neighbor in the stairwell.",
      options: ["Guten Abend!", "Guten Morgen!", "Gute Nacht!"],
      correctIndex: 1,
      explain: "Guten Morgen is used in the morning, until about 11 a.m.",
    },
    {
      id: "listening-gruss",
      type: "listening",
      title: "Was hörst du?",
      instruction: "Play the audio and pick the greeting you heard.",
      prompt: "Guten Morgen",
      options: ["Guten Morgen", "Guten Abend", "Gute Nacht"],
      correctIndex: 0,
    },
    {
      id: "fill-befinden",
      type: "fill-blank",
      title: "Wie geht es dir?",
      instruction: "Complete the small talk sentences.",
      sentence: "Wie ___ es dir? Mir geht es ___.",
      blanks: [
        { answers: ["geht"], hint: "goes" },
        { answers: ["gut"], hint: "well" },
      ],
    },
    {
      id: "matching-gruesse",
      type: "matching",
      title: "Gruß und Abschied",
      instruction: "Tap a German greeting, then its English meaning.",
      pairs: [
        ["Hallo", "hello"],
        ["Tschüss", "bye"],
        ["Guten Tag", "good day"],
        ["Bis bald", "see you soon"],
        ["Auf Wiedersehen", "goodbye"],
      ],
    },
    {
      id: "word-order-begruessung",
      type: "word-order",
      title: "Sich vorstellen",
      instruction: "Build the sentence: My name is Anna.",
      chunks: ["Ich", "bin", "Anna."],
      explain: "The verb bin takes the second position in a statement.",
    },
    {
      id: "flashcard-gruesse",
      type: "flashcard",
      title: "Grußkarten",
      instruction: "Say the German phrase out loud, then reveal the card.",
      items: [
        { front: "Guten Morgen", back: "good morning", frontAudio: true },
        { front: "Guten Tag", back: "good day", frontAudio: true },
        { front: "Guten Abend", back: "good evening", frontAudio: true },
        { front: "Tschüss", back: "bye", frontAudio: true },
        { front: "Bis bald", back: "see you soon", frontAudio: true },
        { front: "Auf Wiedersehen", back: "goodbye", frontAudio: true },
      ],
    },
  ],
};

const alphabetUndAussprache: Lesson = {
  id: "alphabet-und-aussprache",
  title: "Alphabet und Aussprache",
  summary: "The alphabet, spelling your name, and pronunciation basics.",
  status: "ready",
  sections: [
    {
      heading: "Das Alphabet",
      blocks: [
        {
          type: "paragraph",
          text: "German uses the same 26 letters as English, plus the umlauts ä, ö, ü and the sharp s ß. Every letter below is followed by a common word that starts with it.",
        },
        {
          type: "table",
          caption: "A to Z with example words",
          head: ["Letter", "Example", "Letter", "Example"],
          rows: [
            ["A", "Apfel", "N", "Nacht"],
            ["B", "Bier", "O", "Obst"],
            ["C", "Café", "P", "Pause"],
            ["D", "Deutsch", "Q", "Quelle"],
            ["E", "Ente", "R", "Regen"],
            ["F", "Familie", "S", "Sonne"],
            ["G", "Gitarre", "T", "Tag"],
            ["H", "Haus", "U", "Uhr"],
            ["I", "Igel", "V", "Vogel"],
            ["J", "Jahr", "W", "Wasser"],
            ["K", "Kaffee", "X", "Xylophon"],
            ["L", "Liebe", "Y", "Yoga"],
            ["M", "Milch", "Z", "Zeit"],
          ],
        },
        {
          type: "tip",
          text: "The umlauts are separate letters: ä, ö, ü. When you cannot type them, you may write ae, oe, ue. ß is written as ss in that case.",
        },
      ],
    },
    {
      heading: "Buchstabieren (Spelling)",
      blocks: [
        {
          type: "paragraph",
          text: "You will often need to spell your name, especially on the phone or at the post office. Say each letter one by one.",
        },
        {
          type: "example",
          de: "Mein Name ist Müller. M-U-L-L-E-R.",
          en: "My name is Müller. M-U-L-L-E-R.",
        },
        {
          type: "example",
          de: "Wie schreibt man das? Bitte buchstabieren Sie.",
          en: "How do you write that? Please spell it.",
        },
        {
          type: "tip",
          text: "For double letters say them twice: doppel-L for the two L's in Müller.",
        },
      ],
    },
    {
      heading: "Aussprache-Basics",
      blocks: [
        {
          type: "paragraph",
          text: "A few sounds work differently than in English. Learn these five rules and you will be understood everywhere.",
        },
        {
          type: "table",
          caption: "Sounds that differ from English",
          head: ["Letters", "Sound", "Examples"],
          rows: [
            ["w", "like English v", "das Wasser, der Wein"],
            ["v", "like English f", "der Vogel, vier"],
            ["z", "like English ts", "die Zeit, zwei"],
            ["j", "like English y", "das Jahr, ja"],
            ["sch", "like English sh", "die Schule, schön"],
          ],
        },
        {
          type: "paragraph",
          text: "The vowels ä, ö, ü do not exist in English. ä sounds like the a in hat but longer, ö is pronounced with rounded lips, and ü is like ö but with the tongue high, as in French 'tu'.",
        },
        {
          type: "paragraph",
          text: "ei sounds like the English word 'eye' (zwei, heißen, mein). ie sounds like a long English 'ee' (vier, die Liebe, spielen). This is one of the most useful rules in German.",
        },
        {
          type: "paragraph",
          text: "ß and ss both make the same sharp s sound. ß comes after long vowels (der Fuß, die Straße), ss after short ones (das Wasser, essen).",
        },
      ],
    },
  ],
  vocab: [
    { id: "alphabet", de: "das Alphabet", en: "the alphabet", part: "noun n.", plural: "die Alphabete", audio: true },
    { id: "buchstabieren", de: "buchstabieren", en: "to spell", part: "verb", audio: true },
    { id: "der-name", de: "der Name", en: "the name", part: "noun m.", plural: "die Namen", audio: true },
    { id: "wie-schreibt-man", de: "Wie schreibt man das?", en: "How do you write that?", part: "phrase", phrase: true, audio: true },
    { id: "die-stra-e", de: "die Straße", en: "the street", part: "noun f.", plural: "die Straßen", audio: true },
    { id: "das-wasser", de: "das Wasser", en: "the water", part: "noun n.", plural: "-", audio: true },
    { id: "zwei", de: "zwei", en: "two", part: "number", audio: true },
    { id: "vier", de: "vier", en: "four", part: "number", audio: true },
    { id: "schreiben", de: "schreiben", en: "to write", part: "verb", audio: true },
  ],
  exercises: [
    {
      id: "mc-w-laut",
      type: "multiple-choice",
      title: "Der W-Laut",
      instruction: "How do you pronounce the letter W?",
      prompt: "W wie Wasser",
      options: [
        "like the English v",
        "like the English w",
        "like the letter f",
      ],
      correctIndex: 0,
      explain: "W is pronounced like the English v: das Wasser sounds like 'vasser'.",
    },
    {
      id: "listening-mueller",
      type: "listening",
      title: "Welcher Name?",
      instruction: "Play the audio and pick the name you heard.",
      prompt: "Müller",
      options: ["Müller", "Möller", "Meller"],
      correctIndex: 0,
    },
    {
      id: "fill-umlaute",
      type: "fill-blank",
      title: "Umlaute schreiben",
      instruction: "Complete the words with the right umlaut or letter.",
      sentence: "Ich heiße M___ller. Ich wohne in der St___ße.",
      blanks: [
        { answers: ["ü"], hint: "ue as a fallback" },
        { answers: ["ra"], hint: "Straße" },
      ],
    },
    {
      id: "matching-laute",
      type: "matching",
      title: "Buchstaben und Laute",
      instruction: "Match each letter group to its sound.",
      pairs: [
        ["sch", "sh as in Schule"],
        ["z", "ts as in Zeit"],
        ["w", "v as in Wasser"],
        ["ei", "eye as in zwei"],
        ["ie", "long ee as in vier"],
      ],
    },
    {
      id: "word-order-name",
      type: "word-order",
      title: "Der Satz",
      instruction: "Build the sentence: My name is Müller.",
      chunks: ["Mein", "Name", "ist", "Müller."],
      explain: "ist is the verb and stays in second position.",
    },
    {
      id: "flashcard-alphabet",
      type: "flashcard",
      title: "Alphabetkarten",
      instruction: "Say the letter and the word out loud.",
      items: [
        { front: "A", back: "Apfel", frontAudio: true },
        { front: "E", back: "Ente", frontAudio: true },
        { front: "I", back: "Igel", frontAudio: true },
        { front: "O", back: "Obst", frontAudio: true },
        { front: "U", back: "Uhr", frontAudio: true },
        { front: "ß", back: "sharp s, like ss", frontAudio: true },
      ],
    },
  ],
};

const zahlen: Lesson = {
  id: "zahlen-0-bis-100",
  title: "Zahlen 0 bis 100",
  summary: "Numbers from zero to one hundred, prices, and phone numbers.",
  status: "ready",
  sections: [
    {
      heading: "Null bis zwanzig",
      blocks: [
        {
          type: "table",
          caption: "0 to 20",
          head: ["Number", "German", "Number", "German"],
          rows: [
            ["0", "null", "11", "elf"],
            ["1", "eins", "12", "zwölf"],
            ["2", "zwei", "13", "dreizehn"],
            ["3", "drei", "14", "vierzehn"],
            ["4", "vier", "15", "fünfzehn"],
            ["5", "fünf", "16", "sechzehn"],
            ["6", "sechs", "17", "siebzehn"],
            ["7", "sieben", "18", "achtzehn"],
            ["8", "acht", "19", "neunzehn"],
            ["9", "neun", "20", "zwanzig"],
            ["10", "zehn", "", ""],
          ],
        },
        {
          type: "tip",
          text: "zwölf and elf do not follow the -zehn pattern. Everything else from 13 to 19 is just the unit plus zehn.",
        },
      ],
    },
    {
      heading: "Zwanzig bis hundert",
      blocks: [
        {
          type: "paragraph",
          text: "Here comes the famous German twist: for numbers above 20 you say the unit first, then und, then the ten.",
        },
        {
          type: "table",
          caption: "Tens",
          head: ["Number", "German", "Number", "German"],
          rows: [
            ["20", "zwanzig", "70", "siebzig"],
            ["30", "dreißig", "80", "achtzig"],
            ["40", "vierzig", "90", "neunzig"],
            ["50", "fünfzig", "100", "hundert"],
            ["60", "sechzig", "", ""],
          ],
        },
        {
          type: "example",
          de: "21 = einundzwanzig, 45 = fünfundvierzig, 99 = neunundneunzig.",
          en: "21 = one-and-twenty, 45 = five-and-forty, 99 = nine-and-ninety.",
        },
        {
          type: "tip",
          text: "dreißig is spelled with ß, not zz. For 16 and 60 the six loses its s: sechzehn, sechzig. For 17 and 70 it loses the en: siebzehn, siebzig.",
        },
      ],
    },
    {
      heading: "Zahlen im Alltag",
      blocks: [
        {
          type: "paragraph",
          text: "Prices, ages, and phone numbers use numbers constantly. Prices are read with the decimal comma: 9,99 Euro is 'neun neunundneunzig'. Phone numbers are read digit by digit.",
        },
        {
          type: "example",
          de: "Was kostet das? Das kostet 9,99 Euro.",
          en: "How much is that? That costs 9.99 euros.",
        },
        {
          type: "example",
          de: "Wie alt bist du? Ich bin 25 Jahre alt.",
          en: "How old are you? I am 25 years old.",
        },
        {
          type: "example",
          de: "Meine Nummer ist 0172 34 56 78.",
          en: "My number is 0172 34 56 78.",
        },
      ],
    },
  ],
  vocab: [
    { id: "eins", de: "eins", en: "one", part: "number", audio: true },
    { id: "zwei", de: "zwei", en: "two", part: "number", audio: true },
    { id: "drei", de: "drei", en: "three", part: "number", audio: true },
    { id: "fuenf", de: "fünf", en: "five", part: "number", audio: true },
    { id: "zehn", de: "zehn", en: "ten", part: "number", audio: true },
    { id: "elf", de: "elf", en: "eleven", part: "number", audio: true },
    { id: "zwolf", de: "zwölf", en: "twelve", part: "number", audio: true },
    { id: "zwanzig", de: "zwanzig", en: "twenty", part: "number", audio: true },
    { id: "hundert", de: "hundert", en: "hundred", part: "number", audio: true },
    { id: "der-euro", de: "der Euro", en: "the euro", part: "noun m.", plural: "die Euros", audio: true },
    { id: "das-jahr", de: "das Jahr", en: "the year", part: "noun n.", plural: "die Jahre", audio: true },
    { id: "wie-alt", de: "Wie alt bist du?", en: "How old are you?", part: "phrase", phrase: true, audio: true },
  ],
  exercises: [
    {
      id: "mc-zahl-33",
      type: "multiple-choice",
      title: "Was ist 33?",
      instruction: "Pick the correct German number.",
      prompt: "33",
      options: ["dreiunddreißig", "dreißigunddrei", "dreißig drei"],
      correctIndex: 0,
      explain: "Unit first, then und, then the ten: drei-und-dreißig.",
    },
    {
      id: "listening-zahl",
      type: "listening",
      title: "Welche Zahl?",
      instruction: "Play the audio and pick the number you heard.",
      prompt: "vierundzwanzig",
      options: ["vierundzwanzig", "vierunddreißig", "vierzig"],
      correctIndex: 0,
    },
    {
      id: "fill-zahlen",
      type: "fill-blank",
      title: "Zahlen schreiben",
      instruction: "Write the numbers in words (or digits).",
      sentence: "Ich bin ___ Jahre alt. Das kostet ___ Euro.",
      blanks: [
        { answers: ["fünfundzwanzig", "25"], hint: "25" },
        { answers: ["zehn", "10"], hint: "10" },
      ],
    },
    {
      id: "matching-zahlen",
      type: "matching",
      title: "Zahlen zuordnen",
      instruction: "Match each German number to its digit.",
      pairs: [
        ["eins", "1"],
        ["zwölf", "12"],
        ["zwanzig", "20"],
        ["dreißig", "30"],
        ["hundert", "100"],
      ],
    },
    {
      id: "word-order-alter",
      type: "word-order",
      title: "Über das Alter",
      instruction: "Build the sentence: I am 25 years old.",
      chunks: ["Ich", "bin", "25", "Jahre", "alt."],
      explain: "The verb bin is second; Jahre alt closes the sentence.",
    },
    {
      id: "flashcard-zahlen",
      type: "flashcard",
      title: "Zahlenkarten",
      instruction: "Say the number out loud before revealing.",
      items: [
        { front: "eins", back: "1", frontAudio: true },
        { front: "zwei", back: "2", frontAudio: true },
        { front: "drei", back: "3", frontAudio: true },
        { front: "vier", back: "4", frontAudio: true },
        { front: "fünf", back: "5", frontAudio: true },
        { front: "zehn", back: "10", frontAudio: true },
      ],
    },
  ],
};

const laenderUndSprachen: Lesson = {
  id: "laender-und-sprachen",
  title: "Länder und Sprachen",
  summary: "Countries, languages, and nationalities; Woher kommst du?",
  status: "ready",
  sections: [
    {
      heading: "Länder, Sprachen, Nationalitäten",
      blocks: [
        {
          type: "paragraph",
          text: "Languages are named after the countries. Some countries take an article in German; the article stays with them in every phrase.",
        },
        {
          type: "table",
          caption: "Common countries",
          head: ["Land", "Sprache", "Einwohner (m.)", "Einwohnerin (f.)"],
          rows: [
            ["Deutschland", "Deutsch", "der Deutsche", "die Deutsche"],
            ["Österreich", "Deutsch", "der Österreicher", "die Österreicherin"],
            ["die Schweiz", "Deutsch", "der Schweizer", "die Schweizerin"],
            ["Frankreich", "Französisch", "der Franzose", "die Französin"],
            ["Spanien", "Spanisch", "der Spanier", "die Spanierin"],
            ["Italien", "Italienisch", "der Italiener", "die Italienerin"],
            ["Polen", "Polnisch", "der Pole", "die Polin"],
            ["die Türkei", "Türkisch", "der Türke", "die Türkin"],
            ["England", "Englisch", "der Engländer", "die Engländerin"],
            ["die USA", "Englisch", "der Amerikaner", "die Amerikanerin"],
            ["China", "Chinesisch", "der Chinese", "die Chinesin"],
            ["Japan", "Japanisch", "der Japaner", "die Japanerin"],
          ],
        },
        {
          type: "tip",
          text: "Article countries are easy to spot: die Schweiz, die Türkei, die USA, der Iran, die Niederlande. Learn them with their article from day one.",
        },
      ],
    },
    {
      heading: "Woher kommst du?",
      blocks: [
        {
          type: "paragraph",
          text: "aus answers woher (from where) and takes the dative. With countries without an article, aus is followed directly by the country name.",
        },
        {
          type: "example",
          de: "Woher kommst du? Ich komme aus Deutschland.",
          en: "Where are you from? I come from Germany.",
        },
        {
          type: "example",
          de: "Ich komme aus der Schweiz. Und du?",
          en: "I come from Switzerland. And you?",
        },
        {
          type: "tip",
          text: "With article countries, the article stays: aus der Schweiz, aus der Türkei, aus den USA. Note: nach is for movement (nach Berlin), in answers where you live or travel to (Ich wohne in Deutschland, Ich fahre in die Schweiz).",
        },
      ],
    },
    {
      heading: "Sprachen sprechen",
      blocks: [
        {
          type: "example",
          de: "Ich spreche Deutsch, Englisch und ein bisschen Spanisch.",
          en: "I speak German, English, and a little Spanish.",
        },
        {
          type: "example",
          de: "Ich lerne Deutsch.",
          en: "I am learning German.",
        },
        {
          type: "tip",
          text: "ein bisschen means 'a little'. Language names are neuter nouns but usually used without an article: Ich spreche Deutsch.",
        },
      ],
    },
  ],
  vocab: [
    { id: "deutschland", de: "Deutschland", en: "Germany", part: "noun n.", audio: true },
    { id: "oesterreich", de: "Österreich", en: "Austria", part: "noun n.", audio: true },
    { id: "die-schweiz", de: "die Schweiz", en: "Switzerland", part: "noun f.", audio: true },
    { id: "frankreich", de: "Frankreich", en: "France", part: "noun n.", audio: true },
    { id: "spanien", de: "Spanien", en: "Spain", part: "noun n.", audio: true },
    { id: "italien", de: "Italien", en: "Italy", part: "noun n.", audio: true },
    { id: "die-tuerkei", de: "die Türkei", en: "Turkey", part: "noun f.", audio: true },
    { id: "deutsch", de: "Deutsch", en: "German (language)", part: "noun n.", audio: true },
    { id: "englisch", de: "Englisch", en: "English (language)", part: "noun n.", audio: true },
    { id: "spanisch", de: "Spanisch", en: "Spanish (language)", part: "noun n.", audio: true },
    { id: "woher", de: "Woher kommst du?", en: "Where are you from?", part: "phrase", phrase: true, audio: true },
    { id: "ich-komme-aus", de: "Ich komme aus ...", en: "I come from ...", part: "phrase", phrase: true, audio: true },
    { id: "sprechen", de: "sprechen", en: "to speak", part: "verb", audio: true },
    { id: "lernen", de: "lernen", en: "to learn", part: "verb", audio: true },
    { id: "ein-bisschen", de: "ein bisschen", en: "a little", part: "adverb", audio: true },
  ],
  exercises: [
    {
      id: "mc-woher",
      type: "multiple-choice",
      title: "Woher kommst du?",
      instruction: "Pick the natural answer.",
      prompt: "Woher kommst du?",
      options: [
        "Ich komme aus Frankreich.",
        "Ich heiße Frank.",
        "Ich spreche Französisch.",
      ],
      correctIndex: 0,
      explain: "woher asks for origin: Ich komme aus + country.",
    },
    {
      id: "listening-land",
      type: "listening",
      title: "Welches Land?",
      instruction: "Play the audio and pick the country you heard.",
      prompt: "die Schweiz",
      options: ["die Schweiz", "die Türkei", "die USA"],
      correctIndex: 0,
    },
    {
      id: "fill-praeposition",
      type: "fill-blank",
      title: "aus oder in?",
      instruction: "Complete the sentences.",
      sentence: "Ich komme ___ Spanien. Ich wohne ___ Deutschland.",
      blanks: [
        { answers: ["aus"], hint: "origin" },
        { answers: ["in"], hint: "where you live" },
      ],
    },
    {
      id: "matching-sprachen",
      type: "matching",
      title: "Land und Sprache",
      instruction: "Match each country to its language.",
      pairs: [
        ["Deutschland", "Deutsch"],
        ["Frankreich", "Französisch"],
        ["Spanien", "Spanisch"],
        ["Italien", "Italienisch"],
        ["Japan", "Japanisch"],
      ],
    },
    {
      id: "word-order-woher",
      type: "word-order",
      title: "Die Frage",
      instruction: "Build the question: Where are you from?",
      chunks: ["Woher", "kommst", "du?"],
      explain: "Question words go first, the verb stays second.",
    },
    {
      id: "flashcard-laender",
      type: "flashcard",
      title: "Länderkarten",
      instruction: "Say the country out loud before revealing.",
      items: [
        { front: "Deutschland", back: "Germany", frontAudio: true },
        { front: "Österreich", back: "Austria", frontAudio: true },
        { front: "die Schweiz", back: "Switzerland", frontAudio: true },
        { front: "Frankreich", back: "France", frontAudio: true },
        { front: "Spanien", back: "Spain", frontAudio: true },
      ],
    },
  ],
};

const seinUndHaben: Lesson = {
  id: "sein-und-haben",
  title: "sein und haben",
  summary: "The two most important verbs: full conjugation and first sentences.",
  status: "ready",
  sections: [
    {
      heading: "sein (to be)",
      blocks: [
        {
          type: "table",
          caption: "sein",
          head: ["Person", "sein", "English"],
          rows: [
            ["ich", "bin", "I am"],
            ["du", "bist", "you are"],
            ["er / sie / es", "ist", "he / she / it is"],
            ["wir", "sind", "we are"],
            ["ihr", "seid", "you are"],
            ["sie / Sie", "sind", "they / you are"],
          ],
        },
        {
          type: "example",
          de: "Ich bin Anna. Wir sind aus Berlin.",
          en: "I am Anna. We are from Berlin.",
        },
        {
          type: "tip",
          text: "sie (lowercase) is they; Sie (capital) is the formal you. Both conjugate as sind.",
        },
      ],
    },
    {
      heading: "haben (to have)",
      blocks: [
        {
          type: "table",
          caption: "haben",
          head: ["Person", "haben", "English"],
          rows: [
            ["ich", "habe", "I have"],
            ["du", "hast", "you have"],
            ["er / sie / es", "hat", "he / she / it has"],
            ["wir", "haben", "we have"],
            ["ihr", "habt", "you have"],
            ["sie / Sie", "haben", "they / you have"],
          ],
        },
        {
          type: "example",
          de: "Ich habe einen Bruder. Hast du Geschwister?",
          en: "I have a brother. Do you have siblings?",
        },
        {
          type: "tip",
          text: "du hast and er hat are the two irregular spots: no stem change in the middle, they simply shorten. Learning these two tables by heart pays for the whole course.",
        },
      ],
    },
    {
      heading: "Personalpronomen",
      blocks: [
        {
          type: "table",
          caption: "Personal pronouns",
          head: ["German", "English"],
          rows: [
            ["ich", "I"],
            ["du", "you (informal, one person)"],
            ["er / sie / es", "he / she / it"],
            ["wir", "we"],
            ["ihr", "you (informal, several people)"],
            ["sie", "they"],
            ["Sie", "you (formal)"],
          ],
        },
        {
          type: "tip",
          text: "German has three 'you's: du (friend), ihr (friends), Sie (stranger or boss). When in doubt, use Sie.",
        },
      ],
    },
    {
      heading: "Erste Sätze",
      blocks: [
        {
          type: "paragraph",
          text: "In a statement, the verb is always the second idea. With sein and haben you can already say a lot.",
        },
        {
          type: "example",
          de: "Sie ist meine Schwester.",
          en: "She is my sister.",
        },
        {
          type: "example",
          de: "Er hat einen Bruder.",
          en: "He has a brother.",
        },
        {
          type: "example",
          de: "Wir sind aus Österreich.",
          en: "We are from Austria.",
        },
        {
          type: "tip",
          text: "Asking works by swapping the verb and the subject: Du bist Anna. → Bist du Anna? Question words work the same: Wie heißt du? Woher kommst du? Wie alt bist du?",
        },
      ],
    },
  ],
  vocab: [
    { id: "ich-bin", de: "ich bin", en: "I am", part: "phrase", phrase: true, audio: true },
    { id: "du-bist", de: "du bist", en: "you are", part: "phrase", phrase: true, audio: true },
    { id: "er-ist", de: "er ist", en: "he is", part: "phrase", phrase: true, audio: true },
    { id: "wir-sind", de: "wir sind", en: "we are", part: "phrase", phrase: true, audio: true },
    { id: "ihr-seid", de: "ihr seid", en: "you are (plural)", part: "phrase", phrase: true, audio: true },
    { id: "ich-habe", de: "ich habe", en: "I have", part: "phrase", phrase: true, audio: true },
    { id: "du-hast", de: "du hast", en: "you have", part: "phrase", phrase: true, audio: true },
    { id: "er-hat", de: "er hat", en: "he has", part: "phrase", phrase: true, audio: true },
    { id: "die-schwester", de: "die Schwester", en: "the sister", part: "noun f.", plural: "die Schwestern", audio: true },
    { id: "der-bruder", de: "der Bruder", en: "the brother", part: "noun m.", plural: "die Brüder", audio: true },
    { id: "wie-heisst-du", de: "Wie heißt du?", en: "What is your name?", part: "phrase", phrase: true, audio: true },
    { id: "wohnen", de: "wohnen", en: "to live, to reside", part: "verb", audio: true },
  ],
  exercises: [
    {
      id: "mc-sein",
      type: "multiple-choice",
      title: "Die richtige Form",
      instruction: "Choose the correct form of sein.",
      prompt: "Wie ___ du?",
      options: ["bist", "bin", "ist"],
      correctIndex: 0,
      explain: "du takes bist. ich takes bin, er/sie/es takes ist.",
    },
    {
      id: "listening-sein",
      type: "listening",
      title: "Was hörst du?",
      instruction: "Play the audio and pick the sentence you heard.",
      prompt: "Wir sind aus Österreich.",
      options: [
        "Wir sind aus Österreich.",
        "Wir sind aus Deutschland.",
        "Ihr seid aus Österreich.",
      ],
      correctIndex: 0,
    },
    {
      id: "fill-konjugation",
      type: "fill-blank",
      title: "sein und haben",
      instruction: "Complete with the right forms.",
      sentence: "Ich ___ Anna. Er ___ einen Bruder. Wir ___ aus Berlin.",
      blanks: [
        { answers: ["bin"], hint: "sein, ich" },
        { answers: ["hat"], hint: "haben, er" },
        { answers: ["sind"], hint: "sein, wir" },
      ],
    },
    {
      id: "matching-pronomen",
      type: "matching",
      title: "Pronomen",
      instruction: "Match each pronoun to its meaning.",
      pairs: [
        ["ich", "I"],
        ["du", "you"],
        ["er", "he"],
        ["sie", "she"],
        ["wir", "we"],
        ["ihr", "you (plural)"],
      ],
    },
    {
      id: "word-order-wohnen",
      type: "word-order",
      title: "Wo wohnst du?",
      instruction: "Build the sentence: We live in Berlin.",
      chunks: ["Wir", "wohnen", "in", "Berlin."],
      explain: "The verb wohnen holds the second position.",
    },
    {
      id: "flashcard-sein",
      type: "flashcard",
      title: "Konjugationskarten",
      instruction: "Say the German form before revealing the meaning.",
      items: [
        { front: "ich bin", back: "I am", frontAudio: true },
        { front: "du bist", back: "you are", frontAudio: true },
        { front: "er ist", back: "he is", frontAudio: true },
        { front: "wir sind", back: "we are", frontAudio: true },
        { front: "ich habe", back: "I have", frontAudio: true },
        { front: "du hast", back: "you have", frontAudio: true },
      ],
    },
  ],
};

export const kennenlernen: Unit = {
  id: "kennenlernen",
  title: "Kennenlernen",
  theme: "Introductions",
  lessons: [
    halloUndGutenTag,
    alphabetUndAussprache,
    zahlen,
    planned(
      "zahlen-ab-100",
      "Zahlen ab 100",
      "Numbers up to a million, decimals, years, and big prices.",
    ),
    laenderUndSprachen,
    seinUndHaben,
    planned(
      "persoenliche-daten",
      "Persönliche Daten",
      "Name, address, email, and phone: giving and asking for personal data.",
    ),
    planned(
      "formelle-und-informelle-anrede",
      "Du oder Sie?",
      "Formal and informal address, titles, and when to use which.",
    ),
  ],
};