import type { Lesson } from "../../../schema";
import { frage, richtigFalsch } from "./story-factories";

/**
 * Original short story for reading practice. Tom goes to the market with
 * his mother and helps her carry the bags.
 */

export const geschichteMarkt: Lesson = {
  id: "geschichte-02-auf-dem-markt",
  title: "Auf dem Markt",
  summary:
    "Tom geht mit seiner Mutter auf den Wochenmarkt. Es gibt frisches Obst, Gemüse und Blumen. Tom hilft seiner Mutter, die Taschen zu tragen.",
  status: "ready",
  sections: [
    {
      heading: "Auf dem Markt",
      blocks: [
        {
          type: "paragraph",
          text: "Am Samstagmorgen geht Tom mit seiner Mutter auf den Wochenmarkt. Der Markt ist auf dem Marktplatz, in der Mitte der Stadt. Es ist noch früh, aber es sind schon viele Leute da.",
        },
        {
          type: "paragraph",
          text: "„Tom, wir brauchen Obst und Gemüse“, sagt seine Mutter. „Und ein Geschenk für Oma. Sie hat nächste Woche Geburtstag.“ Sie gehen zuerst zum Obststand. Die Äpfel sehen frisch aus. Der Mann am Stand sagt: „Die Äpfel kosten 2 Euro das Kilo. Die Erdbeeren sind heute im Angebot, 3 Euro das Körbchen.“",
        },
        {
          type: "paragraph",
          text: "Die Mutter kauft zwei Kilo Äpfel und ein Körbchen Erdbeeren. Dann gehen sie zum Blumenstand. „Die Rosen sind wunderschön“, sagt Tom. „Oma liebt Rosen.“ Seine Mutter kauft einen Strauß rote Rosen.",
        },
        {
          type: "paragraph",
          text: "Jetzt sind die Taschen voll: Äpfel, Erdbeeren, Rosen und noch ein Kilo Tomaten. Tom nimmt die schwerste Tasche. „Danke, Tom, du bist eine große Hilfe“, sagt seine Mutter und lächelt.",
        },
        {
          type: "paragraph",
          text: "Zu Hause macht Tom einen Obstsalat aus Äpfeln und Erdbeeren. Oma bekommt am Sonntag ihren Besuch, eine Woche vor dem Geburtstag.",
        },
        {
          type: "tip",
          text: "Der Markt: der Marktplatz, der Stand, das Obst, das Gemüse, das Geschenk. Üben Sie die Preise laut: 2 Euro das Kilo, 3 Euro das Körbchen.",
        },
      ],
    },
  ],
  vocab: [
    { id: "der-markt", de: "der Markt", en: "the market", part: "noun m.", plural: "die Märkte", audio: true },
    { id: "der-marktplatz", de: "der Marktplatz", en: "the market square", part: "noun m.", plural: "die Marktplätze", audio: true },
    { id: "der-stand", de: "der Stand", en: "the stall", part: "noun m.", plural: "die Stände", audio: true },
    { id: "das-obst", de: "das Obst", en: "the fruit", part: "noun n.", audio: true },
    { id: "das-gemuese", de: "das Gemüse", en: "the vegetables", part: "noun n.", audio: true },
    { id: "der-apfel", de: "der Apfel", en: "the apple", part: "noun m.", plural: "die Äpfel", audio: true },
    { id: "die-erdbeeren", de: "die Erdbeeren", en: "the strawberries", part: "noun pl.", audio: true },
    { id: "die-rose", de: "die Rose", en: "the rose", part: "noun f.", plural: "die Rosen", audio: true },
    { id: "das-geschenk", de: "das Geschenk", en: "the gift", part: "noun n.", plural: "die Geschenke", audio: true },
    { id: "das-angebot", de: "das Angebot", en: "the special offer", part: "noun n.", plural: "die Angebote", audio: true },
    { id: "kaufen", de: "kaufen", en: "to buy", part: "verb", audio: true },
    { id: "tragen", de: "tragen", en: "to carry", part: "verb", audio: true },
  ],
  exercises: [
    frage(1, "Wann geht Tom mit seiner Mutter auf den Markt?",
      ["Am Samstagmorgen", "Am Montagabend", "Am Sonntagmittag"], 0,
      "Am Samstagmorgen geht Tom mit seiner Mutter zum Markt."),
    frage(2, "Wo ist der Markt?",
      ["Auf dem Marktplatz", "Am Bahnhof", "Im Park"], 0,
      "Der Markt ist auf dem Marktplatz in der Mitte der Stadt."),
    frage(3, "Was kostet das Kilo Äpfel?",
      ["2 Euro", "3 Euro", "5 Euro"], 0,
      "Der Mann am Stand sagt: Die Äpfel kosten 2 Euro das Kilo."),
    frage(4, "Was kauft die Mutter für Oma?",
      ["Einen Strauß rote Rosen", "Ein Körbchen Erdbeeren", "Ein Kilo Tomaten"], 0,
      "Oma liebt Rosen, also kauft die Mutter einen Strauß rote Rosen."),
    frage(5, "Wer trägt die schwerste Tasche?",
      ["Tom", "Die Mutter", "Der Mann am Stand"], 0,
      "Tom nimmt die schwerste Tasche, seine Mutter dankt ihm."),
    richtigFalsch(6, "Die Erdbeeren sind im Angebot.", true,
      "Der Stand sagt: Die Erdbeeren sind heute im Angebot, 3 Euro das Körbchen."),
    richtigFalsch(7, "Tom macht zu Hause einen Kuchen.", false,
      "Tom macht einen Obstsalat aus Äpfeln und Erdbeeren."),
  ],
};