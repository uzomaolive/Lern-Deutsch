import type { Lesson, Unit } from "../../schema";

const berufe: Lesson = {
  id: "berufe",
  title: "Berufe",
  summary: "Professions and workplaces; Was sind Sie von Beruf?",
  status: "ready",
  sections: [
    {
      heading: "Die Berufe",
      blocks: [
        {
          type: "table",
          caption: "Professions",
          head: ["German (male)", "German (female)", "English"],
          rows: [
            ["der Arzt", "die Ärztin", "doctor"],
            ["der Lehrer", "die Lehrerin", "teacher"],
            ["der Ingenieur", "die Ingenieurin", "engineer"],
            ["der Verkäufer", "die Verkäuferin", "salesperson"],
            ["der Koch", "die Köchin", "cook"],
            ["der Kellner", "die Kellnerin", "waiter"],
            ["der Polizist", "die Polizistin", "police officer"],
            ["der Student", "die Studentin", "student"],
            ["der Fahrer", "die Fahrerin", "driver"],
            ["der Anwalt", "die Anwältin", "lawyer"],
            ["der Musiker", "die Musikerin", "musician"],
            ["die Krankenschwester", "die Krankenschwester", "nurse"],
          ],
        },
        {
          type: "tip",
          text: "The female form adds -in to the male form: der Lehrer -> die Lehrerin. The umlaut can also appear: der Koch -> die Köchin.",
        },
      ],
    },
    {
      heading: "Was sind Sie von Beruf?",
      blocks: [
        {
          type: "example",
          de: "Was sind Sie von Beruf? Ich bin Lehrer.",
          en: "What is your profession? I am a teacher.",
        },
        {
          type: "example",
          de: "Was machen Sie beruflich? Ich arbeite als Ingenieur.",
          en: "What do you do for a living? I work as an engineer.",
        },
        {
          type: "example",
          de: "Er arbeitet als Koch in einem Restaurant.",
          en: "He works as a cook in a restaurant.",
        },
        {
          type: "tip",
          text: "No article after sein with professions: Ich bin Lehrer, not Ich bin ein Lehrer. als introduces the role: arbeiten als.",
        },
      ],
    },
  ],
  vocab: [
    { id: "der-arzt", de: "der Arzt", en: "the doctor", part: "noun m.", plural: "die Ärzte", audio: true },
    { id: "die-aerztin", de: "die Ärztin", en: "the doctor (female)", part: "noun f.", plural: "die Ärztinnen", audio: true },
    { id: "der-lehrer", de: "der Lehrer", en: "the teacher", part: "noun m.", plural: "die Lehrer", audio: true },
    { id: "die-lehrerin", de: "die Lehrerin", en: "the teacher (female)", part: "noun f.", plural: "die Lehrerinnen", audio: true },
    { id: "der-koch", de: "der Koch", en: "the cook", part: "noun m.", plural: "die Köche", audio: true },
    { id: "die-koechin", de: "die Köchin", en: "the cook (female)", part: "noun f.", plural: "die Köchinnen", audio: true },
    { id: "der-verkaeufer", de: "der Verkäufer", en: "the salesperson", part: "noun m.", plural: "die Verkäufer", audio: true },
    { id: "der-polizist", de: "der Polizist", en: "the police officer", part: "noun m.", plural: "die Polizisten", audio: true },
    { id: "der-fahrer", de: "der Fahrer", en: "the driver", part: "noun m.", plural: "die Fahrer", audio: true },
    { id: "der-anwalt", de: "der Anwalt", en: "the lawyer", part: "noun m.", plural: "die Anwälte", audio: true },
    { id: "die-krankenschwester", de: "die Krankenschwester", en: "the nurse", part: "noun f.", plural: "die Krankenschwestern", audio: true },
    { id: "der-beruf", de: "der Beruf", en: "the profession", part: "noun m.", plural: "die Berufe", audio: true },
    { id: "was-sind-sie", de: "Was sind Sie von Beruf?", en: "What is your profession?", part: "phrase", phrase: true, audio: true },
    { id: "als", de: "als", en: "as (role)", part: "conjunction", audio: true },
  ],
  exercises: [
    {
      id: "mc-berufe",
      type: "multiple-choice",
      title: "Der Beruf",
      instruction: "Choose the correct profession.",
      prompt: "Wer arbeitet in einem Restaurant und kocht?",
      options: ["der Koch", "der Kellner", "der Fahrer"],
      correctIndex: 0,
      explain: "The person who cooks is der Koch.",
    },
    {
      id: "listening-berufe",
      type: "listening",
      title: "Was hörst du?",
      instruction: "Play the audio and pick the profession you heard.",
      prompt: "die Ärztin",
      options: ["die Ärztin", "die Lehrerin", "die Köchin"],
      correctIndex: 0,
    },
    {
      id: "fill-berufe",
      type: "fill-blank",
      title: "Von Beruf",
      instruction: "Complete the sentences.",
      sentence: "Ich bin ___ von Beruf. (male teacher) Er arbeitet ___ Koch.",
      blanks: [
        { answers: ["Lehrer"], hint: "teacher, male" },
        { answers: ["als"], hint: "works as" },
      ],
    },
    {
      id: "matching-berufe",
      type: "matching",
      title: "Berufe",
      instruction: "Match each profession to its meaning.",
      pairs: [
        ["der Lehrer", "the teacher"],
        ["der Arzt", "the doctor"],
        ["der Koch", "the cook"],
        ["der Fahrer", "the driver"],
        ["der Anwalt", "the lawyer"],
      ],
    },
    {
      id: "word-order-berufe",
      type: "word-order",
      title: "Der Satz",
      instruction: "Build the sentence: He works as a cook in a restaurant.",
      chunks: ["Er", "arbeitet", "als", "Koch", "in", "einem", "Restaurant."],
      explain: "arbeitet is second; the place phrase closes the sentence.",
    },
    {
      id: "flashcard-berufe",
      type: "flashcard",
      title: "Berufskarten",
      instruction: "Say the German profession out loud before revealing.",
      items: [
        { front: "der Arzt", back: "the doctor", frontAudio: true },
        { front: "die Lehrerin", back: "the teacher (female)", frontAudio: true },
        { front: "der Koch", back: "the cook", frontAudio: true },
        { front: "der Polizist", back: "the police officer", frontAudio: true },
        { front: "der Fahrer", back: "the driver", frontAudio: true },
        { front: "die Krankenschwester", back: "the nurse", frontAudio: true },
      ],
    },
  ],
};

const praepositionenMitDativ: Lesson = {
  id: "praepositionen-mit-dativ",
  title: "Präpositionen mit Dativ",
  summary: "mit, nach, aus, zu, von, bei: fixed dative prepositions.",
  status: "ready",
  sections: [
    {
      heading: "Die Präpositionen",
      blocks: [
        {
          type: "paragraph",
          text: "Six everyday prepositions always take the dative. Learn each with a fixed example and the dative will come automatically.",
        },
        {
          type: "table",
          caption: "Dative prepositions",
          head: ["Preposition", "Meaning", "Example"],
          rows: [
            ["mit", "with", "mit dem Bus, mit mir"],
            ["nach", "to (place)", "nach Berlin, nach Hause"],
            ["aus", "from (origin)", "aus Deutschland, aus dem Büro"],
            ["zu", "to (person, place)", "zu Anna, zu der Arbeit"],
            ["von", "from, of", "von dem Bahnhof, von mir"],
            ["bei", "at (person), near", "bei der Oma, bei uns"],
          ],
        },
        {
          type: "tip",
          text: "The dative forms: dem (m./n.), der (f.), den (plural). Pronouns too: mit mir, zu dir, bei uns, von ihr.",
        },
      ],
    },
    {
      heading: "Die Kontraktionen",
      blocks: [
        {
          type: "table",
          caption: "Contractions",
          head: ["Full form", "Contracted"],
          rows: [
            ["zu dem Bahnhof", "zum Bahnhof"],
            ["zu der Arbeit", "zur Arbeit"],
            ["von dem Bahnhof", "vom Bahnhof"],
            ["bei dem Arzt", "beim Arzt"],
          ],
        },
        {
          type: "example",
          de: "Ich fahre mit dem Zug zur Arbeit.",
          en: "I take the train to work.",
        },
        {
          type: "example",
          de: "Wir kommen vom Bahnhof. Er ist beim Arzt.",
          en: "We are coming from the station. He is at the doctor.",
        },
      ],
    },
  ],
  vocab: [
    { id: "mit", de: "mit", en: "with", part: "preposition", audio: true },
    { id: "nach", de: "nach", en: "to (place)", part: "preposition", audio: true },
    { id: "aus", de: "aus", en: "from (origin)", part: "preposition", audio: true },
    { id: "zu", de: "zu", en: "to (person, place)", part: "preposition", audio: true },
    { id: "von", de: "von", en: "from, of", part: "preposition", audio: true },
    { id: "bei", de: "bei", en: "at (person), near", part: "preposition", audio: true },
    { id: "mit-dem-bus", de: "mit dem Bus", en: "by bus", part: "phrase", phrase: true, audio: true },
    { id: "mit-dem-zug", de: "mit dem Zug", en: "by train", part: "phrase", phrase: true, audio: true },
    { id: "zur-arbeit", de: "zur Arbeit", en: "to work", part: "phrase", phrase: true, audio: true },
    { id: "zum-bahnhof", de: "zum Bahnhof", en: "to the station", part: "phrase", phrase: true, audio: true },
    { id: "beim-arzt", de: "beim Arzt", en: "at the doctor's", part: "phrase", phrase: true, audio: true },
    { id: "nach-hause", de: "nach Hause", en: "home (direction)", part: "phrase", phrase: true, audio: true },
  ],
  exercises: [
    {
      id: "mc-dativ-praep",
      type: "multiple-choice",
      title: "Die Präposition",
      instruction: "Choose the correct preposition.",
      prompt: "Ich fahre ___ dem Bus.",
      options: ["mit", "zu", "bei"],
      correctIndex: 0,
      explain: "Transport takes mit: mit dem Bus.",
    },
    {
      id: "listening-dativ-praep",
      type: "listening",
      title: "Was hörst du?",
      instruction: "Play the audio and pick the phrase you heard.",
      prompt: "beim Arzt",
      options: ["beim Arzt", "zum Arzt", "vom Arzt"],
      correctIndex: 0,
    },
    {
      id: "fill-dativ-praep",
      type: "fill-blank",
      title: "Präpositionen",
      instruction: "Complete with the right preposition.",
      sentence: "Wir gehen ___ Arbeit. (zu + der) Er kommt ___ Bahnhof. (von + dem)",
      blanks: [
        { answers: ["zur"], hint: "zu + der" },
        { answers: ["vom"], hint: "von + dem" },
      ],
    },
    {
      id: "matching-dativ-praep",
      type: "matching",
      title: "Präposition und Bedeutung",
      instruction: "Match each preposition to its use.",
      pairs: [
        ["mit", "with"],
        ["nach", "to (place)"],
        ["aus", "from (origin)"],
        ["bei", "at (person)"],
        ["zu", "to (person)"],
      ],
    },
    {
      id: "word-order-dativ-praep",
      type: "word-order",
      title: "Der Satz",
      instruction: "Build the sentence: I take the train to work.",
      chunks: ["Ich", "fahre", "mit", "dem", "Zug", "zur", "Arbeit."],
      explain: "The dative phrase and the destination follow the verb.",
    },
    {
      id: "flashcard-dativ-praep",
      type: "flashcard",
      title: "Dativkarten",
      instruction: "Say the German phrase out loud before revealing.",
      items: [
        { front: "mit dem Bus", back: "by bus", frontAudio: true },
        { front: "zur Arbeit", back: "to work", frontAudio: true },
        { front: "zum Bahnhof", back: "to the station", frontAudio: true },
        { front: "vom Bahnhof", back: "from the station", frontAudio: true },
        { front: "beim Arzt", back: "at the doctor's", frontAudio: true },
        { front: "nach Hause", back: "home (direction)", frontAudio: true },
      ],
    },
  ],
};

const pronomenImDativ: Lesson = {
  id: "pronomen-im-dativ",
  title: "Pronomen im Dativ",
  summary: "mir, dir, ihm, ihr: dative pronouns in everyday phrases.",
  status: "ready",
  sections: [
    {
      heading: "Die Dativpronomen",
      blocks: [
        {
          type: "table",
          caption: "Pronouns in three cases",
          head: ["Nominative", "Accusative", "Dative"],
          rows: [
            ["ich", "mich", "mir"],
            ["du", "dich", "dir"],
            ["er", "ihn", "ihm"],
            ["sie (she)", "sie", "ihr"],
            ["es", "es", "ihm"],
            ["wir", "uns", "uns"],
            ["ihr", "euch", "euch"],
            ["sie / Sie", "sie / Sie", "ihnen / Ihnen"],
          ],
        },
        {
          type: "tip",
          text: "The dative is the case of the indirect object: the person who receives or benefits. Ich gebe dir das Buch: you are the receiver.",
        },
      ],
    },
    {
      heading: "Dativ nach Präpositionen",
      blocks: [
        {
          type: "paragraph",
          text: "The fixed dative prepositions bring their pronouns with them. These four phrases cover most daily use.",
        },
        {
          type: "table",
          caption: "Fixed phrases",
          head: ["German", "English"],
          rows: [
            ["Kommst du mit mir?", "Are you coming with me?"],
            ["Das ist von ihr.", "That is from her."],
            ["Ich bin bei dir.", "I am with you."],
            ["Wir fahren zu ihnen.", "We drive to their place."],
          ],
        },
      ],
    },
    {
      heading: "Alltägliche Dativsätze",
      blocks: [
        {
          type: "example",
          de: "Mir geht es gut. Und dir?",
          en: "I am fine. And you?",
        },
        {
          type: "example",
          de: "Das schmeckt mir!",
          en: "That tastes good to me!",
        },
        {
          type: "example",
          de: "Kannst du mir helfen?",
          en: "Can you help me?",
        },
        {
          type: "tip",
          text: "Some verbs take only dative pronouns: schmecken, helfen, gehören, gefallen. Full list in A2; the forms are the same as after mit and zu.",
        },
      ],
    },
  ],
  vocab: [
    { id: "mir", de: "mir", en: "to me", part: "pronoun", audio: true },
    { id: "dir", de: "dir", en: "to you", part: "pronoun", audio: true },
    { id: "ihm", de: "ihm", en: "to him, to it", part: "pronoun", audio: true },
    { id: "ihr-dativ", de: "ihr", en: "to her", part: "pronoun", audio: true },
    { id: "uns-dativ", de: "uns", en: "to us", part: "pronoun", audio: true },
    { id: "euch-dativ", de: "euch", en: "to you all", part: "pronoun", audio: true },
    { id: "mit-mir", de: "mit mir", en: "with me", part: "phrase", phrase: true, audio: true },
    { id: "von-ihr", de: "von ihr", en: "from her", part: "phrase", phrase: true, audio: true },
    { id: "bei-dir", de: "bei dir", en: "at your place", part: "phrase", phrase: true, audio: true },
    { id: "mir-geht-es-gut", de: "Mir geht es gut.", en: "I am fine.", part: "phrase", phrase: true, audio: true },
    { id: "das-schmeckt-mir", de: "Das schmeckt mir!", en: "That tastes good!", part: "phrase", phrase: true, audio: true },
    { id: "helfen", de: "helfen", en: "to help", part: "verb", audio: true },
  ],
  exercises: [
    {
      id: "mc-dativpronomen",
      type: "multiple-choice",
      title: "Das Dativpronomen",
      instruction: "Choose the correct pronoun.",
      prompt: "Kommst du mit ___?",
      options: ["mir", "mich", "ich"],
      correctIndex: 0,
      explain: "mit takes the dative: mit mir.",
    },
    {
      id: "listening-dativpronomen",
      type: "listening",
      title: "Was hörst du?",
      instruction: "Play the audio and pick the phrase you heard.",
      prompt: "Das ist von ihr.",
      options: ["Das ist von ihr.", "Das ist von ihm.", "Das ist von dir."],
      correctIndex: 0,
    },
    {
      id: "fill-dativpronomen",
      type: "fill-blank",
      title: "Die Pronomen",
      instruction: "Complete with the dative pronoun.",
      sentence: "Das Buch ist von ___. (she) Kannst du ___ helfen? (me)",
      blanks: [
        { answers: ["ihr"], hint: "she -> dative" },
        { answers: ["mir"], hint: "me -> dative" },
      ],
    },
    {
      id: "matching-dativpronomen",
      type: "matching",
      title: "Nominativ oder Dativ?",
      instruction: "Match each nominative pronoun to its dative form.",
      pairs: [
        ["ich", "mir"],
        ["du", "dir"],
        ["er", "ihm"],
        ["sie (she)", "ihr"],
        ["wir", "uns"],
      ],
    },
    {
      id: "word-order-dativpronomen",
      type: "word-order",
      title: "Der Satz",
      instruction: "Build the sentence: Can you help me?",
      chunks: ["Kannst", "du", "mir", "helfen?"],
      explain: "The modal leads the question; helfen closes it.",
    },
    {
      id: "flashcard-dativpronomen",
      type: "flashcard",
      title: "Dativpronomenkarten",
      instruction: "Say the German pronoun out loud before revealing.",
      items: [
        { front: "mir", back: "to me", frontAudio: true },
        { front: "dir", back: "to you", frontAudio: true },
        { front: "ihm", back: "to him", frontAudio: true },
        { front: "mit mir", back: "with me", frontAudio: true },
        { front: "bei dir", back: "at your place", frontAudio: true },
        { front: "Mir geht es gut.", back: "I am fine.", frontAudio: true },
      ],
    },
  ],
};

const wortstellung: Lesson = {
  id: "wortstellung",
  title: "Wortstellung",
  summary: "Verb in second position and inversion after fronted elements.",
  status: "ready",
  sections: [
    {
      heading: "Das Verb auf Position zwei",
      blocks: [
        {
          type: "paragraph",
          text: "In a statement, the conjugated verb is always the second element. The first element can be the subject, but it can also be a time, a place, or anything else.",
        },
        {
          type: "example",
          de: "Ich lerne Deutsch.",
          en: "I am learning German.",
        },
        {
          type: "example",
          de: "Heute lerne ich Deutsch.",
          en: "Today I am learning German.",
        },
        {
          type: "example",
          de: "Im Sommer fahren wir nach Italien.",
          en: "In summer we drive to Italy.",
        },
        {
          type: "tip",
          text: "Position two means the verb is second, not the subject. If another element leads, the subject jumps behind the verb: this is the inversion.",
        },
      ],
    },
    {
      heading: "Zeit vor Ort",
      blocks: [
        {
          type: "paragraph",
          text: "When time and place appear together, time comes first. German packs this into the rule: time before place.",
        },
        {
          type: "example",
          de: "Ich gehe heute Abend ins Kino.",
          en: "I am going to the cinema tonight.",
        },
        {
          type: "example",
          de: "Wir treffen uns am Samstag im Park.",
          en: "We are meeting on Saturday in the park.",
        },
        {
          type: "tip",
          text: "Time first (heute Abend), place second (ins Kino). Either can move to the front; the verb stays in position two.",
        },
      ],
    },
    {
      heading: "Frage und Aussage",
      blocks: [
        {
          type: "table",
          caption: "Sentence patterns",
          head: ["Pattern", "Example"],
          rows: [
            ["Statement: element + verb + subject", "Ich lerne Deutsch."],
            ["Fronted: time + verb + subject", "Heute lerne ich Deutsch."],
            ["Yes/no question: verb first", "Lernst du Deutsch?"],
            ["W-question: question word + verb", "Warum lernst du Deutsch?"],
          ],
        },
        {
          type: "example",
          de: "Am Montag arbeite ich. Arbeitest du am Montag?",
          en: "On Monday I work. Do you work on Monday?",
        },
      ],
    },
  ],
  vocab: [
    { id: "heute", de: "heute", en: "today", part: "adverb", audio: true },
    { id: "morgen", de: "morgen", en: "tomorrow", part: "adverb", audio: true },
    { id: "gestern", de: "gestern", en: "yesterday", part: "adverb", audio: true },
    { id: "im-sommer", de: "im Sommer", en: "in summer", part: "phrase", phrase: true, audio: true },
    { id: "am-montag", de: "am Montag", en: "on Monday", part: "phrase", phrase: true, audio: true },
    { id: "heute-abend", de: "heute Abend", en: "tonight", part: "phrase", phrase: true, audio: true },
    { id: "die-inversion", de: "die Inversion", en: "the inversion", part: "noun f.", audio: true },
    { id: "der-satz", de: "der Satz", en: "the sentence", part: "noun m.", plural: "die Sätze", audio: true },
  ],
  exercises: [
    {
      id: "mc-wortstellung",
      type: "multiple-choice",
      title: "Die Inversion",
      instruction: "Choose the correct sentence.",
      prompt: "Heute ___ ich Deutsch.",
      options: ["lerne", "ich lerne", "lerne ich"],
      correctIndex: 0,
      explain: "Fronted time pushes the verb to position two: Heute lerne ich Deutsch.",
    },
    {
      id: "listening-wortstellung",
      type: "listening",
      title: "Was hörst du?",
      instruction: "Play the audio and pick the sentence you heard.",
      prompt: "Im Sommer fahren wir nach Italien.",
      options: [
        "Im Sommer fahren wir nach Italien.",
        "Im Sommer wir fahren nach Italien.",
        "Wir fahren im Sommer nach Italien.",
      ],
      correctIndex: 0,
    },
    {
      id: "fill-wortstellung",
      type: "fill-blank",
      title: "Die Reihenfolge",
      instruction: "Complete the sentences.",
      sentence: "___ lerne ich Deutsch. (today) Am Montag ___ ich.",
      blanks: [
        { answers: ["Heute"], hint: "time at the front" },
        { answers: ["arbeite"], hint: "verb in position two" },
      ],
    },
    {
      id: "matching-wortstellung",
      type: "matching",
      title: "Muster",
      instruction: "Match each pattern to its example.",
      pairs: [
        ["verb second", "Ich lerne Deutsch."],
        ["fronted time", "Heute lerne ich Deutsch."],
        ["question", "Lernst du Deutsch?"],
        ["time before place", "heute Abend ins Kino"],
        ["inversion", "Im Sommer fahren wir."],
      ],
    },
    {
      id: "word-order-wortstellung",
      type: "word-order",
      title: "Der Satz",
      instruction: "Build the sentence: In summer we drive to Italy.",
      chunks: ["Im", "Sommer", "fahren", "wir", "nach", "Italien."],
      explain: "The fronted time forces the inversion.",
    },
    {
      id: "flashcard-wortstellung",
      type: "flashcard",
      title: "Wortstellungskarten",
      instruction: "Say the German out loud before revealing.",
      items: [
        { front: "Heute lerne ich Deutsch.", back: "Today I am learning German.", frontAudio: true },
        { front: "Im Sommer fahren wir.", back: "In summer we drive.", frontAudio: true },
        { front: "Am Montag arbeite ich.", back: "On Monday I work.", frontAudio: true },
        { front: "Ich gehe heute Abend ins Kino.", back: "I am going to the cinema tonight.", frontAudio: true },
        { front: "Lernst du Deutsch?", back: "Are you learning German?", frontAudio: true },
        { front: "Warum lernst du Deutsch?", back: "Why are you learning German?", frontAudio: true },
      ],
    },
  ],
};

const imBuerro: Lesson = {
  id: "im-buero",
  title: "Im Büro",
  summary: "Workplace small talk and polite requests.",
  status: "ready",
  sections: [
    {
      heading: "Im Büro",
      blocks: [
        {
          type: "table",
          caption: "Workplace vocabulary",
          head: ["German", "English"],
          rows: [
            ["das Büro", "the office"],
            ["der Kollege / die Kollegin", "the colleague"],
            ["der Chef / die Chefin", "the boss"],
            ["die Besprechung", "the meeting"],
            ["der Termin", "the appointment"],
            ["der Computer", "the computer"],
            ["das Telefon", "the phone"],
            ["die E-Mail", "the email"],
            ["die Pause", "the break"],
            ["der Bericht", "the report"],
          ],
        },
        {
          type: "tip",
          text: "der Termin is an appointment or a fixed slot in the diary. Haben Sie heute einen Termin? is the polite check.",
        },
      ],
    },
    {
      heading: "Höflich fragen",
      blocks: [
        {
          type: "example",
          de: "Können Sie mir helfen?",
          en: "Can you help me?",
        },
        {
          type: "example",
          de: "Können Sie das bitte wiederholen?",
          en: "Can you please repeat that?",
        },
        {
          type: "example",
          de: "Ich habe um zehn Uhr eine Besprechung.",
          en: "I have a meeting at ten o'clock.",
        },
        {
          type: "tip",
          text: "The polite request pattern: Können Sie bitte + infinitive. The infinitive waits at the end, exactly like with modal verbs.",
        },
      ],
    },
    {
      heading: "Der Smalltalk",
      blocks: [
        {
          type: "example",
          de: "Wie geht es Ihnen? Danke, gut. Und Ihnen?",
          en: "How are you? Fine, thanks. And you?",
        },
        {
          type: "example",
          de: "Haben Sie heute viel zu tun?",
          en: "Do you have a lot to do today?",
        },
        {
          type: "example",
          de: "Ich brauche den Bericht bis Freitag.",
          en: "I need the report by Friday.",
        },
      ],
    },
  ],
  vocab: [
    { id: "das-buero", de: "das Büro", en: "the office", part: "noun n.", plural: "die Büros", audio: true },
    { id: "die-besprechung", de: "die Besprechung", en: "the meeting", part: "noun f.", plural: "die Besprechungen", audio: true },
    { id: "der-termin", de: "der Termin", en: "the appointment", part: "noun m.", plural: "die Termine", audio: true },
    { id: "der-computer", de: "der Computer", en: "the computer", part: "noun m.", plural: "die Computer", audio: true },
    { id: "das-telefon", de: "das Telefon", en: "the phone", part: "noun n.", plural: "die Telefone", audio: true },
    { id: "die-email", de: "die E-Mail", en: "the email", part: "noun f.", plural: "die E-Mails", audio: true },
    { id: "die-pause", de: "die Pause", en: "the break", part: "noun f.", plural: "die Pausen", audio: true },
    { id: "der-bericht", de: "der Bericht", en: "the report", part: "noun m.", plural: "die Berichte", audio: true },
    { id: "wiederholen", de: "wiederholen", en: "to repeat", part: "verb", audio: true },
    { id: "die-chefin", de: "die Chefin", en: "the boss (female)", part: "noun f.", plural: "die Chefinnen", audio: true },
    { id: "koennen-sie", de: "Können Sie bitte ...?", en: "Can you please ...?", part: "phrase", phrase: true, audio: true },
    { id: "viel-zu-tun", de: "viel zu tun haben", en: "to have a lot to do", part: "phrase", phrase: true, audio: true },
  ],
  exercises: [
    {
      id: "mc-buero",
      type: "multiple-choice",
      title: "Die Bitte",
      instruction: "Choose the polite request.",
      prompt: "You need help from a colleague.",
      options: [
        "Können Sie mir helfen?",
        "Helfen Sie mich!",
        "Ich brauche helfen.",
      ],
      correctIndex: 0,
      explain: "Können Sie bitte + infinitive is the polite pattern.",
    },
    {
      id: "listening-buero",
      type: "listening",
      title: "Was hörst du?",
      instruction: "Play the audio and pick the sentence you heard.",
      prompt: "Ich habe um zehn Uhr eine Besprechung.",
      options: [
        "Ich habe um zehn Uhr eine Besprechung.",
        "Ich habe um zehn einen Termin.",
        "Wir haben um zehn eine Pause.",
      ],
      correctIndex: 0,
    },
    {
      id: "fill-buero",
      type: "fill-blank",
      title: "Im Büro",
      instruction: "Complete the sentences.",
      sentence: "Können Sie mir ___? (help) Ich brauche den Bericht ___ Freitag. (by)",
      blanks: [
        { answers: ["helfen"], hint: "infinitive at the end" },
        { answers: ["bis"], hint: "by Friday" },
      ],
    },
    {
      id: "matching-buero",
      type: "matching",
      title: "Bürovokabular",
      instruction: "Match each German word to its meaning.",
      pairs: [
        ["die Besprechung", "the meeting"],
        ["der Termin", "the appointment"],
        ["die Pause", "the break"],
        ["der Bericht", "the report"],
        ["der Computer", "the computer"],
      ],
    },
    {
      id: "word-order-buero",
      type: "word-order",
      title: "Der Satz",
      instruction: "Build the sentence: We have a meeting at ten o'clock.",
      chunks: ["Wir", "haben", "um", "zehn", "Uhr", "eine", "Besprechung."],
      explain: "Time comes before the object.",
    },
    {
      id: "flashcard-buero",
      type: "flashcard",
      title: "Bürokarten",
      instruction: "Say the German out loud before revealing.",
      items: [
        { front: "die Besprechung", back: "the meeting", frontAudio: true },
        { front: "der Termin", back: "the appointment", frontAudio: true },
        { front: "die Pause", back: "the break", frontAudio: true },
        { front: "der Bericht", back: "the report", frontAudio: true },
        { front: "Können Sie mir helfen?", back: "Can you help me?", frontAudio: true },
        { front: "Ich habe einen Termin.", back: "I have an appointment.", frontAudio: true },
      ],
    },
  ],
};

const derDativ: Lesson = {
  id: "der-dativ",
  title: "Der Dativ",
  summary: "Say who receives, who benefits, and who you help.",
  status: "ready",
  sections: [
    {
      heading: "Der Dativ: wer bekommt etwas?",
      blocks: [
        {
          type: "paragraph",
          text: "The dative is the case of the receiver. In Ich gebe dem Kind einen Apfel, the apple is the accusative object and the child, who receives it, is the dative object. The dative answers the question wem? (to whom?).",
        },
        {
          type: "table",
          caption: "Articles in the dative",
          head: ["Gender", "Nominative", "Accusative", "Dative"],
          rows: [
            ["masculine", "der Mann", "den Mann", "dem Mann"],
            ["feminine", "die Frau", "die Frau", "der Frau"],
            ["neuter", "das Kind", "das Kind", "dem Kind"],
            ["plural", "die Kinder", "die Kinder", "den Kindern"],
          ],
        },
        {
          type: "tip",
          text: "The dative articles are easy to spot: masculine and neuter both become dem, feminine becomes der, and the plural always adds an -n: den Kindern.",
        },
      ],
    },
    {
      heading: "Dativ nach Präpositionen",
      blocks: [
        {
          type: "paragraph",
          text: "The prepositions mit, nach, aus, zu, von, and bei always demand the dative. You already use them every day; now you know why the articles change.",
        },
        {
          type: "table",
          caption: "Dative prepositions in action",
          head: ["Preposition", "Example"],
          rows: [
            ["mit", "mit dem Zug, mit mir"],
            ["nach", "nach Hause (no article)"],
            ["aus", "aus der Schweiz"],
            ["zu", "zum Bahnhof (zu dem)"],
            ["von", "vom Bahnhof (von dem)"],
            ["bei", "beim Arzt (bei dem)"],
          ],
        },
      ],
    },
    {
      heading: "Verben mit Dativ",
      blocks: [
        {
          type: "paragraph",
          text: "A few everyday verbs take only the dative for the person. They are worth learning by heart because English often uses a different pattern.",
        },
        {
          type: "table",
          caption: "Dative verbs",
          head: ["Verb", "Example", "English"],
          rows: [
            ["helfen", "Kannst du mir helfen?", "Can you help me?"],
            ["gefallen", "Das gefällt mir.", "I like that."],
            ["schmecken", "Das schmeckt mir.", "That tastes good to me."],
            ["gehören", "Das Buch gehört mir.", "The book belongs to me."],
            ["antworten", "Antworte mir bitte!", "Answer me, please!"],
            ["danken", "Ich danke dir.", "I thank you."],
          ],
        },
        {
          type: "tip",
          text: "The dative pronouns: mir, dir, ihm, ihr, uns, euch, ihnen. Notice that the person always comes first: Das schmeckt mir is I-like-it, not it-tastes-me.",
        },
      ],
    },
    {
      heading: "Zwei Objekte",
      blocks: [
        {
          type: "paragraph",
          text: "When a sentence has both a dative and an accusative object, the dative (the person) comes first, then the accusative (the thing).",
        },
        {
          type: "example",
          de: "Ich gebe dem Kind einen Apfel.",
          en: "I give the child an apple. (person first, thing second)",
        },
        {
          type: "example",
          de: "Sie schenkt der Oma Blumen.",
          en: "She gives grandma flowers.",
        },
        {
          type: "example",
          de: "Wir bringen dem Vater das Buch.",
          en: "We bring father the book.",
        },
      ],
    },
  ],
  vocab: [
    { id: "der-dativ", de: "der Dativ", en: "the dative case", part: "noun m.", audio: true },
    { id: "schmecken", de: "schmecken", en: "to taste (good to someone)", part: "verb", audio: true },
    { id: "gefallen", de: "gefallen", en: "to please, be liked", part: "verb", audio: true },
    { id: "gehoeren", de: "gehören", en: "to belong to", part: "verb", audio: true },
    { id: "antworten", de: "antworten", en: "to answer", part: "verb", audio: true },
    { id: "danken", de: "danken", en: "to thank", part: "verb", audio: true },
    { id: "dem-mann", de: "dem Mann", en: "to the man (dative)", part: "phrase", phrase: true, audio: true },
    { id: "der-frau", de: "der Frau", en: "to the woman (dative)", part: "phrase", phrase: true, audio: true },
    { id: "mir", de: "mir", en: "to me", part: "pronoun", audio: true },
    { id: "dir", de: "dir", en: "to you", part: "pronoun", audio: true },
    { id: "dem-kind", de: "dem Kind", en: "to the child (dative)", part: "phrase", phrase: true, audio: true },
    { id: "schenken", de: "schenken", en: "to give (a gift)", part: "verb", audio: true },
  ],
  exercises: [
    {
      id: "mc-dativ-konsolidiert",
      type: "multiple-choice",
      title: "Der Dativ",
      instruction: "Choose the dative pronoun.",
      prompt: "Das schmeckt ___.",
      options: ["mir", "mich", "ich"],
      correctIndex: 0,
      explain: "schmecken takes the dative: mir.",
    },
    {
      id: "listening-dativ-konsolidiert",
      type: "listening",
      title: "Was hörst du?",
      instruction: "Play the audio and pick the sentence you heard.",
      prompt: "Ich gebe dem Kind einen Apfel.",
      options: [
        "Ich gebe dem Kind einen Apfel.",
        "Ich gebe dem Kind ein Apfel.",
        "Ich gebe das Kind einen Apfel.",
      ],
      correctIndex: 0,
    },
    {
      id: "fill-dativ-konsolidiert",
      type: "fill-blank",
      title: "Der Dativ",
      instruction: "Complete with the dative forms.",
      sentence: "Kannst du ___ helfen? (me) Ich gebe ___ Kind einen Apfel. (the)",
      blanks: [
        { answers: ["mir"], hint: "dative pronoun" },
        { answers: ["dem"], hint: "dative article, neuter" },
      ],
    },
    {
      id: "matching-dativ-konsolidiert",
      type: "matching",
      title: "Nominativ und Dativ",
      instruction: "Match each nominative to its dative form.",
      pairs: [
        ["der Mann", "dem Mann"],
        ["die Frau", "der Frau"],
        ["das Kind", "dem Kind"],
        ["die Kinder", "den Kindern"],
        ["ich", "mir"],
      ],
    },
    {
      id: "word-order-dativ-konsolidiert",
      type: "word-order",
      title: "Der Satz",
      instruction: "Build the sentence: I give the child an apple.",
      chunks: ["Ich", "gebe", "dem", "Kind", "einen", "Apfel."],
      explain: "Dative person first, accusative thing second.",
    },
    {
      id: "flashcard-dativ-konsolidiert",
      type: "flashcard",
      title: "Dativkarten",
      instruction: "Say the German out loud before revealing.",
      items: [
        { front: "mir", back: "to me", frontAudio: true },
        { front: "dir", back: "to you", frontAudio: true },
        { front: "dem Mann", back: "to the man", frontAudio: true },
        { front: "der Frau", back: "to the woman", frontAudio: true },
        { front: "Das schmeckt mir.", back: "I like the taste.", frontAudio: true },
        { front: "Das gehört mir.", back: "That belongs to me.", frontAudio: true },
      ],
    },
  ],
};

const konjunktionen: Lesson = {
  id: "konjunktionen",
  title: "Konjunktionen",
  summary: "Connect simple sentences and give reasons: und, oder, aber, denn, sondern.",
  status: "ready",
  sections: [
    {
      heading: "Sätze verbinden",
      blocks: [
        {
          type: "paragraph",
          text: "Conjunctions glue two sentences together. The first four do not change the word order at all: the verb of the second sentence stays exactly where it was. This makes them beginner-friendly.",
        },
        {
          type: "table",
          caption: "The five conjunctions",
          head: ["Conjunction", "Meaning", "Example"],
          rows: [
            ["und", "and", "Ich trinke Tee, und du trinkst Kaffee."],
            ["oder", "or", "Möchtest du Tee oder Kaffee?"],
            ["aber", "but", "Ich mag Tee, aber ich trinke lieber Kaffee."],
            ["denn", "because (reason)", "Ich lerne Deutsch, denn ich lebe in Deutschland."],
            ["sondern", "but rather (after negation)", "Ich trinke keinen Tee, sondern Kaffee."],
          ],
        },
        {
          type: "tip",
          text: "denn is the easy because: the verb stays in position two, no special word order. weil does the same job but sends the verb to the end, and weil belongs to A2.",
        },
      ],
    },
    {
      heading: "und, oder, aber",
      blocks: [
        {
          type: "paragraph",
          text: "und adds, oder offers a choice, and aber contrasts. All three behave exactly like English and, or, but.",
        },
        {
          type: "example",
          de: "Ich heiße Anna und ich komme aus Berlin.",
          en: "My name is Anna and I come from Berlin.",
        },
        {
          type: "example",
          de: "Willst du Kaffee oder Tee?",
          en: "Do you want coffee or tea?",
        },
        {
          type: "example",
          de: "Er ist müde, aber er arbeitet weiter.",
          en: "He is tired, but he keeps working.",
        },
      ],
    },
    {
      heading: "denn und sondern",
      blocks: [
        {
          type: "paragraph",
          text: "denn gives the reason for the first sentence. sondern is the special one: it only appears after a negative statement and means but rather, the alternative.",
        },
        {
          type: "example",
          de: "Ich lerne Deutsch, denn ich möchte in Deutschland arbeiten.",
          en: "I am learning German because I want to work in Germany.",
        },
        {
          type: "example",
          de: "Ich habe kein Auto, sondern ein Fahrrad.",
          en: "I do not have a car, but a bicycle.",
        },
        {
          type: "example",
          de: "Er ist nicht aus Berlin, sondern aus Hamburg.",
          en: "He is not from Berlin but from Hamburg.",
        },
        {
          type: "tip",
          text: "Test: does the sentence deny something first? Then the next part uses sondern. No negation? Then aber.",
        },
      ],
    },
  ],
  vocab: [
    { id: "und", de: "und", en: "and", part: "conjunction", audio: true },
    { id: "oder", de: "oder", en: "or", part: "conjunction", audio: true },
    { id: "aber", de: "aber", en: "but", part: "conjunction", audio: true },
    { id: "denn", de: "denn", en: "because", part: "conjunction", audio: true },
    { id: "sondern", de: "sondern", en: "but rather", part: "conjunction", audio: true },
    { id: "weil", de: "weil (A2 preview)", en: "because (verb at the end)", part: "conjunction", audio: true },
    { id: "die-konjunktion", de: "die Konjunktion", en: "the conjunction", part: "noun f.", plural: "die Konjunktionen", audio: true },
    { id: "muede", de: "müde", en: "tired", part: "adjective", audio: true },
    { id: "weiterarbeiten", de: "weiterarbeiten", en: "to keep working", part: "verb", audio: true },
    { id: "das-fahrrad", de: "das Fahrrad", en: "the bicycle", part: "noun n.", plural: "die Fahrräder", audio: true },
    { id: "die-entscheidung", de: "die Entscheidung", en: "the decision", part: "noun f.", plural: "die Entscheidungen", audio: true },
  ],
  exercises: [
    {
      id: "mc-konjunktion",
      type: "multiple-choice",
      title: "Die Konjunktion",
      instruction: "Choose the correct conjunction.",
      prompt: "Ich lerne Deutsch, ___ ich lebe in Deutschland.",
      options: ["denn", "aber", "sondern"],
      correctIndex: 0,
      explain: "denn gives the reason and keeps the verb in position two.",
    },
    {
      id: "listening-konjunktion",
      type: "listening",
      title: "Was hörst du?",
      instruction: "Play the audio and pick the sentence you heard.",
      prompt: "Ich habe kein Auto, sondern ein Fahrrad.",
      options: [
        "Ich habe kein Auto, sondern ein Fahrrad.",
        "Ich habe kein Auto, aber ein Fahrrad.",
        "Ich habe ein Auto, sondern ein Fahrrad.",
      ],
      correctIndex: 0,
    },
    {
      id: "fill-konjunktion",
      type: "fill-blank",
      title: "Die Konjunktionen",
      instruction: "Complete with the right conjunction.",
      sentence: "Ich trinke keinen Tee, ___ Kaffee. Ich mag Tee, ___ ich trinke lieber Kaffee.",
      blanks: [
        { answers: ["sondern"], hint: "after negation" },
        { answers: ["aber"], hint: "contrast" },
      ],
    },
    {
      id: "matching-konjunktion",
      type: "matching",
      title: "Bedeutungen",
      instruction: "Match each conjunction to its meaning.",
      pairs: [
        ["und", "and"],
        ["oder", "or"],
        ["aber", "but"],
        ["denn", "because"],
        ["sondern", "but rather"],
      ],
    },
    {
      id: "word-order-konjunktion",
      type: "word-order",
      title: "Der Satz",
      instruction: "Build the sentence: I am learning German because I live in Germany.",
      chunks: ["Ich", "lerne", "Deutsch,", "denn", "ich", "lebe", "in", "Deutschland."],
      explain: "denn keeps the verb of the second sentence in position two.",
    },
    {
      id: "flashcard-konjunktion",
      type: "flashcard",
      title: "Konjunktionskarten",
      instruction: "Say the German sentence out loud before revealing.",
      items: [
        { front: "und", back: "and", frontAudio: true },
        { front: "oder", back: "or", frontAudio: true },
        { front: "aber", back: "but", frontAudio: true },
        { front: "denn", back: "because", frontAudio: true },
        { front: "sondern", back: "but rather", frontAudio: true },
        { front: "Ich lerne Deutsch, denn ich lebe hier.", back: "I learn German because I live here.", frontAudio: true },
      ],
    },
  ],
};

export const arbeitUndBeruf: Unit = {
  id: "arbeit-und-beruf",
  title: "Arbeit und Beruf",
  theme: "Work and professions",
  lessons: [
    berufe,
    praepositionenMitDativ,
    pronomenImDativ,
    derDativ,
    wortstellung,
    konjunktionen,
    imBuerro,
  ],
};