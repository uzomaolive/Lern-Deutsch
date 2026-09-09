import type { Level, Lesson } from "../schema";
import { kennenlernen } from "./units/kennenlernen";
import { familieUndFreunde } from "./units/familie-und-freunde";
import { essenUndTrinken } from "./units/essen-und-trinken";
import { tagesablaufUndZeit } from "./units/tagesablauf-und-zeit";

function planned(id: string, title: string, summary: string): Lesson {
  return { id, title, summary, status: "planned", sections: [], vocab: [], exercises: [] };
}

export const a1: Level = {
  id: "a1",
  title: "A1",
  subtitle: "Beginner",
  description:
    "Greetings, introductions, daily life, and the foundations of German grammar: present tense, cases, and word order.",
  units: [
    kennenlernen,
    familieUndFreunde,
    essenUndTrinken,
    tagesablaufUndZeit,
    {
      id: "wohnen",
      title: "Wohnen",
      theme: "Living",
      lessons: [
        planned(
          "mein-zuhause",
          "Mein Zuhause",
          "Rooms, furniture, and describing where things are.",
        ),
        planned(
          "wo-wohnt-was",
          "Wo? Mit dem Dativ",
          "Locations: auf dem Tisch, in der Küche.",
        ),
        planned(
          "wohin-geht-es",
          "Wohin? Mit dem Akkusativ",
          "Movement: Ich lege das Buch auf den Tisch.",
        ),
        planned(
          "farben",
          "Farben",
          "Colors and simple adjective use.",
        ),
        planned(
          "wohnungsanzeigen",
          "Wohnungsanzeigen",
          "Reading apartment ads: Zimmer, Miete, Balkon.",
        ),
      ],
    },
    {
      id: "arbeit-und-beruf",
      title: "Arbeit und Beruf",
      theme: "Work and professions",
      lessons: [
        planned(
          "berufe",
          "Berufe",
          "Professions and workplaces; Was sind Sie von Beruf?",
        ),
        planned(
          "praepositionen-mit-dativ",
          "Präpositionen mit Dativ",
          "mit, nach, aus, zu, von, bei: fixed dative prepositions.",
        ),
        planned(
          "pronomen-im-dativ",
          "Pronomen im Dativ",
          "mir, dir, ihm, ihr: dative pronouns in everyday phrases.",
        ),
        planned(
          "wortstellung",
          "Wortstellung",
          "Verb in second position and inversion after fronted elements.",
        ),
        planned(
          "im-buero",
          "Im Büro",
          "Workplace small talk and polite requests.",
        ),
      ],
    },
    {
      id: "stadt-und-orientierung",
      title: "Stadt und Orientierung",
      theme: "City and getting around",
      lessons: [
        planned(
          "die-stadt",
          "Die Stadt",
          "Places in the city: der Bahnhof, die Apotheke, das Kino.",
        ),
        planned(
          "richtungen",
          "Richtungen und Wege",
          "Asking and giving directions: links, rechts, geradeaus.",
        ),
        planned(
          "wo-woher-wohin",
          "Wo, woher, wohin?",
          "Location, origin, and destination with the right preposition.",
        ),
        planned(
          "oeffentliche-verkehrsmittel",
          "Öffentliche Verkehrsmittel",
          "Buses and trains: tickets and times.",
        ),
        planned(
          "das-wetter",
          "Das Wetter",
          "Weather basics: Es regnet, die Sonne scheint.",
        ),
      ],
    },
    {
      id: "einkaufen",
      title: "Einkaufen",
      theme: "Shopping",
      lessons: [
        planned(
          "kleidung",
          "Kleidung",
          "Clothes, sizes, and colors.",
        ),
        planned(
          "einkaufsdialoge",
          "Einkaufsdialoge",
          "Buying things: Wie viel kostet das?",
        ),
        planned(
          "kontraktionen",
          "am, im, zum, zur",
          "Article contractions: am, im, ins, zum, zur, beim, vom.",
        ),
        planned(
          "umtausch-und-reklamation",
          "Umtausch und Reklamation",
          "Exchanging goods and complaining politely.",
        ),
      ],
    },
    {
      id: "gesundheit-und-koerper",
      title: "Gesundheit und Körper",
      theme: "Health and body",
      lessons: [
        planned(
          "der-koerper",
          "Der Körper",
          "Body parts and simple ailments.",
        ),
        planned(
          "beim-arzt",
          "Beim Arzt",
          "At the doctor: describing how you feel.",
        ),
        planned(
          "gesundheitstipps",
          "Gesundheitstipps",
          "Healthy habits with sollen and imperatives.",
        ),
      ],
    },
    {
      id: "freizeit-und-reisen",
      title: "Freizeit und Reisen",
      theme: "Free time and travel",
      lessons: [
        planned(
          "hobbys-und-sport",
          "Hobbys und Sport",
          "Free time activities and sports.",
        ),
        planned(
          "nach-berlin-oder-in-die-schweiz",
          "Nach Berlin oder in die Schweiz?",
          "nach, in, and aus with countries and cities.",
        ),
        planned(
          "reisen",
          "Reisen",
          "Travel vocabulary and vowel-changing verbs: fahren, lesen, sprechen.",
        ),
        planned(
          "einladungen",
          "Einladungen",
          "Invitations: Wann? Wo? Um wie viel Uhr?",
        ),
      ],
    },
  ],
};