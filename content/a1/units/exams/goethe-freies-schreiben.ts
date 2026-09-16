import type { Lesson } from "../../../schema";
import {
  schreibFrei,
  bauen,
  zuordnen,
  karten,
  schreibWahl,
} from "./factories";

/**
 * Goethe-Zertifikat A1 / Start Deutsch 1 — Freies Schreiben: Briefe und
 * über mich. A guided writing practice section: the learner writes German
 * texts (self-introduction, letters, e-mails, postcards), checks the points,
 * and compares with a model answer. Plus sentence-building, phrase-matching,
 * and vocabulary cards to support the writing.
 */

export const goetheFreiesSchreiben: Lesson = {
  id: "goethe-a1-freies-schreiben-briefe",
  title: "Goethe A1 Freies Schreiben: Briefe und über mich",
  summary:
    "Write real German texts: introduce yourself, write letters, e-mails, and postcards, then compare with a model answer. Includes the phrases and sentence patterns you need.",
  status: "ready",
  sections: [
    {
      heading: "So schreiben Sie über sich selbst",
      blocks: [
        {
          type: "paragraph",
          text: "Über sich selbst zu schreiben ist der erste Brief, den Sie in der Prüfung schreiben können. Die Bausteine sind immer dieselben: Wer sind Sie? Woher kommen Sie? Wo wohnen Sie? Was machen Sie beruflich? Was machen Sie gern? Üben Sie diese fünf Sätze, dann haben Sie den Anfang.",
        },
        {
          type: "table",
          caption: "Die fünf Bausteine über sich selbst",
          head: ["Frage", "Antwortmuster"],
          rows: [
            ["Wer sind Sie?", "Ich heiße Anna Weber."],
            ["Woher kommen Sie?", "Ich komme aus Polen."],
            ["Wo wohnen Sie?", "Ich wohne in Berlin."],
            ["Was machen Sie beruflich?", "Ich arbeite als Kellnerin."],
            ["Was machen Sie gern?", "Ich schwimme gern und lese Bücher."],
          ],
        },
        {
          type: "tip",
          text: "Schreiben Sie kurze Sätze. Ein Satz, eine Information. Dann ist der Text klar und richtig.",
        },
      ],
    },
    {
      heading: "Der Brief: Aufbau",
      blocks: [
        {
          type: "paragraph",
          text: "Ein Brief hat immer dieselben Teile: Ort und Datum oben, dann die Anrede mit Komma, dann der Text, dann der Gruß und die Unterschrift. Informell schreiben Sie an Freunde und Familie, formell an Firmen und Behörden.",
        },
        {
          type: "table",
          caption: "Informell und formell",
          head: ["Baustein", "Informell", "Formell"],
          rows: [
            ["Anrede", "Liebe Julia,", "Sehr geehrte Damen und Herren,"],
            ["Gruß", "Viele Grüße", "Mit freundlichen Grüßen"],
            ["Du oder Sie?", "du", "Sie"],
          ],
        },
        {
          type: "example",
          de: "Berlin, 15. August. Liebe Julia, vielen Dank für deine Einladung! Ich komme gern zu deiner Party. Ich bringe einen Salat mit. Viele Grüße, Anna.",
          en: "Berlin, 15 August. Dear Julia, thank you for your invitation! I will gladly come to your party. I will bring a salad. Best regards, Anna.",
        },
        {
          type: "tip",
          text: "Nach dem Gruß kommt kein Punkt, sondern ein Komma: 'Viele Grüße, Anna'.",
        },
      ],
    },
    {
      heading: "Briefe, die in der Prüfung kommen",
      blocks: [
        {
          type: "paragraph",
          text: "Die Goethe-Prüfung verlangt kurze Mitteilungen von circa 30 Wörtern: eine Einladung, eine Absage, eine Bitte um Informationen, eine Krankmeldung, eine Antwort an ein Hotel. Jede dieser Übungen ist unten als freies Schreiben mit Musterlösung vorbereitet.",
        },
        {
          type: "tip",
          text: "Schreiben Sie die Punkte der Aufgabe nacheinander ab: erst die Anrede, dann Punkt für Punkt, zum Schluss der Gruß.",
        },
      ],
    },
  ],
  vocab: [
    { id: "der-brief", de: "der Brief", en: "the letter", part: "noun m.", plural: "die Briefe", audio: true },
    { id: "die-email", de: "die E-Mail", en: "the e-mail", part: "noun f.", plural: "die E-Mails", audio: true },
    { id: "die-postkarte", de: "die Postkarte", en: "the postcard", part: "noun f.", plural: "die Postkarten", audio: true },
    { id: "die-anrede", de: "die Anrede", en: "the salutation", part: "noun f.", plural: "die Anreden", audio: true },
    { id: "der-gruss", de: "der Gruß", en: "the greeting, sign-off", part: "noun m.", plural: "die Grüße", audio: true },
    { id: "die-unterschrift", de: "die Unterschrift", en: "the signature", part: "noun f.", plural: "die Unterschriften", audio: true },
    { id: "der-absender", de: "der Absender", en: "the sender", part: "noun m.", plural: "die Absender", audio: true },
    { id: "der-empfaenger", de: "der Empfänger", en: "the recipient", part: "noun m.", plural: "die Empfänger", audio: true },
    { id: "sich-vorstellen", de: "sich vorstellen", en: "to introduce oneself", part: "verb", audio: true },
    { id: "die-krankmeldung", de: "die Krankmeldung", en: "the sick note", part: "noun f.", plural: "die Krankmeldungen", audio: true },
    { id: "sich-entschuldigen", de: "sich entschuldigen", en: "to apologize", part: "verb", audio: true },
    { id: "die-beschwerde", de: "die Beschwerde", en: "the complaint", part: "noun f.", plural: "die Beschwerden", audio: true },
  ],
  exercises: [
    // ---------- Freies Schreiben: über mich ----------
    schreibFrei(
      1,
      "Schreiben Sie über sich selbst: Wer sind Sie? Wo wohnen Sie? Was machen Sie gern?",
      ["Name", "Wohnort", "Beruf oder Hobby", "Ein Satz zu Ihrer Familie"],
      "Ich heiße Anna Weber und wohne in Berlin. Ich arbeite als Kellnerin in einem Café. In meiner Freizeit schwimme ich gern. Ich habe einen Bruder und eine Schwester.",
      "circa 40 Wörter",
      "Über sich selbst: Name, Wohnort, Beruf oder Hobby, Familie.",
    ),
    schreibFrei(
      2,
      "Schreiben Sie über Ihren Alltag: Wann stehen Sie auf? Was machen Sie am Vormittag? Und am Abend?",
      ["Aufstehen", "Vormittag", "Abend", "Ein Wunsch oder ein Hobby"],
      "Ich stehe um sechs Uhr auf. Am Vormittag arbeite ich im Café. Am Abend koche ich und lese ein Buch. Am Wochenende treffe ich gern Freunde.",
      "circa 40 Wörter",
      "Tagesablauf: morgens, vormittags, abends, am Wochenende.",
    ),
    schreibFrei(
      3,
      "Schreiben Sie eine Postkarte aus Ihrem Urlaub an eine Freundin.",
      ["Anrede", "Wo Sie sind", "Was Sie machen", "Gruß und Name"],
      "Liebe Julia, viele Grüße aus Italien! Das Wetter ist schön und das Essen ist super. Ich schwimme jeden Tag im Meer. Bis bald, Anna.",
      "circa 30 Wörter",
      "Postkarte: Grüße, Ort, zwei Informationen, Gruß.",
    ),
    schreibFrei(
      4,
      "Schreiben Sie an Ihre Freundin Julia: Sie kommen am Samstag zur Party und bringen einen Salat mit.",
      ["Anrede", "Zusage", "Salat mitbringen", "Gruß und Name"],
      "Liebe Julia, vielen Dank für die Einladung! Ich komme gern zu deiner Party am Samstag. Ich bringe einen Salat mit. Viele Grüße, Anna.",
      "circa 30 Wörter",
      "Zusage: danken, kommen, mitbringen.",
    ),
    schreibFrei(
      5,
      "Schreiben Sie eine Absage an Ihren Freund Max: Sie können am Freitag nicht kommen, Sie müssen arbeiten.",
      ["Anrede", "Entschuldigung", "Grund", "Vorschlag für einen neuen Termin"],
      "Lieber Max, es tut mir leid, aber ich kann am Freitag nicht kommen. Ich muss arbeiten. Können wir uns am Samstag treffen? Viele Grüße, Anna.",
      "circa 30 Wörter",
      "Absage: Entschuldigung, Grund, neuer Vorschlag.",
    ),
    schreibFrei(
      6,
      "Schreiben Sie an das Hotel Sonne: Sie möchten ein Zimmer für zwei Nächte buchen und fragen nach dem Preis.",
      ["Formelle Anrede", "Bitte um ein Zimmer", "Zwei Nächte", "Frage nach dem Preis"],
      "Sehr geehrte Damen und Herren, ich möchte gern ein Zimmer für zwei Nächte buchen, vom 15. bis 17. August. Wie viel kostet das Zimmer pro Nacht? Mit freundlichen Grüßen, Anna Weber.",
      "circa 30 Wörter",
      "Formeller Brief: Anrede, Bitte, Frage, Gruß.",
    ),
    schreibFrei(
      7,
      "Schreiben Sie eine kurze Krankmeldung an Ihren Chef: Sie sind krank und kommen heute nicht zur Arbeit.",
      ["Formelle Anrede", "Krank", "Heute nicht zur Arbeit", "Formeller Gruß"],
      "Sehr geehrter Herr Berger, ich bin leider krank und kann heute nicht zur Arbeit kommen. Ich gehe zum Arzt und melde mich morgen. Mit freundlichen Grüßen, Anna Weber.",
      "circa 30 Wörter",
      "Krankmeldung: kurz, formell, Grund nennen.",
    ),
    schreibFrei(
      8,
      "Schreiben Sie an die Touristeninformation: Sie kommen im August nach Dresden und möchten Informationen über Museen und Hoteladressen.",
      ["Formelle Anrede", "Warum Sie schreiben", "Bitte: Museumsinfos", "Bitte: Hoteladressen"],
      "Sehr geehrte Damen und Herren, ich komme im August nach Dresden und möchte gern Museen besuchen. Können Sie mir bitte Informationen und Hoteladressen schicken? Mit freundlichen Grüßen, Anna Weber.",
      "circa 30 Wörter",
      "Bitte um Informationen: Grund und zwei Bitten nennen.",
    ),
    schreibFrei(
      9,
      "Schreiben Sie an Ihren Vermieter: Die Heizung funktioniert nicht. Bitten Sie um Reparatur.",
      ["Formelle Anrede", "Das Problem", "Bitte um Reparatur", "Formeller Gruß"],
      "Sehr geehrter Herr Müller, seit gestern funktioniert die Heizung in meiner Wohnung nicht. Können Sie bitte einen Techniker schicken? Mit freundlichen Grüßen, Anna Weber.",
      "circa 30 Wörter",
      "Beschwerde: Problem nennen, um Lösung bitten.",
    ),
    schreibFrei(
      10,
      "Schreiben Sie an Ihre Oma: Sie haben ein Geschenk bekommen und bedanken sich.",
      ["Anrede", "Dank", "Was Sie mit dem Geschenk machen", "Gruß und Name"],
      "Liebe Oma, vielen Dank für das tolle Buch! Ich habe schon das erste Kapitel gelesen. Es gefällt mir sehr. Ich rufe dich am Wochenende an. Viele Grüße, Anna.",
      "circa 30 Wörter",
      "Dankesbrief: danken, etwas zum Geschenk sagen, Gruß.",
    ),

    // ---------- Satzbau-Hilfe ----------
    bauen(11, "Bauen Sie den ersten Satz eines Briefes an einen Freund.", ["Lieber", "Max,", "wie", "geht", "es", "dir?"], "Anrede mit Komma, dann die Frage."),
    bauen(12, "Bauen Sie den ersten Satz eines formellen Briefes.", ["Sehr", "geehrte", "Damen", "und", "Herren,", "ich", "schreibe", "Ihnen", "wegen", "der", "Anmeldung."], "Formelle Anrede mit Komma."),
    bauen(13, "Bauen Sie den Schluss eines Briefes.", ["Viele", "Grüße", "aus", "Berlin,", "Anna"], "Gruß mit Ort, Komma, Name."),
    bauen(14, "Bauen Sie eine Bitte.", ["Können", "Sie", "mir", "bitte", "einen", "Stadtplan", "schicken?"], "Bitte: Können Sie mir bitte ... schicken?"),

    // ---------- Wendungen zuordnen ----------
    zuordnen(15, "Verbinden Sie die Anrede mit der richtigen Person.",
      [
        ["Liebe Julia,", "an eine Freundin"],
        ["Sehr geehrte Frau Berger,", "an eine Chefin, formell"],
        ["Hallo Herr Müller,", "an einen Nachbarn, informell"],
        ["Sehr geehrte Damen und Herren,", "an eine Firma"],
      ],
    ),
    zuordnen(16, "Verbinden Sie die Wendung mit ihrer Funktion.",
      [
        ["Vielen Dank für die Einladung!", "danken"],
        ["Es tut mir leid, ich kann nicht kommen.", "sich entschuldigen"],
        ["Können Sie mir bitte helfen?", "bitten"],
        ["Ich bin leider krank.", "sich krankmelden"],
      ],
    ),

    // ---------- Wortwahl ----------
    schreibWahl(17, "Sie schreiben an einen Freund. Wie beginnen Sie?",
      "Am Anfang steht:",
      ["Lieber Max,", "Sehr geehrte Damen und Herren,", "Guten Tag, Firma Sonne,"], 0,
      "An Freunde: Lieber Max."),
    schreibWahl(18, "Sie schreiben an eine Firma. Wie beenden Sie?",
      "Am Ende steht:",
      ["Mit freundlichen Grüßen", "Bis bald", "Tschüss"], 0,
      "Formeller Gruß: Mit freundlichen Grüßen."),

    // ---------- Vokabelkarten ----------
    karten(19, [
      { front: "der Brief", back: "the letter" },
      { front: "die Anrede", back: "the salutation" },
      { front: "der Gruß", back: "the greeting, sign-off" },
      { front: "die Unterschrift", back: "the signature" },
      { front: "sich vorstellen", back: "to introduce oneself" },
      { front: "die Postkarte", back: "the postcard" },
    ]),
  ],
};