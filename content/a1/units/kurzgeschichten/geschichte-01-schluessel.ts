import type { Lesson } from "../../../schema";
import { frage, richtigFalsch } from "./story-factories";

/**
 * Original short story for reading practice. Anna loses her key and finds
 * it with the help of her neighbor.
 */

export const geschichteSchluessel: Lesson = {
  id: "geschichte-01-der-verlorene-schluessel",
  title: "Der verlorene Schlüssel",
  summary:
    "Anna kommt nach Hause und ihr Schlüssel ist weg. Zum Glück hilft ihr Nachbar Herr Krause. Eine kurze Geschichte über Hilfe und Freundschaft.",
  status: "ready",
  sections: [
    {
      heading: "Der verlorene Schlüssel",
      blocks: [
        {
          type: "paragraph",
          text: "Anna arbeitet den ganzen Tag im Café. Um sechs Uhr kommt sie nach Hause. Sie sucht ihren Schlüssel in der Tasche. Aber der Schlüssel ist nicht da. Anna ist müde und ein bisschen traurig. Was soll sie machen?",
        },
        {
          type: "paragraph",
          text: "Plötzlich sieht sie ihren Nachbarn Herrn Krause. Er sitzt im Garten und liest eine Zeitung. Anna geht zu ihm: „Herr Krause, ich habe ein Problem. Mein Schlüssel ist weg und meine Wohnungstür ist zu. Können Sie mir helfen?“",
        },
        {
          type: "paragraph",
          text: "Herr Krause lächelt. „Kein Problem, Anna! Ich habe einen Schlüssel für das ganze Haus. Warten Sie einen Moment.“ Er geht in seine Wohnung und kommt mit einem großen Schlüsselring zurück. „Bitte, probieren Sie diesen Schlüssel.“",
        },
        {
          type: "paragraph",
          text: "Anna probiert den Schlüssel. Die Tür geht auf! „Vielen, vielen Dank, Herr Krause! Sie sind sehr nett.“ Herr Krause lacht. „Gern geschehen, Anna. Am Samstag gibt es bei mir Kaffee und Kuchen. Sie sind herzlich eingeladen!“",
        },
        {
          type: "paragraph",
          text: "Anna ist glücklich. Sie hat ihren Schlüssel nicht, aber sie hat einen netten Nachbarn und eine Einladung zum Kaffeetrinken.",
        },
        {
          type: "tip",
          text: "Vokabeln zum Thema: der Schlüssel, die Tür, der Nachbar, helfen, die Einladung. Lesen Sie die Geschichte zweimal: einmal langsam, einmal schnell.",
        },
      ],
    },
  ],
  vocab: [
    { id: "der-schluessel", de: "der Schlüssel", en: "the key", part: "noun m.", plural: "die Schlüssel", audio: true },
    { id: "die-tuer", de: "die Tür", en: "the door", part: "noun f.", plural: "die Türen", audio: true },
    { id: "der-nachbar", de: "der Nachbar", en: "the neighbor", part: "noun m.", plural: "die Nachbarn", audio: true },
    { id: "die-tasche", de: "die Tasche", en: "the bag", part: "noun f.", plural: "die Taschen", audio: true },
    { id: "die-zeitung", de: "die Zeitung", en: "the newspaper", part: "noun f.", plural: "die Zeitungen", audio: true },
    { id: "helfen", de: "helfen", en: "to help", part: "verb", audio: true },
    { id: "suchen", de: "suchen", en: "to search", part: "verb", audio: true },
    { id: "muede", de: "müde", en: "tired", part: "adjective", audio: true },
    { id: "traurig", de: "traurig", en: "sad", part: "adjective", audio: true },
    { id: "gluecklich", de: "glücklich", en: "happy", part: "adjective", audio: true },
    { id: "einladen", de: "einladen", en: "to invite", part: "verb", audio: true },
    { id: "der-kaffee", de: "der Kaffee", en: "the coffee", part: "noun m.", audio: true },
  ],
  exercises: [
    frage(1, "Wo arbeitet Anna?",
      ["Im Café", "In der Schule", "Im Krankenhaus"], 0,
      "Anna arbeitet den ganzen Tag im Café."),
    frage(2, "Was ist Annas Problem?",
      ["Ihr Schlüssel ist weg.", "Ihre Tasche ist kaputt.", "Ihr Zug hat Verspätung."], 0,
      "Anna sucht ihren Schlüssel, aber er ist nicht da."),
    frage(3, "Wer hilft Anna?",
      ["Herr Krause", "Die Polizei", "Ihre Schwester"], 0,
      "Der Nachbar Herr Krause hilft Anna."),
    frage(4, "Was hat Herr Krause?",
      ["Einen Schlüssel für das ganze Haus", "Ein neues Auto", "Eine Karte von der Stadt"], 0,
      "Herr Krause hat einen Schlüssel für das ganze Haus."),
    frage(5, "Wozu lädt Herr Krause Anna ein?",
      ["Zum Kaffee und Kuchen", "Zum Kino", "Zum Schwimmen"], 0,
      "Am Samstag gibt es bei ihm Kaffee und Kuchen."),
    richtigFalsch(6, "Anna ist am Ende der Geschichte traurig.", false,
      "Anna ist glücklich, weil Herr Krause hilft."),
    richtigFalsch(7, "Herr Krause sitzt im Garten.", true,
      "Herr Krause sitzt im Garten und liest eine Zeitung."),
  ],
};