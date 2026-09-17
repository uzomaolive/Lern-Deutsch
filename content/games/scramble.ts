import type { Game } from "./schema";

export const ninewordsGame: Game = {
  id: "nine-words",
  title: "9 Words",
  emoji: "🧩",
  description: "Nine scrambled German words, 30 seconds each. Tap the letters in the right order before the clock runs out.",
  category: "vocabulary",
  tags: ["A1","A2"],
  levels: [
    {
      id: "nine-words-1",
      title: "Level 1: Short words",
      rounds: [
        {
          kind: "scramble",
          title: "Round 1",
          instruction: "Tap the letter tiles to spell the word. Beat the clock!",
          items: [{"de":"ruhig","en":"quiet, calm","timeLimit":30,"audio":true},{"de":"wir","en":"we","timeLimit":30,"audio":true},{"de":"zwei","en":"two","timeLimit":30,"audio":true},{"de":"selten","en":"rare, seldom","timeLimit":30,"audio":true},{"de":"neu","en":"new","timeLimit":30,"audio":true},{"de":"hoch","en":"high, tall","timeLimit":30,"audio":true},{"de":"falsch","en":"wrong","timeLimit":30,"audio":true},{"de":"jung","en":"young","timeLimit":30,"audio":true},{"de":"das","en":"the (neuter)","timeLimit":30,"audio":true},{"de":"egal","en":"all the same","timeLimit":30,"audio":true},{"de":"krank","en":"sick","timeLimit":30,"audio":true},{"de":"eng","en":"narrow, tight","timeLimit":30,"audio":true},{"de":"rund","en":"round","timeLimit":30,"audio":true},{"de":"alt","en":"old","timeLimit":30,"audio":true},{"de":"besser","en":"better","timeLimit":30,"audio":true},{"de":"lang","en":"long","timeLimit":30,"audio":true},{"de":"mein","en":"my","timeLimit":30,"audio":true},{"de":"jemand","en":"someone","timeLimit":30,"audio":true},{"de":"hübsch","en":"pretty","timeLimit":30,"audio":true},{"de":"normal","en":"normal","timeLimit":30,"audio":true},{"de":"schwer","en":"heavy, difficult","timeLimit":30,"audio":true},{"de":"letzt","en":"last","timeLimit":30,"audio":true},{"de":"vier","en":"four","timeLimit":30,"audio":true},{"de":"gut","en":"good","timeLimit":30,"audio":true},{"de":"dünn","en":"thin","timeLimit":30,"audio":true}],
        },
        {
          kind: "scramble",
          title: "Round 2",
          instruction: "Tap the letter tiles to spell the word. Beat the clock!",
          items: [{"de":"genau","en":"exact, exactly","timeLimit":30,"audio":true},{"de":"warm","en":"warm","timeLimit":30,"audio":true},{"de":"lang","en":"long","timeLimit":30,"audio":true},{"de":"das","en":"the (neuter)","timeLimit":30,"audio":true},{"de":"farbig","en":"colored","timeLimit":30,"audio":true},{"de":"dieser","en":"this","timeLimit":30,"audio":true},{"de":"schwer","en":"heavy, difficult","timeLimit":30,"audio":true},{"de":"direkt","en":"direct, straight","timeLimit":30,"audio":true},{"de":"früh","en":"early","timeLimit":30,"audio":true},{"de":"solch","en":"such","timeLimit":30,"audio":true},{"de":"hübsch","en":"pretty","timeLimit":30,"audio":true},{"de":"neu","en":"new","timeLimit":30,"audio":true},{"de":"selten","en":"rare, seldom","timeLimit":30,"audio":true},{"de":"frisch","en":"fresh","timeLimit":30,"audio":true},{"de":"häufig","en":"frequent","timeLimit":30,"audio":true},{"de":"kalt","en":"cold","timeLimit":30,"audio":true},{"de":"leicht","en":"easy, light","timeLimit":30,"audio":true},{"de":"dunkel","en":"dark","timeLimit":30,"audio":true},{"de":"kurz","en":"short","timeLimit":30,"audio":true},{"de":"sie","en":"she, they","timeLimit":30,"audio":true},{"de":"billig","en":"cheap","timeLimit":30,"audio":true},{"de":"klar","en":"clear","timeLimit":30,"audio":true},{"de":"satt","en":"full (after eating)","timeLimit":30,"audio":true},{"de":"kühl","en":"cool","timeLimit":30,"audio":true},{"de":"die","en":"the (feminine)","timeLimit":30,"audio":true}],
        },
        {
          kind: "scramble",
          title: "Round 3",
          instruction: "Tap the letter tiles to spell the word. Beat the clock!",
          items: [{"de":"spät","en":"late","timeLimit":30,"audio":true},{"de":"leicht","en":"easy, light","timeLimit":30,"audio":true},{"de":"hoch","en":"high, tall","timeLimit":30,"audio":true},{"de":"dünn","en":"thin","timeLimit":30,"audio":true},{"de":"gelb","en":"yellow","timeLimit":30,"audio":true},{"de":"neu","en":"new","timeLimit":30,"audio":true},{"de":"dunkel","en":"dark","timeLimit":30,"audio":true},{"de":"selten","en":"rare, seldom","timeLimit":30,"audio":true},{"de":"direkt","en":"direct, straight","timeLimit":30,"audio":true},{"de":"man","en":"one, people in general","timeLimit":30,"audio":true},{"de":"weit","en":"far, wide","timeLimit":30,"audio":true},{"de":"euer","en":"your (plural informal)","timeLimit":30,"audio":true},{"de":"heiß","en":"hot","timeLimit":30,"audio":true},{"de":"vier","en":"four","timeLimit":30,"audio":true},{"de":"besser","en":"better","timeLimit":30,"audio":true},{"de":"grau","en":"grey","timeLimit":30,"audio":true},{"de":"warm","en":"warm","timeLimit":30,"audio":true},{"de":"sie","en":"she, they","timeLimit":30,"audio":true},{"de":"häufig","en":"frequent","timeLimit":30,"audio":true},{"de":"frisch","en":"fresh","timeLimit":30,"audio":true},{"de":"reich","en":"rich","timeLimit":30,"audio":true},{"de":"hübsch","en":"pretty","timeLimit":30,"audio":true},{"de":"gesund","en":"healthy","timeLimit":30,"audio":true},{"de":"genau","en":"exact, exactly","timeLimit":30,"audio":true},{"de":"falsch","en":"wrong","timeLimit":30,"audio":true}],
        },
        {
          kind: "scramble",
          title: "Round 4",
          instruction: "Tap the letter tiles to spell the word. Beat the clock!",
          items: [{"de":"hoch","en":"high, tall","timeLimit":30,"audio":true},{"de":"grün","en":"green","timeLimit":30,"audio":true},{"de":"grau","en":"grey","timeLimit":30,"audio":true},{"de":"zahm","en":"tame","timeLimit":30,"audio":true},{"de":"weiß","en":"white","timeLimit":30,"audio":true},{"de":"billig","en":"cheap","timeLimit":30,"audio":true},{"de":"heiß","en":"hot","timeLimit":30,"audio":true},{"de":"sie","en":"she, they","timeLimit":30,"audio":true},{"de":"teuer","en":"expensive","timeLimit":30,"audio":true},{"de":"schön","en":"beautiful, nice","timeLimit":30,"audio":true},{"de":"nah","en":"near, close","timeLimit":30,"audio":true},{"de":"sich","en":"oneself, himself, herself","timeLimit":30,"audio":true},{"de":"frisch","en":"fresh","timeLimit":30,"audio":true},{"de":"falsch","en":"wrong","timeLimit":30,"audio":true},{"de":"spät","en":"late","timeLimit":30,"audio":true},{"de":"letzt","en":"last","timeLimit":30,"audio":true},{"de":"stark","en":"strong","timeLimit":30,"audio":true},{"de":"zwei","en":"two","timeLimit":30,"audio":true},{"de":"frei","en":"free","timeLimit":30,"audio":true},{"de":"fünf","en":"five","timeLimit":30,"audio":true},{"de":"eng","en":"narrow, tight","timeLimit":30,"audio":true},{"de":"lang","en":"long","timeLimit":30,"audio":true},{"de":"dick","en":"thick, fat","timeLimit":30,"audio":true},{"de":"klein","en":"small","timeLimit":30,"audio":true},{"de":"müde","en":"tired","timeLimit":30,"audio":true}],
        },

      ],
    },

    {
      id: "nine-words-2",
      title: "Level 2: Medium words",
      rounds: [
        {
          kind: "scramble",
          title: "Round 1",
          instruction: "Tap the letter tiles to spell the word. Beat the clock!",
          items: [{"de":"dunkel","en":"dark","timeLimit":30,"audio":true},{"de":"doppelt","en":"double","timeLimit":30,"audio":true},{"de":"schwarz","en":"black","timeLimit":30,"audio":true},{"de":"frisch","en":"fresh","timeLimit":30,"audio":true},{"de":"falsch","en":"wrong","timeLimit":30,"audio":true},{"de":"günstig","en":"cheap, favorable","timeLimit":30,"audio":true},{"de":"gemeinsam","en":"together, joint","timeLimit":30,"audio":true},{"de":"schwer","en":"heavy, difficult","timeLimit":30,"audio":true},{"de":"häufig","en":"frequent","timeLimit":30,"audio":true},{"de":"nervös","en":"nervous","timeLimit":30,"audio":true},{"de":"japanisch","en":"Japanese","timeLimit":30,"audio":true},{"de":"möglich","en":"possible","timeLimit":30,"audio":true},{"de":"besser","en":"better","timeLimit":30,"audio":true},{"de":"fertig","en":"finished, ready","timeLimit":30,"audio":true},{"de":"dieser","en":"this","timeLimit":30,"audio":true},{"de":"fünfzehn","en":"fifteen","timeLimit":30,"audio":true},{"de":"beruflich","en":"professional, work-related","timeLimit":30,"audio":true},{"de":"herzlich","en":"hearty, cordial","timeLimit":30,"audio":true},{"de":"langsam","en":"slow","timeLimit":30,"audio":true},{"de":"glücklich","en":"happy","timeLimit":30,"audio":true},{"de":"bewölkt","en":"cloudy","timeLimit":30,"audio":true},{"de":"selten","en":"rare, seldom","timeLimit":30,"audio":true},{"de":"zwanzig","en":"twenty","timeLimit":30,"audio":true},{"de":"gültig","en":"valid","timeLimit":30,"audio":true},{"de":"hübsch","en":"pretty","timeLimit":30,"audio":true}],
        },
        {
          kind: "scramble",
          title: "Round 2",
          instruction: "Tap the letter tiles to spell the word. Beat the clock!",
          items: [{"de":"wichtig","en":"important","timeLimit":30,"audio":true},{"de":"fünfzig","en":"fifty","timeLimit":30,"audio":true},{"de":"niemand","en":"nobody","timeLimit":30,"audio":true},{"de":"herzlich","en":"hearty, cordial","timeLimit":30,"audio":true},{"de":"einzeln","en":"single, separate","timeLimit":30,"audio":true},{"de":"sicher","en":"safe, certain","timeLimit":30,"audio":true},{"de":"langsam","en":"slow","timeLimit":30,"audio":true},{"de":"bewölkt","en":"cloudy","timeLimit":30,"audio":true},{"de":"besser","en":"better","timeLimit":30,"audio":true},{"de":"gesund","en":"healthy","timeLimit":30,"audio":true},{"de":"notwendig","en":"necessary","timeLimit":30,"audio":true},{"de":"unbekannt","en":"unknown","timeLimit":30,"audio":true},{"de":"neugierig","en":"curious","timeLimit":30,"audio":true},{"de":"leicht","en":"easy, light","timeLimit":30,"audio":true},{"de":"nervös","en":"nervous","timeLimit":30,"audio":true},{"de":"frisch","en":"fresh","timeLimit":30,"audio":true},{"de":"glücklich","en":"happy","timeLimit":30,"audio":true},{"de":"zwanzig","en":"twenty","timeLimit":30,"audio":true},{"de":"schwarz","en":"black","timeLimit":30,"audio":true},{"de":"selten","en":"rare, seldom","timeLimit":30,"audio":true},{"de":"deutsch","en":"German","timeLimit":30,"audio":true},{"de":"schnell","en":"fast, quick","timeLimit":30,"audio":true},{"de":"dunkel","en":"dark","timeLimit":30,"audio":true},{"de":"farbig","en":"colored","timeLimit":30,"audio":true},{"de":"dieser","en":"this","timeLimit":30,"audio":true}],
        },
        {
          kind: "scramble",
          title: "Round 3",
          instruction: "Tap the letter tiles to spell the word. Beat the clock!",
          items: [{"de":"bewölkt","en":"cloudy","timeLimit":30,"audio":true},{"de":"gültig","en":"valid","timeLimit":30,"audio":true},{"de":"welcher","en":"which","timeLimit":30,"audio":true},{"de":"schwer","en":"heavy, difficult","timeLimit":30,"audio":true},{"de":"glücklich","en":"happy","timeLimit":30,"audio":true},{"de":"beruflich","en":"professional, work-related","timeLimit":30,"audio":true},{"de":"fünfzehn","en":"fifteen","timeLimit":30,"audio":true},{"de":"japanisch","en":"Japanese","timeLimit":30,"audio":true},{"de":"richtig","en":"correct, right","timeLimit":30,"audio":true},{"de":"selten","en":"rare, seldom","timeLimit":30,"audio":true},{"de":"einzeln","en":"single, separate","timeLimit":30,"audio":true},{"de":"besser","en":"better","timeLimit":30,"audio":true},{"de":"günstig","en":"cheap, favorable","timeLimit":30,"audio":true},{"de":"hübsch","en":"pretty","timeLimit":30,"audio":true},{"de":"falsch","en":"wrong","timeLimit":30,"audio":true},{"de":"wichtig","en":"important","timeLimit":30,"audio":true},{"de":"billig","en":"cheap","timeLimit":30,"audio":true},{"de":"direkt","en":"direct, straight","timeLimit":30,"audio":true},{"de":"normal","en":"normal","timeLimit":30,"audio":true},{"de":"deutsch","en":"German","timeLimit":30,"audio":true},{"de":"gesund","en":"healthy","timeLimit":30,"audio":true},{"de":"niemand","en":"nobody","timeLimit":30,"audio":true},{"de":"fünfzig","en":"fifty","timeLimit":30,"audio":true},{"de":"zufrieden","en":"satisfied, content","timeLimit":30,"audio":true},{"de":"möglich","en":"possible","timeLimit":30,"audio":true}],
        },
        {
          kind: "scramble",
          title: "Round 4",
          instruction: "Tap the letter tiles to spell the word. Beat the clock!",
          items: [{"de":"deutsch","en":"German","timeLimit":30,"audio":true},{"de":"falsch","en":"wrong","timeLimit":30,"audio":true},{"de":"fünfzehn","en":"fifteen","timeLimit":30,"audio":true},{"de":"gesund","en":"healthy","timeLimit":30,"audio":true},{"de":"sicher","en":"safe, certain","timeLimit":30,"audio":true},{"de":"niemand","en":"nobody","timeLimit":30,"audio":true},{"de":"typisch","en":"typical","timeLimit":30,"audio":true},{"de":"beruflich","en":"professional, work-related","timeLimit":30,"audio":true},{"de":"dieser","en":"this","timeLimit":30,"audio":true},{"de":"leicht","en":"easy, light","timeLimit":30,"audio":true},{"de":"hübsch","en":"pretty","timeLimit":30,"audio":true},{"de":"gemeinsam","en":"together, joint","timeLimit":30,"audio":true},{"de":"langsam","en":"slow","timeLimit":30,"audio":true},{"de":"farbig","en":"colored","timeLimit":30,"audio":true},{"de":"direkt","en":"direct, straight","timeLimit":30,"audio":true},{"de":"besser","en":"better","timeLimit":30,"audio":true},{"de":"fertig","en":"finished, ready","timeLimit":30,"audio":true},{"de":"doppelt","en":"double","timeLimit":30,"audio":true},{"de":"richtig","en":"correct, right","timeLimit":30,"audio":true},{"de":"dunkel","en":"dark","timeLimit":30,"audio":true},{"de":"billig","en":"cheap","timeLimit":30,"audio":true},{"de":"welcher","en":"which","timeLimit":30,"audio":true},{"de":"schwarz","en":"black","timeLimit":30,"audio":true},{"de":"zufrieden","en":"satisfied, content","timeLimit":30,"audio":true},{"de":"zwanzig","en":"twenty","timeLimit":30,"audio":true}],
        },

      ],
    },

    {
      id: "nine-words-3",
      title: "Level 3: Long words",
      rounds: [
        {
          kind: "scramble",
          title: "Round 1",
          instruction: "Tap the letter tiles to spell the word. Beat the clock!",
          items: [{"de":"Supermarkt","en":"the supermarket","timeLimit":40,"audio":true},{"de":"Samstagnachmittag","en":"","timeLimit":40,"audio":true},{"de":"Jahreszeit","en":"","timeLimit":40,"audio":true},{"de":"Gutenacht","en":"","timeLimit":40,"audio":true},{"de":"Brille","en":"the glasses","timeLimit":40,"audio":true},{"de":"Universität","en":"","timeLimit":40,"audio":true},{"de":"Schularbeit","en":"","timeLimit":40,"audio":true},{"de":"Jacke","en":"the jacket","timeLimit":40,"audio":true},{"de":"verschieden","en":"different, various","timeLimit":40,"audio":true},{"de":"Hose","en":"the pants, the trousers","timeLimit":40,"audio":true},{"de":"Geschäft","en":"the shop","timeLimit":40,"audio":true},{"de":"Schmetterling","en":"","timeLimit":40,"audio":true},{"de":"Straßenbahn","en":"the tram","timeLimit":40,"audio":true},{"de":"Montagmorgen","en":"","timeLimit":40,"audio":true},{"de":"Gutenmorgen","en":"","timeLimit":40,"audio":true},{"de":"Eiscreme","en":"","timeLimit":40,"audio":true},{"de":"Regenbogen","en":"","timeLimit":40,"audio":true},{"de":"Geburtstag","en":"the birthday","timeLimit":40,"audio":true},{"de":"Einkaufen","en":"","timeLimit":40,"audio":true},{"de":"Socken","en":"","timeLimit":40,"audio":true},{"de":"Schokolade","en":"","timeLimit":40,"audio":true},{"de":"Zeitung","en":"the newspaper","timeLimit":40,"audio":true},{"de":"Kleid","en":"the dress","timeLimit":40,"audio":true},{"de":"Haltestelle","en":"the stop","timeLimit":40,"audio":true},{"de":"Banane","en":"the banana","timeLimit":40,"audio":true}],
        },
        {
          kind: "scramble",
          title: "Round 2",
          instruction: "Tap the letter tiles to spell the word. Beat the clock!",
          items: [{"de":"Jacke","en":"the jacket","timeLimit":40,"audio":true},{"de":"gemeinsam","en":"together, joint","timeLimit":40,"audio":true},{"de":"Mittagessen","en":"the lunch","timeLimit":40,"audio":true},{"de":"Zeitung","en":"the newspaper","timeLimit":40,"audio":true},{"de":"Geburtstag","en":"the birthday","timeLimit":40,"audio":true},{"de":"Schlafzimmer","en":"the bedroom","timeLimit":40,"audio":true},{"de":"Arbeitszimmer","en":"","timeLimit":40,"audio":true},{"de":"Lieblingsbuch","en":"","timeLimit":40,"audio":true},{"de":"Krankenhaus","en":"the hospital","timeLimit":40,"audio":true},{"de":"Samstagnachmittag","en":"","timeLimit":40,"audio":true},{"de":"Entschuldigung","en":"","timeLimit":40,"audio":true},{"de":"Nebensatz","en":"","timeLimit":40,"audio":true},{"de":"Hausschuhe","en":"","timeLimit":40,"audio":true},{"de":"kompliziert","en":"complicated","timeLimit":40,"audio":true},{"de":"Krankenwagen","en":"","timeLimit":40,"audio":true},{"de":"glücklich","en":"happy","timeLimit":40,"audio":true},{"de":"Schokolade","en":"","timeLimit":40,"audio":true},{"de":"Abendessen","en":"the dinner","timeLimit":40,"audio":true},{"de":"europäisch","en":"European","timeLimit":40,"audio":true},{"de":"Schreibtisch","en":"","timeLimit":40,"audio":true},{"de":"Jahreszeit","en":"","timeLimit":40,"audio":true},{"de":"Sonnenuntergang","en":"","timeLimit":40,"audio":true},{"de":"Bahnhofstraße","en":"","timeLimit":40,"audio":true},{"de":"Bundesland","en":"","timeLimit":40,"audio":true},{"de":"Freitagabend","en":"","timeLimit":40,"audio":true}],
        },
        {
          kind: "scramble",
          title: "Round 3",
          instruction: "Tap the letter tiles to spell the word. Beat the clock!",
          items: [{"de":"Kleid","en":"the dress","timeLimit":40,"audio":true},{"de":"Rechnung","en":"the bill, the invoice","timeLimit":40,"audio":true},{"de":"Bücherregal","en":"","timeLimit":40,"audio":true},{"de":"glücklich","en":"happy","timeLimit":40,"audio":true},{"de":"Zeitung","en":"the newspaper","timeLimit":40,"audio":true},{"de":"Sonnenuntergang","en":"","timeLimit":40,"audio":true},{"de":"Krankenwagen","en":"","timeLimit":40,"audio":true},{"de":"kompliziert","en":"complicated","timeLimit":40,"audio":true},{"de":"Wochenende","en":"the weekend","timeLimit":40,"audio":true},{"de":"Hausschuhe","en":"","timeLimit":40,"audio":true},{"de":"neugierig","en":"curious","timeLimit":40,"audio":true},{"de":"Speisekarte","en":"the menu","timeLimit":40,"audio":true},{"de":"europäisch","en":"European","timeLimit":40,"audio":true},{"de":"zufrieden","en":"satisfied, content","timeLimit":40,"audio":true},{"de":"Arbeitszimmer","en":"","timeLimit":40,"audio":true},{"de":"Bücherregal","en":"","timeLimit":40,"audio":true},{"de":"Eiscreme","en":"","timeLimit":40,"audio":true},{"de":"Freitagabend","en":"","timeLimit":40,"audio":true},{"de":"Supermarkt","en":"the supermarket","timeLimit":40,"audio":true},{"de":"Apotheke","en":"the pharmacy","timeLimit":40,"audio":true},{"de":"Haltestelle","en":"the stop","timeLimit":40,"audio":true},{"de":"Entschuldigung","en":"","timeLimit":40,"audio":true},{"de":"Sonnenbrille","en":"","timeLimit":40,"audio":true},{"de":"Einkauf","en":"the shopping","timeLimit":40,"audio":true},{"de":"Geburtstag","en":"the birthday","timeLimit":40,"audio":true}],
        },
        {
          kind: "scramble",
          title: "Round 4",
          instruction: "Tap the letter tiles to spell the word. Beat the clock!",
          items: [{"de":"Mütze","en":"the cap","timeLimit":40,"audio":true},{"de":"Bücherregal","en":"","timeLimit":40,"audio":true},{"de":"Polizei","en":"the police","timeLimit":40,"audio":true},{"de":"Wochenende","en":"the weekend","timeLimit":40,"audio":true},{"de":"freundlich","en":"friendly","timeLimit":40,"audio":true},{"de":"Tomate","en":"the tomato","timeLimit":40,"audio":true},{"de":"beruflich","en":"professional, work-related","timeLimit":40,"audio":true},{"de":"unbekannt","en":"unknown","timeLimit":40,"audio":true},{"de":"Hauptsatz","en":"","timeLimit":40,"audio":true},{"de":"Entschuldigung","en":"","timeLimit":40,"audio":true},{"de":"italienisch","en":"Italian","timeLimit":40,"audio":true},{"de":"Universität","en":"","timeLimit":40,"audio":true},{"de":"Sonnenaufgang","en":"","timeLimit":40,"audio":true},{"de":"Supermarkt","en":"the supermarket","timeLimit":40,"audio":true},{"de":"automatisch","en":"automatic","timeLimit":40,"audio":true},{"de":"Pullover","en":"the sweater","timeLimit":40,"audio":true},{"de":"Apotheke","en":"the pharmacy","timeLimit":40,"audio":true},{"de":"Frühstück","en":"the breakfast","timeLimit":40,"audio":true},{"de":"Samstagnachmittag","en":"","timeLimit":40,"audio":true},{"de":"Hose","en":"the pants, the trousers","timeLimit":40,"audio":true},{"de":"Zeitschrift","en":"the magazine","timeLimit":40,"audio":true},{"de":"Schneemann","en":"","timeLimit":40,"audio":true},{"de":"langweilig","en":"boring","timeLimit":40,"audio":true},{"de":"Bibliothek","en":"","timeLimit":40,"audio":true},{"de":"Straßenbahn","en":"the tram","timeLimit":40,"audio":true}],
        },

      ],
    },
  ],
};


export const wordmatchgridGame: Game = {
  id: "word-match-grid",
  title: "Word Match Grid",
  emoji: "🔗",
  description: "Tap matching German and English tiles in a single grid to clear the board. Beat the clock across rounds that get faster each time!",
  category: "vocabulary",
  tags: ["A1","A2"],
  levels: [
    {
      id: "grid-match-1",
      title: "Level 1: Nouns",
      rounds: [
        {
          kind: "grid-match",
          title: "Grid 1",
          instruction: "Tap a German word, then its English match.",
          timeLimit: 45,
          pairs: [["die Tante","the aunt"],["der Januar","January"],["der Ausweis","the ID card"],["das Geschäft","the shop"],["der Zucker","the sugar"],["der Wind","the wind"],["das Pflaster","the plaster, the band-aid"],["der Mensch","the human being"],["die Katze","the cat"],["die Karte","the card, the map, the ticket"]],
        },
        {
          kind: "grid-match",
          title: "Grid 2",
          instruction: "Tap a German word, then its English match.",
          timeLimit: 45,
          pairs: [["die Mahlzeit","the meal"],["der Parkplatz","the parking space"],["das Mittagessen","the lunch"],["der Besucher","the visitor"],["die Einkaufstasche","the shopping bag"],["der Donnerstag","Thursday"],["die Socke","the sock"],["der Stern","the star"],["der Vormittag","the morning (before noon)"],["der Sommer","the summer"]],
        },
        {
          kind: "grid-match",
          title: "Grid 3",
          instruction: "Tap a German word, then its English match.",
          timeLimit: 45,
          pairs: [["der Westen","the west"],["der Schal","the scarf"],["die Adresse","the address"],["das Meer","the sea"],["der Reis","the rice"],["das Geschäft","the shop"],["das Schild","the sign"],["die Socke","the sock"],["der Student","the student"],["der Vogel","the bird"]],
        },
        {
          kind: "grid-match",
          title: "Grid 4",
          instruction: "Tap a German word, then its English match.",
          timeLimit: 45,
          pairs: [["das Messer","the knife"],["der Bus","the bus"],["das Huhn","the chicken"],["das Gepäck","the luggage"],["das System","the system"],["der Sommer","the summer"],["die Mahlzeit","the meal"],["die Karte","the card, the map, the ticket"],["der Vormittag","the morning (before noon)"],["die Wiese","the meadow"]],
        },
        {
          kind: "grid-match",
          title: "Grid 5",
          instruction: "Tap a German word, then its English match.",
          timeLimit: 45,
          pairs: [["die Klasse","the class"],["der Januar","January"],["das Bügeleisen","the iron"],["das Beispiel","the example"],["das Kino","the cinema"],["der Parkplatz","the parking space"],["das Pflaster","the plaster, the band-aid"],["der Löffel","the spoon"],["das Gesicht","the face"],["der Besucher","the visitor"]],
        },
        {
          kind: "grid-match",
          title: "Grid 6",
          instruction: "Tap a German word, then its English match.",
          timeLimit: 45,
          pairs: [["das Glück","the luck"],["das Rathaus","the town hall"],["die Serviette","the napkin"],["der Löffel","the spoon"],["die Mahlzeit","the meal"],["der Stern","the star"],["der Ausweis","the ID card"],["die Dame","the lady"],["der Ingenieur","the engineer"],["die Klasse","the class"]],
        },
        {
          kind: "grid-match",
          title: "Grid 7",
          instruction: "Tap a German word, then its English match.",
          timeLimit: 45,
          pairs: [["das Huhn","the chicken"],["der Termin","the appointment"],["der Januar","January"],["das Geschenk","the present, the gift"],["die Katze","the cat"],["der Sommer","the summer"],["der Einkauf","the shopping"],["der Donnerstag","Thursday"],["das Mittagessen","the lunch"],["der Appetit","the appetite"]],
        },
        {
          kind: "grid-match",
          title: "Grid 8",
          instruction: "Tap a German word, then its English match.",
          timeLimit: 45,
          pairs: [["das Pflaster","the plaster, the band-aid"],["das Gesicht","the face"],["das Theater","the theatre"],["die Mahlzeit","the meal"],["der Besucher","the visitor"],["die Stimmung","the mood, the atmosphere"],["die Klasse","the class"],["das Schild","the sign"],["der Reis","the rice"],["der Schutz","the protection"]],
        },
        {
          kind: "grid-match",
          title: "Grid 9",
          instruction: "Tap a German word, then its English match.",
          timeLimit: 45,
          pairs: [["der Ausweis","the ID card"],["der Boden","the floor, the ground"],["das Haar","the hair"],["die Möglichkeit","the possibility"],["der Vormittag","the morning (before noon)"],["das Flugzeug","the airplane"],["der Pass","the passport"],["der Student","the student"],["das Geschäft","the shop"],["der Fluss","the river"]],
        },
        {
          kind: "grid-match",
          title: "Grid 10",
          instruction: "Tap a German word, then its English match.",
          timeLimit: 45,
          pairs: [["das Vogel","the bird"],["das Theater","the theatre"],["der Reis","the rice"],["das Informationsbüro","the information office"],["die Tante","the aunt"],["der Mantel","the coat"],["der Termin","the appointment"],["das Bügeleisen","the iron"],["das Messer","the knife"],["der Mensch","the human being"]],
        },

      ],
    },

    {
      id: "grid-match-2",
      title: "Level 2: More nouns",
      rounds: [
        {
          kind: "grid-match",
          title: "Grid 1",
          instruction: "Tap a German word, then its English match.",
          timeLimit: 40,
          pairs: [["der Strom","the electricity, the current"],["die Nacht","the night"],["das Netz","the net, the network"],["der Besucher","the visitor"],["das Holz","the wood"],["die Stunde","the hour, the lesson"],["das Handy","the mobile phone"],["der Eintritt","the admission, entrance fee"],["der Apfel","the apple"],["das Meeting","the meeting"]],
        },
        {
          kind: "grid-match",
          title: "Grid 2",
          instruction: "Tap a German word, then its English match.",
          timeLimit: 40,
          pairs: [["die Tante","the aunt"],["das Meeting","the meeting"],["die Information","the information"],["der Anschluss","the connection"],["die Ampel","the traffic light"],["das Handy","the mobile phone"],["das Hochhaus","the high-rise building"],["der Salat","the salad, the lettuce"],["die Kaffeemaschine","the coffee machine"],["das Gesicht","the face"]],
        },
        {
          kind: "grid-match",
          title: "Grid 3",
          instruction: "Tap a German word, then its English match.",
          timeLimit: 40,
          pairs: [["der Morgen","the morning"],["die Serviette","the napkin"],["das Ei","the egg"],["der Salat","the salad, the lettuce"],["der Kühlschrank","the fridge"],["das Fest","the festival"],["die Tasse","the cup"],["das Meeting","the meeting"],["der Wind","the wind"],["der Nachbar","the neighbor (male)"]],
        },
        {
          kind: "grid-match",
          title: "Grid 4",
          instruction: "Tap a German word, then its English match.",
          timeLimit: 40,
          pairs: [["die Tasse","the cup"],["der Salat","the salad, the lettuce"],["die Ampel","the traffic light"],["der Zucker","the sugar"],["das Ding","the thing"],["die Frau","the woman, Mrs"],["das Meeting","the meeting"],["der Polizist","the police officer"],["der Bahnhof","the train station"],["der Besucher","the visitor"]],
        },
        {
          kind: "grid-match",
          title: "Grid 5",
          instruction: "Tap a German word, then its English match.",
          timeLimit: 40,
          pairs: [["der Zucker","the sugar"],["der Schal","the scarf"],["der Schmerz","the pain"],["das Papier","the paper"],["das Medikament","the medicine"],["die Küche","the kitchen"],["die Mauer","the wall"],["das Ei","the egg"],["das Becken","the basin, the pool"],["der Strom","the electricity, the current"]],
        },
        {
          kind: "grid-match",
          title: "Grid 6",
          instruction: "Tap a German word, then its English match.",
          timeLimit: 40,
          pairs: [["die Zeit","the time"],["die Geschichte","the story, the history"],["die Quittung","the receipt"],["die Maus","the mouse"],["der Arm","the arm"],["der Nachmittag","the afternoon"],["die Wand","the wall"],["der Fall","the case"],["die Frau","the woman, Mrs"],["der Apfel","the apple"]],
        },
        {
          kind: "grid-match",
          title: "Grid 7",
          instruction: "Tap a German word, then its English match.",
          timeLimit: 40,
          pairs: [["der Kuchen","the cake"],["das Ding","the thing"],["der Schlaf","the sleep"],["das Urlaub","the vacation"],["das Fest","the festival"],["das Mädchen","the girl"],["die Pflanze","the plant"],["der Student","the student"],["das Buch","the book"],["die Post","the post office, the mail"]],
        },
        {
          kind: "grid-match",
          title: "Grid 8",
          instruction: "Tap a German word, then its English match.",
          timeLimit: 40,
          pairs: [["die Pflanze","the plant"],["der Kellner","the waiter"],["das Becken","the basin, the pool"],["die Wand","the wall"],["die Brücke","the bridge"],["der Apfel","the apple"],["der Sektor","the sector"],["die Quittung","the receipt"],["die Geschichte","the story, the history"],["der Sommer","the summer"]],
        },
        {
          kind: "grid-match",
          title: "Grid 9",
          instruction: "Tap a German word, then its English match.",
          timeLimit: 40,
          pairs: [["der Arm","the arm"],["das Kind","the child"],["der Fall","the case"],["der Brief","the letter"],["das Fest","the festival"],["die Unterschrift","the signature"],["der Sektor","the sector"],["der Eintritt","the admission, entrance fee"],["der Wind","the wind"],["das Holz","the wood"]],
        },
        {
          kind: "grid-match",
          title: "Grid 10",
          instruction: "Tap a German word, then its English match.",
          timeLimit: 40,
          pairs: [["das Essen","the food, the meal"],["der Sommer","the summer"],["der Deutsche","the German (person)"],["der Sport","the sport"],["der Herd","the stove"],["das Fest","the festival"],["der Student","the student"],["der Sektor","the sector"],["die Not","the emergency, the distress"],["das Kind","the child"]],
        },

      ],
    },

    {
      id: "grid-match-3",
      title: "Level 3: Longer words",
      rounds: [
        {
          kind: "grid-match",
          title: "Grid 1",
          instruction: "Tap a German word, then its English match.",
          timeLimit: 35,
          pairs: [["der Fall","the case"],["der Student","the student"],["der Appetit","the appetite"],["die Kuh","the cow"],["der Baum","the tree"],["das Brötchen","the roll"],["die Cousine","the cousin (female)"],["das Alter","the age"],["die Lust","the desire, the wish"],["der Besucher","the visitor"]],
        },
        {
          kind: "grid-match",
          title: "Grid 2",
          instruction: "Tap a German word, then its English match.",
          timeLimit: 35,
          pairs: [["die Sorte","the sort, the kind"],["die Nacht","the night"],["das Getränk","the drink"],["das Alter","the age"],["der Mittag","the midday"],["das Kind","the child"],["der Job","the job"],["das Tier","the animal"],["die Cousine","the cousin (female)"],["das Bein","the leg"]],
        },
        {
          kind: "grid-match",
          title: "Grid 3",
          instruction: "Tap a German word, then its English match.",
          timeLimit: 35,
          pairs: [["das Feuer","the fire"],["die Gebühr","the fee"],["das Glas","the glass"],["die Prüfung","the exam"],["die Dusche","the shower"],["die Ankunft","the arrival"],["der Cent","the cent"],["der Wein","the wine"],["das Café","the café"],["der Hals","the neck, the throat"]],
        },
        {
          kind: "grid-match",
          title: "Grid 4",
          instruction: "Tap a German word, then its English match.",
          timeLimit: 35,
          pairs: [["die Reise","the journey, the trip"],["das Wild","the game (animals)"],["die Information","the information"],["der Drucker","the printer"],["das Joghurt","the yogurt"],["die Hilfe","the help"],["das Bein","the leg"],["die Klasse","the class"],["das Gemüse","the vegetables"],["die Kleidung","the clothing"]],
        },
        {
          kind: "grid-match",
          title: "Grid 5",
          instruction: "Tap a German word, then its English match.",
          timeLimit: 35,
          pairs: [["das Café","the café"],["das Leben","the life"],["das Bild","the picture"],["der Koffer","the suitcase"],["das Gemüse","the vegetables"],["der Appetit","the appetite"],["die Banane","the banana"],["die Zeitung","the newspaper"],["das Jahr","the year"],["die Information","the information"]],
        },
        {
          kind: "grid-match",
          title: "Grid 6",
          instruction: "Tap a German word, then its English match.",
          timeLimit: 35,
          pairs: [["der Appetit","the appetite"],["der Frühling","the spring"],["das Taxi","the taxi"],["die Klasse","the class"],["die CD","the CD"],["die Banane","the banana"],["die Lust","the desire, the wish"],["der Koffer","the suitcase"],["die Decke","the ceiling; the blanket"],["der Bär","the bear"]],
        },
        {
          kind: "grid-match",
          title: "Grid 7",
          instruction: "Tap a German word, then its English match.",
          timeLimit: 35,
          pairs: [["die Kreuzung","the crossing, the junction"],["der Wein","the wine"],["die Cousine","the cousin (female)"],["der Hals","the neck, the throat"],["das Jahr","the year"],["das Fieber","the fever"],["das Gebiet","the area, the region"],["die Stufe","the step"],["das Gewitter","the thunderstorm"],["das Alter","the age"]],
        },
        {
          kind: "grid-match",
          title: "Grid 8",
          instruction: "Tap a German word, then its English match.",
          timeLimit: 35,
          pairs: [["der Mittag","the midday"],["das Bild","the picture"],["das Tier","the animal"],["die Ankunft","the arrival"],["das Brötchen","the roll"],["das Möbel","the piece of furniture"],["der Kühlschrank","the fridge"],["die Zeitung","the newspaper"],["das Kind","the child"],["die Hilfe","the help"]],
        },
        {
          kind: "grid-match",
          title: "Grid 9",
          instruction: "Tap a German word, then its English match.",
          timeLimit: 35,
          pairs: [["der Fluss","the river"],["der Kühlschrank","the fridge"],["die Reise","the journey, the trip"],["die Wiese","the meadow"],["die Kreuzung","the crossing, the junction"],["das Gebiet","the area, the region"],["der Tee","the tea"],["das Jahr","the year"],["das Feuer","the fire"],["der Hals","the neck, the throat"]],
        },
        {
          kind: "grid-match",
          title: "Grid 10",
          instruction: "Tap a German word, then its English match.",
          timeLimit: 35,
          pairs: [["der Arbeitsplatz","the workplace"],["die Zukunft","the future"],["das Toilettenpapier","the toilet paper"],["das Brötchen","the roll"],["die Banane","the banana"],["die Sorte","the sort, the kind"],["die Kleidung","the clothing"],["das Leben","the life"],["die Gebühr","the fee"],["die Marmelade","the jam"]],
        },

      ],
    },
  ],
};
