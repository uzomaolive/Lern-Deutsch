import type { Lesson } from "../../../schema";
import { frage, richtigFalsch } from "./story-factories";

/**
 * Original short story for reading practice. Lisa visits her grandmother
 * and they bake a cake together.
 */

export const geschichteOma: Lesson = {
  id: "geschichte-03-bei-oma",
  title: "Bei Oma im Garten",
  summary:
    "Lisa besucht ihre Oma am Wochenende. Zusammen backen sie einen Apfelkuchen und trinken Kaffee im Garten.",
  status: "ready",
  sections: [
    {
      heading: "Bei Oma im Garten",
      blocks: [
        {
          type: "paragraph",
          text: "Lisa wohnt in der Stadt, ihre Oma wohnt in einem kleinen Dorf. Am Wochenende besucht Lisa ihre Oma immer. Die Fahrt dauert eine Stunde mit dem Bus. Lisa freut sich jedes Mal sehr.",
        },
        {
          type: "paragraph",
          text: "Als Lisa ankommt, steht die Oma schon vor der Tür. „Hallo, meine Liebe! Komm herein, ich habe Äpfel aus dem Garten.“ Die Oma zeigt auf einen großen Korb voller roter Äpfel. „Die sind heute Morgen vom Baum gekommen.“",
        },
        {
          type: "paragraph",
          text: "Lisa hat eine Idee. „Oma, können wir einen Apfelkuchen backen? Ich habe das Rezept von Mama mitgebracht.“ Die Oma freut sich. „Gerne! Ich hole Mehl, Zucker und Butter.“",
        },
        {
          type: "paragraph",
          text: "Die zwei arbeiten zusammen in der Küche. Lisa schält die Äpfel und die Oma macht den Teig. Der Kuchen kommt in den Ofen und es duftet im ganzen Haus. Nach vierzig Minuten ist er fertig.",
        },
        {
          type: "paragraph",
          text: "Am Nachmittag sitzen sie im Garten. Der Kuchen ist warm und die Oma erzählt Geschichten aus ihrer Kindheit. Lisa trinkt Kaffee mit Milch und die Oma trinkt Tee. Es ist ein schöner Tag.",
        },
        {
          type: "tip",
          text: "In der Küche: backen, der Teig, das Mehl, der Zucker, die Butter, der Ofen. Und im Garten: der Korb, der Baum, der Apfel.",
        },
      ],
    },
  ],
  vocab: [
    { id: "die-oma", de: "die Oma", en: "the grandma", part: "noun f.", plural: "die Omas", audio: true },
    { id: "das-dorf", de: "das Dorf", en: "the village", part: "noun n.", plural: "die Dörfer", audio: true },
    { id: "der-kuchen", de: "der Kuchen", en: "the cake", part: "noun m.", plural: "die Kuchen", audio: true },
    { id: "backen", de: "backen", en: "to bake", part: "verb", audio: true },
    { id: "der-teig", de: "der Teig", en: "the dough", part: "noun m.", audio: true },
    { id: "das-mehl", de: "das Mehl", en: "the flour", part: "noun n.", audio: true },
    { id: "der-zucker", de: "der Zucker", en: "the sugar", part: "noun m.", audio: true },
    { id: "die-butter", de: "die Butter", en: "the butter", part: "noun f.", audio: true },
    { id: "der-ofen", de: "der Ofen", en: "the oven", part: "noun m.", plural: "die Öfen", audio: true },
    { id: "der-korb", de: "der Korb", en: "the basket", part: "noun m.", plural: "die Körbe", audio: true },
    { id: "der-baum", de: "der Baum", en: "the tree", part: "noun m.", plural: "die Bäume", audio: true },
    { id: "duften", de: "duften", en: "to smell nice", part: "verb", audio: true },
  ],
  exercises: [
    frage(1, "Wo wohnt die Oma?",
      ["In einem kleinen Dorf", "In der Stadt", "Am Meer"], 0,
      "Lisa wohnt in der Stadt, ihre Oma in einem kleinen Dorf."),
    frage(2, "Wie kommt Lisa zu ihrer Oma?",
      ["Mit dem Bus", "Mit dem Fahrrad", "Zu Fuß"], 0,
      "Die Fahrt dauert eine Stunde mit dem Bus."),
    frage(3, "Was hat die Oma für Lisa?",
      ["Einen Korb voller Äpfel", "Ein neues Buch", "Eine Torte aus dem Laden"], 0,
      "Die Äpfel kommen heute Morgen vom Baum im Garten."),
    frage(4, "Wer schält die Äpfel?",
      ["Lisa", "Die Oma", "Die Mutter"], 0,
      "Lisa schält die Äpfel und die Oma macht den Teig."),
    frage(5, "Was trinkt die Oma im Garten?",
      ["Tee", "Kaffee mit Milch", "Saft"], 0,
      "Lisa trinkt Kaffee mit Milch, die Oma trinkt Tee."),
    richtigFalsch(6, "Der Kuchen ist nach vierzig Minuten fertig.", true,
      "Nach vierzig Minuten ist der Kuchen fertig."),
    richtigFalsch(7, "Lisa bringt das Rezept von ihrer Oma mit.", false,
      "Lisa bringt das Rezept von ihrer Mama mit."),
  ],
};