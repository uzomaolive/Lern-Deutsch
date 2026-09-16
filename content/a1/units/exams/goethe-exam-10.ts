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
 * Goethe-Zertifikat A1 / Start Deutsch 1 — Prüfung 10: Feste und Feiern.
 * Complete paper: Hören (15), Lesen (15), Schreiben (2), Sprechen (3).
 */

export const goetheExam10: Lesson = {
  id: "goethe-a1-pruefung-10-feste",
  title: "Goethe A1 Prüfung 10: Feste und Feiern",
  summary:
    "A complete Goethe-Zertifikat A1 paper in authentic format: Hören, Lesen, Schreiben und Sprechen rund um Feste, Einladungen, Geschenke und Feiertage.",
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
            ["Hören", "20 Min.", "Einladungen, Feiern, Durchsagen"],
            ["Lesen", "25 Min.", "Einladungen, Anzeigen, Schilder"],
            ["Schreiben", "20 Min.", "Formular ausfüllen, kurze Mitteilung"],
            ["Sprechen", "15 Min.", "sich vorstellen, gratulieren, bitten"],
          ],
        },
        {
          type: "tip",
          text: "Glückwünsche und Einladungen gehören zum Prüfungsalltag: Herzlichen Glückwunsch! Alles Gute! Ich lade dich ein. Ich freue mich auf dich. Üben Sie diese Wendungen laut, sie kommen in jeder Prüfung vor.",
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
    { id: "das-fest", de: "das Fest", en: "the celebration", part: "noun n.", plural: "die Feste", audio: true },
    { id: "die-feier", de: "die Feier", en: "the party", part: "noun f.", plural: "die Feiern", audio: true },
    { id: "der-geburtstag", de: "der Geburtstag", en: "the birthday", part: "noun m.", plural: "die Geburtstage", audio: true },
    { id: "die-einladung", de: "die Einladung", en: "the invitation", part: "noun f.", plural: "die Einladungen", audio: true },
    { id: "das-geschenk", de: "das Geschenk", en: "the gift", part: "noun n.", plural: "die Geschenke", audio: true },
    { id: "die-torte", de: "die Torte", en: "the cake", part: "noun f.", plural: "die Torten", audio: true },
    { id: "die-kerze", de: "die Kerze", en: "the candle", part: "noun f.", plural: "die Kerzen", audio: true },
    { id: "gratulieren", de: "gratulieren", en: "to congratulate", part: "verb", audio: true },
    { id: "schenken", de: "schenken", en: "to give (a gift)", part: "verb", audio: true },
    { id: "das-neujahr", de: "das Neujahr", en: "New Year", part: "noun n.", audio: true },
    { id: "weihnachten", de: "Weihnachten", en: "Christmas", part: "noun n.", audio: true },
    { id: "der-gast", de: "der Gast", en: "the guest", part: "noun m.", plural: "die Gäste", audio: true },
  ],
  exercises: [
    // ---------- Hören, Teil 1: Aufgaben 1-6 (a/b/c, zweimal) ----------
    listen(1, "Was ist richtig?", "Kommst du zu meinem Geburtstag? Ich feiere am Samstag um 18 Uhr. Ja, gern! Was wünschst du dir? Ein Buch, bitte.",
      ["Die Person feiert am Samstag um 18 Uhr.", "Die Feier ist am Sonntag.", "Der Gast bringt nichts mit."], 0,
      "Geburtstagsfeier am Samstag um 18 Uhr, Geschenk: ein Buch."),
    listen(2, "Was ist richtig?", "Guten Tag, ich möchte Blumen für meine Mutter kaufen. Ihre Mutter hat Geburtstag? Ja, morgen. Dann empfehle ich diesen Strauß mit Rosen.",
      ["Die Blumen sind für die Mutter.", "Die Blumen sind für die Freundin.", "Der Kunde kauft einen Kuchen."], 0,
      "Blumenstrauß für den Geburtstag der Mutter."),
    listen(3, "Was ist richtig?", "Herzlichen Glückwunsch zum Geburtstag! Vielen Dank! Und alles Gute für das neue Lebensjahr! Danke, das ist sehr nett.",
      ["Die Person gratuliert zum Geburtstag.", "Die Person entschuldigt sich.", "Die Person verabschiedet sich."], 0,
      "Glückwunsch zum Geburtstag."),
    listen(4, "Was ist richtig?", "Wir feiern Weihnachten mit der Familie. Am 24. Dezember essen wir zusammen und dann gibt es Geschenke.",
      ["Die Familie feiert am 24. Dezember.", "Die Familie feiert im Sommer.", "Es gibt keine Geschenke."], 0,
      "Weihnachtsfeier am 24. Dezember mit Geschenken."),
    listen(5, "Was ist richtig?", "Hast du eine Idee für ein Geschenk? Ich schenke meiner Schwester eine Tasche. Und ich kaufe meinem Bruder ein Buch.",
      ["Die Person schenkt eine Tasche und ein Buch.", "Die Person schenkt nichts.", "Die Person kauft Blumen."], 0,
      "Geschenke: eine Tasche und ein Buch."),
    listen(6, "Was ist richtig?", "Wie feiern Sie Silvester? Wir feiern zu Hause mit Freunden. Um Mitternacht gehen wir auf die Straße und sehen das Feuerwerk.",
      ["Die Person feiert Silvester mit Freunden.", "Die Person schläft um Mitternacht.", "Die Person feiert allein."], 0,
      "Silvester zu Hause mit Freunden und Feuerwerk."),

    // ---------- Hören, Teil 2: Aufgaben 7-10 (Richtig/Falsch, einmal) ----------
    listenRF(7, "Achtung, Durchsage: Das Sommerfest findet am Samstag ab 15 Uhr im Stadtpark statt. Bei Regen feiern wir im Gemeindehaus.",
      true, "Das Sommerfest ist am Samstag ab 15 Uhr."),
    listenRF(8, "Information für alle Gäste: Das Feuerwerk beginnt um 22 Uhr am Fluss. Bitte beachten Sie die Sicherheitshinweise.",
      true, "Das Feuerwerk beginnt um 22 Uhr."),
    listenRF(9, "Willkommen zum Weihnachtsmarkt! Wir haben täglich von 11 bis 20 Uhr geöffnet. Am 24. Dezember schließen wir um 14 Uhr.",
      true, "Der Weihnachtsmarkt ist täglich von 11 bis 20 Uhr geöffnet."),
    listenRF(10, "Hallo, hier ist die Bäckerei. Ihre Geburtstagstorte ist am Samstag fertig. Sie können sie ab 10 Uhr abholen.",
      false, "Die Torte ist ab 10 Uhr fertig, nicht ab 14 Uhr."),

    // ---------- Hören, Teil 3: Aufgaben 11-15 (a/b/c, zweimal) ----------
    listen(11, "Was ist richtig?", "Hallo Anna, hier ist Julia. Die Party bei mir am Freitag fällt leider aus. Mein Sohn ist krank. Wir feiern nächste Woche.",
      ["Die Party ist abgesagt.", "Die Party ist heute.", "Julia ist krank."], 0,
      "Die Party fällt aus, weil Julias Sohn krank ist."),
    listen(12, "Was ist richtig?", "Guten Tag, hier ist das Blumengeschäft. Ihre Bestellung ist fertig. Sie können die Blumen bis 18 Uhr abholen.",
      ["Die Blumen können bis 18 Uhr abgeholt werden.", "Die Blumen sind ausverkauft.", "Das Geschäft ist geschlossen."], 0,
      "Blumen abholbereit bis 18 Uhr."),
    listen(13, "Was ist richtig?", "Hi Tom, hier ist Lisa. Wir planen eine Überraschungsparty für Max. Kannst du am Samstag um 14 Uhr kommen und helfen?",
      ["Lisa plant eine Überraschungsparty.", "Lisa hat Geburtstag.", "Die Party ist für Lisa."], 0,
      "Überraschungsparty für Max am Samstag."),
    listen(14, "Was ist richtig?", "Hallo Frau Berger, hier ist das Restaurant. Ihr Tisch für die Feier ist reserviert. Zehn Personen am Samstag um 19 Uhr.",
      ["Der Tisch ist für zehn Personen reserviert.", "Der Tisch ist für zwei Personen.", "Die Feier ist am Sonntag."], 0,
      "Reservierung: zehn Personen am Samstag um 19 Uhr."),
    listen(15, "Was ist richtig?", "Hallo, hier ist der Fotograf. Die Fotos von Ihrer Hochzeit sind fertig. Sie können sie ab Montag abholen.",
      ["Die Fotos sind fertig.", "Die Fotos sind verloren.", "Die Hochzeit war gestern."], 0,
      "Hochzeitsfotos ab Montag abholbereit."),

    // ---------- Lesen, Teil 1: Aufgaben 1-5 (Richtig/Falsch) ----------
    readRF(1, "Die Einladung ist zum 30. Geburtstag.", true,
      "Die Einladung sagt: Ich werde 30."),
    readRF(2, "Die Feier beginnt am Abend.", true,
      "Die Einladung sagt: ab 19 Uhr."),
    readRF(3, "Die Feier ist im Restaurant.", true,
      "Die Einladung sagt: im Restaurant Sonne."),
    readRF(4, "Die Gäste müssen nichts mitbringen.", false,
      "Die Einladung sagt: Bitte bringt einen Salat mit."),
    readRF(5, "Um Antwort wird bis Freitag gebeten.", true,
      "Die Einladung sagt: Bitte antwortet bis Freitag."),

    // ---------- Lesen, Teil 2: Aufgaben 6-10 (a/b) ----------
    readAB(6, "Sie möchten Blumen für eine Feier kaufen.",
      "Blumenhaus Rose: Sträuße und Gestecke, Lieferung möglich.",
      "Bäckerei Krone: Torten und Kuchen.",
      0, "Das Blumenhaus verkauft Blumen für Feiern."),
    readAB(7, "Sie möchten eine Torte bestellen.",
      "Bäckerei Krone: Torten nach Bestellung, auch mit Namen.",
      "Fahrradladen Ritz: Räder und Reparaturen.",
      0, "Die Bäckerei macht Torten auf Bestellung."),
    readAB(8, "Sie möchten Karten für ein Konzert kaufen.",
      "Konzertkasse am Markt: Tickets für Konzerte und Theater.",
      "Buchhandlung am Markt: Bücher und Geschenke.",
      0, "Die Konzertkasse verkauft Tickets."),
    readAB(9, "Sie suchen ein Geschenk für ein Kind.",
      "Spielwarengeschäft Sonne: Spielzeug für Kinder jeden Alters.",
      "Textilhaus Mode: Kleidung für Erwachsene.",
      0, "Das Spielwarengeschäft verkauft Kinderspielzeug."),
    readAB(10, "Sie möchten am 24. Dezember einkaufen.",
      "Supermarkt Müller: am 24.12. bis 14 Uhr geöffnet.",
      "Stadtbibliothek: am 24.12. geschlossen.",
      0, "Der Supermarkt ist am 24.12. bis 14 Uhr offen."),

    // ---------- Lesen, Teil 3: Aufgaben 11-15 (Richtig/Falsch) ----------
    readRF(11, "Der Weihnachtsmarkt ist im Dezember geöffnet.", true,
      "Das Schild sagt: Weihnachtsmarkt 1. bis 23. Dezember."),
    readRF(12, "Das Feuerwerk ist am Fluss verboten.", false,
      "Das Schild sagt: Feuerwerk um 22 Uhr am Fluss."),
    readRF(13, "Das Gemeindehaus ist bei Regen geöffnet.", true,
      "Das Schild sagt: Bei Regen im Gemeindehaus."),
    readRF(14, "Das Restaurant hat am Feiertag geschlossen.", true,
      "Das Schild sagt: am 1. Januar geschlossen."),
    readRF(15, "Für die Feier braucht man eine Anmeldung.", true,
      "Das Schild sagt: Anmeldung erforderlich."),

    // ---------- Schreiben, Teil 1: Formular (5 Lücken) ----------
    schreibForm(
      1,
      "Bestellung für eine Feier. Name: ___. Anlass: ___. Anzahl der Gäste: ___. Datum: ___. Torte: ___.",
      [
        { answers: ["Anna Weber"], hint: "Name" },
        { answers: ["Geburtstag"], hint: "Anlass" },
        { answers: ["20"], hint: "Anzahl der Gäste" },
        { answers: ["Samstag", "15. Juni"], hint: "Datum" },
        { answers: ["Schokoladentorte"], hint: "Torte" },
      ],
    ),

    // ---------- Schreiben, Teil 2: kurze Mitteilung (~30 Wörter) ----------
    schreibSatz(
      2,
      "Schreiben Sie an Ihre Freundin: Sie kommen zur Feier und bringen ein Geschenk mit.",
      ["Liebe", "Julia,", "vielen", "Dank", "für", "die", "Einladung!", "Ich", "komme", "gern", "und", "bringe", "ein", "Geschenk", "mit.", "Bis", "Samstag,", "Anna"],
      "Antwort auf eine Einladung mit Zusage und Geschenk.",
    ),

    // ---------- Sprechen, Teil 1: sich vorstellen ----------
    sprechenSatz(
      1,
      1,
      "Stellen Sie sich vor: Name, Familie, Lieblingsfest.",
      ["Ich", "heiße", "Anna", "und", "habe", "eine", "große", "Familie.", "Mein", "Lieblingsfest", "ist", "Weihnachten."],
      "Vorstellung mit Lieblingsfest.",
    ),
    sprechenSatz(
      2,
      1,
      "Sagen Sie, wie Sie Geburtstag feiern.",
      ["Ich", "feiere", "meinen", "Geburtstag", "mit", "Freunden", "im", "Garten."],
      "Geburtstagsfeier beschreiben.",
    ),

    // ---------- Sprechen, Teil 2: Fragen stellen und antworten ----------
    sprechenMatch(
      3,
      2,
      "Verbinden Sie die Frage mit der passenden Antwort.",
      [
        ["Wann feierst du deinen Geburtstag?", "Am Samstag um 18 Uhr."],
        ["Was wünschst du dir?", "Ein Buch oder Blumen."],
        ["Kann ich etwas mitbringen?", "Ja, einen Salat, bitte."],
        ["Wo ist die Feier?", "Bei mir zu Hause im Garten."],
      ],
    ),

    // ---------- Sprechen, Teil 3: Bitten formulieren und reagieren ----------
    sprechenChoose(
      4,
      3,
      "Sie möchten jemanden einladen. Was sagen Sie?",
      "Hallo, ...",
      ["ich feiere am Samstag. Kommst du zu meiner Party?", "ich habe keine Zeit.", "wie spät ist es?"],
      0,
      "Einladung: Ich feiere am Samstag. Kommst du?",
    ),
    sprechenChoose(
      5,
      3,
      "Sie möchten gratulieren. Was sagen Sie?",
      "",
      ["Herzlichen Glückwunsch zum Geburtstag!", "Gute Nacht!", "Tut mir leid."],
      0,
      "Gratulation: Herzlichen Glückwunsch!",
    ),
    sprechenChoose(
      6,
      3,
      "Reagieren Sie auf: 'Vielen Dank für das Geschenk!'",
      "",
      ["Gern geschehen! Ich freue mich, dass es dir gefällt.", "Ich habe kein Geschenk.", "Bitte schön, aber es war teuer."],
      0,
      "Auf Dank für ein Geschenk antwortet man freundlich.",
    ),
  ],
};