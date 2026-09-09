import type { Lesson, Unit } from "../../schema";

const nomenTief: Lesson = {
  id: "nomen-erklaert",
  title: "Nomen erklärt: Was ist ein Nomen?",
  summary:
    "Everything about nouns for a total beginner: capitalization, gender, plurals, and compound words.",
  status: "ready",
  sections: [
    {
      heading: "Was ist ein Nomen?",
      blocks: [
        {
          type: "paragraph",
          text: "A noun (das Nomen, also called das Substantiv) is a word for a person, an animal, a thing, a place, or an idea: der Mann (the man), der Hund (the dog), der Tisch (the table), Berlin (Berlin), die Freiheit (the freedom). You can usually touch it, see it, or at least think about it as a 'thing'. In a sentence, nouns are the stars: the sentence is about them.",
        },
        {
          type: "paragraph",
          text: "The single most important rule: in German, every noun starts with a capital letter, no matter where it appears. English capitalizes only proper names; German capitalizes every single noun. Ich habe einen Termin has a capital T because Termin is a noun. This is a gift, not a burden: it tells you instantly which words are nouns when you read German.",
        },
        {
          type: "tip",
          text: "Spot the nouns in any sentence by the capital letter: Ich trinke einen Kaffee mit Milch. Kaffee and Milch are nouns. The habit of noticing capitals trains your eye for German word types.",
        },
      ],
    },
    {
      heading: "Das grammatische Geschlecht",
      blocks: [
        {
          type: "paragraph",
          text: "Every German noun has a gender: masculine (der), feminine (die), or neuter (das). This is not about male or female in real life; it is a grammatical property of the word itself. Der Tisch (the table) is masculine, die Lampe (the lamp) is feminine, das Buch (the book) is neuter. No table is male and no book is neutral; German simply sorts its nouns into three groups.",
        },
        {
          type: "paragraph",
          text: "English speakers find this strange because English has no gender. The solution is simple but non-negotiable: learn every noun WITH its article as one word. Never learn Tisch. Learn der Tisch. After a few hundred words, the gender starts feeling natural, and the article of a new noun becomes a fact like its spelling.",
        },
        {
          type: "table",
          caption: "Gender patterns that help",
          head: ["Ending or clue", "Gender", "Examples"],
          rows: [
            ["-er (person or tool)", "der", "der Lehrer, der Computer"],
            ["-ling", "der", "der Frühling, der Lehrling"],
            ["-ung, -heit, -keit, -schaft", "die", "die Wohnung, die Freiheit, die Möglichkeit, die Freundschaft"],
            ["-ion, -tät", "die", "die Nation, die Universität"],
            ["-chen, -lein", "das", "das Mädchen, das Brötchen"],
            ["-um, -ment", "das", "das Zentrum, das Dokument"],
          ],
        },
        {
          type: "tip",
          text: "The ending patterns cover maybe half of all nouns. For the rest, there is only one reliable strategy: learn the article with the word. Die Endung -ung is always feminine: die Wohnung, die Rechnung, die Anmeldung.",
        },
      ],
    },
    {
      heading: "Der Plural",
      blocks: [
        {
          type: "paragraph",
          text: "German has five main plural patterns. There is no single rule, which is why the plural is the second thing you learn with every noun, right after the article: der Tisch, die Tische. The plural article is always die.",
        },
        {
          type: "table",
          caption: "The five plural patterns",
          head: ["Pattern", "Singular", "Plural"],
          rows: [
            ["no change (sometimes with umlaut)", "der Vater", "die Väter"],
            ["+ -e (sometimes with umlaut)", "der Tisch", "die Tische"],
            ["+ -er (often with umlaut)", "das Kind", "die Kinder"],
            ["+ -n or -en", "die Frau", "die Frauen"],
            ["+ -s", "das Auto", "die Autos"],
          ],
        },
        {
          type: "example",
          de: "Ein Tisch, zwei Tische. Eine Frau, zwei Frauen. Ein Kind, zwei Kinder. Ein Auto, zwei Autos.",
          en: "One table, two tables. One woman, two women. One child, two children. One car, two cars.",
        },
      ],
    },
    {
      heading: "Zusammengesetzte Nomen",
      blocks: [
        {
          type: "paragraph",
          text: "German builds new nouns by gluing words together: das Haus + die Tür = die Haustür. The last word decides the gender and the plural: Haustür is feminine because Tür is feminine. Compounds are everywhere and are a great vocabulary cheat: learn two simple words and you suddenly know dozens of long ones.",
        },
        {
          type: "example",
          de: "der Bahnhof = die Bahn + der Hof. Die Haustür = das Haus + die Tür. Der Kühlschrank = kühl + der Schrank.",
          en: "The station = the track + the yard. The front door = the house + the door. The fridge = cool + the cupboard.",
        },
        {
          type: "tip",
          text: "Read compounds from back to front: der Kühlschrank is a Schrank (cupboard) that is kühl (cool). The last word is always the main word.",
        },
      ],
    },
  ],
  vocab: [
    { id: "das-nomen", de: "das Nomen", en: "the noun", part: "noun n.", plural: "die Nomen", audio: true },
    { id: "das-geschlecht", de: "das Geschlecht", en: "the gender", part: "noun n.", plural: "die Geschlechter", audio: true },
    { id: "der-plural", de: "der Plural", en: "the plural", part: "noun m.", audio: true },
    { id: "die-grossschreibung", de: "die Großschreibung", en: "the capitalization", part: "noun f.", audio: true },
    { id: "die-haustuer", de: "die Haustür", en: "the front door", part: "noun f.", plural: "die Haustüren", audio: true },
    { id: "die-wohnung", de: "die Wohnung", en: "the apartment", part: "noun f.", plural: "die Wohnungen", audio: true },
    { id: "der-fruehling", de: "der Frühling", en: "the spring", part: "noun m.", audio: true },
    { id: "das-maedchen", de: "das Mädchen", en: "the girl", part: "noun n.", plural: "die Mädchen", audio: true },
    { id: "die-freiheit", de: "die Freiheit", en: "the freedom", part: "noun f.", audio: true },
  ],
  exercises: [
    {
      id: "ex-kapital",
      type: "multiple-choice",
      title: "Übung 1: Großschreibung",
      instruction: "Choose the correctly capitalized sentence.",
      prompt: "Which sentence is correct in German?",
      options: [
        "Ich habe einen Termin beim Bürgeramt.",
        "Ich habe einen termin beim bürgeramt.",
        "Ich habe einen Termin beim bürgeramt.",
      ],
      correctIndex: 0,
      explain: "Every noun gets a capital letter: Termin and Bürgeramt are nouns.",
    },
    {
      id: "ex-artikel",
      type: "multiple-choice",
      title: "Übung 2: Der Artikel",
      instruction: "Choose the correct article.",
      prompt: "___ Wohnung ist im dritten Stock.",
      options: ["Die", "Der", "Das"],
      correctIndex: 0,
      explain: "Wohnung ends in -ung, always feminine: die Wohnung.",
    },
    {
      id: "ex-plural",
      type: "fill-blank",
      title: "Übung 3: Der Plural",
      instruction: "Type the plural of the noun.",
      sentence: "der Tisch -> die ___, die Frau -> die ___, das Auto -> die ___.",
      blanks: [
        { answers: ["Tische"], hint: "+ -e" },
        { answers: ["Frauen"], hint: "+ -en" },
        { answers: ["Autos"], hint: "+ -s" },
      ],
    },
    {
      id: "ex-kompositum",
      type: "matching",
      title: "Übung 4: Zusammensetzungen",
      instruction: "Match each compound to its parts.",
      pairs: [
        ["die Haustür", "das Haus + die Tür"],
        ["der Kühlschrank", "kühl + der Schrank"],
        ["der Bahnhof", "die Bahn + der Hof"],
        ["das Schlafzimmer", "schlafen + das Zimmer"],
        ["die Fahrkarte", "fahren + die Karte"],
      ],
    },
    {
      id: "ex-nomen-satz",
      type: "word-order",
      title: "Übung 5: Der Satz",
      instruction: "Build the sentence: I am drinking a coffee with milk.",
      chunks: ["Ich", "trinke", "einen", "Kaffee", "mit", "Milch."],
      explain: "Kaffee and Milch are nouns; mit takes the dative.",
    },
    {
      id: "ex-nomen-karten",
      type: "flashcard",
      title: "Übung 6: Nomenkarten",
      instruction: "Say the noun with its article out loud.",
      items: [
        { front: "der Tisch", back: "the table", frontAudio: true },
        { front: "die Wohnung", back: "the apartment", frontAudio: true },
        { front: "das Kind", back: "the child", frontAudio: true },
        { front: "die Freiheit", back: "the freedom", frontAudio: true },
        { front: "der Frühling", back: "the spring", frontAudio: true },
        { front: "das Mädchen", back: "the girl", frontAudio: true },
      ],
    },
  ],
};

const verbenTief: Lesson = {
  id: "verben-erklaert",
  title: "Verben erklärt: Wie Verben arbeiten",
  summary:
    "Everything about verbs for a total beginner: the ending system, sein and haben, strong verbs, modals, and separables.",
  status: "ready",
  sections: [
    {
      heading: "Was ist ein Verb?",
      blocks: [
        {
          type: "paragraph",
          text: "A verb (das Verb) says what happens or what someone does: lernen (to learn), wohnen (to live), essen (to eat), sein (to be). In every German sentence, the verb is the engine: it tells you who acts and when. German verbs change their ending for every person, which means the verb itself carries information that English words like 'I', 'you', and 'we' carry separately.",
        },
        {
          type: "paragraph",
          text: "The system is simple: take the infinitive (lernen), remove -en to get the stem (lern-), and add the ending for the person. ich lern-e, du lern-st, er lern-t, wir lern-en, ihr lern-t, sie lern-en. The endings follow a fixed rhythm: -e, -st, -t, -en, -t, -en. Once the rhythm is in your ear, most verbs conjugate themselves.",
        },
        {
          type: "table",
          caption: "lernen and arbeiten",
          head: ["Person", "lernen", "arbeiten"],
          rows: [
            ["ich", "lerne", "arbeite"],
            ["du", "lernst", "arbeitest"],
            ["er / sie / es", "lernt", "arbeitet"],
            ["wir", "lernen", "arbeiten"],
            ["ihr", "lernt", "arbeitet"],
            ["sie / Sie", "lernen", "arbeiten"],
          ],
        },
        {
          type: "tip",
          text: "Verbs whose stem ends in -t or -d (arbeiten, warten) add an -e before the -st and -t endings: du arbeitest, er arbeitet. That is the only exception in the regular system.",
        },
      ],
    },
    {
      heading: "sein und haben: die zwei Sonderfälle",
      blocks: [
        {
          type: "paragraph",
          text: "Two verbs break every pattern, and they are the two most important verbs in the language: sein (to be) and haben (to have). Learn their six forms as one chant. You need them every day: to say who you are, what you have, where you live, and (later) what happened.",
        },
        {
          type: "table",
          caption: "sein and haben",
          head: ["Person", "sein", "haben"],
          rows: [
            ["ich", "bin", "habe"],
            ["du", "bist", "hast"],
            ["er / sie / es", "ist", "hat"],
            ["wir", "sind", "haben"],
            ["ihr", "seid", "habt"],
            ["sie / Sie", "sind", "haben"],
          ],
        },
        {
          type: "example",
          de: "Ich bin Anna. Du bist müde. Er ist mein Bruder. Wir sind aus Berlin.",
          en: "I am Anna. You are tired. He is my brother. We are from Berlin.",
        },
        {
          type: "tip",
          text: "Chant them aloud: bin, bist, ist, sind, seid, sind. Then: habe, hast, hat, haben, habt, haben. Five minutes of chanting beats an hour of reading.",
        },
      ],
    },
    {
      heading: "Starke Verben: der Vokalwechsel",
      blocks: [
        {
          type: "paragraph",
          text: "A small group of very common verbs is strong: in the du and er/sie/es forms, the vowel of the stem changes. The patterns are a becomes ä (fahren -> du fährst), e becomes i (sprechen -> du sprichst), and e becomes ie (lesen -> du liest). The ich, wir, ihr, and sie forms stay regular.",
        },
        {
          type: "table",
          caption: "The strong verb patterns",
          head: ["Infinitive", "du", "er / sie / es"],
          rows: [
            ["fahren", "fährst", "fährt"],
            ["schlafen", "schläfst", "schläft"],
            ["sprechen", "sprichst", "spricht"],
            ["essen", "isst", "isst"],
            ["lesen", "liest", "liest"],
            ["sehen", "siehst", "sieht"],
          ],
        },
        {
          type: "tip",
          text: "The change happens exactly where the ending is strongest, only for du and er/sie/es. Wir sprechen, ihr sprecht, sie sprechen are completely regular.",
        },
      ],
    },
    {
      heading: "Modalverben: können, möchten, wollen, müssen",
      blocks: [
        {
          type: "paragraph",
          text: "Modal verbs change the mood of the sentence: can, would like to, want to, must. They are always accompanied by a second verb in the infinitive, which waits at the very end of the sentence. The modal itself takes the second position, exactly like every other verb.",
        },
        {
          type: "example",
          de: "Ich kann gut schwimmen. Ich möchte einen Kaffee trinken. Du musst um acht Uhr kommen.",
          en: "I can swim well. I would like to drink a coffee. You must come at eight.",
        },
        {
          type: "table",
          caption: "Present tense of the modals",
          head: ["Person", "können", "möchten", "wollen", "müssen"],
          rows: [
            ["ich", "kann", "möchte", "will", "muss"],
            ["du", "kannst", "möchtest", "willst", "musst"],
            ["er / sie / es", "kann", "möchte", "will", "muss"],
            ["wir", "können", "möchten", "wollen", "müssen"],
            ["ihr", "könnt", "möchtet", "wollt", "müsst"],
            ["sie / Sie", "können", "möchten", "wollen", "müssen"],
          ],
        },
      ],
    },
    {
      heading: "Trennbare Verben und das Perfekt",
      blocks: [
        {
          type: "paragraph",
          text: "Separable verbs are verbs with a movable prefix: aufstehen (to get up) is auf + stehen. In a main clause, the prefix jumps to the end: Ich stehe um sieben Uhr auf. With modal verbs the verb stays together: Ich muss um sieben Uhr aufstehen. In the Perfekt, the ge- of the participle slips between prefix and stem: aufgestanden.",
        },
        {
          type: "example",
          de: "Ich stehe um sieben auf. Ich habe gestern lange geschlafen. Wir sind nach Berlin gefahren.",
          en: "I get up at seven. I slept long yesterday. We drove to Berlin.",
        },
        {
          type: "tip",
          text: "The Perfekt is the spoken past: haben or sein in the present, participle at the end. Movement and change use sein (gefahren), everything else uses haben (geschlafen).",
        },
      ],
    },
  ],
  vocab: [
    { id: "das-verb", de: "das Verb", en: "the verb", part: "noun n.", plural: "die Verben", audio: true },
    { id: "der-stamm", de: "der Stamm", en: "the stem", part: "noun m.", plural: "die Stämme", audio: true },
    { id: "die-endung", de: "die Endung", en: "the ending", part: "noun f.", plural: "die Endungen", audio: true },
    { id: "konjugieren", de: "konjugieren", en: "to conjugate", part: "verb", audio: true },
    { id: "stark", de: "stark", en: "strong", part: "adjective", audio: true },
    { id: "das-modalverb", de: "das Modalverb", en: "the modal verb", part: "noun n.", plural: "die Modalverben", audio: true },
    { id: "das-partizip", de: "das Partizip", en: "the participle", part: "noun n.", plural: "die Partizipien", audio: true },
    { id: "die-arbeit", de: "die Arbeit", en: "the work", part: "noun f.", plural: "die Arbeiten", audio: true },
    { id: "warten", de: "warten", en: "to wait", part: "verb", audio: true },
    { id: "schlafen", de: "schlafen", en: "to sleep", part: "verb", audio: true },
  ],
  exercises: [
    {
      id: "ex-endung",
      type: "multiple-choice",
      title: "Übung 1: Die Endung",
      instruction: "Choose the correct ending.",
      prompt: "Du ___ Deutsch. (lernen)",
      options: ["lernst", "lerne", "lernt"],
      correctIndex: 0,
      explain: "du takes -st: lernst.",
    },
    {
      id: "ex-sein-haben",
      type: "fill-blank",
      title: "Übung 2: sein und haben",
      instruction: "Type the correct form.",
      sentence: "Ich ___ Anna. Du ___ müde. Sie ___ einen Bruder. Wir ___ aus Berlin.",
      blanks: [
        { answers: ["bin"], hint: "sein, ich" },
        { answers: ["bist"], hint: "sein, du" },
        { answers: ["hat"], hint: "haben, sie" },
        { answers: ["sind"], hint: "sein, wir" },
      ],
    },
    {
      id: "ex-stark",
      type: "multiple-choice",
      title: "Übung 3: Starke Verben",
      instruction: "Choose the correct du-form.",
      prompt: "fahren (du): ___",
      options: ["fährst", "fahrst", "fahrt"],
      correctIndex: 0,
      explain: "a becomes ä in the du-form: fährst.",
    },
    {
      id: "ex-modal",
      type: "matching",
      title: "Übung 4: Modalverben",
      instruction: "Match each modal to its meaning.",
      pairs: [
        ["können", "can"],
        ["möchten", "would like to"],
        ["wollen", "want to"],
        ["müssen", "must"],
        ["dürfen", "may"],
      ],
    },
    {
      id: "ex-trennbar",
      type: "word-order",
      title: "Übung 5: Trennbare Verben",
      instruction: "Build the sentence: I get up at seven o'clock.",
      chunks: ["Ich", "stehe", "um", "sieben", "Uhr", "auf."],
      explain: "The prefix auf closes the sentence.",
    },
    {
      id: "ex-verbkarten",
      type: "flashcard",
      title: "Übung 6: Verbkarten",
      instruction: "Say the infinitive and the du-form out loud.",
      items: [
        { front: "lernen", back: "du lernst", frontAudio: true },
        { front: "sein", back: "du bist", frontAudio: true },
        { front: "haben", back: "du hast", frontAudio: true },
        { front: "fahren", back: "du fährst", frontAudio: true },
        { front: "sprechen", back: "du sprichst", frontAudio: true },
        { front: "können", back: "du kannst", frontAudio: true },
      ],
    },
  ],
};

const pronomenTief: Lesson = {
  id: "pronomen-erklaert",
  title: "Pronomen erklärt: ich, du, er und ihre Fälle",
  summary:
    "Everything about pronouns for a total beginner: the full set, why they change, and the special ones man and es.",
  status: "ready",
  sections: [
    {
      heading: "Was ist ein Pronomen?",
      blocks: [
        {
          type: "paragraph",
          text: "A pronoun (das Pronomen) is a small word that stands in for a noun: instead of saying Anna every time, you say sie (she). German pronouns change their form depending on their job in the sentence: the same person is ich as the subject, mich as the direct object, and mir as the receiver. English does the same, just less visibly: I, me, my.",
        },
        {
          type: "table",
          caption: "The personal pronouns in three cases",
          head: ["Person", "Nominative", "Accusative", "Dative"],
          rows: [
            ["I", "ich", "mich", "mir"],
            ["you (informal)", "du", "dich", "dir"],
            ["he", "er", "ihn", "ihm"],
            ["she", "sie", "sie", "ihr"],
            ["it", "es", "es", "ihm"],
            ["we", "wir", "uns", "uns"],
            ["you (plural)", "ihr", "euch", "euch"],
            ["they / you (formal)", "sie / Sie", "sie / Sie", "ihnen / Ihnen"],
          ],
        },
        {
          type: "tip",
          text: "Learn the table in threes: ich-mich-mir, du-dich-dir, er-ihn-ihm. The pattern repeats: nominative, accusative, dative. Say them aloud until the threes become one word.",
        },
      ],
    },
    {
      heading: "er, sie, es: das Geschlecht der Nomen",
      blocks: [
        {
          type: "paragraph",
          text: "German pronouns follow the gender of the noun, not the real person. Der Tisch becomes er, die Lampe becomes sie, das Buch becomes es. This is why learning the article is so important: without the article, you cannot choose the pronoun.",
        },
        {
          type: "example",
          de: "Das ist mein Bruder. Er heißt Paul. Das ist meine Oma. Sie ist 80. Das ist das Buch. Es ist neu.",
          en: "This is my brother. He is called Paul. This is my grandma. She is 80. This is the book. It is new.",
        },
        {
          type: "tip",
          text: "When you see er or sie, ask: which noun does it replace? The gender of the noun decides everything.",
        },
      ],
    },
    {
      heading: "man und es",
      blocks: [
        {
          type: "paragraph",
          text: "Two pronouns have no English counterpart. man means 'people in general' or 'one': Man spricht Deutsch (German is spoken). It takes the same verb form as er. es is the weather and formality pronoun: Es regnet (it rains), Es ist kalt (it is cold), Es gibt einen Park (there is a park). It is also the placeholder subject: Es ist wichtig, Deutsch zu lernen (it is important to learn German).",
        },
        {
          type: "example",
          de: "Man darf hier nicht rauchen. Es regnet. Es gibt viele Geschäfte.",
          en: "You (people) may not smoke here. It is raining. There are many shops.",
        },
        {
          type: "tip",
          text: "Man is not a man! It is 'people in general'. Es gibt always means there is or there are.",
        },
      ],
    },
  ],
  vocab: [
    { id: "das-pronomen", de: "das Pronomen", en: "the pronoun", part: "noun n.", plural: "die Pronomen", audio: true },
    { id: "ich", de: "ich", en: "I", part: "pronoun", audio: true },
    { id: "mich", de: "mich", en: "me (accusative)", part: "pronoun", audio: true },
    { id: "mir", de: "mir", en: "to me (dative)", part: "pronoun", audio: true },
    { id: "man", de: "man", en: "one, people in general", part: "pronoun", audio: true },
    { id: "es-gibt", de: "es gibt", en: "there is / there are", part: "phrase", phrase: true, audio: true },
    { id: "der-vertreter", de: "der Stellvertreter", en: "the stand-in, the deputy", part: "noun m.", plural: "die Stellvertreter", audio: true },
    { id: "ersetzen", de: "ersetzen", en: "to replace", part: "verb", audio: true },
  ],
  exercises: [
    {
      id: "ex-dreiheit",
      type: "multiple-choice",
      title: "Übung 1: Die Dreiergruppe",
      instruction: "Choose the accusative form.",
      prompt: "Ich sehe den Mann. Ich sehe ___.",
      options: ["ihn", "er", "ihm"],
      correctIndex: 0,
      explain: "After sehen, er becomes ihn.",
    },
    {
      id: "ex-dativ",
      type: "multiple-choice",
      title: "Übung 2: Der Dativ",
      instruction: "Choose the dative pronoun.",
      prompt: "Kannst du ___ helfen? (me)",
      options: ["mir", "mich", "ich"],
      correctIndex: 0,
      explain: "helfen takes the dative: mir.",
    },
    {
      id: "ex-man-es",
      type: "fill-blank",
      title: "Übung 3: man und es",
      instruction: "Complete with man or es.",
      sentence: "___ regnet heute. ___ spricht hier Deutsch. ___ gibt viele Geschäfte. ___ ist kalt.",
      blanks: [
        { answers: ["Es"], hint: "weather" },
        { answers: ["Man"], hint: "people in general" },
        { answers: ["Es"], hint: "there is" },
        { answers: ["Es"], hint: "weather" },
      ],
    },
    {
      id: "ex-pronomen-tabelle",
      type: "matching",
      title: "Übung 4: Die Tabelle",
      instruction: "Match each nominative to its accusative and dative.",
      pairs: [
        ["ich", "mich, mir"],
        ["du", "dich, dir"],
        ["er", "ihn, ihm"],
        ["wir", "uns, uns"],
        ["sie (she)", "sie, ihr"],
      ],
    },
    {
      id: "ex-pronomen-satz",
      type: "word-order",
      title: "Übung 5: Der Satz",
      instruction: "Build the sentence: She knows me.",
      chunks: ["Sie", "kennt", "mich."],
      explain: "The verb is second; the accusative follows.",
    },
    {
      id: "ex-pronomen-karten",
      type: "flashcard",
      title: "Übung 6: Pronomenkarten",
      instruction: "Say the three forms out loud.",
      items: [
        { front: "ich", back: "mich, mir", frontAudio: true },
        { front: "du", back: "dich, dir", frontAudio: true },
        { front: "er", back: "ihn, ihm", frontAudio: true },
        { front: "man", back: "people in general", frontAudio: true },
        { front: "es gibt", back: "there is", frontAudio: true },
        { front: "uns", back: "us", frontAudio: true },
      ],
    },
  ],
};

const artikelTief: Lesson = {
  id: "artikel-erklaert",
  title: "Artikel erklärt: der, ein, kein",
  summary:
    "Everything about articles for a total beginner: why they exist, the full table, and the contractions.",
  status: "ready",
  sections: [
    {
      heading: "Warum gibt es Artikel?",
      blocks: [
        {
          type: "paragraph",
          text: "An article (der Artikel) is the little word in front of a noun: der, die, das, ein, eine, kein. German uses articles constantly because they carry information English speakers get from word order: the article tells you the gender of the noun, whether it is known or new, and which case it is in. Der Mann, dem Mann, and den Mann are all 'the man' in English, but German uses the article to show who does what.",
        },
        {
          type: "paragraph",
          text: "There are three families: the definite articles der, die, das (the), the indefinite ein, eine, ein (a, an), and the negative kein, keine, kein (no). Each family has its own set of forms for gender and case. The good news: they all change in the same pattern, and only the masculine looks different in the accusative.",
        },
        {
          type: "table",
          caption: "The full article table",
          head: ["Case", "der (m.)", "die (f.)", "das (n.)", "die (pl.)"],
          rows: [
            ["Nominative", "der Mann", "die Frau", "das Kind", "die Kinder"],
            ["Accusative", "den Mann", "die Frau", "das Kind", "die Kinder"],
            ["Dative", "dem Mann", "der Frau", "dem Kind", "den Kindern"],
          ],
        },
        {
          type: "tip",
          text: "Read the table as a story: the nominative is who, the accusative is whom, the dative is to whom. Only der changes in the accusative (den), and only the plural adds -n in the dative (den Kindern).",
        },
      ],
    },
    {
      heading: "ein und kein: die ein-Familie",
      blocks: [
        {
          type: "paragraph",
          text: "ein (a, an) introduces something new. kein (no, not a) is its negative twin. They decline exactly like each other, and their endings are short: masculine gets nothing in the nominative (ein Mann) and -en in the accusative (einen Mann), feminine gets -e (eine Frau), neuter nothing (ein Kind). kein even has a plural, which ein does not: keine Kinder.",
        },
        {
          type: "table",
          caption: "ein and kein",
          head: ["Case", "ein (m.)", "ein (n.)", "eine (f.)", "kein (pl.)"],
          rows: [
            ["Nominative", "ein Mann", "ein Kind", "eine Frau", "keine Kinder"],
            ["Accusative", "einen Mann", "ein Kind", "eine Frau", "keine Kinder"],
            ["Dative", "einem Mann", "einem Kind", "einer Frau", "keinen Kindern"],
          ],
        },
        {
          type: "example",
          de: "Ich habe einen Termin. Ich habe kein Auto.",
          en: "I have an appointment. I have no car.",
        },
      ],
    },
    {
      heading: "Die Kontraktionen",
      blocks: [
        {
          type: "paragraph",
          text: "Preposition and article melt together in everyday speech: in dem becomes im, zu dem becomes zum, bei dem becomes beim. These contractions are not optional; am and im are the normal way to speak.",
        },
        {
          type: "table",
          caption: "The everyday contractions",
          head: ["Full form", "Contracted", "Example"],
          rows: [
            ["an dem", "am", "am Montag"],
            ["in dem", "im", "im Sommer"],
            ["zu dem", "zum", "zum Bahnhof"],
            ["zu der", "zur", "zur Schule"],
            ["bei dem", "beim", "beim Arzt"],
            ["von dem", "vom", "vom Bahnhof"],
            ["in das", "ins", "ins Kino"],
          ],
        },
        {
          type: "tip",
          text: "Every contraction is a preposition plus an article with meaning. When you hear am, think an + dem. Knowing the pieces makes the whole system predictable.",
        },
      ],
    },
  ],
  vocab: [
    { id: "der-artikel", de: "der Artikel", en: "the article", part: "noun m.", plural: "die Artikel", audio: true },
    { id: "bestimmt", de: "bestimmt", en: "definite", part: "adjective", audio: true },
    { id: "unbestimmt", de: "unbestimmt", en: "indefinite", part: "adjective", audio: true },
    { id: "der-fall", de: "der Fall", en: "the case", part: "noun m.", plural: "die Fälle", audio: true },
    { id: "die-kontraktion", de: "die Kontraktion", en: "the contraction", part: "noun f.", plural: "die Kontraktionen", audio: true },
    { id: "dem-mann", de: "dem Mann", en: "to the man (dative)", part: "phrase", phrase: true, audio: true },
    { id: "den-mann", de: "den Mann", en: "the man (accusative)", part: "phrase", phrase: true, audio: true },
    { id: "einen-termin", de: "einen Termin", en: "an appointment (accusative)", part: "phrase", phrase: true, audio: true },
    { id: "keine-kinder", de: "keine Kinder", en: "no children", part: "phrase", phrase: true, audio: true },
  ],
  exercises: [
    {
      id: "ex-tabelle",
      type: "multiple-choice",
      title: "Übung 1: Die Tabelle",
      instruction: "Choose the correct form.",
      prompt: "Ich sehe ___ Mann. (accusative)",
      options: ["den", "der", "dem"],
      correctIndex: 0,
      explain: "The masculine accusative is den.",
    },
    {
      id: "ex-dativ",
      type: "multiple-choice",
      title: "Übung 2: Der Dativ",
      instruction: "Choose the dative form.",
      prompt: "Das Buch liegt auf ___ Tisch.",
      options: ["dem", "den", "der"],
      correctIndex: 0,
      explain: "Static location takes the dative: auf dem Tisch.",
    },
    {
      id: "ex-ein-kein",
      type: "fill-blank",
      title: "Übung 3: ein und kein",
      instruction: "Complete with ein or kein forms.",
      sentence: "Ich habe ___ Termin. Ich habe ___ Auto. Ich habe ___ Schwester. Ich habe ___ Kinder.",
      blanks: [
        { answers: ["einen"], hint: "masculine accusative" },
        { answers: ["kein"], hint: "neuter nominative" },
        { answers: ["keine"], hint: "feminine" },
        { answers: ["keine"], hint: "plural" },
      ],
    },
    {
      id: "ex-kontraktionen",
      type: "matching",
      title: "Übung 4: Kontraktionen",
      instruction: "Match each contraction to its full form.",
      pairs: [
        ["am", "an dem"],
        ["im", "in dem"],
        ["zum", "zu dem"],
        ["beim", "bei dem"],
        ["ins", "in das"],
      ],
    },
    {
      id: "ex-artikel-satz",
      type: "word-order",
      title: "Übung 5: Der Satz",
      instruction: "Build the sentence: I have an appointment at the citizen's office.",
      chunks: ["Ich", "habe", "einen", "Termin", "beim", "Bürgeramt."],
      explain: "einen is the accusative, beim is bei + dem.",
    },
    {
      id: "ex-artikel-karten",
      type: "flashcard",
      title: "Übung 6: Artikelkarten",
      instruction: "Say the German phrase out loud before revealing.",
      items: [
        { front: "den Mann", back: "the man (accusative)", frontAudio: true },
        { front: "dem Mann", back: "to the man (dative)", frontAudio: true },
        { front: "einen Termin", back: "an appointment", frontAudio: true },
        { front: "keine Kinder", back: "no children", frontAudio: true },
        { front: "zum Bahnhof", back: "to the station", frontAudio: true },
        { front: "ins Kino", back: "to the cinema", frontAudio: true },
      ],
    },
  ],
};

const faelleTief: Lesson = {
  id: "faelle-erklaert",
  title: "Fälle erklärt: Nominativ, Akkusativ, Dativ",
  summary:
    "Everything about cases for a total beginner: what they are, why German has them, and the four questions.",
  status: "ready",
  sections: [
    {
      heading: "Was ist ein Fall?",
      blocks: [
        {
          type: "paragraph",
          text: "A case (der Fall) is the grammatical role of a noun in a sentence. German has four cases, and each one has its own question word: wer (who) for the nominative, wen (whom) for the accusative, wem (to whom) for the dative, and wessen (whose) for the genitive. The case changes the article and the pronoun in front of the noun.",
        },
        {
          type: "paragraph",
          text: "Why does German do this? Because word order is flexible: in German, the person doing the action and the thing receiving it are marked by their endings, so the sentence can move words around freely. Ich gebe dem Kind einen Apfel means the child gets the apple; German knows who gets what from the articles dem and einen, not from the word order.",
        },
        {
          type: "table",
          caption: "The four cases and their questions",
          head: ["Case", "Question", "Job", "Example"],
          rows: [
            ["Nominative", "wer?", "the subject, who acts", "Der Mann schläft."],
            ["Accusative", "wen?", "the direct object, who is acted on", "Ich sehe den Mann."],
            ["Dative", "wem?", "the receiver, who benefits", "Ich gebe dem Mann einen Apfel."],
            ["Genitive", "wessen?", "possession (B1 topic)", "Das Auto des Mannes."],
          ],
        },
        {
          type: "tip",
          text: "Learn the question test: put each noun into its question. Wen sehe ich? Den Mann. That is the accusative. Wem gebe ich den Apfel? Dem Mann. That is the dative.",
        },
      ],
    },
    {
      heading: "Der Nominativ: das Subjekt",
      blocks: [
        {
          type: "paragraph",
          text: "The nominative is the base form, the one in the dictionary: der Mann, die Frau, das Kind. It is the subject, the person or thing the sentence is about, the one doing the verb. The nominative answers wer?.",
        },
        {
          type: "example",
          de: "Der Mann schläft. Die Frau arbeitet. Das Kind spielt.",
          en: "The man sleeps. The woman works. The child plays.",
        },
      ],
    },
    {
      heading: "Der Akkusativ: das direkte Objekt",
      blocks: [
        {
          type: "paragraph",
          text: "The accusative is the direct object: the person or thing the action happens to. Verbs like haben, sehen, kaufen, essen, and brauchen always take the accusative. Only the masculine changes visibly: der becomes den, ein becomes einen.",
        },
        {
          type: "example",
          de: "Ich sehe den Mann. Ich kaufe einen Apfel. Sie hat einen Bruder.",
          en: "I see the man. I buy an apple. She has a brother.",
        },
        {
          type: "tip",
          text: "The accusative is the easiest case: only masculine nouns change, and they change exactly the same way every time. Den and einen are the whole rule.",
        },
      ],
    },
    {
      heading: "Der Dativ: der Empfänger",
      blocks: [
        {
          type: "paragraph",
          text: "The dative is the receiver: the person who gets something, benefits, or is helped. It answers wem?. The articles change more visibly: dem, der, dem, and the plural adds -n (den Kindern). It also appears after the fixed prepositions mit, nach, aus, zu, von, bei and with verbs like helfen, schmecken, gefallen, gehören.",
        },
        {
          type: "example",
          de: "Ich gebe dem Kind einen Apfel. Das schmeckt mir. Ich fahre mit dem Zug.",
          en: "I give the child an apple. That tastes good to me. I travel by train.",
        },
        {
          type: "tip",
          text: "The dative is the case of giving: wem? Ask it after every giving verb and every mit/zu/bei phrase and the right case follows.",
        },
      ],
    },
  ],
  vocab: [
    { id: "der-fall", de: "der Fall", en: "the case", part: "noun m.", plural: "die Fälle", audio: true },
    { id: "der-nominativ", de: "der Nominativ", en: "the nominative", part: "noun m.", audio: true },
    { id: "der-akkusativ", de: "der Akkusativ", en: "the accusative", part: "noun m.", audio: true },
    { id: "der-dativ", de: "der Dativ", en: "the dative", part: "noun m.", audio: true },
    { id: "das-subjekt", de: "das Subjekt", en: "the subject", part: "noun n.", plural: "die Subjekte", audio: true },
    { id: "das-objekt", de: "das Objekt", en: "the object", part: "noun n.", plural: "die Objekte", audio: true },
    { id: "der-empfaenger", de: "der Empfänger", en: "the receiver", part: "noun m.", plural: "die Empfänger", audio: true },
    { id: "wer", de: "wer?", en: "who?", part: "question word", audio: true },
    { id: "wen", de: "wen?", en: "whom?", part: "question word", audio: true },
    { id: "wem", de: "wem?", en: "to whom?", part: "question word", audio: true },
  ],
  exercises: [
    {
      id: "ex-fall-fragen",
      type: "multiple-choice",
      title: "Übung 1: Die Fragen",
      instruction: "Choose the question for the accusative.",
      prompt: "Wen oder was? That is the question for the ...",
      options: ["accusative", "nominative", "dative"],
      correctIndex: 0,
      explain: "wen? asks for the direct object, the accusative.",
    },
    {
      id: "ex-nom-akk",
      type: "multiple-choice",
      title: "Übung 2: Nominativ oder Akkusativ?",
      instruction: "Choose the correct form.",
      prompt: "Ich sehe ___ Mann.",
      options: ["den", "der", "dem"],
      correctIndex: 0,
      explain: "sehen takes the accusative: den Mann.",
    },
    {
      id: "ex-dativ-erklaert",
      type: "fill-blank",
      title: "Übung 3: Der Dativ",
      instruction: "Complete with the dative forms.",
      sentence: "Ich gebe ___ Kind einen Apfel. Das Buch gehört ___ Frau. Ich fahre mit ___ Zug.",
      blanks: [
        { answers: ["dem"], hint: "dative, neuter" },
        { answers: ["der"], hint: "dative, feminine" },
        { answers: ["dem"], hint: "dative after mit" },
      ],
    },
    {
      id: "ex-faelle-matching",
      type: "matching",
      title: "Übung 4: Fälle zuordnen",
      instruction: "Match each form to its case.",
      pairs: [
        ["der Mann", "nominative"],
        ["den Mann", "accusative"],
        ["dem Mann", "dative"],
        ["einen Apfel", "accusative"],
        ["dem Kind", "dative"],
      ],
    },
    {
      id: "ex-faelle-satz",
      type: "word-order",
      title: "Übung 5: Der Satz",
      instruction: "Build the sentence: I give the child an apple.",
      chunks: ["Ich", "gebe", "dem", "Kind", "einen", "Apfel."],
      explain: "Dative receiver first, accusative thing second.",
    },
    {
      id: "ex-faelle-karten",
      type: "flashcard",
      title: "Übung 6: Fallkarten",
      instruction: "Say the three forms out loud.",
      items: [
        { front: "der Mann", back: "den, dem", frontAudio: true },
        { front: "die Frau", back: "die, der", frontAudio: true },
        { front: "das Kind", back: "das, dem", frontAudio: true },
        { front: "ein Apfel", back: "einen, einem", frontAudio: true },
        { front: "wer?", back: "nominative", frontAudio: true },
        { front: "wem?", back: "dative", frontAudio: true },
      ],
    },
  ],
};

export const grammatikKompakt1: Unit = {
  id: "grammatik-kompakt-1",
  title: "Grammatik Kompakt 1",
  theme: "Grammar deep dives",
  lessons: [nomenTief, verbenTief, pronomenTief, artikelTief, faelleTief],
};