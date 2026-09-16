import type { Lesson } from "../../../schema";
import { frage, richtigFalsch } from "./story-factories";

/**
 * Original short story for reading practice. Familie Weber moves into a new
 * apartment and gets help from the new neighbors.
 */

export const geschichteUmzug: Lesson = {
  id: "geschichte-06-der-umzug",
  title: "Der Umzug",
  summary:
    "Familie Weber zieht in eine neue Wohnung im dritten Stock. Die neuen Nachbarn helfen beim Tragen und laden zum Abendessen ein.",
  status: "ready",
  sections: [
    {
      heading: "Der Umzug",
      blocks: [
        {
          type: "paragraph",
          text: "Endlich ist es so weit: Familie Weber zieht um. Die neue Wohnung ist größer als die alte und liegt im dritten Stock mit Blick auf den Park. Die Miete ist ein bisschen höher, aber die Wohnung hat einen Balkon.",
        },
        {
          type: "paragraph",
          text: "Am Samstagmorgen um acht Uhr kommt der Umzugswagen. Zwei Männer tragen die Möbel in den dritten Stock. Die Familie hat viele Kartons: Bücher, Kleidung, Geschirr und Spielzeug für die Kinder.",
        },
        {
          type: "paragraph",
          text: "Plötzlich steht ein Mann an der Tür. „Guten Tag, ich bin Herr Schmidt aus der Wohnung 12, gleich nebenan. Ich sehe, Sie haben viel zu tragen. Kann ich helfen?“ Herr Weber ist überrascht und dankt ihm. Gemeinsam tragen sie die schweren Kartons.",
        },
        {
          type: "paragraph",
          text: "Am Nachmittag ist alles in der Wohnung. Die Kinder suchen ihre Spielsachen und Frau Weber hängt die Bilder auf. Es ist anstrengend, aber die Wohnung sieht schon gemütlich aus.",
        },
        {
          type: "paragraph",
          text: "Am Abend klingelt es. Herr Schmidt steht vor der Tür und lädt die Familie zum Essen ein. „Meine Frau hat gekocht. Kommen Sie, wir feiern Ihren Einzug!“ Familie Weber sagt gern zu. Der erste Abend in der neuen Wohnung endet bei den Nachbarn.",
        },
        {
          type: "tip",
          text: "Der Umzug: der Umzugswagen, der Karton, die Möbel, der Balkon, einziehen. Und: die Nachbarn helfen beim Einzug.",
        },
      ],
    },
  ],
  vocab: [
    { id: "der-umzug", de: "der Umzug", en: "the move", part: "noun m.", plural: "die Umzüge", audio: true },
    { id: "der-umzugswagen", de: "der Umzugswagen", en: "the moving truck", part: "noun m.", plural: "die Umzugswagen", audio: true },
    { id: "der-karton", de: "der Karton", en: "the box", part: "noun m.", plural: "die Kartons", audio: true },
    { id: "die-moebel", de: "die Möbel", en: "the furniture", part: "noun pl.", audio: true },
    { id: "der-balkon", de: "der Balkon", en: "the balcony", part: "noun m.", plural: "die Balkone", audio: true },
    { id: "die-miete", de: "die Miete", en: "the rent", part: "noun f.", plural: "die Mieten", audio: true },
    { id: "einziehen", de: "einziehen", en: "to move in", part: "verb", audio: true },
    { id: "tragen", de: "tragen", en: "to carry", part: "verb", audio: true },
    { id: "anstrengend", de: "anstrengend", en: "tiring", part: "adjective", audio: true },
    { id: "gemuetlich", de: "gemütlich", en: "cozy", part: "adjective", audio: true },
    { id: "der-einzug", de: "der Einzug", en: "the housewarming", part: "noun m.", audio: true },
    { id: "nebenan", de: "nebenan", en: "next door", part: "adverb", audio: true },
  ],
  exercises: [
    frage(1, "Wo liegt die neue Wohnung von Familie Weber?",
      ["Im dritten Stock", "Im ersten Stock", "Im Erdgeschoss"], 0,
      "Die neue Wohnung liegt im dritten Stock mit Blick auf den Park."),
    frage(2, "Wann kommt der Umzugswagen?",
      ["Am Samstagmorgen um acht Uhr", "Am Freitagabend", "Am Sonntagmittag"], 0,
      "Am Samstagmorgen um acht Uhr kommt der Umzugswagen."),
    frage(3, "Wer wohnt in der Wohnung 12?",
      ["Herr Schmidt", "Herr Weber", "Die Oma"], 0,
      "Herr Schmidt wohnt gleich nebenan in der Wohnung 12."),
    frage(4, "Was macht Frau Weber am Nachmittag?",
      ["Sie hängt die Bilder auf.", "Sie kocht für die Nachbarn.", "Sie sucht ihre Spielsachen."], 0,
      "Frau Weber hängt die Bilder auf, die Kinder suchen ihre Spielsachen."),
    frage(5, "Wozu lädt Herr Schmidt die Familie ein?",
      ["Zum Abendessen", "Zum Kaffeetrinken", "Zum Kino"], 0,
      "Meine Frau hat gekocht. Kommen Sie, wir feiern Ihren Einzug."),
    richtigFalsch(6, "Die neue Wohnung hat einen Balkon.", true,
      "Die Wohnung hat einen Balkon und einen Blick auf den Park."),
    richtigFalsch(7, "Die Miete ist niedriger als in der alten Wohnung.", false,
      "Die Miete ist ein bisschen höher."),
  ],
};