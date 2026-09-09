import type { Level, Lesson } from "../schema";

function planned(id: string, title: string, summary: string): Lesson {
  return { id, title, summary, status: "planned", sections: [], vocab: [], exercises: [] };
}

export const a2: Level = {
  id: "a2",
  title: "A2",
  subtitle: "Elementary",
  description:
    "The past tense, subordinate clauses, dative verbs, and the prepositions and connectors that make German flow.",
  units: [
    {
      id: "beziehungen-und-feste",
      title: "Beziehungen und Feste",
      theme: "Relationships and celebrations",
      lessons: [
        planned(
          "feste-und-feiern",
          "Feste und Feiern",
          "Celebrations and occasions: Geburtstag, Weihnachten, Hochzeit.",
        ),
        planned(
          "einladungen-planen",
          "Einladungen planen",
          "Making and accepting invitations; fixing dates and times.",
        ),
        planned(
          "geschenke",
          "Geschenke",
          "Giving gifts and polite thanks; gefallen and schenken.",
        ),
        planned(
          "reflexivverben-einfuehrung",
          "Reflexivverben: sich freuen, sich treffen",
          "First reflexive verbs and their pronouns.",
        ),
        planned(
          "nebensaetze-weil",
          "Sätze mit weil",
          "Reason clauses with verb-final word order.",
        ),
        planned(
          "dativverben",
          "Dativverben",
          "helfen, gefallen, gehören, antworten, danken: verbs with the dative.",
        ),
      ],
    },
    {
      id: "alltagsgeschichten",
      title: "Alltagsgeschichten",
      theme: "Everyday stories",
      lessons: [
        planned(
          "perfekt-vertiefung",
          "Das Perfekt (Vertiefung)",
          "The complete participle system: irregular and mixed verbs.",
        ),
        planned(
          "perfekt-mit-sein",
          "Perfekt mit sein",
          "Movement and change of state: Ich bin gefahren, sie ist geblieben.",
        ),
        planned(
          "praeteritum-war-hatte",
          "Präteritum: war und hatte",
          "The simple past of sein and haben; erzählen wie früher.",
        ),
        planned(
          "zeitadverbien-vergangenheit",
          "Gestern, letzte Woche, vor zwei Tagen",
          "Past time markers and where they sit in the sentence.",
        ),
        planned(
          "nebensaetze-dass",
          "Sätze mit dass",
          "Ich finde, dass ... : that-clauses with verb-final order.",
        ),
        planned(
          "nebensaetze-wenn",
          "Sätze mit wenn",
          "When-clauses: Wenn es regnet, ...",
        ),
        planned(
          "geschichten-erzaehlen",
          "Geschichten erzählen",
          "Narrating the past: sequencing events in a story.",
        ),
      ],
    },
    {
      id: "arbeit-und-kommunikation",
      title: "Arbeit und Kommunikation",
      theme: "Work and communication",
      lessons: [
        planned(
          "telefonieren",
          "Telefonieren",
          "Phone calls: answering, asking to repeat, leaving messages.",
        ),
        planned(
          "termine-verschieben",
          "Termine verschieben",
          "Arranging and changing appointments politely.",
        ),
        planned(
          "zeitpraepositionen",
          "Zeitpräpositionen: für, seit, vor, nach, bis",
          "Temporal prepositions and their cases.",
        ),
        planned(
          "modalverben-im-praeteritum",
          "Modalverben im Präteritum",
          "konnte, musste, wollte, sollte: modals in the past.",
        ),
        planned(
          "deshalb-und-trotzdem",
          "Deshalb und trotzdem",
          "Cause and contrast connectors with inversion.",
        ),
      ],
    },
    {
      id: "wohnen-und-nachbarn",
      title: "Wohnen und Nachbarn",
      theme: "Living and neighbors",
      lessons: [
        planned(
          "umziehen",
          "Umziehen",
          "Moving house: boxes, transport, and new beginnings.",
        ),
        planned(
          "wohnungsanzeigen-verstehen",
          "Wohnungsanzeigen verstehen",
          "Decoding ads: Kaltmiete, Nebenkosten, provisionsfrei.",
        ),
        planned(
          "reflexivverben-alltag",
          "Reflexivverben im Alltag",
          "sich anziehen, sich waschen; dative reflexive with body parts.",
        ),
        planned(
          "wechselpraepositionen",
          "Wechselpräpositionen",
          "an, auf, in, über, unter, vor, hinter, neben, zwischen: wo or wohin?",
        ),
        planned(
          "hausregeln",
          "Hausregeln",
          "House rules and neighborly small talk.",
        ),
      ],
    },
    {
      id: "einkaufen-und-service",
      title: "Einkaufen und Service",
      theme: "Shopping and services",
      lessons: [
        planned(
          "reklamationen",
          "Reklamationen",
          "Complaints and returns: Ich möchte das zurückgeben.",
        ),
        planned(
          "dienstleistungen",
          "Post, Bank, Friseur",
          "Services: parcels, bank errands, appointments.",
        ),
        planned(
          "komparativ-und-superlativ",
          "Komparativ und Superlativ",
          "größer als, am größten: comparisons.",
        ),
        planned(
          "adjektivdeklination",
          "Adjektivdeklination",
          "Adjective endings after der and ein words in three cases.",
        ),
        planned(
          "infinitiv-mit-zu",
          "Infinitiv mit zu",
          "Ich versuche, Deutsch zu lernen: infinitive with zu.",
        ),
      ],
    },
    {
      id: "gesundheit-und-termine",
      title: "Gesundheit und Termine",
      theme: "Health and appointments",
      lessons: [
        planned(
          "beim-arzt-vertieft",
          "Beim Arzt (Vertiefung)",
          "Symptoms, advice, and prescriptions in detail.",
        ),
        planned(
          "gesunde-gewohnheiten",
          "Gesunde Gewohnheiten",
          "Fitness, food, and daily habits; soll and muss.",
        ),
        planned(
          "unfaelle",
          "Unfälle",
          "Accidents and emergencies: Ich habe mir den Arm gebrochen.",
        ),
        planned(
          "modalverben-wiederholung",
          "Modalverben wiederholen",
          "All modals across tenses; double infinitive in Perfekt.",
        ),
      ],
    },
    {
      id: "mobilitaet-und-reisen",
      title: "Mobilität und Reisen",
      theme: "Mobility and travel",
      lessons: [
        planned(
          "reisen-planen",
          "Reisen planen",
          "Planning trips: tickets, times, and connections.",
        ),
        planned(
          "am-bahnhof",
          "Am Bahnhof",
          "At the station: announcements and asking for help.",
        ),
        planned(
          "im-hotel",
          "Im Hotel",
          "Check-in, room requests, and complaints at the hotel.",
        ),
        planned(
          "konjunktiv-ii-wuerde",
          "Höflich mit würde",
          "Ich würde gern ... : polite wishes and requests.",
        ),
        planned(
          "futur-mit-werden",
          "Das Futur: werden + Infinitiv",
          "Plans and predictions: Ich werde morgen fliegen.",
        ),
      ],
    },
    {
      id: "freizeit-und-kultur",
      title: "Freizeit und Kultur",
      theme: "Free time and culture",
      lessons: [
        planned(
          "medien",
          "Medien: Radio, Fernsehen, Internet",
          "Media vocabulary and opinions: Ich finde, dass ...",
        ),
        planned(
          "veranstaltungen",
          "Veranstaltungen",
          "Concerts, cinema, museums: tickets and small talk.",
        ),
        planned(
          "pronomen-man-und-es",
          "Man und es",
          "Impersonal subjects: Man spricht Deutsch. Es regnet.",
        ),
        planned(
          "demonstrativ-dieser",
          "Dieser, diese, dieses",
          "Pointing things out: dieser instead of der.",
        ),
        planned(
          "konjunktiv-ii-bitten",
          "Könnte, hätte, wäre",
          "Polite requests and wishes with the subjunctive.",
        ),
      ],
    },
    {
      id: "lernen-und-berufswahl",
      title: "Lernen und Berufswahl",
      theme: "Learning and career choice",
      lessons: [
        planned(
          "schulfaecher",
          "Schulfächer",
          "School subjects and talking about learning.",
        ),
        planned(
          "berufswahl",
          "Berufswahl",
          "Choosing a career: Was möchtest du werden?",
        ),
        planned(
          "bewerbung-basics",
          "Bewerbung: Lebenslauf",
          "Resume basics and job applications.",
        ),
        planned(
          "wortstellung-vertieft",
          "Wortstellung vertieft",
          "Time, manner, place: where adverbs belong.",
        ),
      ],
    },
    {
      id: "wetter-und-natur",
      title: "Wetter und Natur",
      theme: "Weather and nature",
      lessons: [
        planned(
          "wettervorhersage",
          "Wettervorhersage",
          "Forecasts: morgen wird es regnen; temperatures.",
        ),
        planned(
          "jahreszeiten",
          "Jahreszeiten",
          "Seasons and seasonal activities in detail.",
        ),
        planned(
          "umwelt-basics",
          "Umwelt im Alltag",
          "Environment basics: recycling, saving energy, nature.",
        ),
        planned(
          "als-und-wie",
          "als oder wie?",
          "Comparisons: doppelt so groß wie, größer als.",
        ),
      ],
    },
  ],
};