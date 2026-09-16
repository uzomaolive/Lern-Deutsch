import type { Lesson } from "../../../schema";
import { frage, richtigFalsch } from "./story-factories";

/**
 * Original short story for reading practice. A rainy Sunday in the park
 * turns into a cozy afternoon at the café.
 */

export const geschichteRegen: Lesson = {
  id: "geschichte-08-der-regentag",
  title: "Der verregnete Sonntag",
  summary:
    "Familie Berger will am Sonntag in den Park gehen. Es regnet den ganzen Tag, also gehen sie ins Café und spielen Gesellschaftsspiele.",
  status: "ready",
  sections: [
    {
      heading: "Der verregnete Sonntag",
      blocks: [
        {
          type: "paragraph",
          text: "Am Sonntagmorgen schaut Herr Berger aus dem Fenster. Der Himmel ist grau und es regnet. „Schade“, sagt er, „wir wollten in den Park gehen.“ Seine Frau und die Kinder sind auch enttäuscht.",
        },
        {
          type: "paragraph",
          text: "Dann hat Frau Berger eine Idee. „Wir gehen ins Café an der Ecke! Dort gibt es heißen Kakao und frischen Kuchen. Und danach spielen wir zu Hause ein Spiel.“ Die Kinder sind sofort einverstanden.",
        },
        {
          type: "paragraph",
          text: "Im Café ist es warm und gemütlich. Sie nehmen einen Tisch am Fenster. Der Sohn bestellt einen heißen Kakao mit Sahne, die Tochter einen Apfelsaft. Die Eltern trinken Kaffee.",
        },
        {
          type: "paragraph",
          text: "Während es draußen regnet, sitzt die Familie gemütlich zusammen. Der Vater erzählt eine Geschichte aus seiner Kindheit und alle lachen. Die Kinder malen auf den Servietten kleine Bilder.",
        },
        {
          type: "paragraph",
          text: "Am Nachmittag hört der Regen auf. Die Familie geht nach Hause und spielt ein Gesellschaftsspiel. „Der verregnete Sonntag war eigentlich ganz schön“, sagt die Tochter am Abend. Alle sind einverstanden.",
        },
        {
          type: "tip",
          text: "Das Wetter: der Regen, der Himmel, grau, der Regenschirm. Und die Getränke: der Kakao, der Apfelsaft, der Kaffee, die Sahne.",
        },
      ],
    },
  ],
  vocab: [
    { id: "der-regen", de: "der Regen", en: "the rain", part: "noun m.", audio: true },
    { id: "der-himmel", de: "der Himmel", en: "the sky", part: "noun m.", audio: true },
    { id: "der-sonntag", de: "der Sonntag", en: "the Sunday", part: "noun m.", plural: "die Sonntage", audio: true },
    { id: "der-kakao", de: "der Kakao", en: "the hot chocolate", part: "noun m.", audio: true },
    { id: "die-sahne", de: "die Sahne", en: "the cream", part: "noun f.", audio: true },
    { id: "der-apfelsaft", de: "der Apfelsaft", en: "the apple juice", part: "noun m.", audio: true },
    { id: "das-gesellschaftsspiel", de: "das Gesellschaftsspiel", en: "the board game", part: "noun n.", plural: "die Gesellschaftsspiele", audio: true },
    { id: "die-serviette", de: "die Serviette", en: "the napkin", part: "noun f.", plural: "die Servietten", audio: true },
    { id: "grau", de: "grau", en: "gray", part: "adjective", audio: true },
    { id: "enttaeuscht", de: "enttäuscht", en: "disappointed", part: "adjective", audio: true },
    { id: "gemuetlich", de: "gemütlich", en: "cozy", part: "adjective", audio: true },
    { id: "der-regenschirm", de: "der Regenschirm", en: "the umbrella", part: "noun m.", plural: "die Regenschirme", audio: true },
  ],
  exercises: [
    frage(1, "Was will die Familie am Sonntag machen?",
      ["In den Park gehen", "In den Zoo gehen", "An den Strand fahren"], 0,
      "Wir wollten in den Park gehen, sagt Herr Berger."),
    frage(2, "Warum können sie nicht in den Park gehen?",
      ["Es regnet", "Der Park ist geschlossen", "Sie haben keine Zeit"], 0,
      "Der Himmel ist grau und es regnet den ganzen Tag."),
    frage(3, "Wer hat die Idee mit dem Café?",
      ["Frau Berger", "Der Sohn", "Herr Berger"], 0,
      "Frau Berger hat die Idee mit dem Café an der Ecke."),
    frage(4, "Was bestellt die Tochter?",
      ["Einen Apfelsaft", "Einen heißen Kakao", "Einen Kaffee"], 0,
      "Die Tochter bestellt einen Apfelsaft, der Sohn einen heißen Kakao."),
    frage(5, "Was macht die Familie am Nachmittag?",
      ["Sie spielt ein Gesellschaftsspiel", "Sie geht wieder in den Park", "Sie besucht die Oma"], 0,
      "Zu Hause spielt die Familie ein Gesellschaftsspiel."),
    richtigFalsch(6, "Im Café sitzt die Familie am Fenster.", true,
      "Sie nehmen einen Tisch am Fenster."),
    richtigFalsch(7, "Der Regen hört erst am Abend auf.", false,
      "Am Nachmittag hört der Regen auf."),
  ],
};