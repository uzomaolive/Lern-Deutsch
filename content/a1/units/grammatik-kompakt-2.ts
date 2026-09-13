import type { Lesson, Unit } from "../../schema";

const akkusativTief: Lesson = {
  id: "akkusativ-erklaert",
  title: "Der Akkusativ erklärt: Wen oder was?",
  summary:
    "Everything about the accusative for a total beginner: why it exists, how articles and pronouns change, and which verbs demand it.",
  status: "ready",
  sections: [
    {
      heading: "Warum gibt es den Akkusativ?",
      blocks: [
        {
          type: "paragraph",
          text: "The accusative (der Akkusativ) is the case of the direct object: the person or thing that the action happens to. In Ich sehe den Mann, the seeing happens to the man, so der Mann becomes den Mann. English shows this with word order; German shows it with the article. That is why German can move words around freely and still be understood.",
        },
        {
          type: "paragraph",
          text: "The question word for the accusative is wen? or was? Wen siehst du? Den Mann. Was isst du? Das Brot. If the noun answers wen or was, it is in the accusative.",
        },
        {
          type: "table",
          caption: "How articles change",
          head: ["Noun", "Nominative", "Accusative"],
          rows: [
            ["der Mann (m.)", "der Mann", "den Mann"],
            ["die Frau (f.)", "die Frau", "die Frau"],
            ["das Kind (n.)", "das Kind", "das Kind"],
            ["die Kinder (pl.)", "die Kinder", "die Kinder"],
            ["ein Mann", "ein Mann", "einen Mann"],
            ["eine Frau", "eine Frau", "eine Frau"],
            ["kein Mann", "kein Mann", "keinen Mann"],
          ],
        },
        {
          type: "tip",
          text: "Only the masculine changes, and it changes exactly once: der to den, ein to einen, kein to keinen. Everything else stays the same. The accusative is the friendliest case in German.",
        },
      ],
    },
    {
      heading: "Verben, die den Akkusativ fordern",
      blocks: [
        {
          type: "paragraph",
          text: "Many everyday verbs always take the accusative. Learn them as pairs: verb plus wen. haben, kaufen, essen, trinken, sehen, brauchen, suchen, finden, kennen, nehmen, möchten, machen, lesen, schreiben. All of them take the direct object in the accusative.",
        },
        {
          type: "table",
          caption: "Accusative verbs in action",
          head: ["Verb", "Example"],
          rows: [
            ["haben", "Ich habe einen Bruder."],
            ["kaufen", "Ich kaufe den Apfel."],
            ["essen", "Sie isst das Brot."],
            ["trinken", "Wir trinken einen Kaffee."],
            ["sehen", "Ich sehe die Frau."],
            ["brauchen", "Er braucht einen Kaffee."],
            ["suchen", "Wir suchen den Schlüssel."],
            ["finden", "Ich finde das Buch."],
            ["kennen", "Sie kennt den Kellner."],
            ["nehmen", "Ich nehme die Suppe."],
          ],
        },
        {
          type: "tip",
          text: "Test every verb: can you ask wen or was after it? Wen kaufst du? Den Apfel. Then the object is accusative.",
        },
      ],
    },
    {
      heading: "Pronomen im Akkusativ",
      blocks: [
        {
          type: "paragraph",
          text: "Pronouns change too: ich becomes mich, du becomes dich, and er becomes ihn. sie, es, wir, and ihr stay the same. The pattern mirrors the articles: only the masculine third person changes visibly.",
        },
        {
          type: "table",
          caption: "Accusative pronouns",
          head: ["Nominative", "Accusative"],
          rows: [
            ["ich", "mich"],
            ["du", "dich"],
            ["er", "ihn"],
            ["sie", "sie"],
            ["es", "es"],
            ["wir", "uns"],
            ["ihr", "euch"],
            ["sie / Sie", "sie / Sie"],
          ],
        },
                {
          type: "gloss",
          de: "Sie kennt mich. Ich sehe ihn. Wir besuchen euch.",
          en: "She knows me. I see him. We visit you.",
          words: [{"word": "Sie", "pos": "Pronomen", "en": "she"}, {"word": "kennt", "pos": "Verb", "en": "knows"}, {"word": "mich.", "pos": "Pronomen", "en": "me (acc.)"}, {"word": "Ich", "pos": "Pronomen", "en": "I"}, {"word": "sehe", "pos": "Verb", "en": "see"}, {"word": "ihn.", "pos": "Pronomen", "en": "him (acc.)"}, {"word": "Wir", "pos": "Pronomen", "en": "we"}, {"word": "besuchen", "pos": "Verb", "en": "visit"}, {"word": "euch.", "pos": "Pronomen", "en": "you (acc.)"}],
        },

      ],
    },
    {
      heading: "Präpositionen mit Akkusativ",
      blocks: [
        {
          type: "paragraph",
          text: "A small group of prepositions always demands the accusative: für (for), ohne (without), durch (through), um (around), gegen (against). There is no location/movement choice here; these four are accusative, period.",
        },
        {
          type: "table",
          caption: "Accusative prepositions",
          head: ["Preposition", "Meaning", "Example"],
          rows: [
            ["für", "for", "Ein Geschenk für dich."],
            ["ohne", "without", "Ohne Zucker, bitte."],
            ["durch", "through", "Wir gehen durch den Park."],
            ["um", "around", "Wir fahren um die Stadt."],
            ["gegen", "against", "Das Mittel gegen Kopfschmerzen."],
          ],
        },
        {
          type: "tip",
          text: "Remember the pair logic: für and ohne belong to the accusative, mit and bei belong to the dative. Learning prepositions in case groups is the professional way.",
        },
      ],
    },
  ],
  vocab: [
    { id: "das-direkte-objekt", de: "das direkte Objekt", en: "the direct object", part: "noun n.", audio: true },
    { id: "brauchen", de: "brauchen", en: "to need", part: "verb", audio: true },
    { id: "suchen", de: "suchen", en: "to look for", part: "verb", audio: true },
    { id: "finden", de: "finden", en: "to find", part: "verb", audio: true },
    { id: "nehmen", de: "nehmen", en: "to take", part: "verb", audio: true },
    { id: "den-schluessel", de: "den Schlüssel", en: "the key (accusative)", part: "phrase", phrase: true, audio: true },
    { id: "einen-apfel", de: "einen Apfel", en: "an apple (accusative)", part: "phrase", phrase: true, audio: true },
    { id: "fuer-dich", de: "für dich", en: "for you", part: "phrase", phrase: true, audio: true },
    { id: "ohne-zucker", de: "ohne Zucker", en: "without sugar", part: "phrase", phrase: true, audio: true },
    { id: "ihn", de: "ihn", en: "him (accusative)", part: "pronoun", audio: true },
  ],
  exercises: [
    {
      id: "ex-akk-artikel",
      type: "multiple-choice",
      title: "Übung 1: Der Artikel",
      instruction: "Choose the accusative article.",
      prompt: "Ich kaufe ___ Apfel.",
      options: ["einen", "ein", "eine"],
      correctIndex: 0,
      explain: "Apfel is masculine, after kaufen accusative: einen.",
    },
    {
      id: "ex-akk-verb",
      type: "multiple-choice",
      title: "Übung 2: Das Verb",
      instruction: "Choose the verb that fits the accusative pattern.",
      prompt: "Wen siehst du? ___ den Mann.",
      options: ["Ich sehe", "Ich heiße", "Ich komme"],
      correctIndex: 0,
      explain: "sehen takes the accusative: Ich sehe den Mann.",
    },
    {
      id: "ex-akk-pronomen",
      type: "fill-blank",
      title: "Übung 3: Die Pronomen",
      instruction: "Complete with the accusative pronoun.",
      sentence: "Sie kennt ___. (me) Ich sehe ___. (him) Wir besuchen ___. (you all)",
      blanks: [
        { answers: ["mich"], hint: "ich -> mich" },
        { answers: ["ihn"], hint: "er -> ihn" },
        { answers: ["euch"], hint: "ihr -> euch" },
      ],
    },
    {
      id: "ex-akk-praepositionen",
      type: "matching",
      title: "Übung 4: Präpositionen",
      instruction: "Match each preposition to its meaning.",
      pairs: [
        ["für", "for"],
        ["ohne", "without"],
        ["durch", "through"],
        ["um", "around"],
        ["gegen", "against"],
      ],
    },
    {
      id: "ex-akk-satz",
      type: "word-order",
      title: "Übung 5: Der Satz",
      instruction: "Build the sentence: I am buying a new computer.",
      chunks: ["Ich", "kaufe", "einen", "neuen", "Computer."],
      explain: "einen neuen Computer is the accusative object.",
    },
    {
      id: "ex-akk-karten",
      type: "flashcard",
      title: "Übung 6: Akkusativkarten",
      instruction: "Say the German phrase out loud before revealing.",
      items: [
        { front: "den Mann", back: "the man (accusative)", frontAudio: true },
        { front: "einen Apfel", back: "an apple (accusative)", frontAudio: true },
        { front: "den Schlüssel", back: "the key (accusative)", frontAudio: true },
        { front: "mich", back: "me (accusative)", frontAudio: true },
        { front: "ihn", back: "him (accusative)", frontAudio: true },
        { front: "für dich", back: "for you", frontAudio: true },
      ],
    },
  ],
};

const possessivTief: Lesson = {
  id: "possessivpronomen-erklaert",
  title: "Possessivpronomen erklärt: mein, dein, sein",
  summary:
    "Everything about possessive pronouns for a total beginner: what they are, the full table, and how endings work.",
  status: "ready",
  sections: [
    {
      heading: "Was ist ein Possessivpronomen?",
      blocks: [
        {
          type: "paragraph",
          text: "A possessive pronoun (das Possessivpronomen) says whose something is: my, your, his, her, our, their. The German word depends on the owner: ich owns mein, du owns dein, er and es own sein, sie (she) owns ihr. The owner decides the base word, the noun decides the ending.",
        },
        {
          type: "table",
          caption: "The possessive bases",
          head: ["Owner", "Base", "Example"],
          rows: [
            ["ich", "mein", "mein Vater"],
            ["du", "dein", "dein Buch"],
            ["er / es", "sein", "sein Bruder"],
            ["sie (she)", "ihr", "ihre Schwester"],
            ["wir", "unser", "unser Haus"],
            ["ihr (you all)", "euer", "euer Auto"],
            ["sie (they)", "ihr", "ihr Kind"],
            ["Sie (formal)", "Ihr", "Ihr Name"],
          ],
        },
        {
          type: "tip",
          text: "ihr has three jobs: her, their, and the formal your with a capital I. The owner decides which one: Anna? Her. Die Eltern? Their. A stranger? Your (formal).",
        },
      ],
    },
    {
      heading: "Die Endungen",
      blocks: [
        {
          type: "paragraph",
          text: "The base word then takes the ending of the noun, exactly like ein: masculine gets nothing in the nominative (mein Bruder), feminine gets -e (meine Schwester), neuter nothing (mein Kind), plural -e (meine Kinder). In the accusative, only the masculine adds -en: meinen Bruder.",
        },
        {
          type: "table",
          caption: "mein in all its forms",
          head: ["Noun", "Nominative", "Accusative"],
          rows: [
            ["der Bruder (m.)", "mein Bruder", "meinen Bruder"],
            ["die Schwester (f.)", "meine Schwester", "meine Schwester"],
            ["das Kind (n.)", "mein Kind", "mein Kind"],
            ["die Kinder (pl.)", "meine Kinder", "meine Kinder"],
          ],
        },
                {
          type: "gloss",
          de: "Ich sehe meinen Bruder. Ich besuche meine Oma. Wir lieben unser Kind.",
          en: "I see my brother. I visit my grandma. We love our child.",
          words: [{"word": "Ich", "pos": "Pronomen", "en": "I"}, {"word": "sehe", "pos": "Verb", "en": "see"}, {"word": "meinen", "pos": "Pronomen", "en": "my (acc.)"}, {"word": "Bruder.", "pos": "Nomen", "en": "brother"}, {"word": "Ich", "pos": "Pronomen", "en": "I"}, {"word": "besuche", "pos": "Verb", "en": "visit"}, {"word": "meine", "pos": "Pronomen", "en": "my (acc.)"}, {"word": "Oma.", "pos": "Nomen", "en": "grandma"}, {"word": "Wir", "pos": "Pronomen", "en": "we"}, {"word": "lieben", "pos": "Verb", "en": "love"}, {"word": "unser", "pos": "Pronomen", "en": "our (acc.)"}, {"word": "Kind.", "pos": "Nomen", "en": "child"}],
        },

        {
          type: "tip",
          text: "Two steps: pick the base by the owner, then add the ending of the noun. Anna -> ihr, Bruder -> masculine -> ihr Bruder. Anna -> ihr, Schwester -> feminine -> ihre Schwester.",
        },
      ],
    },
    {
      heading: "Häufige Fehler",
      blocks: [
        {
          type: "paragraph",
          text: "The two classic mistakes: confusing sein and ihr, and forgetting the ending. sein belongs to er and es: Er hat einen Bruder. Sein Bruder heißt Paul. ihr belongs to sie (she) and sie (they): Anna hat eine Schwester. Ihre Schwester heißt Mia. The ending must follow the noun: mein Vater but meine Mutter.",
        },
                {
          type: "gloss",
          de: "Er hat einen Bruder. Sein Bruder heißt Paul. Anna hat eine Schwester. Ihre Schwester heißt Mia.",
          en: "He has a brother. His brother is called Paul. Anna has a sister. Her sister is called Mia.",
          words: [{"word": "Er", "pos": "Pronomen", "en": "he"}, {"word": "hat", "pos": "Verb", "en": "has"}, {"word": "einen", "pos": "Artikel", "en": "a (acc.)"}, {"word": "Bruder.", "pos": "Nomen", "en": "brother"}, {"word": "Sein", "pos": "Pronomen", "en": "his"}, {"word": "Bruder", "pos": "Nomen", "en": "brother"}, {"word": "heißt", "pos": "Verb", "en": "is called"}, {"word": "Paul.", "pos": "Nomen", "en": "Paul"}, {"word": "Anna", "pos": "Nomen", "en": "Anna"}, {"word": "hat", "pos": "Verb", "en": "has"}, {"word": "eine", "pos": "Artikel", "en": "a (acc.)"}, {"word": "Schwester.", "pos": "Nomen", "en": "sister"}, {"word": "Ihre", "pos": "Pronomen", "en": "her"}, {"word": "Schwester", "pos": "Nomen", "en": "sister"}, {"word": "heißt", "pos": "Verb", "en": "is called"}, {"word": "Mia.", "pos": "Nomen", "en": "Mia"}],
        },

        {
          type: "tip",
          text: "Ask: who owns it? If he owns it, sein. If she owns it, ihr. Then ask: what is the noun? The noun sets the ending.",
        },
      ],
    },
  ],
  vocab: [
    { id: "das-possessivpronomen", de: "das Possessivpronomen", en: "the possessive pronoun", part: "noun n.", plural: "die Possessivpronomen", audio: true },
    { id: "mein", de: "mein", en: "my", part: "possessive", audio: true },
    { id: "dein", de: "dein", en: "your (informal)", part: "possessive", audio: true },
    { id: "sein", de: "sein", en: "his", part: "possessive", audio: true },
    { id: "ihr", de: "ihr", en: "her / their", part: "possessive", audio: true },
    { id: "unser", de: "unser", en: "our", part: "possessive", audio: true },
    { id: "meinen-bruder", de: "meinen Bruder", en: "my brother (accusative)", part: "phrase", phrase: true, audio: true },
    { id: "meine-schwester", de: "meine Schwester", en: "my sister", part: "phrase", phrase: true, audio: true },
    { id: "sein-vater", de: "sein Vater", en: "his father", part: "phrase", phrase: true, audio: true },
    { id: "ihre-mutter", de: "ihre Mutter", en: "her mother", part: "phrase", phrase: true, audio: true },
  ],
  exercises: [
    {
      id: "ex-basis",
      type: "multiple-choice",
      title: "Übung 1: Die Basis",
      instruction: "Choose the correct possessive base.",
      prompt: "Anna hat einen Bruder. ___ Bruder heißt Paul.",
      options: ["Ihr", "Sein", "Dein"],
      correctIndex: 0,
      explain: "Anna is she, so the base is ihr.",
    },
    {
      id: "ex-endung",
      type: "multiple-choice",
      title: "Übung 2: Die Endung",
      instruction: "Choose the correct ending.",
      prompt: "Ich habe eine Schwester. ___ Schwester heißt Mia.",
      options: ["Meine", "Mein", "Meinen"],
      correctIndex: 0,
      explain: "Schwester is feminine, so the ending is -e: meine.",
    },
    {
      id: "ex-akk-possessiv",
      type: "fill-blank",
      title: "Übung 3: Der Akkusativ",
      instruction: "Complete with the possessive in the accusative.",
      sentence: "Ich sehe ___ Bruder. (my) Er besucht ___ Oma. (his)",
      blanks: [
        { answers: ["meinen"], hint: "masculine accusative" },
        { answers: ["seine"], hint: "feminine" },
      ],
    },
    {
      id: "ex-possessiv-matching",
      type: "matching",
      title: "Übung 4: Wem gehört was?",
      instruction: "Match each owner to their possessive.",
      pairs: [
        ["ich", "mein"],
        ["du", "dein"],
        ["er", "sein"],
        ["sie (she)", "ihr"],
        ["wir", "unser"],
      ],
    },
    {
      id: "ex-possessiv-satz",
      type: "word-order",
      title: "Übung 5: Der Satz",
      instruction: "Build the sentence: I see my brother.",
      chunks: ["Ich", "sehe", "meinen", "Bruder."],
      explain: "The accusative masculine takes -en: meinen.",
    },
    {
      id: "ex-possessiv-karten",
      type: "flashcard",
      title: "Übung 6: Possessivkarten",
      instruction: "Say the German phrase out loud before revealing.",
      items: [
        { front: "mein Vater", back: "my father", frontAudio: true },
        { front: "meine Mutter", back: "my mother", frontAudio: true },
        { front: "meinen Bruder", back: "my brother (accusative)", frontAudio: true },
        { front: "sein Kind", back: "his child", frontAudio: true },
        { front: "ihre Schwester", back: "her sister", frontAudio: true },
        { front: "unser Haus", back: "our house", frontAudio: true },
      ],
    },
  ],
};

const negationTief: Lesson = {
  id: "negation-erklaert",
  title: "Negation erklärt: nicht, kein, nichts, nie",
  summary:
    "Everything about negation for a total beginner: nicht vs kein, positions, and the full negative vocabulary.",
  status: "ready",
  sections: [
    {
      heading: "Die Grundregel: nicht oder kein?",
      blocks: [
        {
          type: "paragraph",
          text: "German has two main ways to say no. kein negates a noun and replaces the article: Ich habe keine Schwester. nicht negates everything else: verbs, adjectives, places, whole sentences: Ich wohne nicht in Berlin. The test: can you replace the negated word with a noun? Then kein. Is it a verb, an adjective, or a whole statement? Then nicht.",
        },
        {
          type: "table",
          caption: "nicht or kein?",
          head: ["You want to negate", "Use", "Example"],
          rows: [
            ["a noun", "kein", "Ich habe kein Auto."],
            ["a verb", "nicht", "Ich koche nicht."],
            ["an adjective", "nicht", "Das ist nicht teuer."],
            ["a place", "nicht", "Ich wohne nicht in Berlin."],
            ["a whole sentence", "nicht", "Ich komme nicht."],
          ],
        },
        {
          type: "tip",
          text: "The trick question: does a noun follow? If yes, kein. Everything else takes nicht.",
        },
      ],
    },
    {
      heading: "Die kein-Formen",
      blocks: [
        {
          type: "paragraph",
          text: "kein declines exactly like ein, plus a plural: kein Bruder, keine Schwester, kein Kind, keine Kinder. In the accusative only the masculine changes: keinen Bruder.",
        },
        {
          type: "table",
          caption: "kein in all its forms",
          head: ["Noun", "Nominative", "Accusative"],
          rows: [
            ["der Bruder (m.)", "kein Bruder", "keinen Bruder"],
            ["die Schwester (f.)", "keine Schwester", "keine Schwester"],
            ["das Kind (n.)", "kein Kind", "kein Kind"],
            ["die Kinder (pl.)", "keine Kinder", "keine Kinder"],
          ],
        },
                {
          type: "gloss",
          de: "Ich habe keinen Bruder, aber ich habe eine Schwester.",
          en: "I have no brother, but I have a sister.",
          words: [{"word": "Ich", "pos": "Pronomen", "en": "I"}, {"word": "habe", "pos": "Verb", "en": "have"}, {"word": "keinen", "pos": "Artikel", "en": "no (acc.)"}, {"word": "Bruder,", "pos": "Nomen", "en": "brother"}, {"word": "aber", "pos": "Konjunktion", "en": "but"}, {"word": "ich", "pos": "Pronomen", "en": "I"}, {"word": "habe", "pos": "Verb", "en": "have"}, {"word": "eine", "pos": "Artikel", "en": "a (acc.)"}, {"word": "Schwester.", "pos": "Nomen", "en": "sister"}],
        },

      ],
    },
    {
      heading: "Die Position von nicht",
      blocks: [
        {
          type: "paragraph",
          text: "nicht sits at the very end when it negates the whole sentence, and directly before the word it negates. Ich koche nicht means I do not cook at all. Ich koche nicht gern means I do not like cooking (nicht before gern). The position tells you what is being denied.",
        },
                {
          type: "gloss",
          de: "Ich komme nicht. Ich komme nicht mit. Ich komme nicht gern.",
          en: "I am not coming. I am not coming along. I do not like coming.",
          words: [{"word": "Ich", "pos": "Pronomen", "en": "I"}, {"word": "komme", "pos": "Verb", "en": "come"}, {"word": "nicht.", "pos": "Adverb", "en": "not"}, {"word": "Ich", "pos": "Pronomen", "en": "I"}, {"word": "komme", "pos": "Verb", "en": "come"}, {"word": "nicht", "pos": "Adverb", "en": "not"}, {"word": "mit.", "pos": "Verb", "en": "(along)"}, {"word": "Ich", "pos": "Pronomen", "en": "I"}, {"word": "komme", "pos": "Verb", "en": "come"}, {"word": "nicht", "pos": "Adverb", "en": "not"}, {"word": "gern.", "pos": "Adverb", "en": "gladly"}],
        },

      ],
    },
    {
      heading: "Nichts, nie, niemand",
      blocks: [
        {
          type: "paragraph",
          text: "The negative family is complete with nothing, never, and nobody: nichts (nothing), nie (never), niemand (nobody). Note the spelling: nothing is nichts with ch, not nicht. Never say 'Ich habe nicht Hunger' for I am not hungry; it is Ich habe keinen Hunger, because Hunger is a noun.",
        },
        {
          type: "table",
          caption: "The negative family",
          head: ["German", "English", "Example"],
          rows: [
            ["nichts", "nothing", "Ich habe nichts gekauft."],
            ["nie", "never", "Ich trinke nie Kaffee."],
            ["niemand", "nobody", "Niemand ist zu Hause."],
            ["kein Hunger", "no hunger", "Ich habe keinen Hunger."],
            ["keine Zeit", "no time", "Ich habe keine Zeit."],
          ],
        },
        {
          type: "tip",
          text: "German is strict: only one negative per sentence. Ich habe kein Geld is correct; 'Ich habe kein nicht Geld' is wrong. No double negatives.",
        },
      ],
    },
    {
      heading: "Doch: die positive Antwort",
      blocks: [
        {
          type: "paragraph",
          text: "When someone asks a negative question and the answer is positive, German says doch, not ja: Hast du kein Auto? Doch! (Yes, I do!). ja would confirm the negative: Hast du kein Auto? Ja. (Right, I have none.) doch is one of the most natural words in spoken German.",
        },
                {
          type: "gloss",
          de: "Sprichst du kein Deutsch? Doch, ein bisschen!",
          en: "You do not speak German? Yes, a little!",
          words: [{"word": "Sprichst", "pos": "Verb", "en": "speak"}, {"word": "du", "pos": "Pronomen", "en": "you"}, {"word": "kein", "pos": "Artikel", "en": "no"}, {"word": "Deutsch?", "pos": "Nomen", "en": "German"}, {"word": "Doch,", "pos": "Adverb", "en": "yes (contrary)"}, {"word": "ein", "pos": "Artikel", "en": "a"}, {"word": "bisschen!", "pos": "Adverb", "en": "little"}],
        },

      ],
    },
  ],
  vocab: [
    { id: "die-verneinung", de: "die Verneinung", en: "the negation", part: "noun f.", plural: "die Verneinungen", audio: true },
    { id: "nicht", de: "nicht", en: "not", part: "adverb", audio: true },
    { id: "kein", de: "kein", en: "no (masculine, neuter)", part: "determiner", audio: true },
    { id: "keine", de: "keine", en: "no (feminine, plural)", part: "determiner", audio: true },
    { id: "keinen", de: "keinen", en: "no (masculine accusative)", part: "determiner", audio: true },
    { id: "nichts", de: "nichts", en: "nothing", part: "pronoun", audio: true },
    { id: "nie", de: "nie", en: "never", part: "adverb", audio: true },
    { id: "niemand", de: "niemand", en: "nobody", part: "pronoun", audio: true },
    { id: "doch", de: "doch", en: "yes (contradicting a negative)", part: "interjection", audio: true },
    { id: "keinen-hunger", de: "keinen Hunger", en: "not hungry", part: "phrase", phrase: true, audio: true },
  ],
  exercises: [
    {
      id: "ex-nicht-kein",
      type: "multiple-choice",
      title: "Übung 1: nicht oder kein?",
      instruction: "Choose the correct negation.",
      prompt: "Ich habe ___ Bruder.",
      options: ["keinen", "nicht", "kein"],
      correctIndex: 0,
      explain: "Bruder is masculine, accusative: keinen Bruder.",
    },
    {
      id: "ex-nicht-kein2",
      type: "multiple-choice",
      title: "Übung 2: nicht oder kein?",
      instruction: "Choose the correct negation.",
      prompt: "Ich wohne ___ in Berlin.",
      options: ["nicht", "keine", "kein"],
      correctIndex: 0,
      explain: "The place is negated with nicht.",
    },
    {
      id: "ex-negativ-familie",
      type: "fill-blank",
      title: "Übung 3: Die Negativfamilie",
      instruction: "Complete with the negative word.",
      sentence: "Ich habe ___ gekauft. (nothing) Ich trinke ___ Kaffee. (never) Ich habe ___ Zeit.",
      blanks: [
        { answers: ["nichts"], hint: "nothing" },
        { answers: ["nie"], hint: "never" },
        { answers: ["keine"], hint: "no (feminine)" },
      ],
    },
    {
      id: "ex-doch",
      type: "multiple-choice",
      title: "Übung 4: doch",
      instruction: "Choose the natural answer.",
      prompt: "Hast du kein Auto? (You DO have one.)",
      options: ["Doch!", "Ja.", "Nein!"],
      correctIndex: 0,
      explain: "A positive answer to a negative question uses doch.",
    },
    {
      id: "ex-negation-satz",
      type: "word-order",
      title: "Übung 5: Der Satz",
      instruction: "Build the sentence: I have no siblings.",
      chunks: ["Ich", "habe", "keine", "Geschwister."],
      explain: "keine replaces the article before the noun.",
    },
    {
      id: "ex-negation-karten",
      type: "flashcard",
      title: "Übung 6: Negationskarten",
      instruction: "Say the German out loud before revealing.",
      items: [
        { front: "kein Bruder", back: "no brother", frontAudio: true },
        { front: "keine Schwester", back: "no sister", frontAudio: true },
        { front: "nichts", back: "nothing", frontAudio: true },
        { front: "nie", back: "never", frontAudio: true },
        { front: "niemand", back: "nobody", frontAudio: true },
        { front: "Doch!", back: "Yes, I do!", frontAudio: true },
      ],
    },
  ],
};

const fragenTief: Lesson = {
  id: "fragen-bilden-erklaert",
  title: "Fragen bilden erklärt: zwei Systeme",
  summary:
    "Everything about forming questions for a total beginner: W-questions, yes/no questions, word order, and answering.",
  status: "ready",
  sections: [
    {
      heading: "Die zwei Fragetypen",
      blocks: [
        {
          type: "paragraph",
          text: "German has exactly two question systems. Yes/no questions start with the verb and expect ja or nein: Lernst du Deutsch? W-questions start with a question word (wer, was, wo, wann, warum, wie) and expect real information: Wo wohnst du? In both types the verb takes the second position in the sentence.",
        },
        {
          type: "table",
          caption: "The two systems",
          head: ["Type", "Starts with", "Position of verb", "Example"],
          rows: [
            ["Yes/no", "the verb", "1", "Lernst du Deutsch?"],
            ["W-question", "a question word", "2", "Wo lernst du Deutsch?"],
            ["Statement", "anything", "2", "Ich lerne Deutsch."],
          ],
        },
        {
          type: "tip",
          text: "The verb is the anchor of every sentence: position two in statements and W-questions, position one in yes/no questions. Ask yourself: where is the verb?",
        },
      ],
    },
    {
      heading: "Die W-Fragen",
      blocks: [
        {
          type: "paragraph",
          text: "Every question word starts with w. The question word asks about a specific thing: wer asks for a person, was for a thing, wo for a place, woher for origin, wohin for destination, wann for time, warum for reason, wie for manner, wie viel for amounts, wie viele for counts, and welcher for choosing between known options.",
        },
        {
          type: "table",
          caption: "The question words",
          head: ["Word", "Asks about", "Example"],
          rows: [
            ["wer", "a person", "Wer ist das?"],
            ["was", "a thing", "Was ist das?"],
            ["wo", "a place", "Wo wohnst du?"],
            ["woher", "origin", "Woher kommst du?"],
            ["wohin", "destination", "Wohin fährst du?"],
            ["wann", "time", "Wann beginnt der Kurs?"],
            ["warum", "reason", "Warum lernst du Deutsch?"],
            ["wie", "manner, condition", "Wie geht es dir?"],
            ["wie viel", "amount", "Wie viel kostet das?"],
            ["wie viele", "count", "Wie viele Kinder hast du?"],
            ["welcher", "choosing", "Welchen Kaffee möchtest du?"],
          ],
        },
        {
          type: "tip",
          text: "Answer with the same word type the question asks for: Wo? -> place, Wann? -> time, Warum? -> reason with denn. Wo wohnst du? In Berlin. Wann? Um acht. Warum? Weil ich Zeit habe.",
        },
      ],
    },
    {
      heading: "Ja-Nein-Fragen und Inversion",
      blocks: [
        {
          type: "paragraph",
          text: "A yes/no question is made by swapping verb and subject: Du lernst Deutsch becomes Lernst du Deutsch?. When a sentence starts with something other than the subject (a time, a place), the subject jumps behind the verb: this is the inversion. Heute lerne ich Deutsch. The verb stays second in both.",
        },
                {
          type: "gloss",
          de: "Du lernst Deutsch. -> Lernst du Deutsch? Heute lerne ich Deutsch. Lernst du heute?",
          en: "You learn German. -> Are you learning German? Today I learn German. Are you learning today?",
          words: [{"word": "Du", "pos": "Pronomen", "en": "you"}, {"word": "lernst", "pos": "Verb", "en": "learn"}, {"word": "Deutsch.", "pos": "Nomen", "en": "German"}, {"word": "Lernst", "pos": "Verb", "en": "learn"}, {"word": "du", "pos": "Pronomen", "en": "you"}, {"word": "Deutsch?", "pos": "Nomen", "en": "German"}, {"word": "Heute", "pos": "Adverb", "en": "today"}, {"word": "lerne", "pos": "Verb", "en": "learn"}, {"word": "ich", "pos": "Pronomen", "en": "I"}, {"word": "Deutsch.", "pos": "Nomen", "en": "German"}, {"word": "Lernst", "pos": "Verb", "en": "learn"}, {"word": "du", "pos": "Pronomen", "en": "you"}, {"word": "heute?", "pos": "Adverb", "en": "today"}],
        },

      ],
    },
    {
      heading: "Antworten",
      blocks: [
        {
          type: "paragraph",
          text: "Answers mirror the question: yes/no questions get ja, nein, or doch; W-questions get the information asked for. Short answers repeat the verb: Lernst du Deutsch? Ja, ich lerne. Nein, ich lerne nicht.",
        },
        {
          type: "table",
          caption: "Answer patterns",
          head: ["Question", "Positive", "Negative"],
          rows: [
            ["Lernst du Deutsch?", "Ja, ich lerne Deutsch.", "Nein, ich lerne nicht."],
            ["Kommst du mit?", "Ja, ich komme mit.", "Nein, ich komme nicht mit."],
            ["Hast du kein Auto?", "Doch, ich habe ein Auto!", "Nein, ich habe kein Auto."],
          ],
        },
      ],
    },
  ],
  vocab: [
    { id: "die-frage", de: "die Frage", en: "the question", part: "noun f.", plural: "die Fragen", audio: true },
    { id: "fragen", de: "fragen", en: "to ask", part: "verb", audio: true },
    { id: "antworten", de: "antworten", en: "to answer", part: "verb", audio: true },
    { id: "die-antwort", de: "die Antwort", en: "the answer", part: "noun f.", plural: "die Antworten", audio: true },
    { id: "wer", de: "wer", en: "who", part: "question word", audio: true },
    { id: "was", de: "was", en: "what", part: "question word", audio: true },
    { id: "wo", de: "wo", en: "where", part: "question word", audio: true },
    { id: "wann", de: "wann", en: "when", part: "question word", audio: true },
    { id: "warum", de: "warum", en: "why", part: "question word", audio: true },
    { id: "wie-viele", de: "wie viele", en: "how many", part: "question word", audio: true },
    { id: "die-inversion", de: "die Inversion", en: "the inversion", part: "noun f.", audio: true },
  ],
  exercises: [
    {
      id: "ex-fragetyp",
      type: "multiple-choice",
      title: "Übung 1: Der Fragetyp",
      instruction: "Choose the correct question.",
      prompt: "The answer is 'In Berlin'. Which question was asked?",
      options: ["Wo wohnst du?", "Wann wohnst du?", "Wer wohnt hier?"],
      correctIndex: 0,
      explain: "A place answer follows a wo question.",
    },
    {
      id: "ex-fragewort",
      type: "multiple-choice",
      title: "Übung 2: Das Fragewort",
      instruction: "Choose the question word for the answer.",
      prompt: "___ alt bist du? Ich bin 25.",
      options: ["Wie", "Was", "Wo"],
      correctIndex: 0,
      explain: "Age is asked with wie alt.",
    },
    {
      id: "ex-inversion",
      type: "fill-blank",
      title: "Übung 3: Die Inversion",
      instruction: "Complete with the right order.",
      sentence: "___ lerne ich Deutsch. (today) ___ du Deutsch? (learn, yes/no)",
      blanks: [
        { answers: ["Heute"], hint: "time at the front" },
        { answers: ["Lernst"], hint: "verb first" },
      ],
    },
    {
      id: "ex-fragen-matching",
      type: "matching",
      title: "Übung 4: Frage und Antwort",
      instruction: "Match each question to its answer.",
      pairs: [
        ["Wo wohnst du?", "In Berlin."],
        ["Woher kommst du?", "Aus Italien."],
        ["Wann beginnt der Kurs?", "Um neun Uhr."],
        ["Wie viele Kinder hast du?", "Zwei Kinder."],
        ["Warum lernst du Deutsch?", "Weil ich hier lebe."],
      ],
    },
    {
      id: "ex-fragen-satz",
      type: "word-order",
      title: "Übung 5: Der Satz",
      instruction: "Build the question: Where do you live?",
      chunks: ["Wo", "wohnst", "du?"],
      explain: "Question word first, verb second.",
    },
    {
      id: "ex-fragen-karten",
      type: "flashcard",
      title: "Übung 6: Fragekarten",
      instruction: "Say the German question out loud before revealing.",
      items: [
        { front: "Wo wohnst du?", back: "Where do you live?", frontAudio: true },
        { front: "Woher kommst du?", back: "Where are you from?", frontAudio: true },
        { front: "Wie alt bist du?", back: "How old are you?", frontAudio: true },
        { front: "Wann beginnt der Kurs?", back: "When does the course start?", frontAudio: true },
        { front: "Lernst du Deutsch?", back: "Are you learning German?", frontAudio: true },
        { front: "Wie viel kostet das?", back: "How much does that cost?", frontAudio: true },
      ],
    },
  ],
};

export const grammatikKompakt2: Unit = {
  id: "grammatik-kompakt-2",
  title: "Grammatik Kompakt 2",
  theme: "Grammar deep dives",
  lessons: [akkusativTief, possessivTief, negationTief, fragenTief],
};