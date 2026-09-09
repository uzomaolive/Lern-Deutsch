import type { Lesson, Unit } from "../../schema";

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

const zahlenAb100: Lesson = {
  id: "zahlen-ab-100",
  title: "Zahlen ab 100",
  summary: "Numbers up to a million, decimals, years, and big prices.",
  status: "ready",
  sections: [
    {
      heading: "Hundert bis eine Million",
      blocks: [
        {
          type: "paragraph",
          text: "From one hundred on, the number simply reads left to right, and each block keeps its own unit-first order: 1.234 is eintausendzweihundertvierunddreißig.",
        },
        {
          type: "table",
          caption: "Big numbers",
          head: ["Number", "German"],
          rows: [
            ["100", "hundert / einhundert"],
            ["200", "zweihundert"],
            ["350", "dreihundertfünfzig"],
            ["1.000", "tausend / eintausend"],
            ["2.500", "zweitausendfünfhundert"],
            ["100.000", "hunderttausend"],
            ["1.000.000", "eine Million"],
          ],
        },
        {
          type: "example",
          de: "1.234 = eintausendzweihundertvierunddreißig",
          en: "One thousand two hundred thirty-four.",
        },
        {
          type: "tip",
          text: "German uses a dot for thousands (1.000) and a comma for decimals (1,5). Eine Million is a feminine noun; Millionen is the plural.",
        },
      ],
    },
    {
      heading: "Jahreszahlen",
      blocks: [
        {
          type: "paragraph",
          text: "Years are read as plain cardinal numbers. For the years before 2000, Germans often split at the hundred: 1989 is neunzehnhundertneunundachtzig.",
        },
        {
          type: "example",
          de: "Ich bin 1995 geboren. Neunzehnhundertfünfundneunzig.",
          en: "I was born in 1995. Nineteen ninety-five.",
        },
        {
          type: "example",
          de: "Das ist im Jahr 2026. Zweitausendsechsundzwanzig.",
          en: "That is in the year 2026.",
        },
        {
          type: "tip",
          text: "Ordinal years stay rare in speech: use the cardinal, and add im Jahr if the meaning is not obvious.",
        },
      ],
    },
    {
      heading: "Große Zahlen im Alltag",
      blocks: [
        {
          type: "paragraph",
          text: "Big prices and measurements work exactly like small ones: the comma is spoken as Komma, the unit follows the number.",
        },
        {
          type: "example",
          de: "Das kostet 250 Euro.",
          en: "That costs 250 euros.",
        },
        {
          type: "example",
          de: "1,5 Kilo Äpfel, bitte.",
          en: "1.5 kilos of apples, please.",
        },
        {
          type: "example",
          de: "3,5 ist drei Komma fünf.",
          en: "3.5 is three point five.",
        },
      ],
    },
  ],
  vocab: [
    { id: "hundert", de: "hundert", en: "hundred", part: "number", audio: true },
    { id: "tausend", de: "tausend", en: "thousand", part: "number", audio: true },
    { id: "die-million", de: "eine Million", en: "a million", part: "number", audio: true },
    { id: "zweihundert", de: "zweihundert", en: "two hundred", part: "number", audio: true },
    { id: "dreihundertfuenfzig", de: "dreihundertfünfzig", en: "three hundred fifty", part: "number", audio: true },
    { id: "zweitausend", de: "zweitausend", en: "two thousand", part: "number", audio: true },
    { id: "das-komma", de: "das Komma", en: "the decimal point", part: "noun n.", plural: "die Kommas", audio: true },
    { id: "das-kilo", de: "das Kilo", en: "the kilo", part: "noun n.", plural: "die Kilos", audio: true },
    { id: "der-punkt", de: "der Punkt", en: "the dot, the point", part: "noun m.", plural: "die Punkte", audio: true },
    { id: "geboren", de: "geboren", en: "born", part: "adjective", audio: true },
    { id: "das-jahr", de: "das Jahr", en: "the year", part: "noun n.", plural: "die Jahre", audio: true },
  ],
  exercises: [
    {
      id: "mc-zahlen-ab-100",
      type: "multiple-choice",
      title: "Die große Zahl",
      instruction: "Choose the correct German number.",
      prompt: "125",
      options: ["einhundertfünfundzwanzig", "einhundertzwanzigfünf", "hundertfünfundzwanzig"],
      correctIndex: 0,
      explain: "Blocks read left to right: einhundert + fünfundzwanzig.",
    },
    {
      id: "listening-zahlen-ab-100",
      type: "listening",
      title: "Welche Zahl?",
      instruction: "Play the audio and pick the number you heard.",
      prompt: "eintausendzweihundert",
      options: ["eintausendzweihundert", "zweitausendeinhundert", "eintausendzweihundertvierzig"],
      correctIndex: 0,
    },
    {
      id: "fill-zahlen-ab-100",
      type: "fill-blank",
      title: "Zahlen schreiben",
      instruction: "Write the missing number words.",
      sentence: "3,5 ist drei ___ fünf. Das kostet ___ Euro. (250)",
      blanks: [
        { answers: ["Komma"], hint: "decimal point" },
        { answers: ["zweihundertfünfzig", "250"], hint: "250" },
      ],
    },
    {
      id: "matching-zahlen-ab-100",
      type: "matching",
      title: "Zahlen zuordnen",
      instruction: "Match each German number to its digit.",
      pairs: [
        ["zweihundert", "200"],
        ["tausend", "1.000"],
        ["eine Million", "1.000.000"],
        ["dreihundertfünfzig", "350"],
        ["zweitausendfünfhundert", "2.500"],
      ],
    },
    {
      id: "word-order-zahlen-ab-100",
      type: "word-order",
      title: "Der Satz",
      instruction: "Build the sentence: The house costs 250,000 euros.",
      chunks: ["Das", "Haus", "kostet", "zweihundertfünfzigtausend", "Euro."],
      explain: "The number counts as one word in second position after the verb.",
    },
    {
      id: "flashcard-zahlen-ab-100",
      type: "flashcard",
      title: "Große Zahlen",
      instruction: "Say the German number out loud before revealing.",
      items: [
        { front: "hundert", back: "100", frontAudio: true },
        { front: "zweihundert", back: "200", frontAudio: true },
        { front: "tausend", back: "1.000", frontAudio: true },
        { front: "zweitausend", back: "2.000", frontAudio: true },
        { front: "eine Million", back: "1.000.000", frontAudio: true },
        { front: "das Komma", back: "the decimal point", frontAudio: true },
      ],
    },
  ],
};

const persoenlicheDaten: Lesson = {
  id: "persoenliche-daten",
  title: "Persönliche Daten",
  summary: "Name, address, email, and phone: giving and asking for personal data.",
  status: "ready",
  sections: [
    {
      heading: "Die Daten",
      blocks: [
        {
          type: "table",
          caption: "Personal data",
          head: ["German", "English"],
          rows: [
            ["der Vorname", "the first name"],
            ["der Nachname", "the last name"],
            ["die Adresse", "the address"],
            ["die Straße", "the street"],
            ["die Hausnummer", "the house number"],
            ["die Postleitzahl", "the postcode"],
            ["der Wohnort", "the place of residence"],
            ["das Land", "the country"],
            ["die Telefonnummer", "the phone number"],
            ["die Handynummer", "the mobile number"],
            ["die E-Mail-Adresse", "the email address"],
            ["das Geburtsdatum", "the date of birth"],
          ],
        },
        {
          type: "tip",
          text: "PLZ is the everyday short form for Postleitzahl. Numbers in addresses are read as cardinals: Hauptstraße 5 is Hauptstraße fünf.",
        },
      ],
    },
    {
      heading: "Fragen stellen",
      blocks: [
        {
          type: "paragraph",
          text: "On forms and in offices, the formal register rules. The question Wie ist ...? plus a noun covers almost everything.",
        },
        {
          type: "example",
          de: "Wie heißen Sie? Mein Name ist Anna Müller.",
          en: "What is your name? My name is Anna Müller.",
        },
        {
          type: "example",
          de: "Wie ist Ihre Adresse? Ich wohne in der Hauptstraße 5.",
          en: "What is your address? I live at Hauptstraße 5.",
        },
        {
          type: "example",
          de: "Wie ist Ihre Telefonnummer? 0172 34 56 78.",
          en: "What is your phone number? 0172 34 56 78.",
        },
        {
          type: "example",
          de: "Wann sind Sie geboren? Am 5. Mai 1995.",
          en: "When were you born? On May 5th, 1995.",
        },
        {
          type: "tip",
          text: "Ihr with a capital I is the formal possessive: Ihr Name, Ihre Adresse, Ihre Telefonnummer. With friends it is dein Name, deine Adresse.",
        },
      ],
    },
    {
      heading: "Das Formular",
      blocks: [
        {
          type: "example",
          de: "Vorname: Anna. Nachname: Müller. Straße: Hauptstraße 5. PLZ: 10115. Ort: Berlin.",
          en: "A form filled out with personal data.",
        },
        {
          type: "tip",
          text: "Forms are sorted by last name: Müller comes under M. Saying Mein Nachname is Müller beats Mein Name is Anna Müller in official contexts.",
        },
      ],
    },
  ],
  vocab: [
    { id: "der-vorname", de: "der Vorname", en: "the first name", part: "noun m.", plural: "die Vornamen", audio: true },
    { id: "der-nachname", de: "der Nachname", en: "the last name", part: "noun m.", plural: "die Nachnamen", audio: true },
    { id: "die-adresse", de: "die Adresse", en: "the address", part: "noun f.", plural: "die Adressen", audio: true },
    { id: "die-strasse", de: "die Straße", en: "the street", part: "noun f.", plural: "die Straßen", audio: true },
    { id: "die-hausnummer", de: "die Hausnummer", en: "the house number", part: "noun f.", plural: "die Hausnummern", audio: true },
    { id: "die-postleitzahl", de: "die Postleitzahl", en: "the postcode", part: "noun f.", plural: "die Postleitzahlen", audio: true },
    { id: "der-wohnort", de: "der Wohnort", en: "the place of residence", part: "noun m.", plural: "die Wohnorte", audio: true },
    { id: "das-land", de: "das Land", en: "the country", part: "noun n.", plural: "die Länder", audio: true },
    { id: "die-telefonnummer", de: "die Telefonnummer", en: "the phone number", part: "noun f.", plural: "die Telefonnummern", audio: true },
    { id: "die-handynummer", de: "die Handynummer", en: "the mobile number", part: "noun f.", plural: "die Handynummern", audio: true },
    { id: "die-email-adresse", de: "die E-Mail-Adresse", en: "the email address", part: "noun f.", plural: "die E-Mail-Adressen", audio: true },
    { id: "das-geburtsdatum", de: "das Geburtsdatum", en: "the date of birth", part: "noun n.", plural: "die Geburtsdaten", audio: true },
    { id: "der-wohnen", de: "wohnen", en: "to live", part: "verb", audio: true },
  ],
  exercises: [
    {
      id: "mc-daten",
      type: "multiple-choice",
      title: "Die richtige Frage",
      instruction: "Choose the question that asks for the name.",
      prompt: "You want to know someone's name (formally).",
      options: ["Wie heißen Sie?", "Wie alt sind Sie?", "Wo wohnen Sie?"],
      correctIndex: 0,
      explain: "heißen asks for the name.",
    },
    {
      id: "listening-daten",
      type: "listening",
      title: "Was hörst du?",
      instruction: "Play the audio and pick the word you heard.",
      prompt: "die Postleitzahl",
      options: ["die Postleitzahl", "die Telefonnummer", "die Adresse"],
      correctIndex: 0,
    },
    {
      id: "fill-daten",
      type: "fill-blank",
      title: "Persönliche Daten",
      instruction: "Complete the answers.",
      sentence: "Mein ___ ist Müller. Meine ___ ist Hauptstraße 5.",
      blanks: [
        { answers: ["Nachname"], hint: "last name" },
        { answers: ["Adresse"], hint: "address" },
      ],
    },
    {
      id: "matching-daten",
      type: "matching",
      title: "Die Daten",
      instruction: "Match each German word to its meaning.",
      pairs: [
        ["der Vorname", "the first name"],
        ["die Postleitzahl", "the postcode"],
        ["der Wohnort", "the place of residence"],
        ["die E-Mail-Adresse", "the email address"],
        ["das Geburtsdatum", "the date of birth"],
      ],
    },
    {
      id: "word-order-daten",
      type: "word-order",
      title: "Der Satz",
      instruction: "Build the sentence: My first name is Anna.",
      chunks: ["Mein", "Vorname", "ist", "Anna."],
      explain: "ist holds the second position.",
    },
    {
      id: "flashcard-daten",
      type: "flashcard",
      title: "Formularkarten",
      instruction: "Say the German word out loud before revealing.",
      items: [
        { front: "der Vorname", back: "the first name", frontAudio: true },
        { front: "der Nachname", back: "the last name", frontAudio: true },
        { front: "die Postleitzahl", back: "the postcode", frontAudio: true },
        { front: "der Wohnort", back: "the place of residence", frontAudio: true },
        { front: "die Telefonnummer", back: "the phone number", frontAudio: true },
        { front: "das Geburtsdatum", back: "the date of birth", frontAudio: true },
      ],
    },
  ],
};

const anrede: Lesson = {
  id: "formelle-und-informelle-anrede",
  title: "Du oder Sie?",
  summary: "Formal and informal address, titles, and when to use which.",
  status: "ready",
  sections: [
    {
      heading: "Du oder Sie?",
      blocks: [
        {
          type: "paragraph",
          text: "German distinguishes two levels of address. Sie is the default with strangers and adults you do not know well. du is for friends, family, children, and people who offered it.",
        },
        {
          type: "table",
          caption: "When to use which",
          head: ["Situation", "Form"],
          rows: [
            ["friends, family, children", "du"],
            ["classmates, teammates", "du"],
            ["strangers, shops, offices", "Sie"],
            ["colleagues (varies by company)", "Sie, sometimes du"],
            ["authorities, officials", "Sie"],
          ],
        },
        {
          type: "example",
          de: "Wir können uns duzen.",
          en: "We can use du with each other.",
        },
        {
          type: "tip",
          text: "When in doubt, use Sie. The other person will offer du; you never have to guess.",
        },
      ],
    },
    {
      heading: "Herr und Frau",
      blocks: [
        {
          type: "paragraph",
          text: "Titles come before the last name and take the verb form of sie (plural). Frau covers both Mrs and Ms.",
        },
        {
          type: "example",
          de: "Guten Tag, Herr Schmidt! Guten Tag, Frau Weber!",
          en: "Good day, Mr Schmidt! Good day, Ms Weber!",
        },
        {
          type: "example",
          de: "Können Sie mir helfen, Frau Müller?",
          en: "Can you help me, Ms Müller?",
        },
        {
          type: "tip",
          text: "Herr + first name is a common learner mistake. In formal German it is always Herr + last name. With first names you switch to du anyway.",
        },
      ],
    },
    {
      heading: "Das Register wechseln",
      blocks: [
        {
          type: "table",
          caption: "Formal and informal pairs",
          head: ["Formal (Sie)", "Informal (du)"],
          rows: [
            ["Wie heißen Sie?", "Wie heißt du?"],
            ["Wo wohnen Sie?", "Wo wohnst du?"],
            ["Wie ist Ihr Name?", "Wie ist dein Name?"],
            ["Was möchten Sie trinken?", "Was möchtest du trinken?"],
          ],
        },
        {
          type: "tip",
          text: "The verb ending follows the pronoun: Sie wohnen like sie wohnen, but du wohnst with -st. Ihr in the possessive turns into dein with friends.",
        },
      ],
    },
  ],
  vocab: [
    { id: "duzen", de: "duzen", en: "to use du with someone", part: "verb", audio: true },
    { id: "siezen", de: "siezen", en: "to use Sie with someone", part: "verb", audio: true },
    { id: "der-herr", de: "der Herr", en: "the gentleman, Mr", part: "noun m.", plural: "die Herren", audio: true },
    { id: "die-frau", de: "die Frau", en: "the woman, Mrs, Ms", part: "noun f.", plural: "die Frauen", audio: true },
    { id: "die-anrede", de: "die Anrede", en: "the form of address", part: "noun f.", plural: "die Anreden", audio: true },
    { id: "der-kollege", de: "der Kollege", en: "the colleague (male)", part: "noun m.", plural: "die Kollegen", audio: true },
    { id: "die-kollegin", de: "die Kollegin", en: "the colleague (female)", part: "noun f.", plural: "die Kolleginnen", audio: true },
    { id: "kennen", de: "kennen", en: "to know (someone)", part: "verb", audio: true },
    { id: "helfen", de: "helfen", en: "to help", part: "verb", audio: true },
  ],
  exercises: [
    {
      id: "mc-anrede",
      type: "multiple-choice",
      title: "Du oder Sie?",
      instruction: "Choose the correct form.",
      prompt: "A stranger asks for directions. You say ...",
      options: [
        "Können Sie mir helfen?",
        "Kannst du mir helfen?",
        "Helfen du mir?",
      ],
      correctIndex: 0,
      explain: "With strangers, Sie is the default.",
    },
    {
      id: "listening-anrede",
      type: "listening",
      title: "Was hörst du?",
      instruction: "Play the audio and pick the sentence you heard.",
      prompt: "Guten Tag, Herr Schmidt!",
      options: [
        "Guten Tag, Herr Schmidt!",
        "Guten Tag, Frau Schmidt!",
        "Guten Tag, Herr Weber!",
      ],
      correctIndex: 0,
    },
    {
      id: "fill-anrede",
      type: "fill-blank",
      title: "Formal oder informell?",
      instruction: "Complete with the right pronoun.",
      sentence: "Wo wohnen ___? (formal) Wie heißt ___? (informal)",
      blanks: [
        { answers: ["Sie"], hint: "formal" },
        { answers: ["du"], hint: "informal" },
      ],
    },
    {
      id: "matching-anrede",
      type: "matching",
      title: "Formal und informell",
      instruction: "Match each formal phrase to its informal pair.",
      pairs: [
        ["Wie heißen Sie?", "Wie heißt du?"],
        ["Wo wohnen Sie?", "Wo wohnst du?"],
        ["Ihr Name", "dein Name"],
        ["Ihre Adresse", "deine Adresse"],
        ["Was möchten Sie?", "Was möchtest du?"],
      ],
    },
    {
      id: "word-order-anrede",
      type: "word-order",
      title: "Der Satz",
      instruction: "Build the sentence: We can use du with each other.",
      chunks: ["Wir", "können", "uns", "duzen."],
      explain: "The modal is second; duzen closes the sentence.",
    },
    {
      id: "flashcard-anrede",
      type: "flashcard",
      title: "Anredekarten",
      instruction: "Say the German out loud before revealing.",
      items: [
        { front: "Wie heißen Sie?", back: "What is your name? (formal)", frontAudio: true },
        { front: "Wie heißt du?", back: "What is your name? (informal)", frontAudio: true },
        { front: "Herr Schmidt", back: "Mr Schmidt", frontAudio: true },
        { front: "Frau Weber", back: "Ms Weber", frontAudio: true },
        { front: "duzen", back: "to use du", frontAudio: true },
        { front: "siezen", back: "to use Sie", frontAudio: true },
      ],
    },
  ],
};

const nomenUndVerben: Lesson = {
  id: "nomen-und-verben",
  title: "Nomen und Verben",
  summary: "How German builds its sentences: gender, capitalization, and verb endings.",
  status: "ready",
  sections: [
    {
      heading: "Was ist ein Nomen?",
      blocks: [
        {
          type: "paragraph",
          text: "A noun (das Nomen) is a word for a person, a thing, a place, or an idea: der Mann (the man), der Tisch (the table), Berlin (Berlin), die Liebe (love). In German, every noun starts with a capital letter, no matter where it sits in the sentence. This is different from English: you write Ich habe einen Termin, with a capital T on Termin, even in the middle of the sentence.",
        },
        {
          type: "paragraph",
          text: "Every German noun also has a grammatical gender. There are three: masculine (der), feminine (die), and neuter (das). The gender is not logical; it is a property of the word itself. Der Tisch is masculine, die Lampe is feminine, das Fenster is neuter. English speakers must simply learn each noun together with its article, as one piece of vocabulary: der Tisch, die Lampe, das Fenster.",
        },
        {
          type: "table",
          caption: "Nouns with articles",
          head: ["Article", "Gender", "Example", "English"],
          rows: [
            ["der", "masculine", "der Mann", "the man"],
            ["die", "feminine", "die Frau", "the woman"],
            ["das", "neuter", "das Kind", "the child"],
          ],
        },
        {
          type: "tip",
          text: "Never learn a noun alone. Learn Tisch, not Tisch. The habit of saying der Tisch, die Lampe, das Fenster is the single best thing a beginner can do.",
        },
      ],
    },
    {
      heading: "Verben und ihre Endungen",
      blocks: [
        {
          type: "paragraph",
          text: "A verb (das Verb) says what happens: learn, speak, live. In German, the verb changes its ending for each person. You do not need a separate word like 'I' or 'you' in front to know who does something; the ending already tells you.",
        },
        {
          type: "paragraph",
          text: "Take the verb lernen (to learn). Cut off the -en: you get the stem lern-. Then add the ending for each person. The pattern is the same for almost every regular verb in German.",
        },
        {
          type: "table",
          caption: "lernen conjugated",
          head: ["Person", "Ending", "Form", "English"],
          rows: [
            ["ich", "-e", "ich lerne", "I learn"],
            ["du", "-st", "du lernst", "you learn"],
            ["er / sie / es", "-t", "er lernt", "he / she / it learns"],
            ["wir", "-en", "wir lernen", "we learn"],
            ["ihr", "-t", "ihr lernt", "you (all) learn"],
            ["sie / Sie", "-en", "sie lernen", "they learn / you learn"],
          ],
        },
        {
          type: "example",
          de: "Ich lerne Deutsch. Du lernst Englisch. Er lernt Spanisch.",
          en: "I am learning German. You are learning English. He is learning Spanish.",
        },
        {
          type: "tip",
          text: "Notice how the endings follow a rhythm: -e, -st, -t, -en, -t, -en. Only sein and haben break the pattern, and you already know those two.",
        },
      ],
    },
    {
      heading: "Der erste Satz",
      blocks: [
        {
          type: "paragraph",
          text: "A basic German sentence has the same shape as English: who does something (the subject), then the verb, then everything else.",
        },
        {
          type: "example",
          de: "Ich lerne Deutsch.",
          en: "I learn German. (subject + verb + object)",
        },
        {
          type: "example",
          de: "Wir wohnen in Berlin.",
          en: "We live in Berlin.",
        },
        {
          type: "example",
          de: "Sie arbeitet in einer Praxis.",
          en: "She works in a practice.",
        },
        {
          type: "tip",
          text: "The verb sits in position two. That rule will follow you through the whole course: statements, questions, and fronted words all keep the verb second.",
        },
      ],
    },
  ],
  vocab: [
    { id: "das-nomen", de: "das Nomen", en: "the noun", part: "noun n.", plural: "die Nomen", audio: true },
    { id: "das-verb", de: "das Verb", en: "the verb", part: "noun n.", plural: "die Verben", audio: true },
    { id: "der-satz", de: "der Satz", en: "the sentence", part: "noun m.", plural: "die Sätze", audio: true },
    { id: "die-endung", de: "die Endung", en: "the ending", part: "noun f.", plural: "die Endungen", audio: true },
    { id: "der-stamm", de: "der Stamm", en: "the stem", part: "noun m.", plural: "die Stämme", audio: true },
    { id: "lernen", de: "lernen", en: "to learn", part: "verb", audio: true },
    { id: "sprechen", de: "sprechen", en: "to speak", part: "verb", audio: true },
    { id: "wohnen", de: "wohnen", en: "to live", part: "verb", audio: true },
    { id: "arbeiten", de: "arbeiten", en: "to work", part: "verb", audio: true },
    { id: "wiederholen", de: "wiederholen", en: "to repeat", part: "verb", audio: true },
    { id: "der-mann", de: "der Mann", en: "the man", part: "noun m.", plural: "die Männer", audio: true },
    { id: "die-frau", de: "die Frau", en: "the woman", part: "noun f.", plural: "die Frauen", audio: true },
    { id: "das-kind", de: "das Kind", en: "the child", part: "noun n.", plural: "die Kinder", audio: true },
  ],
  exercises: [
    {
      id: "mc-grossschreibung",
      type: "multiple-choice",
      title: "Die Großschreibung",
      instruction: "Choose the correctly capitalized sentence.",
      prompt: "In German, nouns are always capitalized. Which sentence is correct?",
      options: ["Ich habe einen Termin.", "Ich habe einen termin.", "Ich habe Einen Termin."],
      correctIndex: 0,
      explain: "Termin is a noun and takes a capital letter in the middle of the sentence.",
    },
    {
      id: "listening-endungen",
      type: "listening",
      title: "Was hörst du?",
      instruction: "Play the audio and pick the sentence you heard.",
      prompt: "Sie lernt Spanisch.",
      options: ["Sie lernt Spanisch.", "Sie lernen Spanisch.", "Ich lerne Spanisch."],
      correctIndex: 0,
    },
    {
      id: "fill-endungen",
      type: "fill-blank",
      title: "Die Endungen",
      instruction: "Complete with the right verb endings.",
      sentence: "Ich ___ Deutsch. (lernen) Du ___ Englisch. (lernen) Wir ___ in Berlin. (wohnen)",
      blanks: [
        { answers: ["lerne"], hint: "ich takes -e" },
        { answers: ["lernst"], hint: "du takes -st" },
        { answers: ["wohnen"], hint: "wir takes -en" },
      ],
    },
    {
      id: "matching-endungen",
      type: "matching",
      title: "Person und Endung",
      instruction: "Match each person to its verb ending.",
      pairs: [
        ["ich", "-e"],
        ["du", "-st"],
        ["er / sie / es", "-t"],
        ["wir", "-en"],
        ["ihr", "-t"],
      ],
    },
    {
      id: "word-order-nomen",
      type: "word-order",
      title: "Der Satz",
      instruction: "Build the sentence: I am learning German.",
      chunks: ["Ich", "lerne", "Deutsch."],
      explain: "Subject first, verb second, object after.",
    },
    {
      id: "flashcard-nomen",
      type: "flashcard",
      title: "Nomenkarten",
      instruction: "Say the German noun with its article out loud.",
      items: [
        { front: "der Mann", back: "the man", frontAudio: true },
        { front: "die Frau", back: "the woman", frontAudio: true },
        { front: "das Kind", back: "the child", frontAudio: true },
        { front: "lernen", back: "to learn", frontAudio: true },
        { front: "sprechen", back: "to speak", frontAudio: true },
        { front: "der Satz", back: "the sentence", frontAudio: true },
      ],
    },
  ],
};

const artikel: Lesson = {
  id: "artikel",
  title: "Bestimmte und unbestimmte Artikel",
  summary: "Definite (der, die, das) and indefinite (ein, eine): when to use which.",
  status: "ready",
  sections: [
    {
      heading: "Zwei Arten von Artikeln",
      blocks: [
        {
          type: "paragraph",
          text: "German has two kinds of articles, and they work like English a/an and the. The definite article points to something specific and known: der Mann, die Frau, das Kind. The indefinite article introduces something new, one of many: ein Mann, eine Frau, ein Kind.",
        },
        {
          type: "table",
          caption: "Definite and indefinite articles",
          head: ["Gender", "Definite", "Indefinite", "English"],
          rows: [
            ["masculine", "der Mann", "ein Mann", "the man / a man"],
            ["feminine", "die Frau", "eine Frau", "the woman / a woman"],
            ["neuter", "das Kind", "ein Kind", "the child / a child"],
            ["plural", "die Kinder", "keine Artikel", "the children / children"],
          ],
        },
        {
          type: "tip",
          text: "Notice the plural row: there is no indefinite article in the plural. Children in general is simply Kinder, no article.",
        },
      ],
    },
    {
      heading: "Bestimmt oder unbestimmt?",
      blocks: [
        {
          type: "paragraph",
          text: "The rule is the same as in English: first mention with ein, second mention with der/die/das. You introduce something, and from then on everyone knows which one you mean.",
        },
        {
          type: "example",
          de: "Ich habe einen Termin. Der Termin ist um zehn Uhr.",
          en: "I have an appointment. The appointment is at ten o'clock. (first ein, then der)",
        },
        {
          type: "example",
          de: "Ich suche eine Wohnung. Die Wohnung ist im dritten Stock.",
          en: "I am looking for an apartment. The apartment is on the third floor.",
        },
        {
          type: "tip",
          text: "This first-mention rule powers real conversations: you say einen Termin once, then everyone can say der Termin. It is the same logic as a and the in English.",
        },
      ],
    },
    {
      heading: "Kein Artikel",
      blocks: [
        {
          type: "paragraph",
          text: "Some things never take an article: professions after sein, cities and countries without article, and most languages.",
        },
        {
          type: "example",
          de: "Ich bin Lehrer. (no article after sein + profession)",
          en: "I am a teacher.",
        },
        {
          type: "example",
          de: "Ich wohne in Berlin. Ich spreche Deutsch.",
          en: "I live in Berlin. I speak German.",
        },
        {
          type: "tip",
          text: "Question to test yourself: is it specific and known? Use der/die/das. Is it new or one of many? Use ein/eine. Is it a profession, a city, or a language? Often no article at all.",
        },
      ],
    },
  ],
  vocab: [
    { id: "der-artikel", de: "der Artikel", en: "the article", part: "noun m.", plural: "die Artikel", audio: true },
    { id: "bestimmt", de: "bestimmt", en: "definite, specific", part: "adjective", audio: true },
    { id: "unbestimmt", de: "unbestimmt", en: "indefinite", part: "adjective", audio: true },
    { id: "der-termin", de: "der Termin", en: "the appointment", part: "noun m.", plural: "die Termine", audio: true },
    { id: "das-formular", de: "das Formular", en: "the form", part: "noun n.", plural: "die Formulare", audio: true },
    { id: "die-anmeldung", de: "die Anmeldung", en: "the registration", part: "noun f.", plural: "die Anmeldungen", audio: true },
    { id: "das-buergeramt", de: "das Bürgeramt", en: "the citizen's office", part: "noun n.", plural: "die Bürgerämter", audio: true },
    { id: "das-konto", de: "das Konto", en: "the bank account", part: "noun n.", plural: "die Konten", audio: true },
    { id: "suchen", de: "suchen", en: "to look for", part: "verb", audio: true },
    { id: "kennen", de: "kennen", en: "to know (someone/something)", part: "verb", audio: true },
  ],
  exercises: [
    {
      id: "mc-artikel",
      type: "multiple-choice",
      title: "Der Artikel",
      instruction: "Choose the correct article.",
      prompt: "Ich habe ___ Termin beim Bürgeramt.",
      options: ["einen", "der", "kein"],
      correctIndex: 0,
      explain: "First mention of a masculine noun takes einen.",
    },
    {
      id: "listening-artikel",
      type: "listening",
      title: "Was hörst du?",
      instruction: "Play the audio and pick the sentence you heard.",
      prompt: "Ich suche eine Wohnung.",
      options: ["Ich suche eine Wohnung.", "Ich suche die Wohnung.", "Ich suche kein Wohnung."],
      correctIndex: 0,
    },
    {
      id: "fill-artikel",
      type: "fill-blank",
      title: "Bestimmt oder unbestimmt?",
      instruction: "Complete with the right article.",
      sentence: "Ich habe ___ Termin. ___ Termin ist um zehn Uhr.",
      blanks: [
        { answers: ["einen"], hint: "first mention, masculine" },
        { answers: ["Der"], hint: "second mention, known" },
      ],
    },
    {
      id: "matching-artikel",
      type: "matching",
      title: "Artikel zuordnen",
      instruction: "Match each noun to its article.",
      pairs: [
        ["der Termin", "einen (accusative)"],
        ["die Wohnung", "eine"],
        ["das Formular", "ein"],
        ["die Kinder", "no article"],
        ["der Mann", "ein"],
      ],
    },
    {
      id: "word-order-artikel",
      type: "word-order",
      title: "Der Satz",
      instruction: "Build the sentence: I have an appointment at the citizen's office.",
      chunks: ["Ich", "habe", "einen", "Termin", "beim", "Bürgeramt."],
      explain: "beim is bei + dem, the dative contraction.",
    },
    {
      id: "flashcard-artikel",
      type: "flashcard",
      title: "Artikelkarten",
      instruction: "Say the German with its article out loud.",
      items: [
        { front: "der Termin", back: "the appointment", frontAudio: true },
        { front: "das Formular", back: "the form", frontAudio: true },
        { front: "die Anmeldung", back: "the registration", frontAudio: true },
        { front: "das Bürgeramt", back: "the citizen's office", frontAudio: true },
        { front: "das Konto", back: "the bank account", frontAudio: true },
        { front: "einen Termin", back: "an appointment (accusative)", frontAudio: true },
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
    nomenUndVerben,
    artikel,
    zahlen,
    zahlenAb100,
    laenderUndSprachen,
    seinUndHaben,
    persoenlicheDaten,
    anrede,
  ],
};