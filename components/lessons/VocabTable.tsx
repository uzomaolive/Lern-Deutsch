import { SpeakButton } from "@/components/ui/SpeakButton";
import type { VocabItem } from "@/content/schema";

export function VocabTable({ items }: { items: VocabItem[] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-stone-200 bg-white">
      <table className="w-full border-collapse text-left text-sm">
        <thead>
          <tr className="bg-stone-50">
            <th scope="col" className="px-3 py-2 font-semibold text-stone-900">
              Deutsch
            </th>
            <th scope="col" className="px-3 py-2 font-semibold text-stone-900">
              English
            </th>
            <th scope="col" className="hidden px-3 py-2 font-semibold text-stone-900 sm:table-cell">
              Part
            </th>
            <th scope="col" className="hidden px-3 py-2 font-semibold text-stone-900 md:table-cell">
              Plural
            </th>
            <th scope="col" className="hidden px-3 py-2 font-semibold text-stone-900 lg:table-cell">
              Note
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="odd:bg-white even:bg-stone-50">
              <td className="px-3 py-2 text-stone-800">
                <span className="inline-flex items-center gap-2">
                  {item.de}
                  {item.audio ? <SpeakButton text={item.de} /> : null}
                </span>
              </td>
              <td className="px-3 py-2 text-stone-600">{item.en}</td>
              <td className="hidden px-3 py-2 text-stone-600 sm:table-cell">
                {item.part ?? "-"}
              </td>
              <td className="hidden px-3 py-2 text-stone-600 md:table-cell">
                {item.plural ?? "-"}
              </td>
              <td className="hidden px-3 py-2 text-stone-500 lg:table-cell">
                {item.tip ?? "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}