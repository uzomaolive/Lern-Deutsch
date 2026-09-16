import type { Lesson } from "../../../schema";
import {
  schreibForm,
  bauen,
  schreibWahl,
  schreibFrei,
} from "./factories";

/**
 * Goethe-Zertifikat A1 / Start Deutsch 1 — Schreiben: 30 Übungen.
 * A dedicated writing drill section: forms, phrase choice, sentence
 * building, gap-fill, and free writing with model answers.
 */

export const goetheSchreiben30: Lesson = {
  id: "goethe-a1-schreiben-30-uebungen",
  title: "Goethe A1 Schreiben: 30 Übungen",
  summary:
    "Thirty writing exercises in the exact style of the Goethe A1 Schreiben part: forms to fill in, the right phrase for every situation, letters built from parts, and free writing with model answers.",
  status: "ready",
  sections: [
    {
      heading: "So funktioniert der Schreibteil",
      blocks: [
        {
          type: "paragraph",
          text: "Der Schreibteil hat zwei Aufgaben. In Teil 1 füllen Sie ein Formular aus: fünf Informationen fehlen. In Teil 2 schreiben Sie eine kurze Mitteilung von circa 30 Wörtern. Diese 30 Übungen trainieren genau das: Formulare, die richtigen Wendungen, Satzbau und freies Schreiben.",
        },
        {
          type: "table",
          caption: "Die fünf Übungsgruppen",
          head: ["Übungen", "Was Sie trainieren"],
          rows: [
            ["1-6", "Formulare ausfüllen"],
            ["7-12", "Sätze für Briefe und Mitteilungen bauen"],
            ["13-18", "Die richtige Wendung für die Situation wählen"],
            ["19-24", "Lücken in Briefen schließen"],
            ["25-30", "Frei schreiben und mit der Musterlösung vergleichen"],
          ],
        },
        {
          type: "tip",
          text: "Schreiben Sie zu jedem Punkt ein bis zwei Sätze. Anrede und Gruß gehören immer dazu: Liebe Julia, ... Viele Grüße, Anna.",
        },
      ],
    },
    {
      heading: "Formulare: die fünf klassischen Felder",
      blocks: [
        {
          type: "paragraph",
          text: "Formulare fragen fast immer dasselbe: Familienname, Vorname, Adresse, Telefonnummer oder E-Mail und einen Termin oder ein Datum. Üben Sie diese Felder, dann ist Teil 1 geschafft.",
        },
        {
          type: "example",
          de: "Familienname: Weber. Vorname: Anna. Straße, Hausnummer: Hauptstraße 12. PLZ, Ort: 10115 Berlin.",
          en: "Last name: Weber. First name: Anna. Street, number: Hauptstraße 12. Postal code, city: 10115 Berlin.",
        },
        {
          type: "tip",
          text: "Beim Datum zählt das Format: Tag.Monat.Jahr. Und die Unterschrift darf nicht fehlen.",
        },
      ],
    },
    {
      heading: "Die kurze Mitteilung: Struktur",
      blocks: [
        {
          type: "paragraph",
          text: "Eine kurze Mitteilung hat immer dieselbe Struktur: Anrede, dann der Grund oder die Information, dann Gruß und Name. Für eine Einladung, eine Absage oder eine Bitte brauchen Sie nur diese vier Bausteine.",
        },
        {
          type: "table",
          caption: "Die vier Bausteine",
          head: ["Baustein", "Beispiel"],
          rows: [
            ["Anrede", "Liebe Julia,"],
            ["Information", "ich komme am Samstag zur Party."],
            ["Gruß", "Viele Grüße"],
            ["Name", "Anna"],
          ],
        },
        {
          type: "tip",
          text: "Formell: Sehr geehrte Damen und Herren, ... Mit freundlichen Grüßen. Informell: Liebe Anna, ... Viele Grüße.",
        },
      ],
    },
  ],
  vocab: [
    { id: "das-formular", de: "das Formular", en: "the form", part: "noun n.", plural: "die Formulare", audio: true },
    { id: "die-mitteilung", de: "die Mitteilung", en: "the message", part: "noun f.", plural: "die Mitteilungen", audio: true },
    { id: "die-anrede", de: "die Anrede", en: "the salutation", part: "noun f.", plural: "die Anreden", audio: true },
    { id: "der-gruss", de: "der Gruß", en: "the greeting, sign-off", part: "noun m.", plural: "die Grüße", audio: true },
    { id: "die-unterschrift", de: "die Unterschrift", en: "the signature", part: "noun f.", plural: "die Unterschriften", audio: true },
    { id: "der-familienname", de: "der Familienname", en: "the last name", part: "noun m.", plural: "die Familiennamen", audio: true },
    { id: "ausfuellen", de: "ausfüllen", en: "to fill in", part: "verb", audio: true },
    { id: "schreiben", de: "schreiben", en: "to write", part: "verb", audio: true },
    { id: "die-absage", de: "die Absage", en: "the refusal", part: "noun f.", plural: "die Absagen", audio: true },
    { id: "die-einladung", de: "die Einladung", en: "the invitation", part: "noun f.", plural: "die Einladungen", audio: true },
    { id: "die-bitte", de: "die Bitte", en: "the request", part: "noun f.", plural: "die Bitten", audio: true },
    { id: "formell", de: "formell", en: "formal", part: "adjective", audio: true },
    { id: "informell", de: "informell", en: "informal", part: "adjective", audio: true },
    { id: "die-musterloesung", de: "die Musterlösung", en: "the model answer", part: "noun f.", plural: "die Musterlösungen", audio: true },
  ],
  exercises: [
    // ---------- 1-6: Formulare ----------
    schreibForm(1, "Anmeldung zum Kurs. Familienname: ___. Vorname: ___. Geburtsdatum: ___.",
      [
        { answers: ["Weber"], hint: "Familienname" },
        { answers: ["Anna"], hint: "Vorname" },
        { answers: ["12.03.1998", "12.03.1998"], hint: "Geburtsdatum" },
      ],
      "Die Person heißt Anna Weber und ist am 12.03.1998 geboren."),
    schreibForm(2, "Bestellung. Artikel: ___. Menge: ___. Preis: ___.",
      [
        { answers: ["Käse"], hint: "Artikel" },
        { answers: ["500 Gramm", "500 g"], hint: "Menge" },
        { answers: ["4,50 Euro", "4.50"], hint: "Preis" },
      ],
      "Der Kunde bestellt 500 Gramm Käse für 4,50 Euro."),
    schreibForm(3, "Buchungsformular. Reiseziel: ___. Abflugdatum: ___. Anzahl der Personen: ___.",
      [
        { answers: ["Spanien", "Mallorca"], hint: "Reiseziel" },
        { answers: ["15. August", "15.08."], hint: "Abflugdatum" },
        { answers: ["2", "zwei"], hint: "Anzahl der Personen" },
      ],
      "Zwei Personen fliegen am 15. August nach Spanien."),
    schreibForm(4, "Formular beim Bürgeramt. Familienname: ___. Anschrift: ___. Telefonnummer: ___.",
      [
        { answers: ["Weber"], hint: "Familienname" },
        { answers: ["Hauptstraße 12, 10115 Berlin"], hint: "Anschrift" },
        { answers: ["0176 552091", "0176/552091"], hint: "Telefonnummer" },
      ],
      "Anna Weber wohnt in der Hauptstraße 12 in 10115 Berlin, Telefon 0176 552091."),
    schreibForm(5, "Anmeldung für den Schwimmkurs. Name: ___. Kurs: ___. Uhrzeit: ___.",
      [
        { answers: ["Anna Weber"], hint: "Name" },
        { answers: ["Anfängerkurs", "Anfänger"], hint: "Kurs" },
        { answers: ["18 Uhr"], hint: "Uhrzeit" },
      ],
      "Anna Weber möchte den Anfängerkurs um 18 Uhr besuchen."),
    schreibForm(6, "Hotelbuchung. Familienname: ___. Zimmer: ___. Anreise: ___.",
      [
        { answers: ["Weber"], hint: "Familienname" },
        { answers: ["Doppelzimmer"], hint: "Zimmer" },
        { answers: ["Freitag"], hint: "Anreise" },
      ],
      "Familie Weber bucht ein Doppelzimmer ab Freitag."),

    // ---------- 7-12: Sätze bauen ----------
    bauen(7, "Bauen Sie die Anrede für eine Freundin.", ["Liebe", "Julia,", "wie", "geht", "es", "dir?"], "Informelle Anrede mit Komma und Frage."),
    bauen(8, "Bauen Sie den Beginn einer Einladung.", ["Ich", "lade", "dich", "herzlich", "zu", "meiner", "Party", "ein."], "Einladen: Ich lade dich ein."),
    bauen(9, "Bauen Sie eine Absage.", ["Leider", "kann", "ich", "am", "Samstag", "nicht", "kommen."], "Absagen: Leider kann ich nicht kommen."),
    bauen(10, "Bauen Sie eine Bitte.", ["Können", "Sie", "mir", "bitte", "die", "Adresse", "schicken?"], "Bitte formell: Können Sie mir bitte ... schicken?"),
    bauen(11, "Bauen Sie den formellen Gruß.", ["Mit", "freundlichen", "Grüßen,", "Anna", "Weber"], "Formeller Gruß mit Namen."),
    bauen(12, "Bauen Sie den informellen Gruß.", ["Viele", "Grüße", "aus", "Berlin,", "Anna"], "Informeller Gruß mit Ort und Namen."),

    // ---------- 13-18: Wendungen wählen ----------
    schreibWahl(13, "Sie schreiben an einen Freund.", "Wie beginnen Sie?",
      ["Lieber Max,", "Sehr geehrter Herr Max,", "Guten Tag, werte Firma,"], 0,
      "An Freunde: Lieber Max."),
    schreibWahl(14, "Sie schreiben an eine Firma.", "Wie beginnen Sie?",
      ["Sehr geehrte Damen und Herren,", "Hallo Leute,", "Liebe Kollegen von überall,"], 0,
      "An Firmen: Sehr geehrte Damen und Herren."),
    schreibWahl(15, "Sie sagen einen Termin ab.", "Welcher Satz passt?",
      ["Ich kann den Termin leider nicht einhalten.", "Ich freue mich auf den Termin.", "Der Termin ist sehr interessant."], 0,
      "Absagen: Ich kann den Termin leider nicht einhalten."),
    schreibWahl(16, "Sie bitten um Informationen.", "Welcher Satz passt?",
      ["Können Sie mir bitte Informationen schicken?", "Ich schicke Ihnen die Informationen.", "Die Informationen sind gestern angekommen."], 0,
      "Bitten: Können Sie mir bitte ... schicken?"),
    schreibWahl(17, "Sie antworten auf eine Einladung.", "Was passt?",
      ["Vielen Dank für die Einladung, ich komme gern.", "Es tut mir leid, ich habe die Einladung verloren.", "Die Einladung war gestern."], 0,
      "Zusagen: Vielen Dank, ich komme gern."),
    schreibWahl(18, "Sie beenden einen formellen Brief.", "Welcher Gruß passt?",
      ["Mit freundlichen Grüßen", "Bis bald, Schatz", "Ciao, bis morgen"], 0,
      "Formell: Mit freundlichen Grüßen."),

    // ---------- 19-24: Lücken in Briefen ----------
    schreibForm(19, "Füllen Sie die Lücken. Sehr ___ Frau Berger, ich ___ mich für die Stelle. ___ freundlichen Grüßen, Anna Weber.",
      [
        { answers: ["geehrte"], hint: "formelle Anrede" },
        { answers: ["bewerbe"], hint: "Verb: bewerben" },
        { answers: ["Mit"], hint: "Gruß: Mit freundlichen Grüßen" },
      ],
      "Sehr geehrte Frau Berger, ich bewerbe mich für die Stelle. Mit freundlichen Grüßen, Anna Weber."),
    schreibForm(20, "Füllen Sie die Lücken. Liebe Julia, ich ___ am Samstag später kommen. ___ Zug hat Verspätung. ___ Grüße, Anna.",
      [
        { answers: ["kann"], hint: "Modalverb" },
        { answers: ["Mein"], hint: "Possessiv: der Zug" },
        { answers: ["Viele"], hint: "informeller Gruß" },
      ],
      "Liebe Julia, ich kann am Samstag später kommen. Mein Zug hat Verspätung. Viele Grüße, Anna."),
    schreibForm(21, "Füllen Sie die Lücken. Hallo Herr Müller, können ___ mir bitte helfen? Ich habe eine Frage ___ meinem Vertrag.",
      [
        { answers: ["Sie"], hint: "formelles Sie" },
        { answers: ["zu"], hint: "Präposition: Frage zu" },
      ],
      "Hallo Herr Müller, können Sie mir bitte helfen? Ich habe eine Frage zu meinem Vertrag."),
    schreibForm(22, "Füllen Sie die Lücken. Liebe Oma, wir ___ dich am Sonntag besuchen. Wir freuen ___ schon sehr.",
      [
        { answers: ["besuchen"], hint: "Verb: besuchen, wir-Form" },
        { answers: ["uns"], hint: "sich freuen" },
      ],
      "Liebe Oma, wir besuchen dich am Sonntag. Wir freuen uns schon sehr."),
    schreibForm(23, "Füllen Sie die Lücken. Sehr geehrte Damen und Herren, ich ___ im August nach Dresden. ___ Sie mir bitte Hoteladressen?",
      [
        { answers: ["fahre", "reise"], hint: "Verb: fahren oder reisen" },
        { answers: ["Schicken", "Können"], hint: "Bitte: Schicken oder Können" },
      ],
      "Sehr geehrte Damen und Herren, ich fahre im August nach Dresden. Schicken Sie mir bitte Hoteladressen?"),
    schreibForm(24, "Füllen Sie die Lücken. Entschuldigung, ich ___ heute nicht zur Arbeit kommen. Ich ___ krank.",
      [
        { answers: ["kann"], hint: "Modalverb" },
        { answers: ["bin"], hint: "sein, ich-Form" },
      ],
      "Entschuldigung, ich kann heute nicht zur Arbeit kommen. Ich bin krank."),

    // ---------- 25-30: Frei schreiben ----------
    schreibFrei(
      25,
      "Schreiben Sie an Ihre Freundin Julia: Sie kommen am Samstag zur Party und bringen einen Salat mit.",
      ["Anrede", "Zusage", "Salat mitbringen", "Gruß und Name"],
      "Liebe Julia,\n\nvielen Dank für die Einladung! Ich komme gern zu deiner Party am Samstag. Ich bringe einen Salat mit.\n\nViele Grüße\nAnna",
      "circa 30 Wörter",
      "Anrede und Gruß gehören immer dazu. Nach dem Gruß kommt der Name.",
    ),
    schreibFrei(
      26,
      "Schreiben Sie an das Hotel Sonne: Sie möchten ein Zimmer für zwei Nächte buchen.",
      ["Formelle Anrede", "Bitte um ein Zimmer", "Zwei Nächte", "Formeller Gruß"],
      "Sehr geehrte Damen und Herren,\n\nich möchte gern ein Zimmer für zwei Nächte buchen, vom 15. bis 17. August. Haben Sie noch ein Zimmer frei?\n\nMit freundlichen Grüßen\nAnna Weber",
      "circa 30 Wörter",
      "An ein Hotel schreibt man formell mit 'Sehr geehrte Damen und Herren'.",
    ),
    schreibFrei(
      27,
      "Schreiben Sie an Ihren Freund Max: Sie können morgen leider nicht kommen, Sie müssen arbeiten.",
      ["Anrede", "Entschuldigung", "Grund: Arbeit", "Gruß und Name"],
      "Lieber Max,\n\nes tut mir leid, aber ich kann morgen leider nicht kommen. Ich muss arbeiten. Können wir uns am Sonntag treffen?\n\nViele Grüße\nAnna",
      "circa 30 Wörter",
      "Eine Absage braucht eine Entschuldigung und einen Grund.",
    ),
    schreibFrei(
      28,
      "Schreiben Sie an die Touristeninformation: Sie kommen im August nach Dresden und möchten Informationen über Museen.",
      ["Formelle Anrede", "Warum Sie schreiben", "Bitte: Museumsinfos", "Formeller Gruß"],
      "Sehr geehrte Damen und Herren,\n\nich komme im August nach Dresden und möchte gern Museen besuchen. Können Sie mir bitte Informationen und Hoteladressen schicken?\n\nMit freundlichen Grüßen\nAnna Weber",
      "circa 30 Wörter",
      "Schreiben Sie, warum Sie schreiben, und dann die Bitte.",
    ),
    schreibFrei(
      29,
      "Schreiben Sie eine kurze Krankmeldung an Ihren Chef: Sie sind krank und kommen heute nicht zur Arbeit.",
      ["Formelle Anrede", "Krank", "Heute nicht zur Arbeit", "Formeller Gruß"],
      "Sehr geehrter Herr Berger,\n\nich bin leider krank und kann heute nicht zur Arbeit kommen. Ich gehe zum Arzt und melde mich morgen.\n\nMit freundlichen Grüßen\nAnna Weber",
      "circa 30 Wörter",
      "Krankmeldungen sind formell: Grund nennen, kurz bleiben.",
    ),
    schreibFrei(
      30,
      "Schreiben Sie über sich selbst: Wer sind Sie? Wo wohnen Sie? Was machen Sie gern?",
      ["Name", "Wohnort", "Beruf oder Hobby", "Ein Satz zu Ihrer Familie"],
      "Ich heiße Anna Weber und wohne in Berlin. Ich arbeite als Kellnerin in einem Café. In meiner Freizeit schwimme ich gern und treffe Freunde. Ich habe einen Bruder und eine Schwester.",
      "circa 40 Wörter",
      "Über sich selbst schreiben: Name, Wohnort, Beruf oder Hobby, Familie.",
    ),
  ],
};