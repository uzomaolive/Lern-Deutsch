import type { Lesson } from "../../../schema";
import {
  bauen,
  zuordnen,
  schreibWahl,
  listen,
  karten,
} from "./factories";

/**
 * Goethe-Zertifikat A1 / Start Deutsch 1 — Sprechen: 30 Übungen.
 * A dedicated speaking drill section in the exam's three-part format:
 * introduce yourself, ask for and give information, formulate requests
 * and react. Speaking cannot be recorded on the site, so the drills
 * train exactly what the examiner grades: correct sentences, the right
 * question for the situation, and a natural reaction.
 */

export const goetheSprechen30: Lesson = {
  id: "goethe-a1-sprechen-30-uebungen",
  title: "Goethe A1 Sprechen: 30 Übungen",
  summary:
    "Thirty speaking exercises in the Goethe A1 Sprechen format: introduce yourself, ask for and give information, formulate requests and react. Build the sentences, hear them, and practise out loud.",
  status: "ready",
  sections: [
    {
      heading: "So funktioniert der Sprechteil",
      blocks: [
        {
          type: "paragraph",
          text: "Der Sprechteil dauert circa 15 Minuten und hat drei Teile. In Teil 1 stellen Sie sich vor: Name, Herkunft, Wohnort, Beruf, Hobbys. In Teil 2 ziehen Sie Karten und fragen nach Informationen, die anderen antworten. In Teil 3 formulieren Sie Bitten und reagieren darauf.",
        },
        {
          type: "table",
          caption: "Die drei Teile",
          head: ["Teil", "Was passiert", "Hier trainieren Sie"],
          rows: [
            ["Teil 1", "Sich vorstellen", "Sätze für Name, Herkunft, Wohnort, Beruf"],
            ["Teil 2", "Fragen und antworten", "Fragen zu Alltagsthemen"],
            ["Teil 3", "Bitten und reagieren", "höfliche Bitten und Antworten"],
          ],
        },
        {
          type: "tip",
          text: "Sprechen Sie jede Übung laut aus, bevor Sie die Lösung ansehen. Lautes Sprechen ist der einzige Weg, Sprechen zu lernen.",
        },
      ],
    },
    {
      heading: "Teil 1: Sich vorstellen",
      blocks: [
        {
          type: "paragraph",
          text: "In Teil 1 sprechen Sie über sich selbst. Sie haben ein Blatt mit Stichworten: Wer sind Sie? Woher kommen Sie? Wo wohnen Sie? Was sprechen Sie? Was sind Ihre Hobbys? Die Prüfer hören zu und fragen nach.",
        },
        {
          type: "example",
          de: "Mein Name ist Anna Weber. Ich komme aus Polen und wohne in Berlin.",
          en: "My name is Anna Weber. I come from Poland and live in Berlin.",
        },
        {
          type: "tip",
          text: "Lernen Sie Ihren Vorstellungstext als Ganzes. Fünf Sätze genügen: Name, Herkunft, Wohnort, Beruf oder Hobby, Sprachen.",
        },
      ],
    },
    {
      heading: "Teil 2: Fragen und antworten",
      blocks: [
        {
          type: "paragraph",
          text: "In Teil 2 ziehen Sie Karten zu Themen wie Einkaufen, Essen, Wohnen oder Freizeit. Sie stellen eine Frage, Ihr Partner antwortet. Dann antworten Sie auf die Frage Ihres Partners.",
        },
        {
          type: "example",
          de: "Wo kann ich einen Stadtplan bekommen? An der Information im Bahnhof.",
          en: "Where can I get a city map? At the information desk in the station.",
        },
        {
          type: "tip",
          text: "Jede Frage braucht ein Thema: Wo ...? Wann ...? Wie viel ...? Was kostet ...? Üben Sie die Fragewörter.",
        },
      ],
    },
    {
      heading: "Teil 3: Bitten und reagieren",
      blocks: [
        {
          type: "paragraph",
          text: "In Teil 3 formulieren Sie Bitten und reagieren auf die Bitten der anderen. Wichtig sind die höflichen Formen: Können Sie ...? Ich möchte gern ... Darf ich ...?",
        },
        {
          type: "example",
          de: "Entschuldigung, können Sie mir bitte helfen? Ja, gern. Was brauchen Sie?",
          en: "Excuse me, can you help me please? Yes, gladly. What do you need?",
        },
        {
          type: "tip",
          text: "Auf Bitten antwortet man freundlich: Ja, gern. Natürlich. Kein Problem. Und bei Nein: Es tut mir leid, ich kann nicht.",
        },
      ],
    },
  ],
  vocab: [
    { id: "sich-vorstellen", de: "sich vorstellen", en: "to introduce oneself", part: "verb", audio: true },
    { id: "die-herkunft", de: "die Herkunft", en: "the origin", part: "noun f.", audio: true },
    { id: "der-wohnort", de: "der Wohnort", en: "the place of residence", part: "noun m.", plural: "die Wohnorte", audio: true },
    { id: "die-hobbys", de: "die Hobbys", en: "the hobbies", part: "noun pl.", audio: true },
    { id: "die-sprachen", de: "die Sprachen", en: "the languages", part: "noun pl.", audio: true },
    { id: "fragen", de: "fragen", en: "to ask", part: "verb", audio: true },
    { id: "antworten", de: "antworten", en: "to answer", part: "verb", audio: true },
    { id: "bitten", de: "bitten", en: "to request", part: "verb", audio: true },
    { id: "reagieren", de: "reagieren", en: "to react", part: "verb", audio: true },
    { id: "die-bitte", de: "die Bitte", en: "the request", part: "noun f.", plural: "die Bitten", audio: true },
    { id: "der-pruefer", de: "der Prüfer", en: "the examiner", part: "noun m.", plural: "die Prüfer", audio: true },
    { id: "die-karte", de: "die Karte", en: "the card", part: "noun f.", plural: "die Karten", audio: true },
  ],
  exercises: [
    // ---------- Teil 1: Sich vorstellen (1-10) ----------
    bauen(1, "Sagen Sie, wie Sie heißen.", ["Mein", "Name", "ist", "Anna", "Weber."], "Mein Name ist ..."),
    bauen(2, "Sagen Sie, woher Sie kommen.", ["Ich", "komme", "aus", "Polen."], "Ich komme aus ..."),
    bauen(3, "Sagen Sie, wo Sie wohnen.", ["Ich", "wohne", "in", "Berlin.", "Meine", "Adresse", "ist", "Hauptstraße", "12."], "Ich wohne in ..."),
    bauen(4, "Sagen Sie, was Sie sprechen.", ["Ich", "spreche", "Polnisch", "und", "ein", "bisschen", "Deutsch."], "Ich spreche ..."),
    bauen(5, "Sagen Sie, was Ihr Hobby ist.", ["Mein", "Hobby", "ist", "Schwimmen.", "Ich", "schwimme", "gern", "im", "Sommer."], "Mein Hobby ist ..."),
    bauen(6, "Sagen Sie, was Sie beruflich machen.", ["Ich", "arbeite", "als", "Kellnerin", "in", "einem", "Café."], "Ich arbeite als ..."),
    bauen(7, "Sagen Sie, wie alt Sie sind.", ["Ich", "bin", "28", "Jahre", "alt."], "Ich bin ... Jahre alt."),
    bauen(8, "Sagen Sie, was Ihre Familie macht.", ["Meine", "Familie", "lebt", "in", "Polen.", "Die", "Eltern", "sind", "Lehrer."], "Meine Familie ..."),
    bauen(9, "Buchstabieren Sie Ihren Namen.", ["W-E-B-E-R,", "das", "ist", "mein", "Familienname."], "Beim Buchstabieren: W-E-B-E-R."),
    bauen(10, "Sagen Sie Ihre Telefonnummer.", ["Meine", "Telefonnummer", "ist", "0176", "552091."], "Meine Telefonnummer ist ..."),

    // ---------- Teil 2: Fragen und antworten (11-18) ----------
    zuordnen(11, "Verbinden Sie die Frage mit der Antwort.",
      [
        ["Wo wohnen Sie?", "Ich wohne in der Hauptstraße 12."],
        ["Was machen Sie beruflich?", "Ich arbeite als Kellnerin."],
        ["Wie alt sind Sie?", "Ich bin 28 Jahre alt."],
        ["Was sind Ihre Hobbys?", "Ich schwimme gern und lese."],
      ],
    ),
    zuordnen(12, "Verbinden Sie die Einkaufsfrage mit der Antwort.",
      [
        ["Wo kann ich Brot kaufen?", "In der Bäckerei um die Ecke."],
        ["Was kostet das Kilo Äpfel?", "Das Kilo kostet 2 Euro 80."],
        ["Kann ich mit Karte zahlen?", "Ja, Kartenzahlung ist möglich."],
        ["Wo finde ich die Milch?", "Im Kühlregal hinten links."],
      ],
    ),
    zuordnen(13, "Verbinden Sie die Frage zum Essen mit der Antwort.",
      [
        ["Was empfehlen Sie?", "Die Bratwurst ist heute sehr gut."],
        ["Möchten Sie etwas trinken?", "Ja, ein Wasser, bitte."],
        ["Zahlen Sie zusammen?", "Nein, ich zahle getrennt."],
        ["Schmeckt es Ihnen?", "Ja, sehr gut, danke."],
      ],
    ),
    zuordnen(14, "Verbinden Sie die Frage zum Wohnen mit der Antwort.",
      [
        ["Wie viele Zimmer hat die Wohnung?", "Sie hat zwei Zimmer."],
        ["Wie hoch ist die Miete?", "620 Euro kalt."],
        ["Ab wann ist die Wohnung frei?", "Ab dem 1. Oktober."],
        ["Gibt es einen Balkon?", "Ja, einen kleinen Balkon."],
      ],
    ),
    zuordnen(15, "Verbinden Sie die Frage zum Reisen mit der Antwort.",
      [
        ["Wann fährt der Zug ab?", "Um 14:30 Uhr."],
        ["Muss ich umsteigen?", "Nein, der Zug fährt direkt."],
        ["Was kostet die Fahrkarte?", "48 Euro hin und zurück."],
        ["Wie lange dauert die Fahrt?", "Circa zwei Stunden."],
      ],
    ),
    zuordnen(16, "Verbinden Sie die Frage zur Gesundheit mit der Antwort.",
      [
        ["Was fehlt Ihnen?", "Ich habe Kopfschmerzen."],
        ["Haben Sie Fieber?", "Ja, seit gestern Abend."],
        ["Nehmen Sie das Medikament?", "Ja, zweimal am Tag."],
        ["Wann ist der nächste Termin?", "Am Donnerstag um 10 Uhr."],
      ],
    ),
    zuordnen(17, "Verbinden Sie die Frage zum Alltag mit der Antwort.",
      [
        ["Wann stehst du auf?", "Um sechs Uhr."],
        ["Was machst du am Abend?", "Ich koche und lese."],
        ["Hast du heute Zeit?", "Ja, ab 16 Uhr."],
        ["Wo treffen wir uns?", "Am Eingang vom Kino."],
      ],
    ),
    zuordnen(18, "Verbinden Sie die Frage zur Freizeit mit der Antwort.",
      [
        ["Was machst du gern?", "Ich spiele Fußball."],
        ["Kommst du mit ins Kino?", "Ja, gern. Wann beginnt der Film?"],
        ["Hast du ein Hobby?", "Ich schwimme zweimal die Woche."],
        ["Treibst du Sport?", "Ja, ich spiele Tennis."],
      ],
    ),

    // ---------- Teil 3: Bitten und reagieren (19-26) ----------
    schreibWahl(19, "Sie brauchen einen Stadtplan.", "Was sagen Sie?",
      ["Entschuldigung, können Sie mir bitte helfen?", "Ich heiße Anna.", "Das Wetter ist heute schön."], 0,
      "Eine Bitte beginnt höflich: Entschuldigung, können Sie ...?"),
    schreibWahl(20, "Sie möchten im Restaurant zahlen.", "Was sagen Sie?",
      ["Entschuldigung, wir möchten bitte zahlen.", "Guten Appetit!", "Es tut mir leid."], 0,
      "Beim Zahlen: Entschuldigung, wir möchten bitte zahlen."),
    schreibWahl(21, "Sie möchten ein Zimmer buchen.", "Was sagen Sie?",
      ["Ich möchte gern ein Zimmer buchen.", "Ich heiße Anna.", "Ich habe Hunger."], 0,
      "Eine Bitte: Ich möchte gern ..."),
    schreibWahl(22, "Reagieren Sie auf: Danke schön!",
      "", ["Bitte schön.", "Tut mir leid.", "Gute Nacht."], 0,
      "Auf Dank antwortet man: Bitte schön."),
    schreibWahl(23, "Reagieren Sie auf: Können Sie morgen kommen?",
      "", ["Ja, gern. Um wie viel Uhr?", "Ich heiße Anna.", "Bitte schön."], 0,
      "Auf eine Frage: Ja, gern. Um wie viel Uhr?"),
    schreibWahl(24, "Sie möchten den Weg wissen.", "Was sagen Sie?",
      ["Entschuldigung, wie komme ich zum Bahnhof?", "Ich möchte ein Brot.", "Es regnet."], 0,
      "Nach dem Weg fragen: Wie komme ich zu ...?"),
    schreibWahl(25, "Sie möchten sich entschuldigen.", "Was sagen Sie?",
      ["Es tut mir leid.", "Vielen Dank.", "Guten Appetit."], 0,
      "Sich entschuldigen: Es tut mir leid."),
    schreibWahl(26, "Sie möchten jemanden einladen.", "Was sagen Sie?",
      ["Kommst du am Samstag zu meiner Party?", "Wie spät ist es?", "Ich habe keine Zeit."], 0,
      "Einladen: Kommst du zu meiner Party?"),

    // ---------- Hören: Sprechen hören (27-30) ----------
    listen(27, "Hören Sie und wählen Sie die Antwort.", "Entschuldigung, wo ist die Post?",
      ["Gehen Sie geradeaus und dann links.", "Ich heiße Anna.", "Die Post ist zu teuer."], 0,
      "Auf eine Wegfrage folgt eine Wegbeschreibung."),
    listen(28, "Hören Sie und wählen Sie die Antwort.", "Was kostet das Kilo Äpfel?",
      ["Das Kilo kostet 2 Euro 80.", "Ich nehme ein Kilo.", "Die Äpfel sind frisch."], 0,
      "Auf eine Preisfrage folgt der Preis."),
    listen(29, "Hören Sie und wählen Sie die Antwort.", "Kann ich mit Karte zahlen?",
      ["Ja, Kartenzahlung ist möglich.", "Die Karte ist sehr groß.", "Ich habe eine Karte."], 0,
      "Auf eine Ja-Frage folgt Ja oder Nein."),
    listen(30, "Hören Sie und wählen Sie die Antwort.", "Wann fährt der nächste Zug?",
      ["Der nächste Zug fährt um 15 Uhr.", "Der Zug ist sehr schnell.", "Ich fahre mit dem Bus."], 0,
      "Auf eine Zeitfrage folgt die Uhrzeit."),

    // ---------- Karten für das Üben zu Hause ----------
    karten(31, [
      { front: "Wie heißen Sie?", back: "Ich heiße ..." },
      { front: "Woher kommen Sie?", back: "Ich komme aus ..." },
      { front: "Wo wohnen Sie?", back: "Ich wohne in ..." },
      { front: "Was machen Sie beruflich?", back: "Ich arbeite als ..." },
      { front: "Was sind Ihre Hobbys?", back: "Ich ... gern." },
      { front: "Können Sie mir helfen?", back: "Ja, gern. Was brauchen Sie?" },
    ]),
  ],
};