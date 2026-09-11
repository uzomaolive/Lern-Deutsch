import { SpeakButton } from "@/components/ui/SpeakButton";
import type { ContentBlock } from "@/content/schema";

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
                    {block.rows.map((row, rowIndex) => (
                      <tr key={rowIndex} className="odd:bg-white even:bg-stone-50">
                        {row.map((cell, cellIndex) => (
                          <td key={cellIndex} className="border-b border-stone-200 px-3 py-2 text-stone-700">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
        }
      })}
    </div>
  );
}