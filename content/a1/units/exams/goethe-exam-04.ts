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
 * Goethe-Zertifikat A1 / Start Deutsch 1 — Prüfung 4: Arbeit und Beruf.
 * Complete paper: Hören (15), Lesen (15), Schreiben (2), Sprechen (3).
 */

export const goetheExam04: Lesson = {
  id: "goethe-a1-pruefung-04-arbeit",
  title: "Goethe A1 Prüfung 4: Arbeit und Beruf",
  summary:
    "A complete Goethe-Zertifikat A1 paper in authentic format: Hören, Lesen, Schreiben und Sprechen rund um Berufe, Bewerbungen, Termine im Büro und Arbeitsalltag.",
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
            ["Hören", "20 Min.", "Gespräche im Büro, Durchsagen, Ansagen"],
            ["Lesen", "25 Min.", "Anzeigen, Briefe, Schilder im Betrieb"],
            ["Schreiben", "20 Min.", "Formular ausfüllen, kurze Mitteilung"],
            ["Sprechen", "15 Min.", "sich vorstellen, fragen, bitten"],
          ],
        },
        {
          type: "tip",
          text: "Bewerbungsbriefe in A1-Prüfungen folgen immer demselben Muster: Anrede, warum Sie schreiben, was Sie können, Gruß. Lernen Sie die Wendungen: Ich möchte mich bewerben, ich habe Erfahrung mit, ich bin verfügbar ab.",
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
          text: "Sie lesen kurze Anzeigen, Briefe und Hinweisschilder. Zu jedem Text gibt es Aufgaben. Kreuzen Sie die richtige Lösung an.",
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
    { id: "der-beruf", de: "der Beruf", en: "the profession", part: "noun m.", plural: "die Berufe", audio: true },
    { id: "die-arbeit", de: "die Arbeit", en: "the work", part: "noun f.", plural: "die Arbeiten", audio: true },
    { id: "die-bewerbung", de: "die Bewerbung", en: "the application", part: "noun f.", plural: "die Bewerbungen", audio: true },
    { id: "der-arbeitsplatz", de: "der Arbeitsplatz", en: "the workplace", part: "noun m.", plural: "die Arbeitsplätze", audio: true },
    { id: "der-termin", de: "der Termin", en: "the appointment", part: "noun m.", plural: "die Termine", audio: true },
    { id: "die-pause", de: "die Pause", en: "the break", part: "noun f.", plural: "die Pausen", audio: true },
    { id: "der-chef", de: "der Chef", en: "the boss", part: "noun m.", plural: "die Chefs", audio: true },
    { id: "die-kollegen", de: "die Kollegen", en: "the colleagues", part: "noun pl.", audio: true },
    { id: "der-buero", de: "das Büro", en: "the office", part: "noun n.", plural: "die Büros", audio: true },
    { id: "arbeiten", de: "arbeiten", en: "to work", part: "verb", audio: true },
    { id: "verdienen", de: "verdienen", en: "to earn", part: "verb", audio: true },
    { id: "die-arbeitszeit", de: "die Arbeitszeit", en: "the working hours", part: "noun f.", plural: "die Arbeitszeiten", audio: true },
  ],
  exercises: [
    // ---------- Hören, Teil 1: Aufgaben 1-6 (a/b/c, zweimal) ----------
    listen(1, "Was ist richtig?", "Guten Tag, ich interessiere mich für die Stelle als Verkäuferin. Sind Sie noch offen? Ja, die Stelle ist noch frei. Sie können Ihre Bewerbung bis Freitag schicken.",
      ["Die Stelle als Verkäuferin ist noch frei.", "Die Stelle ist schon besetzt.", "Die Bewerbung ist nicht nötig."], 0,
      "Die Stelle ist noch frei, Bewerbung bis Freitag."),
    listen(2, "Was ist richtig?", "Wie sind die Arbeitszeiten in Ihrem Geschäft? Wir arbeiten von Montag bis Freitag von 9 bis 17 Uhr. Samstags haben wir geschlossen.",
      ["Die Arbeitszeit ist Mo-Fr 9 bis 17 Uhr.", "Samstags wird gearbeitet.", "Die Arbeitszeit ist 8 bis 16 Uhr."], 0,
      "Die Arbeitszeit ist Montag bis Freitag von 9 bis 17 Uhr."),
    listen(3, "Was ist richtig?", "Herr Koch, Sie haben heute um 14 Uhr einen Termin mit der Chefin. Ja, danke. Und haben Sie die Unterlagen für das Meeting vorbereitet?",
      ["Herr Koch hat um 14 Uhr einen Termin.", "Herr Koch hat heute frei.", "Das Meeting ist abgesagt."], 0,
      "Der Termin mit der Chefin ist um 14 Uhr."),
    listen(4, "Was ist richtig?", "Wie viel verdient man in dieser Stelle? Das Gehalt ist 2000 Euro im Monat. Dazu kommt Weihnachtsgeld.",
      ["Das Gehalt ist 2000 Euro im Monat.", "Das Gehalt ist 1200 Euro.", "Es gibt kein Gehalt."], 0,
      "Das Gehalt beträgt 2000 Euro plus Weihnachtsgeld."),
    listen(5, "Was ist richtig?", "Ich habe heute eine Frage zu meinem Vertrag. Können Sie mir helfen? Natürlich, kommen Sie um 15 Uhr in mein Büro, dann sehen wir uns den Vertrag an.",
      ["Der Mitarbeiter hat eine Frage zum Vertrag.", "Der Mitarbeiter möchte Urlaub nehmen.", "Das Büro ist geschlossen."], 0,
      "Der Mitarbeiter fragt wegen seines Vertrags."),
    listen(6, "Was ist richtig?", "Die Mittagspause ist von 12 bis 13 Uhr. Sie können im Pausenraum essen oder draußen in der Sonne.",
      ["Die Pause ist von 12 bis 13 Uhr.", "Die Pause ist von 13 bis 14 Uhr.", "Essen ist am Arbeitsplatz verboten."], 0,
      "Die Mittagspause ist von 12 bis 13 Uhr."),

    // ---------- Hören, Teil 2: Aufgaben 7-10 (Richtig/Falsch, einmal) ----------
    listenRF(7, "Achtung, Durchsage: Das Firmenfest findet am Freitag ab 17 Uhr im großen Saal statt. Alle Mitarbeiter sind herzlich eingeladen.",
      true, "Das Firmenfest ist am Freitag ab 17 Uhr."),
    listenRF(8, "Information für alle Mitarbeiter: Der Aufzug ist wegen Wartung heute bis 14 Uhr gesperrt. Bitte benutzen Sie die Treppe.",
      true, "Der Aufzug ist heute bis 14 Uhr gesperrt."),
    listenRF(9, "Willkommen im Team! Die Personalabteilung ist im zweiten Stock, Zimmer 215. Dort bekommen Sie Ihre Vertragsunterlagen.",
      true, "Die Personalabteilung ist im zweiten Stock."),
    listenRF(10, "Hallo, hier ist das Sekretariat. Die Besprechung am Montag beginnt statt um 9 Uhr jetzt um 10 Uhr. Bitte informieren Sie alle Kollegen.",
      false, "Die Besprechung beginnt um 9 Uhr, nicht um 10 Uhr."),

    // ---------- Hören, Teil 3: Aufgaben 11-15 (a/b/c, zweimal) ----------
    listen(11, "Was ist richtig?", "Guten Tag, hier ist Frau Berger von der Firma Sonne. Wir haben Ihre Bewerbung erhalten und möchten Sie zum Vorstellungsgespräch am Donnerstag um 10 Uhr einladen.",
      ["Frau Berger lädt zum Vorstellungsgespräch ein.", "Frau Berger hat die Bewerbung verloren.", "Das Gespräch ist am Montag."], 0,
      "Einladung zum Vorstellungsgespräch am Donnerstag."),
    listen(12, "Was ist richtig?", "Hallo Herr Koch, hier ist das Reisebüro. Ihre Flugtickets für die Dienstreise sind gebucht. Sie können sie ab heute Nachmittag abholen.",
      ["Die Tickets können ab heute abgeholt werden.", "Die Dienstreise ist abgesagt.", "Die Tickets sind verloren."], 0,
      "Die Tickets sind gebucht und abholbereit."),
    listen(13, "Was ist richtig?", "Hi Anna, hier ist Julia aus dem Büro. Ich kann heute nicht kommen, ich bin krank. Kannst du meine Akten für das Meeting mitbringen?",
      ["Julia ist krank.", "Julia hat Urlaub.", "Julia kündigt."], 0,
      "Julia ist krank und bittet um Hilfe."),
    listen(14, "Was ist richtig?", "Guten Tag, hier ist die Firma Technik. Wir möchten wissen, ob Sie ab nächstem Monat als Teamleiter arbeiten können.",
      ["Die Firma fragt wegen der neuen Aufgabe.", "Die Firma kündigt den Vertrag.", "Die Firma ist geschlossen."], 0,
      "Die Firma bietet die Stelle als Teamleiter an."),
    listen(15, "Was ist richtig?", "Hallo Herr Berger, hier ist die Bank. Ihr Firmenkonto ist eingerichtet. Bitte kommen Sie bis Freitag zur Unterschrift vorbei.",
      ["Die Bank braucht die Unterschrift.", "Die Bank hat das Konto geschlossen.", "Der Termin ist am Montag."], 0,
      "Zur Unterschrift muss Herr Berger bis Freitag zur Bank."),

    // ---------- Lesen, Teil 1: Aufgaben 1-5 (Richtig/Falsch) ----------
    readRF(1, "Die Firma sucht eine Verkäuferin.", true,
      "Die Anzeige sagt: Wir suchen eine Verkäuferin."),
    readRF(2, "Die Stelle ist in Vollzeit.", true,
      "Die Anzeige sagt: Vollzeit ab sofort."),
    readRF(3, "Erfahrung ist nicht nötig.", false,
      "Die Anzeige sagt: Erfahrung im Verkauf erwünscht."),
    readRF(4, "Die Bewerbung soll per E-Mail geschickt werden.", true,
      "Die Anzeige sagt: Bewerbung per E-Mail an bewerbung@sonne.de."),
    readRF(5, "Der Arbeitsplatz ist in München.", false,
      "Die Anzeige sagt: Arbeitsplatz in Berlin."),

    // ---------- Lesen, Teil 2: Aufgaben 6-10 (a/b) ----------
    readAB(6, "Sie suchen eine Stelle als Kellner.",
      "Café am Park sucht Kellner für den Wochenenddienst.",
      "Bäckerei Krone sucht eine Bäckereifachverkäuferin.",
      0, "Nur das Café sucht einen Kellner."),
    readAB(7, "Sie möchten in der Produktion arbeiten.",
      "Firma Sonne sucht Monteure für die Produktion, Schichtdienst.",
      "Buchhandlung am Markt sucht eine Buchhändlerin.",
      0, "Die Produktion sucht Monteure."),
    readAB(8, "Sie möchten ab nächster Woche arbeiten.",
      "Kellner gesucht, ab nächster Woche, zwei Schichten möglich.",
      "Praktikum ab September, Dauer sechs Monate.",
      0, "Die Stelle als Kellner beginnt nächste Woche."),
    readAB(9, "Sie möchten im Büro arbeiten.",
      "Stadtgärtnerei sucht Gärtner für den Außendienst.",
      "Firma Berger sucht Bürokraft für Telefon und Post.",
      1, "Die Bürokraft arbeitet im Büro."),
    readAB(10, "Sie suchen eine Stelle mit festen Arbeitszeiten.",
      "Bäckerei Krone: Arbeitszeit täglich von 4 bis 10 Uhr.",
      "Supermarkt Müller: flexible Arbeitszeiten, auch am Abend.",
      0, "Die Bäckerei bietet feste Arbeitszeiten."),

    // ---------- Lesen, Teil 3: Aufgaben 11-15 (Richtig/Falsch) ----------
    readRF(11, "Der Eingang für Mitarbeiter ist hinten im Hof.", true,
      "Das Schild sagt: Mitarbeitereingang im Hof."),
    readRF(12, "Im Büro darf man mit dem eigenen Auto parken.", false,
      "Das Schild sagt: Parken nur für Kunden."),
    readRF(13, "Der Pausenraum ist im ersten Stock.", true,
      "Das Schild sagt: Pausenraum 1. Etage."),
    readRF(14, "Die Personalabteilung hat montags geschlossen.", false,
      "Das Schild sagt: Personalabteilung Mo-Fr 8-16 Uhr."),
    readRF(15, "Im Treppenhaus ist das Rauchen verboten.", true,
      "Das Schild sagt: Rauchen verboten."),

    // ---------- Schreiben, Teil 1: Formular (5 Lücken) ----------
    schreibForm(
      1,
      "Bewerbungsformular. Position: ___. Familienname: ___. Vorname: ___. Verfügbar ab: ___. Gehaltswunsch: ___.",
      [
        { answers: ["Verkäuferin", "Verkäufer"], hint: "Position" },
        { answers: ["Weber"], hint: "Familienname" },
        { answers: ["Anna"], hint: "Vorname" },
        { answers: ["sofort", "nächste Woche"], hint: "Verfügbar ab" },
        { answers: ["2000 Euro", "2000"], hint: "Gehaltswunsch" },
      ],
    ),

    // ---------- Schreiben, Teil 2: kurze Mitteilung (~30 Wörter) ----------
    schreibSatz(
      2,
      "Schreiben Sie an die Firma: Sie können am Montag zum Vorstellungsgespräch kommen.",
      ["Sehr", "geehrte", "Frau", "Berger,", "ich", "komme", "am", "Montag", "um", "10", "Uhr", "zum", "Vorstellungsgespräch.", "Mit", "freundlichen", "Grüßen,", "Anna", "Weber"],
      "Formelle Antwort auf die Einladung zum Gespräch.",
    ),

    // ---------- Sprechen, Teil 1: sich vorstellen ----------
    sprechenSatz(
      1,
      1,
      "Stellen Sie sich vor: Name, Beruf, Erfahrung.",
      ["Mein", "Name", "ist", "Anna", "Weber.", "Ich", "bin", "Kellnerin", "mit", "drei", "Jahren", "Erfahrung."],
      "Vorstellung mit Beruf und Erfahrung.",
    ),
    sprechenSatz(
      2,
      1,
      "Sagen Sie, warum Sie die Stelle möchten.",
      ["Ich", "möchte", "die", "Stelle", "als", "Verkäuferin,", "weil", "ich", "gern", "mit", "Menschen", "arbeite."],
      "Begründung mit weil: Ich möchte ..., weil ...",
    ),

    // ---------- Sprechen, Teil 2: Fragen stellen und antworten ----------
    sprechenMatch(
      3,
      2,
      "Verbinden Sie die Frage mit der passenden Antwort.",
      [
        ["Was sind die Arbeitszeiten?", "Wir arbeiten von 9 bis 17 Uhr."],
        ["Wie hoch ist das Gehalt?", "Das Gehalt ist 2000 Euro im Monat."],
        ["Wann beginnt die Arbeit?", "Die Arbeit beginnt am Montag."],
        ["Gibt es eine Mittagspause?", "Ja, von 12 bis 13 Uhr."],
      ],
    ),

    // ---------- Sprechen, Teil 3: Bitten formulieren und reagieren ----------
    sprechenChoose(
      4,
      3,
      "Sie möchten den Vertrag lesen. Was sagen Sie?",
      "Entschuldigung, ...",
      ["kann ich den Vertrag lesen?", "wie viel Uhr ist es?", "wo ist die Toilette bitte nicht?"],
      0,
      "Eine Bitte: Kann ich ... lesen?",
    ),
    sprechenChoose(
      5,
      3,
      "Sie möchten die Chefin sprechen. Was sagen Sie?",
      "Guten Tag, ...",
      ["ich möchte bitte mit der Chefin sprechen.", "ich möchte Tee mit Zitrone.", "mein Name ist nicht wichtig."],
      0,
      "Eine höfliche Bitte um ein Gespräch.",
    ),
    sprechenChoose(
      6,
      3,
      "Reagieren Sie auf: 'Können Sie morgen früher kommen?'",
      "",
      ["Ja, ich kann um 7 Uhr kommen.", "Nein, ich habe keine Zeit, und das bleibt so.", "Bitte schön."],
      0,
      "Auf eine Frage antwortet man mit Ja oder Nein und einer Information.",
    ),
  ],
};