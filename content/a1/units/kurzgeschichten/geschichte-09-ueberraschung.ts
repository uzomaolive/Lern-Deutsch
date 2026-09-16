import type { Lesson } from "../../../schema";
import { frage, richtigFalsch } from "./story-factories";

/**
 * Original short story for reading practice. A surprise birthday party for
 * Tom and the gift everyone contributed to.
 */

export const geschichteGeburtstag: Lesson = {
  id: "geschichte-09-die-ueberraschung",
  title: "Die Überraschungsparty",
  summary:
    "Toms Freunde planen eine Überraschungsparty für seinen 30. Geburtstag. Tom ist ganz überrascht und bekommt ein gemeinsames Geschenk.",
  status: "ready",
  sections: [
    {
      heading: "Die Überraschungsparty",
      blocks: [
        {
          type: "paragraph",
          text: "Tom hat am Samstag Geburtstag und wird 30 Jahre alt. Seine Freunde Julia, Max und Anna planen eine Überraschungsparty. Sie organisieren alles im Geheimen.",
        },
        {
          type: "paragraph",
          text: "Julia schreibt eine Einladung an alle Freunde: „Samstag, 19 Uhr, bei mir im Garten. Kommt alle und bringt gutes Wetter mit!“ Max kauft einen Kuchen und Anna besorgt Luftballons und Musik.",
        },
        {
          type: "paragraph",
          text: "Am Samstag um 18 Uhr sagt Julia zu Tom: „Komm mit, wir machen heute einen Spaziergang.“ Tom wundert sich, aber geht mit. Als sie durch die Gartentür kommen, rufen alle Freunde: „Überraschung! Herzlichen Glückwunsch zum Geburtstag!“",
        },
        {
          type: "paragraph",
          text: "Tom ist ganz überrascht und sehr glücklich. Es gibt Würstchen, Salat und natürlich den Kuchen mit 30 Kerzen. Tom muss sich etwas wünschen und pustet alle Kerzen auf einmal aus.",
        },
        {
          type: "paragraph",
          text: "Am Ende schenken die Freunde Tom ein gemeinsames Geschenk: eine Kamera. „Jetzt kannst du alle deine Abenteuer fotografieren“, sagt Julia. Tom bedankt sich herzlich. Es ist der beste Geburtstag seines Lebens.",
        },
        {
          type: "tip",
          text: "Die Party: die Überraschung, der Spaziergang, die Kerzen, der Wunsch, das Geschenk. Und: sich etwas wünschen, auspusten.",
        },
      ],
    },
  ],
  vocab: [
    { id: "die-ueberraschung", de: "die Überraschung", en: "the surprise", part: "noun f.", plural: "die Überraschungen", audio: true },
    { id: "der-geburtstag", de: "der Geburtstag", en: "the birthday", part: "noun m.", plural: "die Geburtstage", audio: true },
    { id: "die-kerze", de: "die Kerze", en: "the candle", part: "noun f.", plural: "die Kerzen", audio: true },
    { id: "der-wunsch", de: "der Wunsch", en: "the wish", part: "noun m.", plural: "die Wünsche", audio: true },
    { id: "das-geschenk", de: "das Geschenk", en: "the gift", part: "noun n.", plural: "die Geschenke", audio: true },
    { id: "die-einladung", de: "die Einladung", en: "the invitation", part: "noun f.", plural: "die Einladungen", audio: true },
    { id: "der-luftballon", de: "der Luftballon", en: "the balloon", part: "noun m.", plural: "die Luftballons", audio: true },
    { id: "die-kamera", de: "die Kamera", en: "the camera", part: "noun f.", plural: "die Kameras", audio: true },
    { id: "pusten", de: "pusten", en: "to blow out", part: "verb", audio: true },
    { id: "sich-wuenschen", de: "sich wünschen", en: "to make a wish", part: "verb", audio: true },
    { id: "im-geheimen", de: "im Geheimen", en: "in secret", part: "adverb", audio: true },
    { id: "herzlich", de: "herzlich", en: "heartfelt", part: "adjective", audio: true },
  ],
  exercises: [
    frage(1, "Wie alt wird Tom?",
      ["30 Jahre", "20 Jahre", "13 Jahre"], 0,
      "Tom wird am Samstag 30 Jahre alt."),
    frage(2, "Wer schreibt die Einladung?",
      ["Julia", "Max", "Tom"], 0,
      "Julia schreibt eine Einladung an alle Freunde."),
    frage(3, "Was macht Max für die Party?",
      ["Er kauft einen Kuchen", "Er besorgt Luftballons", "Er schreibt Einladungen"], 0,
      "Max kauft einen Kuchen, Anna besorgt Luftballons und Musik."),
    frage(4, "Wo findet die Party statt?",
      ["Im Garten von Julia", "Im Restaurant", "Im Park"], 0,
      "Julia sagt: bei mir im Garten, und Tom kommt durch die Gartentür."),
    frage(5, "Was bekommt Tom als gemeinsames Geschenk?",
      ["Eine Kamera", "Ein Fahrrad", "Ein Buch"], 0,
      "Die Freunde schenken Tom eine Kamera."),
    richtigFalsch(6, "Tom weiß von der Party im Voraus.", false,
      "Tom ist ganz überrascht, er weiß nichts von der Party."),
    richtigFalsch(7, "Tom pustet alle Kerzen auf einmal aus.", true,
      "Tom pustet alle 30 Kerzen auf einmal aus."),
  ],
};