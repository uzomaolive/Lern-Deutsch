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
 * Goethe-Zertifikat A1 / Start Deutsch 1 — Prüfung 5: Familie und Freizeit.
 * Complete paper: Hören (15), Lesen (15), Schreiben (2), Sprechen (3).
 */

export const goetheExam05: Lesson = {
  id: "goethe-a1-pruefung-05-familie",
  title: "Goethe A1 Prüfung 5: Familie und Freizeit",
  summary:
    "A complete Goethe-Zertifikat A1 paper in authentic format: Hören, Lesen, Schreiben und Sprechen rund um Familie, Freizeit, Hobbys und Einladungen.",
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
            ["Hören", "20 Min.", "Gespräche über Familie und Pläne"],
            ["Lesen", "25 Min.", "Einladungen, Anzeigen, Schilder"],
            ["Schreiben", "20 Min.", "Formular ausfüllen, kurze Mitteilung"],
            ["Sprechen", "15 Min.", "sich vorstellen, fragen, einladen"],
          ],
        },
        {
          type: "tip",
          text: "Einladungen sind ein Klassiker in A1-Prüfungen. Merken Sie sich: Ich lade dich ein, die Party beginnt um, ich freue mich auf dich. Und die Antwort: Danke für die Einladung, ich komme gern.",
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
          text: "Sie lesen kurze Einladungen, Anzeigen und Hinweisschilder. Zu jedem Text gibt es Aufgaben. Kreuzen Sie die richtige Lösung an.",
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
    { id: "die-familie", de: "die Familie", en: "the family", part: "noun f.", plural: "die Familien", audio: true },
    { id: "die-freizeit", de: "die Freizeit", en: "the free time", part: "noun f.", audio: true },
    { id: "das-hobby", de: "das Hobby", en: "the hobby", part: "noun n.", plural: "die Hobbys", audio: true },
    { id: "die-einladung", de: "die Einladung", en: "the invitation", part: "noun f.", plural: "die Einladungen", audio: true },
    { id: "die-party", de: "die Party", en: "the party", part: "noun f.", plural: "die Partys", audio: true },
    { id: "das-fest", de: "das Fest", en: "the celebration", part: "noun n.", plural: "die Feste", audio: true },
    { id: "der-geburtstag", de: "der Geburtstag", en: "the birthday", part: "noun m.", plural: "die Geburtstage", audio: true },
    { id: "der-verein", de: "der Verein", en: "the club", part: "noun m.", plural: "die Vereine", audio: true },
    { id: "einladen", de: "einladen", en: "to invite", part: "verb", audio: true },
    { id: "feiern", de: "feiern", en: "to celebrate", part: "verb", audio: true },
    { id: "sich-treffen", de: "sich treffen", en: "to meet", part: "verb", audio: true },
    { id: "das-geschenk", de: "das Geschenk", en: "the gift", part: "noun n.", plural: "die Geschenke", audio: true },
  ],
  exercises: [
    // ---------- Hören, Teil 1: Aufgaben 1-6 (a/b/c, zweimal) ----------
    listen(1, "Was ist richtig?", "Kommst du am Samstag zu meiner Party? Ja, gern! Wann beginnt sie? Sie beginnt um 19 Uhr. Soll ich etwas mitbringen? Ein paar Getränke, wenn du magst.",
      ["Die Party beginnt um 19 Uhr.", "Die Party beginnt um 17 Uhr.", "Die Party ist am Sonntag."], 0,
      "Die Party beginnt am Samstag um 19 Uhr."),
    listen(2, "Was ist richtig?", "Was machst du in deiner Freizeit? Ich spiele Fußball im Verein und gehe zweimal die Woche schwimmen.",
      ["Er spielt Fußball und geht schwimmen.", "Er spielt Klavier.", "Er arbeitet am Wochenende."], 0,
      "In der Freizeit: Fußball und Schwimmen."),
    listen(3, "Was ist richtig?", "Hast du Geschwister? Ja, einen Bruder und eine Schwester. Mein Bruder ist 15, meine Schwester ist 12.",
      ["Sie hat einen Bruder und eine Schwester.", "Sie ist Einzelkind.", "Ihr Bruder ist 20."], 0,
      "Sie hat einen Bruder und eine Schwester."),
    listen(4, "Was ist richtig?", "Wir feiern den Geburtstag meiner Mutter am Sonntag im Garten. Um 15 Uhr gibt es Kaffee und Kuchen.",
      ["Der Geburtstag wird am Sonntag gefeiert.", "Der Geburtstag ist am Montag.", "Es gibt ein Konzert."], 0,
      "Kaffeetrinken am Sonntag um 15 Uhr im Garten."),
    listen(5, "Was ist richtig?", "Hast du am Freitag Zeit? Wir wollen ins Kino gehen, der Film beginnt um 20 Uhr. Ja, ich habe Zeit. Treffen wir uns um halb acht am Kino?",
      ["Sie treffen sich um 19:30 Uhr am Kino.", "Der Film beginnt um 18 Uhr.", "Das Kino ist geschlossen."], 0,
      "Treffen um halb acht, Film um 20 Uhr."),
    listen(6, "Was ist richtig?", "Ich lade dich zu meinem Geburtstag ein. Wo feierst du? Ich feiere im Restaurant. Du kannst jemanden mitbringen, wenn du möchtest.",
      ["Die Feier ist im Restaurant.", "Die Feier ist zu Hause.", "Es ist eine Überraschungsparty."], 0,
      "Der Geburtstag wird im Restaurant gefeiert."),

    // ---------- Hören, Teil 2: Aufgaben 7-10 (Richtig/Falsch, einmal) ----------
    listenRF(7, "Achtung, Durchsage: Das Schwimmbad ist heute wegen Reparatur geschlossen. Ab morgen sind wir wieder für Sie da.",
      true, "Das Schwimmbad ist heute geschlossen."),
    listenRF(8, "Information für alle Gäste: Das Fest im Park beginnt um 14 Uhr. Bei Regen findet die Feier in der Halle statt.",
      true, "Bei Regen ist das Fest in der Halle."),
    listenRF(9, "Willkommen im Sportverein! Das Training für Kinder ist dienstags und donnerstags um 16 Uhr. Die Erwachsenen trainieren um 19 Uhr.",
      true, "Kinder trainieren dienstags und donnerstags."),
    listenRF(10, "Hallo, hier ist die Bibliothek. Die Lesung mit dem Autor findet am Freitag um 18 Uhr statt. Der Eintritt ist frei.",
      false, "Die Lesung ist am Donnerstag, nicht am Freitag."),

    // ---------- Hören, Teil 3: Aufgaben 11-15 (a/b/c, zweimal) ----------
    listen(11, "Was ist richtig?", "Hallo Papa, hier ist Lisa. Ich bin noch bei Julia. Wir machen Hausaufgaben und danach gehen wir ins Kino. Ich bin um 22 Uhr zu Hause.",
      ["Lisa kommt um 22 Uhr nach Hause.", "Lisa kommt um 18 Uhr.", "Lisa bleibt bei Julia."], 0,
      "Lisa ist um 22 Uhr wieder zu Hause."),
    listen(12, "Was ist richtig?", "Guten Tag, hier ist die Turnhalle. Das Kinderturnen am Samstag fällt leider aus. Der Trainer ist krank.",
      ["Das Kinderturnen ist am Samstag abgesagt.", "Das Training beginnt später.", "Es gibt ein neues Training."], 0,
      "Das Kinderturnen fällt wegen Krankheit aus."),
    listen(13, "Was ist richtig?", "Hi Max, hier ist Tom. Die Karten für das Konzert sind da! Wir können sie am Samstag abholen. Sag Bescheid, ob du mitkommst.",
      ["Tom hat Konzertkarten besorgt.", "Tom hat keine Karten bekommen.", "Das Konzert ist abgesagt."], 0,
      "Tom hat Karten für das Konzert."),
    listen(14, "Was ist richtig?", "Hallo, hier ist die Familienkarte vom Museum. Ihr Besuch am Sonntag ist bestätigt. Das Museum öffnet um 10 Uhr.",
      ["Das Museum öffnet sonntags um 10 Uhr.", "Das Museum ist geschlossen.", "Der Besuch ist am Montag."], 0,
      "Bestätigt ist der Besuch am Sonntag, Öffnung um 10 Uhr."),
    listen(15, "Was ist richtig?", "Guten Tag, hier ist der Restaurantbetrieb. Ihre Tischreservierung für 8 Personen ist am Samstag um 19 Uhr. Bitte kommen Sie pünktlich.",
      ["Der Tisch ist für 8 Personen reserviert.", "Der Tisch ist für 2 Personen.", "Die Reservierung ist für Freitag."], 0,
      "Reserviert: 8 Personen am Samstag um 19 Uhr."),

    // ---------- Lesen, Teil 1: Aufgaben 1-5 (Richtig/Falsch) ----------
    readRF(1, "Die Einladung ist zum Geburtstag von Frau Weber.", true,
      "Die Einladung sagt: Ich feiere meinen Geburtstag."),
    readRF(2, "Die Party beginnt um 20 Uhr.", false,
      "Die Einladung sagt: ab 19 Uhr."),
    readRF(3, "Die Feier findet im Garten statt.", true,
      "Die Einladung sagt: bei gutem Wetter im Garten."),
    readRF(4, "Die Gäste sollen etwas zu essen mitbringen.", false,
      "Die Einladung sagt: Getränke sind da, Essen ist nicht nötig."),
    readRF(5, "Man kann per Telefon absagen.", true,
      "Die Einladung sagt: Bitte sagt bis Freitag Bescheid."),

    // ---------- Lesen, Teil 2: Aufgaben 6-10 (a/b) ----------
    readAB(6, "Sie möchten am Samstag Tennis spielen.",
      "Tennisclub Grün: Plätze täglich, Anmeldung an der Kasse.",
      "Buchhandlung am Markt: Lesungen und Bücher.",
      0, "Der Tennisclub vermietet Tennisplätze."),
    readAB(7, "Sie möchten einen Tanzkurs besuchen.",
      "Tanzschule Stern: Kurse für Anfänger, Anmeldung jederzeit.",
      "Fahrradladen Ritz: Reparaturen und Zubehör.",
      0, "Die Tanzschule bietet Kurse für Anfänger an."),
    readAB(8, "Sie möchten am Sonntag mit der Familie ins Museum.",
      "Stadtmuseum: sonntags geöffnet, Familienticket 12 Euro.",
      "Stadtbad Süd: sonntags geschlossen.",
      0, "Das Stadtmuseum ist sonntags geöffnet."),
    readAB(9, "Sie möchten ein Geschenk für eine Feier kaufen.",
      "Blumenhaus Rose: Blumensträuße und Geschenke, auch am Samstag.",
      "Postfiliale 110: Pakete und Briefe.",
      0, "Das Blumenhaus verkauft Geschenke."),
    readAB(10, "Sie möchten einen Film sehen.",
      "Kino Corso: drei Filme täglich, Karten an der Kasse.",
      "Stadtbibliothek: Bücher ausleihen, Mo-Fr 10-18 Uhr.",
      0, "Das Kino zeigt Filme."),

    // ---------- Lesen, Teil 3: Aufgaben 11-15 (Richtig/Falsch) ----------
    readRF(11, "Der Park ist bei Regen geschlossen.", false,
      "Das Schild sagt: Bei Regen findet das Fest in der Halle statt."),
    readRF(12, "Das Schwimmbad ist für Erwachsene und Kinder geöffnet.", true,
      "Das Schild sagt: Familienbad, alle Altersgruppen."),
    readRF(13, "Der Eintritt zum Fest ist frei.", true,
      "Das Schild sagt: Eintritt frei."),
    readRF(14, "Das Kino zeigt am Montag keinen Film.", false,
      "Das Schild sagt: täglich ab 15 Uhr Filme."),
    readRF(15, "Der Spielplatz ist bis 20 Uhr geöffnet.", true,
      "Das Schild sagt: Spielplatz geöffnet bis 20 Uhr."),

    // ---------- Schreiben, Teil 1: Formular (5 Lücken) ----------
    schreibForm(
      1,
      "Anmeldung für den Schwimmkurs. Name: ___. Alter: ___. Schwimmkurs für: ___. Tag: ___. Uhrzeit: ___.",
      [
        { answers: ["Anna Weber"], hint: "Name" },
        { answers: ["25"], hint: "Alter" },
        { answers: ["Erwachsene", "Anfänger"], hint: "Schwimmkurs für" },
        { answers: ["Dienstag"], hint: "Tag" },
        { answers: ["18 Uhr"], hint: "Uhrzeit" },
      ],
    ),

    // ---------- Schreiben, Teil 2: kurze Mitteilung (~30 Wörter) ----------
    schreibSatz(
      2,
      "Schreiben Sie an Ihre Freundin: Sie kommen gern zur Party und bringen einen Salat mit.",
      ["Liebe", "Julia,", "ich", "komme", "gern", "zu", "deiner", "Party", "und", "bringe", "einen", "Salat", "mit.", "Viele", "Grüße,", "Anna"],
      "Antwort auf eine Einladung mit Zusage.",
    ),

    // ---------- Sprechen, Teil 1: sich vorstellen ----------
    sprechenSatz(
      1,
      1,
      "Stellen Sie sich vor: Name, Familie, Hobby.",
      ["Ich", "heiße", "Anna.", "Meine", "Familie:", "ein", "Bruder", "und", "eine", "Schwester.", "Mein", "Hobby", "ist", "Schwimmen."],
      "Vorstellung mit Familie und Hobby.",
    ),
    sprechenSatz(
      2,
      1,
      "Sagen Sie, was Sie am Wochenende gern machen.",
      ["Am", "Wochenende", "treffe", "ich", "gern", "meine", "Freunde", "und", "gehe", "ins", "Kino."],
      "Wochenendpläne mit Verb in Position zwei.",
    ),

    // ---------- Sprechen, Teil 2: Fragen stellen und antworten ----------
    sprechenMatch(
      3,
      2,
      "Verbinden Sie die Frage mit der passenden Antwort.",
      [
        ["Hast du Geschwister?", "Ja, einen Bruder und eine Schwester."],
        ["Was machst du in der Freizeit?", "Ich spiele Fußball im Verein."],
        ["Wann beginnt die Party?", "Sie beginnt um 19 Uhr."],
        ["Kann ich etwas mitbringen?", "Ja, ein paar Getränke, wenn du magst."],
      ],
    ),

    // ---------- Sprechen, Teil 3: Bitten formulieren und reagieren ----------
    sprechenChoose(
      4,
      3,
      "Sie möchten einen Freund einladen. Was sagen Sie?",
      "Hallo, ...",
      ["kommst du am Samstag zu meiner Party?", "wie spät ist es bitte?", "wo ist der Bahnhof?"],
      0,
      "Eine Einladung: Kommst du zu meiner Party?",
    ),
    sprechenChoose(
      5,
      3,
      "Sie möchten nach dem Weg fragen. Was sagen Sie?",
      "Entschuldigung, ...",
      ["wie komme ich zum Park?", "ich habe keinen Hunger.", "das Wetter ist schön."],
      0,
      "Nach dem Weg fragen: Wie komme ich zu ...?",
    ),
    sprechenChoose(
      6,
      3,
      "Reagieren Sie auf: 'Möchtest du einen Kaffee?'",
      "",
      ["Ja, gern. Danke!", "Ich heiße Anna.", "Es regnet."],
      0,
      "Ein Angebot annehmen: Ja, gern. Danke!",
    ),
  ],
};