import { SpeakButton } from "@/components/ui/SpeakButton";
import type { ContentBlock } from "@/content/schema";

const POS_STYLES: Record<string, string> = {
  Nomen: "border-blue-300 bg-blue-50 text-blue-900",
  Verb: "border-emerald-300 bg-emerald-50 text-emerald-900",
  Adjektiv: "border-violet-300 bg-violet-50 text-violet-900",
  Adverb: "border-orange-300 bg-orange-50 text-orange-900",
  Pronomen: "border-rose-300 bg-rose-50 text-rose-900",
  Artikel: "border-amber-300 bg-amber-50 text-amber-900",
  Präposition: "border-cyan-300 bg-cyan-50 text-cyan-900",
  Konjunktion: "border-fuchsia-300 bg-fuchsia-50 text-fuchsia-900",
  Numerale: "border-lime-300 bg-lime-50 text-lime-900",
  Interjektion: "border-red-300 bg-red-50 text-red-900",
};

function posStyles(pos: string): string {
  const normalized = pos.replace("Artikel", "Artikel").trim();
  return (
    POS_STYLES[normalized] ??
    "border-stone-300 bg-stone-100 text-stone-800"
  );
}

export function ContentBlocks({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="space-y-4">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "paragraph":
            return (
              <p key={index} className="text-stone-700">
                {block.text}
              </p>
            );
          case "example":
            return (
              <figure
                key={index}
                className="rounded-lg border border-stone-200 bg-white p-4"
              >
                <div className="flex items-start gap-3">
                  <p className="flex-1 text-lg font-medium text-stone-900">
                    {block.de}
                  </p>
                  <SpeakButton text={block.de} />
                </div>
                <figcaption className="mt-1 text-sm text-stone-500">
                  {block.en}
                </figcaption>
              </figure>
            );
          case "gloss":
            return (
              <figure
                key={index}
                className="rounded-lg border border-stone-200 bg-white p-4"
              >
                <div className="flex items-start gap-3">
                  <p className="flex-1 text-lg font-medium leading-relaxed text-stone-900">
                    {block.de}
                  </p>
                  <SpeakButton text={block.de} />
                </div>
                <figcaption className="mt-2 text-sm text-stone-600">
                  {block.en}
                </figcaption>
                <div
                  className="mt-4 space-y-1"
                  aria-label="Word-by-word breakdown"
                >
                  {block.words.map((word, wordIndex) => (
                    <p key={wordIndex} className="text-sm leading-relaxed text-stone-800">
                      <span className="font-semibold">{word.word}</span>
                      <span className="text-stone-500">: </span>
                      <span
                        className={`rounded px-1 py-0.5 text-xs font-medium ${posStyles(word.pos)}`}
                      >
                        {word.detail ?? word.pos}
                      </span>
                      <span className="text-stone-500"> ({word.en})</span>
                    </p>
                  ))}
                </div>
              </figure>
            );
          case "tip":
            return (
              <aside
                key={index}
                className="rounded-lg border-l-4 border-amber-500 bg-amber-50 p-4 text-sm text-amber-900"
              >
                {block.text}
              </aside>
            );
          case "table":
            return (
              <div key={index} className="overflow-x-auto">
                <table className="w-full border-collapse text-left text-sm">
                  {block.caption ? (
                    <caption className="pb-2 text-sm font-semibold text-stone-700">
                      {block.caption}
                    </caption>
                  ) : null}
                  <thead>
                    <tr>
                      {(block.head ?? []).map((cell, cellIndex) => (
                        <th
                          key={cellIndex}
                          scope="col"
                          className="border-b border-stone-300 px-3 py-2 font-semibold text-stone-900"
                        >
                          {cell}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, rowIndex) => {
                      const speakText = block.rowSpeak?.[rowIndex];
                      return (
                        <tr key={rowIndex} className="odd:bg-white even:bg-stone-50">
                          {row.map((cell, cellIndex) => (
                            <td
                              key={cellIndex}
                              className="border-b border-stone-200 px-3 py-2 text-stone-700"
                            >
                              <span className="inline-flex items-center gap-2">
                                {cellIndex === 0 && speakText ? (
                                  <SpeakButton text={speakText} />
                                ) : null}
                                {cell}
                              </span>
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            );
        }
      })}
    </div>
  );
}