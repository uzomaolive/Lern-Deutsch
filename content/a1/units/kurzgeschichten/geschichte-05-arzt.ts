import type { Lesson } from "../../../schema";
import { frage, richtigFalsch } from "./story-factories";

/**
 * Original short story for reading practice. Herr Berger is ill and visits
 * the doctor, who prescribes medicine and rest.
 */

export const geschichteArzt: Lesson = {
  id: "geschichte-05-beim-arzt",
  title: "Ein Besuch beim Arzt",
  summary:
    "Herr Berger hat Halsschmerzen und Fieber. Er geht zum Arzt, bekommt ein Rezept und drei Tage Ruhe.",
  status: "ready",
  sections: [
    {
      heading: "Ein Besuch beim Arzt",
      blocks: [
        {
          type: "paragraph",
          text: "Am Montagmorgen wacht Herr Berger auf und fühlt sich nicht gut. Er hat Halsschmerzen und der Kopf tut weh. Er misst Fieber: 38,5 Grad. Das ist zu viel. Er ruft die Arztpraxis an und bekommt einen Termin um 10 Uhr.",
        },
        {
          type: "paragraph",
          text: "Im Wartezimmer sind drei Patienten. Herr Berger wartet zwanzig Minuten. Dann ruft die Sprechstundenhilfe seinen Namen: „Herr Berger, bitte, kommen Sie herein.“",
        },
        {
          type: "paragraph",
          text: "Der Arzt schaut sich den Hals an und hört das Herz. „Sie haben eine Erkältung, Herr Berger. Nichts Schlimmes. Ich schreibe Ihnen ein Rezept: Nehmen Sie das Medikament dreimal am Tag, nach dem Essen. Und trinken Sie viel Tee.“",
        },
        {
          type: "paragraph",
          text: "„Wie lange soll ich zu Hause bleiben?“, fragt Herr Berger. „Drei Tage Ruhe sind genug“, sagt der Arzt. „Und am Donnerstag können Sie wieder arbeiten.“",
        },
        {
          type: "paragraph",
          text: "Nach dem Arztbesuch geht Herr Berger in die Apotheke. Die Apothekerin gibt ihm das Medikament und einen Tee für den Hals. Zu Hause legt er sich ins Bett. Am Donnerstag ist er wieder gesund.",
        },
        {
          type: "tip",
          text: "Beim Arzt: der Termin, das Wartezimmer, die Sprechstundenhilfe, das Rezept, das Medikament. Und: dreimal am Tag, nach dem Essen.",
        },
      ],
    },
  ],
  vocab: [
    { id: "die-halsschmerzen", de: "die Halsschmerzen", en: "the sore throat", part: "noun pl.", audio: true },
    { id: "das-fieber", de: "das Fieber", en: "the fever", part: "noun n.", audio: true },
    { id: "der-termin", de: "der Termin", en: "the appointment", part: "noun m.", plural: "die Termine", audio: true },
    { id: "das-wartezimmer", de: "das Wartezimmer", en: "the waiting room", part: "noun n.", plural: "die Wartezimmer", audio: true },
    { id: "die-sprechstundenhilfe", de: "die Sprechstundenhilfe", en: "the medical assistant", part: "noun f.", plural: "die Sprechstundenhilfen", audio: true },
    { id: "die-erkaeltung", de: "die Erkältung", en: "the cold", part: "noun f.", plural: "die Erkältungen", audio: true },
    { id: "das-rezept", de: "das Rezept", en: "the prescription", part: "noun n.", plural: "die Rezepte", audio: true },
    { id: "das-medikament", de: "das Medikament", en: "the medication", part: "noun n.", plural: "die Medikamente", audio: true },
    { id: "die-apotheke", de: "die Apotheke", en: "the pharmacy", part: "noun f.", plural: "die Apotheken", audio: true },
    { id: "der-hals", de: "der Hals", en: "the throat", part: "noun m.", plural: "die Hälse", audio: true },
    { id: "gesund", de: "gesund", en: "healthy", part: "adjective", audio: true },
    { id: "ruhen", de: "ruhen", en: "to rest", part: "verb", audio: true },
  ],
  exercises: [
    frage(1, "Warum ruft Herr Berger die Arztpraxis an?",
      ["Er hat einen Termin bekommen und ist krank.", "Er will einen Termin absagen.", "Er braucht ein Rezept für seine Frau."], 0,
      "Er fühlt sich nicht gut und bekommt einen Termin um 10 Uhr."),
    frage(2, "Was hat Herr Berger?",
      ["Eine Erkältung", "Eine Verletzung", "Eine Allergie"], 0,
      "Der Arzt sagt: Sie haben eine Erkältung, nichts Schlimmes."),
    frage(3, "Wie oft soll Herr Berger das Medikament nehmen?",
      ["Dreimal am Tag", "Zweimal am Tag", "Einmal am Tag"], 0,
      "Nehmen Sie das Medikament dreimal am Tag, nach dem Essen."),
    frage(4, "Wie lange soll Herr Berger zu Hause bleiben?",
      ["Drei Tage", "Eine Woche", "Einen Tag"], 0,
      "Drei Tage Ruhe sind genug, sagt der Arzt."),
    frage(5, "Wo holt Herr Berger das Medikament?",
      ["In der Apotheke", "In der Praxis", "Im Supermarkt"], 0,
      "Er geht nach dem Arztbesuch in die Apotheke."),
    richtigFalsch(6, "Herr Berger hat am Montag Fieber.", true,
      "Er misst 38,5 Grad, das ist zu viel."),
    richtigFalsch(7, "Der Arzt sagt, Herr Berger soll viel Kaffee trinken.", false,
      "Der Arzt sagt: Trinken Sie viel Tee."),
  ],
};