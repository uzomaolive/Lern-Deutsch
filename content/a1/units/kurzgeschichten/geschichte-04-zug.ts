import type { Lesson } from "../../../schema";
import { frage, richtigFalsch } from "./story-factories";

/**
 * Original short story for reading practice. Max takes the train to Berlin
 * for the first time to visit his friend.
 */

export const geschichteZug: Lesson = {
  id: "geschichte-04-der-zug-nach-berlin",
  title: "Der Zug nach Berlin",
  summary:
    "Max fährt zum ersten Mal allein mit dem Zug nach Berlin. Er findet sein Gleis, kauft ein Sandwich und trifft seinen Freund am Bahnhof.",
  status: "ready",
  sections: [
    {
      heading: "Der Zug nach Berlin",
      blocks: [
        {
          type: "paragraph",
          text: "Max ist 20 Jahre alt und wohnt in Hamburg. Heute fährt er zum ersten Mal allein mit dem Zug nach Berlin. Sein Freund Jonas wohnt dort und wartet schon am Bahnhof.",
        },
        {
          type: "paragraph",
          text: "Am Bahnhof ist es sehr voll. Max sucht den richtigen Bahnsteig. Auf dem großen Bildschirm steht: „Zug nach Berlin, Gleis 7, Abfahrt 10:15 Uhr.“ Max hat noch zwanzig Minuten Zeit.",
        },
        {
          type: "paragraph",
          text: "Er geht zu einem kleinen Laden und kauft ein Sandwich und eine Flasche Wasser. „Das macht 6 Euro 80“, sagt die Frau. Max bezahlt und nimmt sein Essen mit auf den Bahnsteig.",
        },
        {
          type: "paragraph",
          text: "Der Zug kommt pünktlich. Max findet einen Platz am Fenster. Die Fahrt dauert zwei Stunden. Er isst sein Sandwich und schaut aus dem Fenster. Die Landschaft ist schön: viele grüne Felder und kleine Dörfer.",
        },
        {
          type: "paragraph",
          text: "Um 12:15 Uhr kommt der Zug in Berlin an. Jonas steht schon am Gleis und winkt. „Max, da bist du ja! Komm, ich zeige dir die Stadt.“ Die zwei Freunde gehen zuerst in ein Café am Bahnhof.",
        },
        {
          type: "tip",
          text: "Am Bahnhof: der Bahnsteig, das Gleis, die Abfahrt, die Ankunft, die Fahrkarte. Zahlen Sie die Uhrzeiten: 10:15, 12:15.",
        },
      ],
    },
  ],
  vocab: [
    { id: "der-bahnsteig", de: "der Bahnsteig", en: "the platform", part: "noun m.", plural: "die Bahnsteige", audio: true },
    { id: "das-gleis", de: "das Gleis", en: "the track", part: "noun n.", plural: "die Gleise", audio: true },
    { id: "die-abfahrt", de: "die Abfahrt", en: "the departure", part: "noun f.", plural: "die Abfahrten", audio: true },
    { id: "die-ankunft", de: "die Ankunft", en: "the arrival", part: "noun f.", audio: true },
    { id: "das-sandwich", de: "das Sandwich", en: "the sandwich", part: "noun n.", plural: "die Sandwiches", audio: true },
    { id: "die-flasche", de: "die Flasche", en: "the bottle", part: "noun f.", plural: "die Flaschen", audio: true },
    { id: "das-feld", de: "das Feld", en: "the field", part: "noun n.", plural: "die Felder", audio: true },
    { id: "winken", de: "winken", en: "to wave", part: "verb", audio: true },
    { id: "puenktlich", de: "pünktlich", en: "on time", part: "adjective", audio: true },
    { id: "allein", de: "allein", en: "alone", part: "adverb", audio: true },
    { id: "der-bildschirm", de: "der Bildschirm", en: "the screen", part: "noun m.", plural: "die Bildschirme", audio: true },
    { id: "die-landschaft", de: "die Landschaft", en: "the landscape", part: "noun f.", plural: "die Landschaften", audio: true },
  ],
  exercises: [
    frage(1, "Wo wohnt Max?",
      ["In Hamburg", "In Berlin", "In München"], 0,
      "Max wohnt in Hamburg und fährt nach Berlin."),
    frage(2, "Von welchem Gleis fährt der Zug ab?",
      ["Gleis 7", "Gleis 2", "Gleis 12"], 0,
      "Auf dem Bildschirm steht: Zug nach Berlin, Gleis 7."),
    frage(3, "Was kauft Max am Bahnhof?",
      ["Ein Sandwich und eine Flasche Wasser", "Ein Buch und eine Zeitung", "Eine Fahrkarte und einen Kaffee"], 0,
      "Max kauft ein Sandwich und eine Flasche Wasser."),
    frage(4, "Wie lange dauert die Fahrt?",
      ["Zwei Stunden", "Eine Stunde", "Drei Stunden"], 0,
      "Die Fahrt dauert zwei Stunden, von 10:15 bis 12:15."),
    frage(5, "Wer wartet in Berlin auf Max?",
      ["Sein Freund Jonas", "Seine Mutter", "Sein Bruder"], 0,
      "Jonas steht schon am Gleis und winkt."),
    richtigFalsch(6, "Der Zug fährt pünktlich ab.", true,
      "Der Zug kommt pünktlich."),
    richtigFalsch(7, "Max bezahlt 6 Euro 80 für sein Essen.", true,
      "Die Frau sagt: Das macht 6 Euro 80."),
  ],
};