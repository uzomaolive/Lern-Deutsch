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
 * Goethe-Zertifikat A1 / Start Deutsch 1 — Prüfung 7: Reisen und Verkehr.
 * Complete paper: Hören (15), Lesen (15), Schreiben (2), Sprechen (3).
 */

export const goetheExam07: Lesson = {
  id: "goethe-a1-pruefung-07-reisen",
  title: "Goethe A1 Prüfung 7: Reisen und Verkehr",
  summary:
    "A complete Goethe-Zertifikat A1 paper in authentic format: Hören, Lesen, Schreiben und Sprechen rund um Bahn, Bus, Flug, Hotel und Urlaub.",
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
            ["Hören", "20 Min.", "Ansagen am Bahnhof, Gespräche im Hotel"],
            ["Lesen", "25 Min.", "Fahrpläne, Anzeigen, Schilder"],
            ["Schreiben", "20 Min.", "Formular ausfüllen, kurze Mitteilung"],
            ["Sprechen", "15 Min.", "sich vorstellen, fragen, bitten"],
          ],
        },
        {
          type: "tip",
          text: "Bahnhofsdeutsch ist Prüfungsdeutsch: die Abfahrt, die Ankunft, das Gleis, die Fahrkarte, umsteigen. Merken Sie sich auch: Wann fährt der Zug ab? Von welchem Gleis? Muss ich umsteigen?",
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
          text: "Sie lesen kurze Fahrpläne, Anzeigen und Hinweisschilder. Zu jedem Text gibt es Aufgaben. Kreuzen Sie die richtige Lösung an.",
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
    { id: "die-reise", de: "die Reise", en: "the trip", part: "noun f.", plural: "die Reisen", audio: true },
    { id: "der-zug", de: "der Zug", en: "the train", part: "noun m.", plural: "die Züge", audio: true },
    { id: "der-bahnhof", de: "der Bahnhof", en: "the train station", part: "noun m.", plural: "die Bahnhöfe", audio: true },
    { id: "die-fahrkarte", de: "die Fahrkarte", en: "the ticket", part: "noun f.", plural: "die Fahrkarten", audio: true },
    { id: "das-gleis", de: "das Gleis", en: "the platform", part: "noun n.", plural: "die Gleise", audio: true },
    { id: "umsteigen", de: "umsteigen", en: "to change trains", part: "verb", audio: true },
    { id: "die-abfahrt", de: "die Abfahrt", en: "the departure", part: "noun f.", plural: "die Abfahrten", audio: true },
    { id: "die-ankunft", de: "die Ankunft", en: "the arrival", part: "noun f.", audio: true },
    { id: "das-hotel", de: "das Hotel", en: "the hotel", part: "noun n.", plural: "die Hotels", audio: true },
    { id: "das-zimmer", de: "das Zimmer", en: "the room", part: "noun n.", plural: "die Zimmer", audio: true },
    { id: "der-flughafen", de: "der Flughafen", en: "the airport", part: "noun m.", plural: "die Flughäfen", audio: true },
    { id: "der-urlaub", de: "der Urlaub", en: "the vacation", part: "noun m.", plural: "die Urlaube", audio: true },
  ],
  exercises: [
    // ---------- Hören, Teil 1: Aufgaben 1-6 (a/b/c, zweimal) ----------
    listen(1, "Was ist richtig?", "Entschuldigung, wann fährt der nächste Zug nach Hamburg? Der nächste Zug fährt um 14:30 Uhr von Gleis 5.",
      ["Der Zug fährt um 14:30 Uhr von Gleis 5.", "Der Zug fährt um 15:30 Uhr.", "Der Zug fällt heute aus."], 0,
      "Abfahrt 14:30 Uhr, Gleis 5."),
    listen(2, "Was ist richtig?", "Eine Fahrkarte nach Köln, bitte. Einfach oder hin und zurück? Hin und zurück, bitte. Das macht 48 Euro.",
      ["Die Fahrkarte nach Köln kostet 48 Euro.", "Die Fahrkarte kostet 84 Euro.", "Der Kunde fährt nach Berlin."], 0,
      "Hin und zurück nach Köln: 48 Euro."),
    listen(3, "Was ist richtig?", "Muss ich umsteigen? Nein, der Zug fährt direkt. Sie sind in zwei Stunden in München.",
      ["Der Zug fährt direkt nach München.", "Der Fahrgast muss zweimal umsteigen.", "Die Fahrt dauert vier Stunden."], 0,
      "Direktverbindung, zwei Stunden Fahrt."),
    listen(4, "Was ist richtig?", "Guten Tag, ich habe ein Zimmer reserviert. Auf welchen Namen? Auf den Namen Weber. Ja, Zimmer 204, zweite Etage. Frühstück gibt es von 7 bis 10 Uhr.",
      ["Das Zimmer ist Nummer 204.", "Das Zimmer ist Nummer 402.", "Es gibt kein Frühstück."], 0,
      "Zimmer 204, Frühstück 7 bis 10 Uhr."),
    listen(5, "Was ist richtig?", "Wann fährt der Bus zum Flughafen? Der Bus fährt alle 20 Minuten. Die Fahrt dauert circa 30 Minuten.",
      ["Der Bus fährt alle 20 Minuten.", "Der Bus fährt einmal am Tag.", "Die Fahrt dauert zwei Stunden."], 0,
      "Der Flughafenbus fährt alle 20 Minuten."),
    listen(6, "Was ist richtig?", "Ich möchte für morgen ein Taxi bestellen. Um wie viel Uhr? Um 6 Uhr morgens. Zum Bahnhof, bitte. Alles klar.",
      ["Das Taxi kommt um 6 Uhr.", "Das Taxi kommt um 16 Uhr.", "Der Kunde fährt zum Flughafen."], 0,
      "Taxi um 6 Uhr zum Bahnhof."),

    // ---------- Hören, Teil 2: Aufgaben 7-10 (Richtig/Falsch, einmal) ----------
    listenRF(7, "Achtung, Durchsage: Der ICE nach Frankfurt hat heute 15 Minuten Verspätung. Wir bitten um Ihr Verständnis.",
      true, "Der Zug nach Frankfurt hat 15 Minuten Verspätung."),
    listenRF(8, "Information für alle Fluggäste: Der Flug LH 402 nach Wien startet planmäßig. Bitte gehen Sie zum Gate B12.",
      true, "Der Flug nach Wien startet planmäßig."),
    listenRF(9, "Liebe Fahrgäste, wir erreichen in wenigen Minuten den Hauptbahnhof. Bitte beachten Sie beim Aussteigen die Lücke zwischen Zug und Bahnsteig.",
      true, "Der Zug erreicht den Hauptbahnhof."),
    listenRF(10, "Guten Tag, hier ist das Hotel Sonne. Ihr Zimmer ist ab 14 Uhr fertig. Der Check-in beginnt aber erst um 15 Uhr.",
      false, "Der Check-in beginnt um 15 Uhr, nicht um 14 Uhr."),

    // ---------- Hören, Teil 3: Aufgaben 11-15 (a/b/c, zweimal) ----------
    listen(11, "Was ist richtig?", "Hallo Lisa, hier ist Tom. Ich bin am Bahnhof angekommen. Mein Zug hat Verspätung, ich bin erst um 20 Uhr da. Holst du mich ab?",
      ["Tom kommt um 20 Uhr an.", "Tom kommt um 18 Uhr an.", "Tom bleibt am Bahnhof."], 0,
      "Toms Ankunft ist um 20 Uhr."),
    listen(12, "Was ist richtig?", "Guten Tag, hier ist das Reisebüro Sonne. Ihre Reise nach Italien ist gebucht. Die Unterlagen kommen per Post in drei Tagen.",
      ["Die Reise ist gebucht.", "Die Reise ist abgesagt.", "Die Unterlagen kommen morgen."], 0,
      "Buchung bestätigt, Unterlagen in drei Tagen."),
    listen(13, "Was ist richtig?", "Hi Anna, hier ist Julia. Wir fliegen morgen nach Spanien. Kannst du uns zum Flughafen bringen? Unser Flug geht um 7 Uhr.",
      ["Julia fliegt morgen nach Spanien.", "Julia fährt mit dem Zug.", "Julia bleibt zu Hause."], 0,
      "Julia fliegt morgen um 7 Uhr nach Spanien."),
    listen(14, "Was ist richtig?", "Guten Tag, hier ist die Bahn. Ihr Zug nach Berlin hat einen anderen Abfahrtsgleis. Der Zug fährt heute von Gleis 12, nicht von Gleis 2.",
      ["Der Zug fährt von Gleis 12.", "Der Zug fährt von Gleis 2.", "Der Zug ist abgesagt."], 0,
      "Gleisänderung: heute Gleis 12."),
    listen(15, "Was ist richtig?", "Hallo Herr Berger, hier ist das Hotel. Ihr Zimmer ist am Wochenende frei. Sie können am Freitag ab 15 Uhr einchecken.",
      ["Der Check-in ist am Freitag ab 15 Uhr.", "Das Zimmer ist nicht frei.", "Der Check-in ist am Samstag."], 0,
      "Check-in Freitag ab 15 Uhr."),

    // ---------- Lesen, Teil 1: Aufgaben 1-5 (Richtig/Falsch) ----------
    readRF(1, "Der Zug nach München fährt um 8:15 Uhr.", true,
      "Der Fahrplan sagt: München ab 8:15 Uhr."),
    readRF(2, "Der Zug fährt von Gleis 3.", false,
      "Der Fahrplan sagt: Gleis 7."),
    readRF(3, "Die Fahrt nach München dauert vier Stunden.", true,
      "Der Fahrplan sagt: Ankunft 12:15 Uhr."),
    readRF(4, "Man muss in Nürnberg umsteigen.", true,
      "Der Fahrplan sagt: umsteigen in Nürnberg."),
    readRF(5, "Der Zug hat einen Speisewagen.", false,
      "Der Fahrplan sagt: kein Speisewagen."),

    // ---------- Lesen, Teil 2: Aufgaben 6-10 (a/b) ----------
    readAB(6, "Sie möchten eine Reise nach Berlin buchen.",
      "Reisebüro Sonne: Städtereisen und Bahntickets, Beratung täglich.",
      "Fahrradladen Ritz: Räder und Reparaturen.",
      0, "Das Reisebüro bucht Reisen und Tickets."),
    readAB(7, "Sie möchten ein Zimmer am Meer.",
      "Hotel am Strand: Zimmer mit Meerblick, Halbpension möglich.",
      "Hotel Stadtblick: Zimmer im Zentrum, nur Frühstück.",
      0, "Das Hotel am Strand hat Meerblick."),
    readAB(8, "Sie möchten mit dem Bus zum Flughafen fahren.",
      "Flughafenbus Linie 5: alle 20 Minuten, direkt zum Terminal.",
      "Stadtbus Linie 2: Innenstadt, alle 10 Minuten.",
      0, "Die Linie 5 fährt direkt zum Flughafen."),
    readAB(9, "Sie möchten am Sonntag eine Fahrkarte kaufen.",
      "Bahnhofsschalter: Mo-Sa 6-20 Uhr, sonntags geschlossen.",
      "Fahrkartenautomat am Gleis: täglich, rund um die Uhr.",
      1, "Der Automat verkauft auch sonntags Fahrkarten."),
    readAB(10, "Sie möchten in den Urlaub fliegen.",
      "Fluggesellschaft Sonne: Flüge nach Spanien und Italien, günstige Preise.",
      "Schwimmbad Süd: Kurse für Anfänger.",
      0, "Die Fluggesellschaft bietet Urlaubsflüge."),

    // ---------- Lesen, Teil 3: Aufgaben 11-15 (Richtig/Falsch) ----------
    readRF(11, "Auf dem Bahnsteig darf man nicht rauchen.", true,
      "Das Schild sagt: Rauchen auf dem Bahnsteig verboten."),
    readRF(12, "Der Aufzug zum Bahnsteig ist außer Betrieb.", true,
      "Das Schild sagt: Aufzug außer Betrieb."),
    readRF(13, "Die Fahrkarten gibt es nur am Schalter.", false,
      "Das Schild sagt: Fahrkarten auch am Automaten."),
    readRF(14, "Das Hotel hat einen Parkplatz.", true,
      "Das Schild sagt: Parkplatz für Hotelgäste."),
    readRF(15, "Der Flughafen ist mit dem Taxi erreichbar.", true,
      "Das Schild sagt: Taxistand vor dem Terminal."),

    // ---------- Schreiben, Teil 1: Formular (5 Lücken) ----------
    schreibForm(
      1,
      "Buchungsformular. Familienname: ___. Reiseziel: ___. Abflugdatum: ___. Anzahl der Personen: ___. Hotel: ___.",
      [
        { answers: ["Weber"], hint: "Familienname" },
        { answers: ["Spanien", "Mallorca"], hint: "Reiseziel" },
        { answers: ["15. August", "15.08."], hint: "Abflugdatum" },
        { answers: ["2"], hint: "Anzahl der Personen" },
        { answers: ["Hotel am Strand"], hint: "Hotel" },
      ],
    ),

    // ---------- Schreiben, Teil 2: kurze Mitteilung (~30 Wörter) ----------
    schreibSatz(
      2,
      "Schreiben Sie an das Hotel: Sie kommen am Freitag an und möchten ein Taxi vom Bahnhof.",
      ["Sehr", "geehrte", "Damen", "und", "Herren,", "ich", "komme", "am", "Freitag", "an.", "Ich", "brauche", "ein", "Taxi", "vom", "Bahnhof.", "Mit", "freundlichen", "Grüßen,", "Anna", "Weber"],
      "Formelle Anfrage an das Hotel.",
    ),

    // ---------- Sprechen, Teil 1: sich vorstellen ----------
    sprechenSatz(
      1,
      1,
      "Stellen Sie sich vor: Name, Wohnort, Reiseziel.",
      ["Mein", "Name", "ist", "Anna", "Weber.", "Ich", "wohne", "in", "Berlin", "und", "reise", "gern", "nach", "Italien."],
      "Vorstellung mit Reisewunsch.",
    ),
    sprechenSatz(
      2,
      1,
      "Sagen Sie, wie Sie am liebsten reisen.",
      ["Ich", "reise", "am", "liebsten", "mit", "dem", "Zug,", "weil", "es", "bequem", "ist."],
      "Reisegewohnheit mit Begründung.",
    ),

    // ---------- Sprechen, Teil 2: Fragen stellen und antworten ----------
    sprechenMatch(
      3,
      2,
      "Verbinden Sie die Frage mit der passenden Antwort.",
      [
        ["Wann fährt der Zug ab?", "Er fährt um 14:30 Uhr ab."],
        ["Von welchem Gleis?", "Von Gleis 5."],
        ["Muss ich umsteigen?", "Nein, der Zug fährt direkt."],
        ["Wie lange dauert die Fahrt?", "Circa zwei Stunden."],
      ],
    ),

    // ---------- Sprechen, Teil 3: Bitten formulieren und reagieren ----------
    sprechenChoose(
      4,
      3,
      "Sie möchten eine Fahrkarte kaufen. Was sagen Sie?",
      "Guten Tag, ...",
      ["ich möchte eine Fahrkarte nach Köln.", "ich möchte ein Zimmer.", "ich heiße Anna."],
      0,
      "Am Schalter: Ich möchte eine Fahrkarte nach ...",
    ),
    sprechenChoose(
      5,
      3,
      "Sie möchten im Hotel einchecken. Was sagen Sie?",
      "Guten Abend, ...",
      ["ich habe ein Zimmer reserviert.", "ich möchte ein Taxi.", "ich brauche einen Kaffee."],
      0,
      "Beim Check-in: Ich habe ein Zimmer reserviert.",
    ),
    sprechenChoose(
      6,
      3,
      "Reagieren Sie auf: 'Möchten Sie am Fenster sitzen?'",
      "",
      ["Ja, gern. Am Fenster ist es schön.", "Nein, ich habe kein Fenster.", "Ich heiße Anna."],
      0,
      "Auf eine Frage mit Präferenz antworten.",
    ),
  ],
};