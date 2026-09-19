import type { SpeakingTopic } from "./schema";

/**
 * A2 speaking topics. Longer connected speech: opinions, plans, past
 * experiences, polite requests, complaints, and comparisons.
 */

export const a2Topics: SpeakingTopic[] = [
  {
    id: "meine-meinung",
    title: "Meine Meinung",
    prompt: "Was ist besser: in der Stadt oder auf dem Land leben? Sagen Sie Ihre Meinung und begründen Sie sie.",
    example: "Ich finde, das Leben in der Stadt ist besser, weil es viele Möglichkeiten gibt.",
    exampleEn: "I think life in the city is better because there are many opportunities.",
    cheat: {
      words: ["die Meinung", "finden", "weil", "deshalb", "die Möglichkeit"],
      sentenceStarters: ["Ich finde, …", "Meiner Meinung nach …", "Ich denke, …", "Zum Beispiel …"],
      connectors: ["weil", "deshalb", "aber", "obwohl"],
    },
  },
  {
    id: "im-restaurant-reklamieren",
    title: "Im Restaurant reklamieren",
    prompt: "Ihr Essen ist kalt. Reklamieren Sie höflich und schlagen Sie eine Lösung vor.",
    example: "Entschuldigung, mein Essen ist leider kalt. Können Sie es bitte erwärmen?",
    exampleEn: "Excuse me, my food is unfortunately cold. Could you please warm it up?",
    cheat: {
      words: ["reklamieren", "das Essen", "kalt", "der Kellner", "die Lösung"],
      sentenceStarters: ["Entschuldigung, …", "Leider …", "Können Sie bitte …?", "Ich hätte gern …"],
      connectors: ["leider", "bitte", "deshalb", "oder"],
    },
  },
  {
    id: "einen-termin-vereinbaren",
    title: "Einen Termin vereinbaren",
    prompt: "Sie rufen bei einem Arzt an. Vereinbaren Sie einen Termin und erklären Sie Ihr Problem.",
    example: "Guten Tag, ich hätte gern einen Termin bei Frau Dr. Klein. Ich habe starke Rückenschmerzen.",
    exampleEn: "Hello, I would like an appointment with Dr Klein. I have severe back pain.",
    cheat: {
      words: ["der Termin", "vereinbaren", "die Sprechstunde", "passen", "der Rückenschmerz"],
      sentenceStarters: ["Ich hätte gern einen Termin …", "Wann passt es Ihnen?", "Mir tut … weh.", "Kann ich …?"],
      connectors: ["wann", "oder", "weil", "dann"],
    },
  },
  {
    id: "eine-geschichte-erzaehlen",
    title: "Eine Geschichte erzählen",
    prompt: "Erzählen Sie eine kleine Geschichte aus Ihrem Alltag in der Vergangenheit.",
    example: "Gestern bin ich zum Markt gegangen und habe frische Äpfel gekauft.",
    exampleEn: "Yesterday I went to the market and bought fresh apples.",
    cheat: {
      words: ["gestern", "gehen", "kaufen", "dann", "plötzlich"],
      sentenceStarters: ["Gestern …", "Zuerst …", "Dann …", "Am Ende …"],
      connectors: ["dann", "plötzlich", "deshalb", "aber"],
    },
  },
  {
    id: "eine-einladung",
    title: "Eine Einladung machen",
    prompt: "Laden Sie einen Freund zu einer Feier ein. Sagen Sie wann, wo und was geplant ist.",
    example: "Kommst du am Samstag zu meiner Geburtstagsfeier? Wir feiern ab 19 Uhr im Garten.",
    exampleEn: "Will you come to my birthday party on Saturday? We celebrate from 7 pm in the garden.",
    cheat: {
      words: ["die Einladung", "feiern", "der Garten", "das Geschenk", "mitbringen"],
      sentenceStarters: ["Kommst du …?", "Wir feiern …", "Ich freue mich auf …", "Bitte bring … mit."],
      connectors: ["und", "deshalb", "hoffentlich", "auch"],
    },
  },
  {
    id: "wohnen-und-nachbarn",
    title: "Wohnen und Nachbarn",
    prompt: "Beschreiben Sie Ihr Wohnviertel und Ihre Nachbarn. Was gefällt Ihnen, was nicht?",
    example: "Mein Viertel ist ruhig, aber die Nachbarn sind sehr nett und helfen gern.",
    exampleEn: "My neighborhood is quiet, but the neighbors are very nice and like to help.",
    cheat: {
      words: ["das Viertel", "ruhig", "nett", "der Nachbar", "helfen"],
      sentenceStarters: ["Mein Viertel ist …", "Die Nachbarn sind …", "Ich mag …", "Was nicht passt, ist …"],
      connectors: ["aber", "weil", "deshalb", "obwohl"],
    },
  },
  {
    id: "gesundheit-und-sport",
    title: "Gesundheit und Sport",
    prompt: "Erzählen Sie, wie Sie sich fit halten und was Sie für Ihre Gesundheit tun.",
    example: "Ich gehe dreimal pro Woche schwimmen und esse viel Obst und Gemüse.",
    exampleEn: "I go swimming three times a week and eat lots of fruit and vegetables.",
    cheat: {
      words: ["gesund", "fit", "der Sport", "schwimmen", "das Gemüse"],
      sentenceStarters: ["Ich halte mich fit, indem ich …", "Ich esse …", "Dreimal pro Woche …", "Wichtig ist …"],
      connectors: ["weil", "deshalb", "aber", "außerdem"],
    },
  },
  {
    id: "mein-letzter-urlaub",
    title: "Mein letzter Urlaub",
    prompt: "Erzählen Sie von Ihrem letzten Urlaub: wohin, mit wem, was Sie erlebt haben.",
    example: "Im Sommer war ich in Spanien. Das Wetter war super und das Essen war fantastisch.",
    exampleEn: "In summer I was in Spain. The weather was great and the food was fantastic.",
    cheat: {
      words: ["der Urlaub", "das Wetter", "das Essen", "erleben", "der Strand"],
      sentenceStarters: ["Im Sommer war ich …", "Mit … war ich …", "Das Beste war …", "Einmal …"],
      connectors: ["und", "deshalb", "aber", "dann"],
    },
  },
  {
    id: "beruf-und-zukunft",
    title: "Beruf und Zukunft",
    prompt: "Erzählen Sie von Ihrem Beruf und Ihren Plänen für die Zukunft.",
    example: "Ich arbeite jetzt als Kellnerin, aber ich möchte später ein eigenes Café eröffnen.",
    exampleEn: "I work as a waitress now, but later I would like to open my own café.",
    cheat: {
      words: ["die Zukunft", "der Plan", "eröffnen", "später", "der Traum"],
      sentenceStarters: ["Ich arbeite jetzt als …", "Später möchte ich …", "Mein Traum ist …", "Ich plane …"],
      connectors: ["aber", "deshalb", "weil", "vielleicht"],
    },
  },
  {
    id: "einkaufen-und-umtauschen",
    title: "Einkaufen und umtauschen",
    prompt: "Sie haben ein Hemd gekauft, das nicht passt. Gehen Sie ins Geschäft und tauschen Sie es um.",
    example: "Guten Tag, ich habe dieses Hemd gestern gekauft, aber es ist zu klein. Kann ich es umtauschen?",
    exampleEn: "Hello, I bought this shirt yesterday, but it is too small. Can I exchange it?",
    cheat: {
      words: ["umtauschen", "passen", "die Quittung", "zu klein", "die Größe"],
      sentenceStarters: ["Ich habe … gekauft, aber …", "Kann ich es umtauschen?", "Ich hätte gern eine andere Größe.", "Hier ist die Quittung."],
      connectors: ["aber", "deshalb", "bitte", "vielleicht"],
    },
  },
  {
    id: "deutsche-essgewohnheiten",
    title: "Deutsche Essgewohnheiten",
    prompt: "Vergleichen Sie das Essen in Deutschland mit dem Essen in Ihrem Land.",
    example: "In Deutschland isst man viel Brot, aber in meinem Land isst man mehr Reis.",
    exampleEn: "In Germany people eat a lot of bread, but in my country people eat more rice.",
    cheat: {
      words: ["das Brot", "der Reis", "das Frühstück", "gewohnt sein", "der Vergleich"],
      sentenceStarters: ["In Deutschland …", "In meinem Land …", "Im Vergleich zu …", "Ich bin gewohnt, …"],
      connectors: ["aber", "im Vergleich", "weil", "deshalb"],
    },
  },
  {
    id: "hoeflich-bitten",
    title: "Höflich bitten",
    prompt: "Sie brauchen Hilfe von einem Kollegen. Formulieren Sie eine höfliche Bitte.",
    example: "Entschuldigung, könntest du mir bitte bei der Präsentation helfen? Ich weiß nicht weiter.",
    exampleEn: "Excuse me, could you please help me with the presentation? I am stuck.",
    cheat: {
      words: ["helfen", "die Bitte", "könntest du", "die Präsentation", "weiterwissen"],
      sentenceStarters: ["Könntest du bitte …?", "Würdest du mir helfen, …?", "Ich brauche Hilfe bei …", "Danke, dass du …"],
      connectors: ["bitte", "weil", "deshalb", "vielen Dank"],
    },
  },
  {
    id: "einen-fehler-erklaeren",
    title: "Einen Fehler erklären",
    prompt: "Sie sind zu spät zur Arbeit gekommen. Erklären Sie Ihrem Chef, was passiert ist.",
    example: "Es tut mir leid, dass ich zu spät bin. Der Bus hatte Verspätung.",
    exampleEn: "I am sorry that I am late. The bus was delayed.",
    cheat: {
      words: ["zu spät", "sich entschuldigen", "die Verspätung", "der Grund", "passieren"],
      sentenceStarters: ["Es tut mir leid, dass …", "Der Grund ist, dass …", "Beim nächsten Mal …", "Ich verspreche, …"],
      connectors: ["dass", "weil", "deshalb", "aber"],
    },
  },
  {
    id: "kino-oder-buch",
    title: "Kino oder Buch?",
    prompt: "Diskutieren Sie: Ist es besser, einen Film zu sehen oder ein Buch zu lesen?",
    example: "Ich finde, ein Buch ist besser, weil man sich die Welt selbst vorstellen kann.",
    exampleEn: "I think a book is better because you can imagine the world yourself.",
    cheat: {
      words: ["der Film", "das Buch", "vorstellen", "die Wahl", "besser"],
      sentenceStarters: ["Ich finde, …", "Zum einen …", "Zum anderen …", "Meiner Meinung nach …"],
      connectors: ["weil", "deshalb", "aber", "einerseits … andererseits"],
    },
  },
];