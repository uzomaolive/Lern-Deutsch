import type { Lesson, Exercise } from "../../../schema";

/**
 * Goethe-Zertifikat A1 / Start Deutsch 1 — Hören (circa 20 Minuten).
 * Authentic format: three parts, 15 tasks, one point each.
 *
 * Teil 1 (Aufgaben 1-6): kurze Alltagsgespräche, a/b/c, jeden Text zweimal.
 * Teil 2 (Aufgaben 7-10): Lautsprecherdurchsagen, Richtig/Falsch, einmal.
 * Teil 3 (Aufgaben 11-15): Telefonansagen, a/b/c, jeden Text zweimal.
 */

function h(
  n: number,
  question: string,
  prompt: string,
  options: [string, string, string],
  correct: number,
  explain: string,
): Exercise {
  return {
    id: `h${String(n).padStart(3, "0")}`,
    type: "listening",
    title: `Hören ${n}`,
    instruction: question,
    prompt,
    options: [...options],
    correctIndex: correct,
    explain,
  };
}

function rf(n: number, prompt: string, correct: boolean, explain: string): Exercise {
  return {
    id: `h${String(n).padStart(3, "0")}`,
    type: "listening",
    title: `Hören ${n}`,
    instruction: "Richtig oder falsch? Sie hören den Text einmal.",
    prompt,
    options: ["Richtig", "Falsch"],
    correctIndex: correct ? 0 : 1,
    explain,
  };
}

export const goetheHoeren: Lesson = {
  id: "goethe-a1-hoeren",
  title: "Goethe A1 Hören: Die komplette Prüfung (15 Aufgaben)",
  summary:
    "The complete Goethe-Zertifikat A1 listening paper, exactly as in the real exam: three parts, 15 tasks, 20 minutes, one point each.",
  status: "ready",
  sections: [
    {
      heading: "So ist die Prüfung aufgebaut",
      blocks: [
        {
          type: "paragraph",
          text: "Dieser Test hat drei Teile. Sie hören kurze Gespräche und Ansagen. Zu jedem Text gibt es eine Aufgabe. Kreuzen Sie die richtige Lösung an. Schreiben Sie zum Schluss Ihre Lösungen auf den Antwortbogen. Hören dauert circa 20 Minuten. Jede richtige Lösung bringt einen Punkt, in diesem Teil sind maximal 15 Punkte zu erzielen.",
        },
        {
          type: "table",
          caption: "Die drei Teile",
          head: ["Teil", "Aufgaben", "Was hören Sie?", "Wie oft?"],
          rows: [
            ["Teil 1", "1-6", "kurze Alltagsgespräche (a/b/c)", "zweimal"],
            ["Teil 2", "7-10", "Lautsprecherdurchsagen (Richtig/Falsch)", "einmal"],
            ["Teil 3", "11-15", "Telefonansagen und Nachrichten (a/b/c)", "zweimal"],
          ],
        },
        {
          type: "tip",
          text: "Lesen Sie zuerst die Aufgabe, hören Sie dann den Text dazu. Die Ansagen auf dem Tonträger führen Sie durch die ganze Prüfung.",
        },
      ],
    },
    {
      heading: "Teil 1: Was ist richtig? (Aufgaben 1-6)",
      blocks: [
        {
          type: "paragraph",
          text: "Sie hören kurze Gespräche zwischen zwei Personen, wie sie zufällig auf der Straße oder im privaten, schulischen oder beruflichen Umfeld geführt werden. Sie hören jeden Text zweimal. Kreuzen Sie an: a, b oder c.",
        },
        {
          type: "example",
          de: "Sie hören einen Dialog und müssen die richtige Information ankreuzen.",
          en: "You hear a dialogue and must tick the correct information.",
        },
      ],
    },
    {
      heading: "Teil 2: Richtig oder falsch? (Aufgaben 7-10)",
      blocks: [
        {
          type: "paragraph",
          text: "Sie hören kurze Lautsprecherdurchsagen, wie sie auf Flughäfen, in Supermärkten oder an U-Bahnhöfen zu hören sind. Sie hören jeden Text nur einmal. Kreuzen Sie an: Richtig oder Falsch.",
        },
        {
          type: "example",
          de: "Sie hören eine Durchsage und entscheiden, ob die Aussage richtig oder falsch ist.",
          en: "You hear an announcement and decide whether the statement is right or wrong.",
        },
      ],
    },
    {
      heading: "Teil 3: Was ist richtig? (Aufgaben 11-15)",
      blocks: [
        {
          type: "paragraph",
          text: "Sie hören kurze Ansagen und Nachrichten auf dem Anrufbeantworter, zum Teil aus dem privaten Bereich, zum Teil offizieller Natur, wie telefonische Ansagen aus einer Arztpraxis oder einer Firma. Sie hören jeden Text zweimal. Kreuzen Sie an: a, b oder c.",
        },
        {
          type: "example",
          de: "Sie hören eine Telefonansage und müssen die richtige Information ankreuzen.",
          en: "You hear a phone message and must tick the correct information.",
        },
      ],
    },
    {
      heading: "Die häufigsten Fehler",
      blocks: [
        {
          type: "paragraph",
          text: "In der Prüfung zählt Genauigkeit. Die klassischen Fehler: beim zweiten Hören aufhören zuzuhören, Zahlen verwechseln (13 und 30, 14 und 40), und die Frage nicht genau lesen, bevor der Text beginnt.",
        },
        {
          type: "table",
          caption: "Typische Prüfungsfallen",
          head: ["Falle", "Warum sie tückisch ist", "So vermeiden Sie sie"],
          rows: [
            ["Zahlen 13/30", "dreizehn und dreißig klingen ähnlich", "üben Sie die Zahlenpaare laut"],
            ["Zeiten", "vor 13 Uhr, zwischen 13 und 18 Uhr", "achten Sie auf bis und zwischen"],
            ["Zweites Hören", "man hört den Text zweimal", "nutzen Sie den zweiten Durchgang zum Prüfen"],
            ["Richtig/Falsch", "Teil 2 kommt nur einmal", "entscheiden Sie beim ersten Hören"],
          ],
        },
        {
          type: "tip",
          text: "Tipp der Prüfer: Lesen Sie die Aufgabe zuerst. Dann wissen Sie beim Hören genau, worauf Sie achten müssen: die Zeit, den Ort, den Preis oder die Person.",
        },
      ],
    },
  ],
  vocab: [
    { id: "die-pruefung", de: "die Prüfung", en: "the exam", part: "noun f.", plural: "die Prüfungen", audio: true },
    { id: "der-antworthogen", de: "der Antwortbogen", en: "the answer sheet", part: "noun m.", plural: "die Antwortbögen", audio: true },
    { id: "die-durchsage", de: "die Durchsage", en: "the announcement", part: "noun f.", plural: "die Durchsagen", audio: true },
    { id: "das-gespraech", de: "das Gespräch", en: "the conversation", part: "noun n.", plural: "die Gespräche", audio: true },
    { id: "die-ansage", de: "die Ansage", en: "the announcement", part: "noun f.", plural: "die Ansagen", audio: true },
    { id: "der-anrufbeantworter", de: "der Anrufbeantworter", en: "the answering machine", part: "noun m.", plural: "die Anrufbeantworter", audio: true },
    { id: "ankreuzen", de: "ankreuzen", en: "to tick", part: "verb", audio: true },
    { id: "richtig", de: "richtig", en: "correct, right", part: "adjective", audio: true },
    { id: "falsch", de: "falsch", en: "wrong, false", part: "adjective", audio: true },
    { id: "zweimal", de: "zweimal", en: "twice", part: "adverb", audio: true },
    { id: "einmal", de: "einmal", en: "once", part: "adverb", audio: true },
    { id: "die-information", de: "die Information", en: "the information", part: "noun f.", plural: "die Informationen", audio: true },
    { id: "der-punkt", de: "der Punkt", en: "the point", part: "noun m.", plural: "die Punkte", audio: true },
    { id: "richtig-oder-falsch", de: "Richtig oder falsch?", en: "Right or wrong?", part: "phrase", phrase: true, audio: true },
    { id: "was-ist-richtig", de: "Was ist richtig?", en: "What is correct?", part: "phrase", phrase: true, audio: true },
    { id: "sie-hoeren-jeden-text-zweimal", de: "Sie hören jeden Text zweimal.", en: "You hear each text twice.", part: "phrase", phrase: true, audio: true },
    { id: "kreuzen-sie-die-richtige-loesung-an", de: "Kreuzen Sie die richtige Lösung an.", en: "Tick the correct solution.", part: "phrase", phrase: true, audio: true },
    { id: "schreiben-sie-ihre-loesungen-auf-den-antworthogen", de: "Schreiben Sie Ihre Lösungen auf den Antwortbogen.", en: "Write your solutions on the answer sheet.", part: "phrase", phrase: true, audio: true },
  ],
  exercises: [
    h(1, "Was ist richtig?", "Was kostet dieser Pullover jetzt? Neunzehn Euro fünfundneunzig. Einen Moment, ich schaue nach. Neunzehn fünfundneunzig, ja genau.",
      ["19,95 Euro", "29,95 Euro", "9,95 Euro"], 0, "Der Pullover kostet neunzehn fünfundneunzig, also 19,95 Euro."),
    h(2, "Was ist richtig?", "Entschuldigung, wie spät ist es bitte? Einen Moment. Es ist jetzt gleich fünf Uhr.",
      ["Es ist fast 5 Uhr.", "Es ist genau 5 Uhr.", "Es ist halb 5."], 0, "gleich fünf Uhr heißt: fast 5 Uhr."),
    h(3, "Was ist richtig?", "Was wünschen Sie bitte? Ich hätte gern die Salatplatte. Entschuldigung, die Salatplatte ist leider aus, aber die Bratwurst kann ich Ihnen empfehlen.",
      ["Der Gast möchte die Salatplatte.", "Der Gast möchte die Bratwurst.", "Der Gast möchte Pommes."], 0, "Der Gast bestellt zuerst die Salatplatte."),
    h(4, "Was ist richtig?", "Verzeihung, wo finde ich Herrn Schneider? Schneider, warten Sie mal. Ich glaube, der ist in Zimmer Nummer 254, im zweiten Stock.",
      ["Herr Schneider ist in Zimmer 254.", "Herr Schneider ist im ersten Stock.", "Herr Schneider ist nicht da."], 0, "Herr Schneider ist in Zimmer 254 im zweiten Stock."),
    h(5, "Was ist richtig?", "Anna, gehst du heute mit ins Kino? Ich kann leider nicht, ich muss noch lernen. Vielleicht am Samstag? Gut, dann am Samstag.",
      ["Anna geht am Samstag ins Kino.", "Anna geht heute ins Kino.", "Anna lernt am Samstag."], 0, "Heute kann Anna nicht, also gehen sie am Samstag."),
    h(6, "Was ist richtig?", "Entschuldigung, wie komme ich zum Bahnhof? Gehen Sie geradeaus bis zur Ampel, dann links. Das ist ungefähr zehn Minuten zu Fuß.",
      ["Man geht links an der Ampel.", "Man geht rechts an der Ampel.", "Der Bahnhof ist direkt hier."], 0, "An der Ampel geht man links."),

    rf(7, "Achtung, Durchsage: Die U-Bahnlinie 4 hat heute Verspätung. Bitte beachten Sie die Ansagen am Gleis.",
      true, "Die Durchsage sagt, die U-Bahnlinie 4 hat Verspätung."),
    rf(8, "Guten Tag, willkommen an Bord unseres Zuges nach Frankfurt. Eine wichtige Information: Am nächsten Bahnhof müssen alle Fahrgäste umsteigen.",
      true, "Die Durchsage sagt, am nächsten Bahnhof muss man umsteigen."),
    rf(9, "Information für alle Kunden: Der Supermarkt ist heute bis 20 Uhr geöffnet. Am Sonntag bleibt das Geschäft geschlossen.",
      true, "Die Durchsage sagt, der Supermarkt ist heute bis 20 Uhr geöffnet."),
    rf(10, "Hallo, hier ist eine Nachricht vom Zahnarzt. Ihre Terminbestätigung: Bitte kommen Sie am Mittwoch um 15 Uhr. Bringen Sie Ihre Versicherungskarte mit.",
      false, "Die Nachricht sagt: Mittwoch um 15 Uhr, nicht Donnerstag."),

    h(11, "Was ist richtig?", "Autohaus Mayer, guten Tag, Frau Krause. Wir haben noch eine Frage zu der Reparatur von Ihrem Wagen. Bitte rufen Sie uns nach 13 Uhr zurück. Heute sind wir bis 18 Uhr hier.",
      ["Frau Krause soll nach 13 Uhr anrufen.", "Frau Krause soll vor 13 Uhr anrufen.", "Frau Krause soll morgen anrufen."], 0, "Die Ansage bittet um einen Anruf nach 13 Uhr."),
    h(12, "Was ist richtig?", "Hallo Irene, hier Nina. Ich möchte heute Abend nicht zu Hause bleiben. Im Metropolis gibt es einen guten Film. Kommst du mit? Ruf mich bitte auf dem Handy an.",
      ["Nina möchte ins Kino.", "Nina möchte zu Hause bleiben.", "Nina möchte lernen."], 0, "Nina will einen Film im Metropolis sehen."),
    h(13, "Was ist richtig?", "Sarah, ich bin es, Christoph. Ist mein Wörterbuch vielleicht bei dir? Auf dem kleinen Schrank mit den CDs? Bitte bring es gleich in den Kurs mit.",
      ["Christoph sucht sein Wörterbuch.", "Christoph sucht seine CD.", "Christoph sucht sein Buch."], 0, "Christoph sucht sein Wörterbuch bei Sarah."),
    h(14, "Was ist richtig?", "Hallo Sabine, hier Petra. Die Party war total gut! Ich gehe jetzt mit Julia ins Café, so um elf. Wir treffen uns dort, okay?",
      ["Petra trifft Julia im Café.", "Petra trifft Julia in der Disco.", "Petra trifft Julia beim Konzert."], 0, "Petra und Julia treffen sich im Café."),
    h(15, "Was ist richtig?", "Guten Tag, Frau Solms, Heinze hier. Morgen habe ich bis 12 Uhr einen Termin. Aber nach der Mittagspause habe ich Zeit. Wollen wir uns um 13 Uhr treffen? Rufen Sie mich bitte bis 18 Uhr zurück.",
      ["Herr Heinze will sich um 13 Uhr treffen.", "Herr Heinze will sich um 12 Uhr treffen.", "Herr Heinze will sich um 18 Uhr treffen."], 0, "Nach der Mittagspause: Treffen um 13 Uhr."),
  ],
};