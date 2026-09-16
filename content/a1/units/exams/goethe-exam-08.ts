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
 * Goethe-Zertifikat A1 / Start Deutsch 1 — Prüfung 8: Stadt und Orientierung.
 * Complete paper: Hören (15), Lesen (15), Schreiben (2), Sprechen (3).
 */

export const goetheExam08: Lesson = {
  id: "goethe-a1-pruefung-08-stadt",
  title: "Goethe A1 Prüfung 8: Stadt und Orientierung",
  summary:
    "A complete Goethe-Zertifikat A1 paper in authentic format: Hören, Lesen, Schreiben und Sprechen rund um Wege, Orte, Stadtpläne und öffentliche Verkehrsmittel.",
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
            ["Hören", "20 Min.", "Wege, Ansagen, Gespräche in der Stadt"],
            ["Lesen", "25 Min.", "Stadtpläne, Anzeigen, Schilder"],
            ["Schreiben", "20 Min.", "Formular ausfüllen, kurze Mitteilung"],
            ["Sprechen", "15 Min.", "sich vorstellen, nach dem Weg fragen"],
          ],
        },
        {
          type: "tip",
          text: "Wege beschreiben folgt festen Mustern: geradeaus, dann links, an der Ampel rechts, die zweite Straße links. Lernen Sie diese Wendungen als Blöcke, dann können Sie jeden Weg erklären.",
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
          text: "Sie lesen kurze Stadtpläne, Anzeigen und Hinweisschilder. Zu jedem Text gibt es Aufgaben. Kreuzen Sie die richtige Lösung an.",
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
    { id: "die-stadt", de: "die Stadt", en: "the city", part: "noun f.", plural: "die Städte", audio: true },
    { id: "der-stadtplan", de: "der Stadtplan", en: "the city map", part: "noun m.", plural: "die Stadtpläne", audio: true },
    { id: "die-strasse", de: "die Straße", en: "the street", part: "noun f.", plural: "die Straßen", audio: true },
    { id: "die-ampel", de: "die Ampel", en: "the traffic light", part: "noun f.", plural: "die Ampeln", audio: true },
    { id: "die-kreuzung", de: "die Kreuzung", en: "the intersection", part: "noun f.", plural: "die Kreuzungen", audio: true },
    { id: "geradeaus", de: "geradeaus", en: "straight ahead", part: "adverb", audio: true },
    { id: "links", de: "links", en: "left", part: "adverb", audio: true },
    { id: "rechts", de: "rechts", en: "right", part: "adverb", audio: true },
    { id: "die-haltestelle", de: "die Haltestelle", en: "the bus stop", part: "noun f.", plural: "die Haltestellen", audio: true },
    { id: "die-u-bahn", de: "die U-Bahn", en: "the subway", part: "noun f.", plural: "die U-Bahnen", audio: true },
    { id: "der-platz", de: "der Platz", en: "the square", part: "noun m.", plural: "die Plätze", audio: true },
    { id: "die-bruecke", de: "die Brücke", en: "the bridge", part: "noun f.", plural: "die Brücken", audio: true },
  ],
  exercises: [
    // ---------- Hören, Teil 1: Aufgaben 1-6 (a/b/c, zweimal) ----------
    listen(1, "Was ist richtig?", "Entschuldigung, wo ist die Post? Gehen Sie hier geradeaus, dann die zweite Straße links. Die Post ist auf der rechten Seite.",
      ["Die Post ist geradeaus, dann links.", "Die Post ist geradeaus, dann rechts.", "Die Post ist hinter dem Bahnhof."], 0,
      "Geradeaus, zweite Straße links, dann rechts."),
    listen(2, "Was ist richtig?", "Wie komme ich zum Museum? Nehmen Sie die U-Bahn Linie 3 bis zur Haltestelle Marktplatz. Von dort sind es fünf Minuten zu Fuß.",
      ["Man fährt mit der U-Bahn Linie 3.", "Man fährt mit dem Bus Linie 5.", "Das Museum ist am Bahnhof."], 0,
      "U-Bahn Linie 3 bis Marktplatz."),
    listen(3, "Was ist richtig?", "Wo ist der nächste Supermarkt? Der Supermarkt ist gleich um die Ecke, neben der Apotheke.",
      ["Der Supermarkt ist neben der Apotheke.", "Der Supermarkt ist am Bahnhof.", "Der Supermarkt ist geschlossen."], 0,
      "Der Supermarkt liegt neben der Apotheke."),
    listen(4, "Was ist richtig?", "Wann fährt der nächste Bus ins Zentrum? In zehn Minuten, an der Haltestelle gegenüber.",
      ["Der Bus fährt in zehn Minuten.", "Der Bus fährt in einer Stunde.", "Der Bus fährt nicht mehr."], 0,
      "Der nächste Bus kommt in zehn Minuten."),
    listen(5, "Was ist richtig?", "Ist der Bahnhof weit von hier? Nein, ungefähr zehn Minuten zu Fuß. Gehen Sie über die Brücke und dann geradeaus.",
      ["Der Bahnhof ist zehn Minuten zu Fuß.", "Der Bahnhof ist eine Stunde entfernt.", "Der Bahnhof ist hinter der Brücke links."], 0,
      "Zehn Minuten zu Fuß über die Brücke."),
    listen(6, "Was ist richtig?", "Entschuldigung, gibt es hier eine Bank? Ja, die Bank ist am Marktplatz, gegenüber dem Rathaus.",
      ["Die Bank ist am Marktplatz.", "Die Bank ist im Bahnhof.", "Es gibt keine Bank."], 0,
      "Die Bank liegt am Marktplatz gegenüber dem Rathaus."),

    // ---------- Hören, Teil 2: Aufgaben 7-10 (Richtig/Falsch, einmal) ----------
    listenRF(7, "Achtung, Durchsage: Die U-Bahnlinie 4 fährt heute wegen Bauarbeiten nur bis zur Haltestelle Westpark. Bitte steigen Sie dort in den Bus um.",
      true, "Die U-Bahnlinie 4 endet heute am Westpark."),
    listenRF(8, "Information für alle Fahrgäste: Der Bus Linie 12 hat heute 10 Minuten Verspätung. Wir bitten um Ihr Verständnis.",
      true, "Der Bus Linie 12 hat heute Verspätung."),
    listenRF(9, "Liebe Besucher, willkommen in unserer Stadt! Der Marktplatz ist über die Hauptstraße zu erreichen. Die Touristinformation finden Sie am Rathaus.",
      true, "Die Touristinformation ist am Rathaus."),
    listenRF(10, "Achtung, Baustelle: Die Brücke am Fluss ist ab Montag für Autos gesperrt. Fußgänger können die Brücke weiter benutzen.",
      false, "Die Brücke ist für Fußgänger gesperrt, nicht für Autos."),

    // ---------- Hören, Teil 3: Aufgaben 11-15 (a/b/c, zweimal) ----------
    listen(11, "Was ist richtig?", "Hallo Tom, hier ist Lisa. Wir treffen uns um 18 Uhr am Eingang vom Kino. Komm bitte pünktlich, der Film beginnt um 18:30 Uhr.",
      ["Lisa wartet am Eingang vom Kino.", "Lisa wartet am Bahnhof.", "Der Film beginnt um 20 Uhr."], 0,
      "Treffpunkt: Eingang Kino um 18 Uhr."),
    listen(12, "Was ist richtig?", "Guten Tag, hier ist das Fundbüro. Ihre Tasche ist gefunden worden. Sie können sie ab morgen am Schalter abholen.",
      ["Die Tasche ist gefunden worden.", "Die Tasche ist verloren.", "Das Fundbüro ist geschlossen."], 0,
      "Die Tasche kann morgen abgeholt werden."),
    listen(13, "Was ist richtig?", "Hi, hier ist Ben. Ich stehe an der Haltestelle, aber der Bus kommt nicht. Ich nehme ein Taxi und bin in 15 Minuten da.",
      ["Ben nimmt ein Taxi.", "Ben wartet weiter auf den Bus.", "Ben kommt zu spät."], 0,
      "Ben nimmt ein Taxi und ist in 15 Minuten da."),
    listen(14, "Was ist richtig?", "Hallo Frau Weber, hier ist die Stadtbibliothek. Ihr Buch ist überfällig. Bitte bringen Sie es bis Freitag zurück.",
      ["Das Buch muss bis Freitag zurückgebracht werden.", "Das Buch ist verloren.", "Die Bibliothek ist geschlossen."], 0,
      "Rückgabe bis Freitag."),
    listen(15, "Was ist richtig?", "Guten Abend, hier ist das Taxiunternehmen. Ihr Taxi wartet vor dem Haupteingang. Der Fahrer heißt Herr Krause.",
      ["Das Taxi wartet vor dem Haupteingang.", "Das Taxi kommt in einer Stunde.", "Das Taxi ist am Bahnhof."], 0,
      "Das Taxi steht am Haupteingang."),

    // ---------- Lesen, Teil 1: Aufgaben 1-5 (Richtig/Falsch) ----------
    readRF(1, "Der Marktplatz ist mit der U-Bahn zu erreichen.", true,
      "Der Stadtplan zeigt: U-Bahn bis Marktplatz."),
    readRF(2, "Das Museum ist montags geschlossen.", true,
      "Der Aushang sagt: Museum montags geschlossen."),
    readRF(3, "Die Touristinformation ist am Bahnhof.", false,
      "Der Aushang sagt: Touristinformation am Rathaus."),
    readRF(4, "Es gibt eine Busverbindung zum Flughafen.", true,
      "Der Aushang sagt: Flughafenbus alle 20 Minuten."),
    readRF(5, "Parkplätze sind im Zentrum kostenlos.", false,
      "Der Aushang sagt: Parken kostenpflichtig."),

    // ---------- Lesen, Teil 2: Aufgaben 6-10 (a/b) ----------
    readAB(6, "Sie möchten einen Stadtplan kaufen.",
      "Touristinformation am Rathaus: Stadtpläne, Tickets, Souvenirs.",
      "Bäckerei Krone: Brot und Kuchen.",
      0, "Die Touristinformation verkauft Stadtpläne."),
    readAB(7, "Sie möchten mit dem Fahrrad durch die Stadt fahren.",
      "Fahrradverleih am Bahnhof: Räder pro Tag oder Woche.",
      "Autovermietung Sonne: Autos für Urlauber.",
      0, "Der Fahrradverleih vermietet Räder."),
    readAB(8, "Sie möchten heute Abend essen gehen.",
      "Restaurant zur Linde: täglich ab 17 Uhr, regionale Küche.",
      "Stadtmuseum: Ausstellungen bis 18 Uhr.",
      0, "Das Restaurant ist abends geöffnet."),
    readAB(9, "Sie möchten ins Schwimmbad gehen.",
      "Stadtbad Süd: täglich 8-20 Uhr, Sauna und Kurse.",
      "Stadtbibliothek: Bücher und Zeitschriften.",
      0, "Das Stadtbad ist ein Schwimmbad."),
    readAB(10, "Sie möchten am Sonntag einkaufen.",
      "Supermarkt Müller: Mo-Sa 8-20 Uhr, sonntags geschlossen.",
      "Bahnhofsmarkt: täglich geöffnet, auch sonntags.",
      1, "Nur der Bahnhofsmarkt öffnet sonntags."),

    // ---------- Lesen, Teil 3: Aufgaben 11-15 (Richtig/Falsch) ----------
    readRF(11, "Die Straße ist für Fahrräder freigegeben.", true,
      "Das Schild sagt: Fahrradstraße."),
    readRF(12, "Das Parken ist hier verboten.", true,
      "Das Schild sagt: Parken verboten."),
    readRF(13, "Die Haltestelle ist barrierefrei.", true,
      "Das Schild sagt: stufenloser Zugang."),
    readRF(14, "Der Weg zum Bahnhof ist ausgeschildert.", true,
      "Das Schild sagt: Bahnhof mit Pfeil."),
    readRF(15, "Die Baustelle ist nachts geöffnet.", false,
      "Das Schild sagt: Baustelle, Durchfahrt gesperrt."),

    // ---------- Schreiben, Teil 1: Formular (5 Lücken) ----------
    schreibForm(
      1,
      "Formular für die Anmeldung beim Bürgeramt. Familienname: ___. Straße: ___. PLZ: ___. Ort: ___. Terminwunsch: ___.",
      [
        { answers: ["Weber"], hint: "Familienname" },
        { answers: ["Hauptstraße 12"], hint: "Straße" },
        { answers: ["10115"], hint: "PLZ" },
        { answers: ["Berlin"], hint: "Ort" },
        { answers: ["Montag", "Dienstag"], hint: "Terminwunsch" },
      ],
    ),

    // ---------- Schreiben, Teil 2: kurze Mitteilung (~30 Wörter) ----------
    schreibSatz(
      2,
      "Schreiben Sie an Ihre Freundin: Sie treffen sich am Samstag um 15 Uhr am Marktplatz.",
      ["Hallo", "Julia,", "wir", "treffen", "uns", "am", "Samstag", "um", "15", "Uhr.", "Treffpunkt:", "Marktplatz.", "Bis", "dann,", "Anna"],
      "Informelle Verabredung mit Treffpunkt.",
    ),

    // ---------- Sprechen, Teil 1: sich vorstellen ----------
    sprechenSatz(
      1,
      1,
      "Stellen Sie sich vor: Name, Wohnort, Lieblingsort in der Stadt.",
      ["Ich", "heiße", "Anna", "und", "wohne", "in", "Berlin.", "Am", "liebsten", "bin", "ich", "im", "Park."],
      "Vorstellung mit Lieblingsort.",
    ),
    sprechenSatz(
      2,
      1,
      "Sagen Sie, wie Sie zur Arbeit fahren.",
      ["Ich", "fahre", "mit", "dem", "Bus", "zur", "Arbeit,", "das", "dauert", "20", "Minuten."],
      "Verkehrsmittel und Dauer.",
    ),

    // ---------- Sprechen, Teil 2: Fragen stellen und antworten ----------
    sprechenMatch(
      3,
      2,
      "Verbinden Sie die Frage mit der passenden Antwort.",
      [
        ["Wo ist die nächste Haltestelle?", "Gleich dort vorne an der Ecke."],
        ["Wie komme ich zum Museum?", "Mit der U-Bahn, Linie 3."],
        ["Ist der Bahnhof weit?", "Nein, zehn Minuten zu Fuß."],
        ["Wann fährt der nächste Bus?", "In zehn Minuten."],
      ],
    ),

    // ---------- Sprechen, Teil 3: Bitten formulieren und reagieren ----------
    sprechenChoose(
      4,
      3,
      "Sie suchen den Bahnhof. Was sagen Sie?",
      "Entschuldigung, ...",
      ["wie komme ich zum Bahnhof?", "wie heißen Sie?", "ich habe Hunger."],
      0,
      "Nach dem Weg fragen: Wie komme ich zum Bahnhof?",
    ),
    sprechenChoose(
      5,
      3,
      "Sie möchten eine Fahrkarte für die U-Bahn. Was sagen Sie?",
      "Guten Tag, ...",
      ["ich brauche eine Fahrkarte für die U-Bahn.", "ich möchte ein Taxi.", "ich habe kein Geld, aber das ist egal."],
      0,
      "Am Automaten oder Schalter: Ich brauche eine Fahrkarte.",
    ),
    sprechenChoose(
      6,
      3,
      "Reagieren Sie auf: 'Ist es weit von hier?'",
      "",
      ["Nein, nur fünf Minuten zu Fuß.", "Ja, ich heiße Anna.", "Bitte schön."],
      0,
      "Eine Frage zum Weg beantworten.",
    ),
  ],
};