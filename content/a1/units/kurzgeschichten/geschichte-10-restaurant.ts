import type { Lesson } from "../../../schema";
import { frage, richtigFalsch } from "./story-factories";

/**
 * Original short story for reading practice. An evening at the restaurant
 * with a wrong order, a friendly waiter, and a happy ending.
 */

export const geschichteRestaurant: Lesson = {
  id: "geschichte-10-im-restaurant",
  title: "Ein Abend im Restaurant",
  summary:
    "Frau Klein isst mit ihrer Freundin im Restaurant zur Linde. Der Kellner bringt die falsche Bestellung, aber alles endet gut.",
  status: "ready",
  sections: [
    {
      heading: "Ein Abend im Restaurant",
      blocks: [
        {
          type: "paragraph",
          text: "Frau Klein hat am Freitagabend mit ihrer Freundin einen Tisch im Restaurant zur Linde reserviert. Es ist ein beliebtes Restaurant, also reservieren sie schon eine Woche vorher.",
        },
        {
          type: "paragraph",
          text: "Um 19 Uhr kommen die zwei Frauen. Der Kellner bringt die Speisekarten. „Die Salatplatte sieht sehr gut aus“, sagt die Freundin. Frau Klein nimmt die Bratwurst mit Kartoffelsalat.",
        },
        {
          type: "paragraph",
          text: "Nach zwanzig Minuten bringt der Kellner das Essen. Aber Frau Klein bekommt die Salatplatte und ihre Freundin die Bratwurst. „Entschuldigung“, sagt der Kellner, „ich habe mich vertan. Ich bringe sofort die richtigen Teller.“",
        },
        {
          type: "paragraph",
          text: "Der Kellner kommt mit den richtigen Tellern zurück. Zusätzlich bringt er ein Glas Wein als Entschuldigung. „Das ist sehr nett, aber das war nicht nötig“, sagt Frau Klein. Der Kellner lächelt.",
        },
        {
          type: "paragraph",
          text: "Am Ende schmeckt das Essen ausgezeichnet. Frau Klein bezahlt mit Karte und gibt ein gutes Trinkgeld. Draußen sagt ihre Freundin: „Das war ein schöner Abend. Und der Kellner war wirklich nett.“",
        },
        {
          type: "tip",
          text: "Im Restaurant: die Reservierung, die Speisekarte, die Bestellung, der Kellner, das Trinkgeld. Und: sich vertan, die Entschuldigung.",
        },
      ],
    },
  ],
  vocab: [
    { id: "das-restaurant", de: "das Restaurant", en: "the restaurant", part: "noun n.", plural: "die Restaurants", audio: true },
    { id: "die-reservierung", de: "die Reservierung", en: "the reservation", part: "noun f.", plural: "die Reservierungen", audio: true },
    { id: "die-speisekarte", de: "die Speisekarte", en: "the menu", part: "noun f.", plural: "die Speisekarten", audio: true },
    { id: "die-bestellung", de: "die Bestellung", en: "the order", part: "noun f.", plural: "die Bestellungen", audio: true },
    { id: "der-kellner", de: "der Kellner", en: "the waiter", part: "noun m.", plural: "die Kellner", audio: true },
    { id: "die-salatplatte", de: "die Salatplatte", en: "the salad plate", part: "noun f.", plural: "die Salatplatten", audio: true },
    { id: "die-bratwurst", de: "die Bratwurst", en: "the bratwurst", part: "noun f.", plural: "die Bratwürste", audio: true },
    { id: "das-trinkgeld", de: "das Trinkgeld", en: "the tip", part: "noun n.", audio: true },
    { id: "das-glas", de: "das Glas", en: "the glass", part: "noun n.", plural: "die Gläser", audio: true },
    { id: "sich-vertun", de: "sich vertun", en: "to make a mistake", part: "verb", audio: true },
    { id: "ausgezeichnet", de: "ausgezeichnet", en: "excellent", part: "adjective", audio: true },
    { id: "beliebt", de: "beliebt", en: "popular", part: "adjective", audio: true },
  ],
  exercises: [
    frage(1, "Wann reservieren die zwei Frauen den Tisch?",
      ["Eine Woche vorher", "Am selben Tag", "Einen Monat vorher"], 0,
      "Das Restaurant ist beliebt, also reservieren sie eine Woche vorher."),
    frage(2, "Was bestellt Frau Klein?",
      ["Die Bratwurst mit Kartoffelsalat", "Die Salatplatte", "Den Fisch"], 0,
      "Frau Klein nimmt die Bratwurst mit Kartoffelsalat."),
    frage(3, "Was bringt der Kellner zuerst?",
      ["Die falschen Teller", "Die Rechnung", "Das Trinkgeld"], 0,
      "Frau Klein bekommt die Salatplatte und ihre Freundin die Bratwurst."),
    frage(4, "Was bringt der Kellner als Entschuldigung?",
      ["Ein Glas Wein", "Ein Dessert", "Eine Blume"], 0,
      "Der Kellner bringt zusätzlich ein Glas Wein als Entschuldigung."),
    frage(5, "Wie bezahlt Frau Klein?",
      ["Mit Karte", "Bar", "Mit einem Gutschein"], 0,
      "Frau Klein bezahlt mit Karte und gibt ein gutes Trinkgeld."),
    richtigFalsch(6, "Das Restaurant heißt zur Linde.", true,
      "Frau Klein reserviert im Restaurant zur Linde."),
    richtigFalsch(7, "Das Essen schmeckt am Ende schlecht.", false,
      "Am Ende schmeckt das Essen ausgezeichnet."),
  ],
};