import type { Lesson } from "../../../schema";
import { frage, richtigFalsch } from "./story-factories";

/**
 * Original short story for reading practice. Anna starts her first day at a
 * new job and is warmly welcomed by her colleagues.
 */

export const geschichteArbeit: Lesson = {
  id: "geschichte-07-der-erste-arbeitstag",
  title: "Der erste Arbeitstag",
  summary:
    "Anna hat ihren ersten Arbeitstag in einem Café. Sie ist aufgeregt, aber die Kollegen sind freundlich und sie lernt viel.",
  status: "ready",
  sections: [
    {
      heading: "Der erste Arbeitstag",
      blocks: [
        {
          type: "paragraph",
          text: "Anna hat heute ihren ersten Arbeitstag im Café Sonne. Sie ist um sieben Uhr aufgestanden, hat sich schön angezogen und ist früh losgegangen. Auf dem Weg hat sie noch einen Kaffee gekauft.",
        },
        {
          type: "paragraph",
          text: "Im Café wartet schon der Chef, Herr Berger. „Guten Morgen, Anna! Willkommen im Team. Ich zeige Ihnen zuerst die Küche, dann die Kasse.“ Anna ist ein bisschen aufgeregt, aber der Chef ist freundlich.",
        },
        {
          type: "paragraph",
          text: "Die Kollegin Julia zeigt Anna alles: Wie man den Espresso macht, wo die Tassen stehen und wie man den Tisch deckt. „Keine Sorge“, sagt Julia, „in einer Woche kannst du alles.“",
        },
        {
          type: "paragraph",
          text: "Um elf Uhr kommen viele Gäste. Anna bringt Kaffee und Kuchen an die Tische. Einmal vergisst sie den Zucker und einmal bringt sie den falschen Kuchen. Aber die Gäste sind nett und Julia hilft ihr.",
        },
        {
          type: "paragraph",
          text: "Am Abend ist Anna müde, aber glücklich. Der Chef sagt: „Gute Arbeit für den ersten Tag, Anna! Morgen um acht Uhr?“ Anna nickt und lächelt. Sie freut sich auf morgen.",
        },
        {
          type: "tip",
          text: "Der erste Tag: der Chef, die Kollegin, die Küche, die Kasse, der Gast. Und die Uhrzeiten: um sieben Uhr, um elf Uhr, um acht Uhr.",
        },
      ],
    },
  ],
  vocab: [
    { id: "der-arbeitstag", de: "der Arbeitstag", en: "the working day", part: "noun m.", plural: "die Arbeitstage", audio: true },
    { id: "der-chef", de: "der Chef", en: "the boss", part: "noun m.", plural: "die Chefs", audio: true },
    { id: "die-kollegin", de: "die Kollegin", en: "the colleague (f.)", part: "noun f.", plural: "die Kolleginnen", audio: true },
    { id: "die-kueche", de: "die Küche", en: "the kitchen", part: "noun f.", plural: "die Küchen", audio: true },
    { id: "die-kasse", de: "die Kasse", en: "the cash register", part: "noun f.", plural: "die Kassen", audio: true },
    { id: "der-gast", de: "der Gast", en: "the guest", part: "noun m.", plural: "die Gäste", audio: true },
    { id: "der-espresso", de: "der Espresso", en: "the espresso", part: "noun m.", plural: "die Espressos", audio: true },
    { id: "aufgeregt", de: "aufgeregt", en: "excited, nervous", part: "adjective", audio: true },
    { id: "freundlich", de: "freundlich", en: "friendly", part: "adjective", audio: true },
    { id: "aufstehen", de: "aufstehen", en: "to get up", part: "verb", audio: true },
    { id: "der-tisch", de: "der Tisch", en: "the table", part: "noun m.", plural: "die Tische", audio: true },
    { id: "die-tasse", de: "die Tasse", en: "the cup", part: "noun f.", plural: "die Tassen", audio: true },
  ],
  exercises: [
    frage(1, "Wo arbeitet Anna ab heute?",
      ["Im Café Sonne", "In der Schule", "Im Büro"], 0,
      "Anna hat ihren ersten Arbeitstag im Café Sonne."),
    frage(2, "Wer zeigt Anna die Küche und die Kasse?",
      ["Der Chef, Herr Berger", "Die Kollegin Julia", "Ein Gast"], 0,
      "Der Chef zeigt Anna zuerst die Küche, dann die Kasse."),
    frage(3, "Wer hilft Anna bei den Gästen?",
      ["Julia", "Herr Berger", "Die Oma"], 0,
      "Julia hilft Anna und die Gäste sind nett."),
    frage(4, "Was vergisst Anna einmal?",
      ["Den Zucker", "Den Kaffee", "Die Kasse"], 0,
      "Einmal vergisst sie den Zucker und einmal den falschen Kuchen."),
    frage(5, "Was sagt der Chef am Abend?",
      ["Gute Arbeit für den ersten Tag", "Sie müssen morgen frei bleiben", "Der Kaffee ist zu stark"], 0,
      "Der Chef lobt Anna: Gute Arbeit für den ersten Tag."),
    richtigFalsch(6, "Anna ist um sieben Uhr aufgestanden.", true,
      "Sie ist um sieben Uhr aufgestanden und früh losgegangen."),
    richtigFalsch(7, "Anna arbeitet morgen nicht.", false,
      "Der Chef fragt: Morgen um acht Uhr? Anna nickt."),
  ],
};