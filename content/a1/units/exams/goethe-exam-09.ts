import type { Lesson } from "../../../schema";
import {
  listen,
  listenRF,
  readRF,
  readAB,
  schreibForm,
  schreibSatz,
  sprechenSatz,
  sprechenMatch,
  sprechenChoose,
} from "./factories";

/**
 * Goethe-Zertifikat A1 / Start Deutsch 1 — Prüfung 9: Lernen und Kurse.
 * Complete paper: Hören (15), Lesen (15), Schreiben (2), Sprechen (3).
 */

export const goetheExam09: Lesson = {
  id: "goethe-a1-pruefung-09-lernen",
  title: "Goethe A1 Prüfung 9: Lernen und Kurse",
  summary:
    "A complete Goethe-Zertifikat A1 paper in authentic format: Hören, Lesen, Schreiben und Sprechen rund um Sprachkurse, Schule, Anmeldungen und Lernen.",
  status: "ready",
  sections: [
    {
      heading: "So ist die Prüfung aufgebaut",
      blocks: [
        {
          type: "paragraph",
          text: "Diese Prüfung hat vier Teile: Hören (circa 20 Minuten), Lesen (circa 25 Minuten), Schreiben (circa 20 Minuten) und Sprechen (circa 15 Minuten). Beantworten Sie alle Aufgaben, auch wenn Sie unsicher sind. Wörterbücher sind nicht erlaubt.",
        },
        {
          type: "table",
          caption: "Die vier Prüfungsteile",
          head: ["Teil", "Dauer", "Was prüft er?"],
          rows: [
            ["Hören", "20 Min.", "Kursinformationen, Ansagen, Telefonate"],
            ["Lesen", "25 Min.", "Kursanzeigen, Aushänge, Schilder"],
            ["Schreiben", "20 Min.", "Anmeldeformular, kurze Mitteilung"],
            ["Sprechen", "15 Min.", "sich vorstellen, fragen, bitten"],
          ],
        },
        {
          type: "tip",
          text: "Anmeldungen sind ein Kernthema: der Kurs, die Anmeldung, der Kursbeginn, die Kursgebühr, das Niveau. Lernen Sie diese Wörter mit ihren Verben: einen Kurs besuchen, sich anmelden, Gebühren bezahlen.",
        },
      ],
    },
    {
      heading: "Hören: Anleitung",
      blocks: [
        {
          type: "paragraph",
          text: "Sie hören kurze Gespräche und Ansagen. Zu jedem Text gibt es eine Aufgabe. Kreuzen Sie die richtige Lösung an. Sie hören jeden Text zweimal, die Durchsagen in Teil 2 nur einmal.",
        },
      ],
    },
    {
      heading: "Lesen: Anleitung",
      blocks: [
        {
          type: "paragraph",
          text: "Sie lesen kurze Kursanzeigen, Aushänge und Hinweisschilder. Zu jedem Text gibt es Aufgaben. Kreuzen Sie die richtige Lösung an.",
        },
      ],
    },
    {
      heading: "Schreiben: Anleitung",
      blocks: [
        {
          type: "paragraph",
          text: "Sie füllen ein Formular aus und schreiben einen kurzen Text. Schreiben Sie zu jedem Punkt ein bis zwei Sätze, circa 30 Wörter, mit Anrede und Gruß.",
        },
      ],
    },
    {
      heading: "Sprechen: Anleitung",
      blocks: [
        {
          type: "paragraph",
          text: "Sie sprechen in der Gruppe. Teil 1: Sie stellen sich vor. Teil 2: Sie fragen nach Informationen und geben Informationen. Teil 3: Sie formulieren Bitten und reagieren darauf.",
        },
      ],
    },
  ],
  vocab: [
    { id: "der-kurs", de: "der Kurs", en: "the course", part: "noun m.", plural: "die Kurse", audio: true },
    { id: "die-schule", de: "die Schule", en: "the school", part: "noun f.", plural: "die Schulen", audio: true },
    { id: "der-unterricht", de: "der Unterricht", en: "the lesson", part: "noun m.", audio: true },
    { id: "die-anmeldung", de: "die Anmeldung", en: "the registration", part: "noun f.", plural: "die Anmeldungen", audio: true },
    { id: "die-gebuehr", de: "die Gebühr", en: "the fee", part: "noun f.", plural: "die Gebühren", audio: true },
    { id: "das-niveau", de: "das Niveau", en: "the level", part: "noun n.", plural: "die Niveaus", audio: true },
    { id: "die-hausaufgabe", de: "die Hausaufgabe", en: "the homework", part: "noun f.", plural: "die Hausaufgaben", audio: true },
    { id: "der-kursraum", de: "der Kursraum", en: "the classroom", part: "noun m.", plural: "die Kursräume", audio: true },
    { id: "lernen", de: "lernen", en: "to learn", part: "verb", audio: true },
    { id: "ueben", de: "üben", en: "to practice", part: "verb", audio: true },
    { id: "die-pruefung", de: "die Prüfung", en: "the exam", part: "noun f.", plural: "die Prüfungen", audio: true },
    { id: "das-zertifikat", de: "das Zertifikat", en: "the certificate", part: "noun n.", plural: "die Zertifikate", audio: true },
  ],
  exercises: [
    // ---------- Hören, Teil 1: Aufgaben 1-6 (a/b/c, zweimal) ----------
    listen(1, "Was ist richtig?", "Guten Tag, ich möchte mich für einen Deutschkurs anmelden. Welches Niveau haben Sie? Ich bin Anfänger, ich spreche noch nicht viel Deutsch.",
      ["Der Kunde ist Anfänger.", "Der Kunde spricht schon gut Deutsch.", "Der Kurs ist ausgebucht."], 0,
      "Der Kunde meldet sich als Anfänger an."),
    listen(2, "Was ist richtig?", "Wann beginnt der Kurs? Der Kurs beginnt am Montag, den 3. Oktober. Der Unterricht ist montags und mittwochs von 18 bis 20 Uhr.",
      ["Der Kurs ist montags und mittwochs.", "Der Kurs ist täglich.", "Der Kurs beginnt am Freitag."], 0,
      "Unterricht montags und mittwochs, 18 bis 20 Uhr."),
    listen(3, "Was ist richtig?", "Wie viel kostet der Kurs? Der Kurs kostet 250 Euro. Die Bücher kosten extra 30 Euro.",
      ["Der Kurs kostet 250 Euro.", "Der Kurs kostet 30 Euro.", "Der Kurs ist kostenlos."], 0,
      "Kursgebühr 250 Euro, Bücher 30 Euro extra."),
    listen(4, "Was ist richtig?", "Entschuldigung, wo ist der Kursraum? Der Kursraum A2 ist im ersten Stock, Zimmer 105. Der Aufzug ist dort rechts.",
      ["Der Kursraum ist im ersten Stock.", "Der Kursraum ist im Keller.", "Der Kursraum ist im Erdgeschoss."], 0,
      "Kursraum A2: erster Stock, Zimmer 105."),
    listen(5, "Was ist richtig?", "Guten Tag, ich kann heute nicht zum Unterricht kommen. Ich bin krank. Kein Problem, wir schicken Ihnen die Hausaufgaben per E-Mail.",
      ["Der Kursteilnehmer ist krank.", "Der Kursteilnehmer ist im Urlaub.", "Der Kurs fällt aus."], 0,
      "Der Teilnehmer ist krank und bekommt die Aufgaben per E-Mail."),
    listen(6, "Was ist richtig?", "Haben Sie die Prüfung bestanden? Ja! Ich habe das A1-Zertifikat bekommen. Herzlichen Glückwunsch!",
      ["Die Person hat die Prüfung bestanden.", "Die Person hat die Prüfung nicht bestanden.", "Die Prüfung ist nächste Woche."], 0,
      "Bestanden und Zertifikat erhalten."),

    // ---------- Hören, Teil 2: Aufgaben 7-10 (Richtig/Falsch, einmal) ----------
    listenRF(7, "Achtung, Durchsage: Der Deutschkurs am Dienstag fällt leider aus. Der Unterricht findet am Donnerstag zur gleichen Zeit statt.",
      true, "Der Dienstagskurs fällt aus und wird am Donnerstag nachgeholt."),
    listenRF(8, "Information für alle Kursteilnehmer: Die Anmeldung für das neue Semester beginnt am Montag. Sie können sich online oder im Büro anmelden.",
      true, "Die Anmeldung beginnt am Montag."),
    listenRF(9, "Willkommen in der Sprachschule! Die Bibliothek ist im Erdgeschoss. Dort finden Sie Bücher, CDs und DVDs zum Lernen.",
      true, "Die Bibliothek ist im Erdgeschoss."),
    listenRF(10, "Hallo, hier ist die Sprachschule. Ihr Kurs beginnt um 18 Uhr, nicht um 19 Uhr. Bitte kommen Sie pünktlich.",
      false, "Der Kurs beginnt um 18 Uhr, nicht um 19 Uhr."),

    // ---------- Hören, Teil 3: Aufgaben 11-15 (a/b/c, zweimal) ----------
    listen(11, "Was ist richtig?", "Hallo Frau Weber, hier ist die Sprachschule. Ihr Platz im Kurs A1 ist bestätigt. Bitte bezahlen Sie die Gebühr bis Freitag.",
      ["Der Platz im Kurs ist bestätigt.", "Der Kurs ist abgesagt.", "Die Gebühr ist schon bezahlt."], 0,
      "Platz bestätigt, Gebühr bis Freitag zahlen."),
    listen(12, "Was ist richtig?", "Hi Julia, hier ist Anna. Ich lerne für die Prüfung. Hast du am Samstag Zeit? Wir können zusammen üben.",
      ["Anna lernt für die Prüfung.", "Anna hat die Prüfung schon bestanden.", "Anna hat keine Zeit."], 0,
      "Anna sucht eine Lernpartnerin für die Prüfung."),
    listen(13, "Was ist richtig?", "Guten Tag, hier ist die Volkshochschule. Ihr Kurs 'Deutsch für Anfänger' hat noch Plätze frei. Möchten Sie sich anmelden?",
      ["Es gibt noch freie Plätze im Kurs.", "Der Kurs ist ausgebucht.", "Der Kurs findet nicht statt."], 0,
      "Freie Plätze im Anfängerkurs."),
    listen(14, "Was ist richtig?", "Hallo Herr Berger, hier ist die Bibliothek. Ihre bestellten Bücher sind da. Sie können sie bis Samstag abholen.",
      ["Die Bücher können bis Samstag abgeholt werden.", "Die Bücher kommen nächste Woche.", "Die Bibliothek ist geschlossen."], 0,
      "Abholung bis Samstag."),
    listen(15, "Was ist richtig?", "Hallo, hier ist Tom. Ich habe die Prüfung leider nicht bestanden. Ich muss im nächsten Monat noch einmal schreiben.",
      ["Tom muss die Prüfung wiederholen.", "Tom hat die Prüfung bestanden.", "Tom hat keine Prüfung gemacht."], 0,
      "Tom wiederholt die Prüfung im nächsten Monat."),

    // ---------- Lesen, Teil 1: Aufgaben 1-5 (Richtig/Falsch) ----------
    readRF(1, "Der Deutschkurs A1 beginnt am 3. Oktober.", true,
      "Die Anzeige sagt: Kursbeginn 3. Oktober."),
    readRF(2, "Der Kurs ist am Wochenende.", false,
      "Die Anzeige sagt: montags und mittwochs."),
    readRF(3, "Der Kurs dauert drei Monate.", true,
      "Die Anzeige sagt: Dauer drei Monate."),
    readRF(4, "Die Kursgebühr ist 250 Euro.", true,
      "Die Anzeige sagt: 250 Euro inklusive Bücher."),
    readRF(5, "Man kann sich online anmelden.", true,
      "Die Anzeige sagt: Anmeldung online oder im Büro."),

    // ---------- Lesen, Teil 2: Aufgaben 6-10 (a/b) ----------
    readAB(6, "Sie möchten einen Deutschkurs besuchen.",
      "Sprachschule am Park: Deutschkurse A1 bis C1, Anfänger willkommen.",
      "Tanzschule Stern: Kurse für Anfänger und Fortgeschrittene.",
      0, "Die Sprachschule bietet Deutschkurse an."),
    readAB(7, "Sie möchten Bücher für den Deutschkurs kaufen.",
      "Buchhandlung am Markt: Lehrbücher und Wörterbücher, auch gebraucht.",
      "Stadtbad Süd: Schwimmkurse für Kinder.",
      0, "Die Buchhandlung verkauft Lehrbücher."),
    readAB(8, "Sie möchten die Prüfung im Juni machen.",
      "Prüfungszentrum: A1-Prüfung am 15. Juni, Anmeldung bis 1. Juni.",
      "Sprachschule am Park: Kurse im Juli, keine Prüfungen.",
      0, "Das Prüfungszentrum bietet die A1-Prüfung im Juni an."),
    readAB(9, "Sie möchten am Abend lernen.",
      "Sprachschule am Park: Abendkurse von 18 bis 20 Uhr.",
      "Buchhandlung am Markt: geöffnet bis 18 Uhr.",
      0, "Die Sprachschule hat Abendkurse."),
    readAB(10, "Sie möchten im Internet lernen.",
      "Online-Sprachschule: Deutschkurse per Video, jederzeit.",
      "Stadtbibliothek: Bücher und Zeitschriften vor Ort.",
      0, "Die Online-Sprachschule bietet Kurse im Internet."),

    // ---------- Lesen, Teil 3: Aufgaben 11-15 (Richtig/Falsch) ----------
    readRF(11, "Der Kursraum ist im zweiten Stock.", true,
      "Das Schild sagt: Kursraum 2. Etage."),
    readRF(12, "Im Kursraum darf man nicht essen.", true,
      "Das Schild sagt: Essen und Trinken im Kursraum verboten."),
    readRF(13, "Die Bibliothek ist am Sonntag geöffnet.", false,
      "Das Schild sagt: Bibliothek Mo-Fr 9-18 Uhr."),
    readRF(14, "Die Anmeldung ist kostenlos.", true,
      "Das Schild sagt: Anmeldung kostenlos."),
    readRF(15, "Man braucht einen Ausweis für die Anmeldung.", true,
      "Das Schild sagt: Ausweis zur Anmeldung mitbringen."),

    // ---------- Schreiben, Teil 1: Formular (5 Lücken) ----------
    schreibForm(
      1,
      "Anmeldung zum Deutschkurs. Familienname: ___. Vorname: ___. Kursniveau: ___. Kursbeginn: ___. Telefonnummer: ___.",
      [
        { answers: ["Weber"], hint: "Familienname" },
        { answers: ["Anna"], hint: "Vorname" },
        { answers: ["A1"], hint: "Kursniveau" },
        { answers: ["3. Oktober", "03.10."], hint: "Kursbeginn" },
        { answers: ["0176 552091"], hint: "Telefonnummer" },
      ],
    ),

    // ---------- Schreiben, Teil 2: kurze Mitteilung (~30 Wörter) ----------
    schreibSatz(
      2,
      "Schreiben Sie an die Sprachschule: Sie möchten sich für den Kurs anmelden und fragen nach der Gebühr.",
      ["Sehr", "geehrte", "Damen", "und", "Herren,", "ich", "möchte", "mich", "für", "den", "Deutschkurs", "anmelden.", "Wie", "hoch", "ist", "die", "Gebühr?", "Mit", "freundlichen", "Grüßen,", "Anna", "Weber"],
      "Formelle Anmeldung mit Frage.",
    ),

    // ---------- Sprechen, Teil 1: sich vorstellen ----------
    sprechenSatz(
      1,
      1,
      "Stellen Sie sich vor: Name, Sprachen, Kurs.",
      ["Mein", "Name", "ist", "Anna", "Weber.", "Ich", "spreche", "Polnisch", "und", "ein", "bisschen", "Deutsch.", "Dann", "besuche", "ich", "einen", "A1-Kurs."],
      "Vorstellung mit Sprachen und Kurs.",
    ),
    sprechenSatz(
      2,
      1,
      "Sagen Sie, warum Sie Deutsch lernen.",
      ["Ich", "lerne", "Deutsch,", "weil", "ich", "in", "Deutschland", "arbeiten", "möchte."],
      "Begründung mit weil.",
    ),

    // ---------- Sprechen, Teil 2: Fragen stellen und antworten ----------
    sprechenMatch(
      3,
      2,
      "Verbinden Sie die Frage mit der passenden Antwort.",
      [
        ["Wann beginnt der Kurs?", "Der Kurs beginnt am Montag."],
        ["Wie viel kostet der Kurs?", "Er kostet 250 Euro."],
        ["Wo ist der Kursraum?", "Im ersten Stock, Zimmer 105."],
        ["Wie lange dauert der Kurs?", "Drei Monate, zweimal pro Woche."],
      ],
    ),

    // ---------- Sprechen, Teil 3: Bitten formulieren und reagieren ----------
    sprechenChoose(
      4,
      3,
      "Sie möchten sich für einen Kurs anmelden. Was sagen Sie?",
      "Guten Tag, ...",
      ["ich möchte mich für den Deutschkurs anmelden.", "ich möchte ein Wörterbuch kaufen.", "ich habe keine Zeit, aber das ist egal."],
      0,
      "Anmeldung: Ich möchte mich für den Kurs anmelden.",
    ),
    sprechenChoose(
      5,
      3,
      "Sie verstehen eine Aufgabe nicht. Was sagen Sie?",
      "Entschuldigung, ...",
      ["können Sie das bitte wiederholen?", "ich verstehe alles.", "ich habe keine Frage."],
      0,
      "Um Wiederholung bitten: Können Sie das bitte wiederholen?",
    ),
    sprechenChoose(
      6,
      3,
      "Reagieren Sie auf: 'Herzlichen Glückwunsch zur bestandenen Prüfung!'",
      "",
      ["Vielen Dank!", "Tut mir leid.", "Guten Morgen."],
      0,
      "Auf Glückwünsche antwortet man mit Vielen Dank.",
    ),
  ],
};