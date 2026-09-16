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
 * Goethe-Zertifikat A1 / Start Deutsch 1 — Prüfung 2: Einkaufen und Essen.
 * Complete paper: Hören (15), Lesen (15), Schreiben (2), Sprechen (3).
 */

export const goetheExam02: Lesson = {
  id: "goethe-a1-pruefung-02-einkaufen",
  title: "Goethe A1 Prüfung 2: Einkaufen und Essen",
  summary:
    "A complete Goethe-Zertifikat A1 paper in authentic format: Hören, Lesen, Schreiben und Sprechen rund um Einkauf, Preise, Lebensmittel und Restaurantbesuche.",
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
            ["Hören", "20 Min.", "Gespräche im Geschäft, Durchsagen, Ansagen"],
            ["Lesen", "25 Min.", "Anzeigen, Preisschilder, Speisekarten"],
            ["Schreiben", "20 Min.", "Formular ausfüllen, kurze Mitteilung"],
            ["Sprechen", "15 Min.", "einkaufen, fragen, bestellen"],
          ],
        },
        {
          type: "tip",
          text: "Zahlen, Preise und Mengen kommen in dieser Prüfung überall vor: 19,95 Euro, 500 Gramm, zwei Brötchen. Üben Sie die Zahlen laut, bis sie automatisch sind.",
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
          text: "Sie lesen kurze Anzeigen, Preisschilder und Speisekarten. Zu jedem Text gibt es Aufgaben. Kreuzen Sie die richtige Lösung an.",
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
    { id: "der-einkauf", de: "der Einkauf", en: "the shopping", part: "noun m.", plural: "die Einkäufe", audio: true },
    { id: "der-preis", de: "der Preis", en: "the price", part: "noun m.", plural: "die Preise", audio: true },
    { id: "die-lebensmittel", de: "die Lebensmittel", en: "the groceries", part: "noun pl.", audio: true },
    { id: "die-speisekarte", de: "die Speisekarte", en: "the menu", part: "noun f.", plural: "die Speisekarten", audio: true },
    { id: "der-markt", de: "der Markt", en: "the market", part: "noun m.", plural: "die Märkte", audio: true },
    { id: "das-angebot", de: "das Angebot", en: "the special offer", part: "noun n.", plural: "die Angebote", audio: true },
    { id: "bezahlen", de: "bezahlen", en: "to pay", part: "verb", audio: true },
    { id: "empfehlen", de: "empfehlen", en: "to recommend", part: "verb", audio: true },
    { id: "bestellen", de: "bestellen", en: "to order", part: "verb", audio: true },
    { id: "die-quittung", de: "die Quittung", en: "the receipt", part: "noun f.", plural: "die Quittungen", audio: true },
    { id: "der-kunde", de: "der Kunde", en: "the customer", part: "noun m.", plural: "die Kunden", audio: true },
    { id: "der-marktplatz", de: "der Marktplatz", en: "the market square", part: "noun m.", plural: "die Marktplätze", audio: true },
  ],
  exercises: [
    // ---------- Hören, Teil 1: Aufgaben 1-6 (a/b/c, zweimal) ----------
    listen(1, "Was ist richtig?", "Guten Tag, was kostet die Tasse hier? Diese Tasse kostet 4 Euro 50. Und das Glas? Das Glas kostet 6 Euro.",
      ["Die Tasse kostet 4 Euro 50.", "Die Tasse kostet 6 Euro.", "Das Glas kostet 4 Euro 50."], 0,
      "Die Tasse kostet 4 Euro 50, das Glas 6 Euro."),
    listen(2, "Was ist richtig?", "Hallo, ich hätte gern 500 Gramm Käse. Welchen Käse möchten Sie? Den Gouda, bitte. Sonst noch etwas? Ja, ein Brot, bitte.",
      ["Der Kunde kauft Käse und ein Brot.", "Der Kunde kauft nur Käse.", "Der Kunde kauft einen Kuchen."], 0,
      "Der Kunde bestellt 500 Gramm Käse und ein Brot."),
    listen(3, "Was ist richtig?", "Entschuldigung, wo finde ich die Milch? Die Milch finden Sie im Kühlregal ganz hinten, links neben dem Joghurt.",
      ["Die Milch steht im Kühlregal hinten links.", "Die Milch steht vorne an der Kasse.", "Die Milch ist ausverkauft."], 0,
      "Die Milch steht im Kühlregal hinten links."),
    listen(4, "Was ist richtig?", "Ich nehme die Suppe und danach den Braten. Möchten Sie dazu einen Salat? Ja, einen gemischten Salat, bitte.",
      ["Der Gast bestellt Suppe, Braten und Salat.", "Der Gast bestellt nur Suppe.", "Der Gast bestellt einen Kaffee."], 0,
      "Bestellt sind Suppe, Braten und ein gemischter Salat."),
    listen(5, "Was ist richtig?", "Das macht dann zusammen 12 Euro 80. Zahlen Sie bar oder mit Karte? Mit Karte, bitte. Und kann ich eine Quittung bekommen? Natürlich, hier bitte.",
      ["Der Kunde zahlt mit Karte.", "Der Kunde zahlt bar.", "Der Kunde bezahlt 20 Euro."], 0,
      "Der Kunde zahlt mit Karte und bekommt eine Quittung."),
    listen(6, "Was ist richtig?", "Heute gibt es frische Erdbeeren im Angebot, 3 Euro 99 das Körbchen. Und die Tomaten vom Markt kosten 2 Euro 50 das Kilo.",
      ["Die Erdbeeren kosten 3 Euro 99.", "Die Tomaten kosten 3 Euro 99.", "Die Erdbeeren sind ausverkauft."], 0,
      "Erdbeeren heute: 3 Euro 99 das Körbchen."),

    // ---------- Hören, Teil 2: Aufgaben 7-10 (Richtig/Falsch, einmal) ----------
    listenRF(7, "Achtung, Durchsage: Der Supermarkt schließt heute wegen einer Inventur bereits um 16 Uhr. Morgen öffnen wir wieder um 8 Uhr.",
      true, "Der Supermarkt schließt heute um 16 Uhr."),
    listenRF(8, "Willkommen auf dem Wochenmarkt! Alle Stände haben bis 13 Uhr geöffnet. Frisches Obst, Gemüse und Blumen finden Sie auf dem Marktplatz.",
      true, "Der Markt ist bis 13 Uhr geöffnet."),
    listenRF(9, "Information für unsere Gäste: Das Restaurant ist heute von 12 bis 14 Uhr geschlossen. Die Küche öffnet wieder um 14 Uhr.",
      false, "Die Küche öffnet wieder um 17 Uhr, nicht um 14 Uhr."),
    listenRF(10, "Guten Tag, hier ist die Bäckerei Krone. Ihre Geburtstagstorte ist heute Nachmittag fertig. Sie können sie ab 15 Uhr abholen.",
      true, "Die Torte kann ab 15 Uhr abgeholt werden."),

    // ---------- Hören, Teil 3: Aufgaben 11-15 (a/b/c, zweimal) ----------
    listen(11, "Was ist richtig?", "Hallo Mama, hier ist Lisa. Ich bin noch im Supermarkt. Wir haben keinen Zucker mehr. Kaufst du bitte eine Packung mit? Und bringst du auch Butter mit?",
      ["Lisa möchte Zucker und Butter.", "Lisa möchte ein Brot.", "Lisa ist schon zu Hause."], 0,
      "Lisa bittet um Zucker und Butter."),
    listen(12, "Was ist richtig?", "Guten Tag, hier ist das Café am Park. Ihr Tisch für zwei Personen ist reserviert. Bitte kommen Sie um 15 Uhr, dann ist Ihr Tisch frei.",
      ["Der Tisch ist um 15 Uhr reserviert.", "Der Tisch ist um 13 Uhr reserviert.", "Die Reservierung ist für vier Personen."], 0,
      "Reserviert ist der Tisch um 15 Uhr für zwei Personen."),
    listen(13, "Was ist richtig?", "Hallo Herr Brandt, hier ist der Getränkemarkt. Ihre bestellten Getränke sind da. Sie können sie heute ab 17 Uhr abholen.",
      ["Herr Brandt kann die Getränke ab 17 Uhr abholen.", "Die Getränke kommen am Montag.", "Herr Brandt hat kein Wasser bestellt."], 0,
      "Abholung heute ab 17 Uhr."),
    listen(14, "Was ist richtig?", "Hi, ich bin's, Clara. Ich komme gleich zum Markt. Treffen wir uns wie immer an der Apotheke um 11 Uhr? Ich bin in zehn Minuten da.",
      ["Clara und ihr Freund treffen sich an der Apotheke.", "Clara ist krank.", "Clara kommt erst um 14 Uhr."], 0,
      "Treffpunkt ist die Apotheke um 11 Uhr."),
    listen(15, "Was ist richtig?", "Guten Abend, hier ist das Hotel Stern. Ihre Bestellung vom Zimmer ist fertig. Sie können jetzt an der Rezeption zwei Teller Suppe und ein Brot abholen.",
      ["Die Suppe kann an der Rezeption abgeholt werden.", "Die Bestellung ist für morgen.", "Das Hotel hat keine Küche."], 0,
      "Die Bestellung ist fertig und wartet an der Rezeption."),

    // ---------- Lesen, Teil 1: Aufgaben 1-5 (Richtig/Falsch) ----------
    readRF(1, "Der Wochenmarkt findet samstags statt.", true,
      "Die Anzeige sagt: Markt am Samstag ab 8 Uhr."),
    readRF(2, "Auf dem Markt gibt es Obst und Gemüse.", true,
      "Die Anzeige nennt Obst, Gemüse und Blumen."),
    readRF(3, "Das Restaurant bietet jeden Tag ein Mittagsmenü an.", false,
      "Das Mittagsmenü gibt es nur von Montag bis Freitag."),
    readRF(4, "Der Lieferservice bringt das Essen nach Hause.", true,
      "Die Anzeige sagt: Lieferung frei Haus ab 15 Euro."),
    readRF(5, "Die Bäckerei hat sonntags geschlossen.", false,
      "Die Bäckerei hat auch sonntags geöffnet, ab 7 Uhr."),

    // ---------- Lesen, Teil 2: Aufgaben 6-10 (a/b) ----------
    readAB(6, "Sie möchten frisches Obst kaufen.",
      "Wochenmarkt am Marktplatz: frisches Obst und Gemüse, Sa 8-13 Uhr.",
      "Kino Corso: aktuelle Filme täglich ab 15 Uhr.",
      0, "Nur der Markt verkauft frisches Obst."),
    readAB(7, "Sie möchten heute Abend essen gehen.",
      "Stadtbibliothek: geöffnet Mo-Fr 10-18 Uhr.",
      "Restaurant zur Linde: täglich geöffnet, heute Abend freie Tische.",
      1, "Das Restaurant ist heute Abend geöffnet."),
    readAB(8, "Sie möchten einen Kuchen für eine Feier bestellen.",
      "Bäckerei Krone: Torten und Kuchen nach Bestellung, Abholung am selben Tag.",
      "Fahrradladen Ritz: Räder, Reparaturen, Zubehör.",
      0, "Die Bäckerei stellt Kuchen nach Bestellung her."),
    readAB(9, "Sie möchten günstige Getränke kaufen.",
      "Getränkemarkt Müller: Getränke im Kasten, Preise im Angebot, Mo-Sa geöffnet.",
      "Blumenhaus Rose: Blumen und Gestecke für jeden Anlass.",
      0, "Der Getränkemarkt verkauft Getränke im Kasten."),
    readAB(10, "Sie möchten nach dem Essen einen Kaffee trinken.",
      "Textilhaus Mode: Kleidung für die ganze Familie.",
      "Café Sonne: Kaffee, Kuchen, Eiscafé, täglich ab 9 Uhr.",
      1, "Das Café bietet Kaffee und Kuchen an."),

    // ---------- Lesen, Teil 3: Aufgaben 11-15 (Richtig/Falsch) ----------
    readRF(11, "Der Kaffee kostet im Angebot 2 Euro 50.", true,
      "Das Preisschild sagt: Kaffee 2,50 Euro."),
    readRF(12, "Die Milch ist im Angebot ausverkauft.", false,
      "Das Schild sagt: Milch im Angebot, solange der Vorrat reicht."),
    readRF(13, "Der Eingang zum Restaurant ist an der Ecke.", true,
      "Das Schild sagt: Eingang an der Ecke."),
    readRF(14, "Im Geschäft darf man mit Karte zahlen.", true,
      "Das Schild sagt: Kartenzahlung ab 5 Euro."),
    readRF(15, "Die Öffnungszeiten sind werktags bis 20 Uhr.", false,
      "Werktags ist das Geschäft bis 18 Uhr geöffnet."),

    // ---------- Schreiben, Teil 1: Formular (5 Lücken) ----------
    schreibForm(
      1,
      "Bestellformular. Artikel: ___. Menge: ___. Name: ___. Adresse: ___. Lieferdatum: ___.",
      [
        { answers: ["Käse"], hint: "Artikel" },
        { answers: ["500 Gramm", "500 g"], hint: "Menge" },
        { answers: ["Anna Weber"], hint: "Name" },
        { answers: ["Hauptstraße 12, 10115 Berlin"], hint: "Adresse" },
        { answers: ["Freitag"], hint: "Lieferdatum" },
      ],
    ),

    // ---------- Schreiben, Teil 2: kurze Mitteilung (~30 Wörter) ----------
    schreibSatz(
      2,
      "Schreiben Sie an Ihren Nachbarn: Sie kaufen am Samstag auf dem Markt ein.",
      ["Lieber", "Herr", "Müller,", "ich", "kaufe", "am", "Samstag", "auf", "dem", "Markt", "ein.", "Viele", "Grüße,", "Anna"],
      "Kurze Mitteilung: Anrede, Nachricht, Gruß.",
    ),

    // ---------- Sprechen, Teil 1: sich vorstellen ----------
    sprechenSatz(
      1,
      1,
      "Stellen Sie sich vor: Name, Herkunft, Beruf.",
      ["Ich", "heiße", "Anna", "und", "komme", "aus", "Polen.", "Als", "Kellnerin", "arbeite", "ich", "in", "einem", "Café."],
      "Vorstellung: Name, Herkunft, Beruf.",
    ),
    sprechenSatz(
      2,
      1,
      "Sagen Sie, wo Sie wohnen und was Sie gern essen.",
      ["Ich", "wohne", "in", "Berlin", "und", "esse", "gern", "Salat", "mit", "Fisch."],
      "Wohnort und Lieblingsessen.",
    ),

    // ---------- Sprechen, Teil 2: Fragen stellen und antworten ----------
    sprechenMatch(
      3,
      2,
      "Verbinden Sie die Frage mit der passenden Antwort.",
      [
        ["Was kostet das Kilo Äpfel?", "Das Kilo kostet 2 Euro 80."],
        ["Wo finde ich den Eingang?", "Der Eingang ist an der Ecke."],
        ["Haben Sie das Brot noch?", "Ja, wir haben noch frisches Brot."],
        ["Kann ich mit Karte zahlen?", "Ja, Kartenzahlung ist möglich."],
      ],
    ),

    // ---------- Sprechen, Teil 3: Bitten formulieren und reagieren ----------
    sprechenChoose(
      4,
      3,
      "Sie möchten im Geschäft etwas umtauschen. Was sagen Sie?",
      "Entschuldigung, ...",
      ["ich möchte dieses Hemd umtauschen.", "wie spät ist es?", "wo wohnen Sie?"],
      0,
      "Beim Umtausch: Ich möchte dieses Hemd umtauschen.",
    ),
    sprechenChoose(
      5,
      3,
      "Sie möchten die Speisekarte. Was sagen Sie?",
      "Herr Ober, ...",
      ["können wir die Speisekarte bekommen?", "ich heiße Anna.", "das ist mein Bruder."],
      0,
      "Eine höfliche Bitte: Können wir ... bekommen?",
    ),
    sprechenChoose(
      6,
      3,
      "Reagieren Sie auf: 'Guten Appetit!'",
      "",
      ["Danke, gleichfalls!", "Bitte sehr!", "Tut mir leid!"],
      0,
      "Auf 'Guten Appetit' antwortet man mit 'Danke, gleichfalls'.",
    ),
  ],
};