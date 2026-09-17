import Link from "next/link";
import { wordListCategories, wordLists } from "@/content/wordlists";

const EMOJI_TILES: Record<string, string> = {
  essential: "from-amber-200 to-orange-100",
  goethe: "from-blue-200 to-indigo-100",
  topic: "from-emerald-200 to-teal-100",
};

export default function WordCategoriesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-stone-900">
          German Vocabulary Lists
        </h1>
        <p className="mt-2 max-w-2xl text-stone-600">
          Browse free German word lists organized by Goethe exam level and
          everyday topic. Nouns come with their article and plural, so you
          learn the word the way Germans use it. Every word can be heard aloud
          and practised as a flashcard.
        </p>
        <p className="mt-2 max-w-2xl text-sm text-stone-500">
          {wordLists.length} word lists ·{" "}
          {wordLists.reduce((sum, list) => sum + list.words.length, 0)} words ·
          no signup required
        </p>
      </header>

      <div className="space-y-12">
        {wordListCategories.map((category) => {
          const lists = wordLists.filter((list) => list.category === category.id);
          if (lists.length === 0) return null;
          return (
            <section key={category.id} aria-labelledby={`category-${category.id}`}>
              <h2 id={`category-${category.id}`} className="text-xl font-semibold text-stone-900">
                {category.label}
              </h2>
              <p className="mt-1 text-sm text-stone-500">{category.blurb}</p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {lists.map((list) => (
                  <Link
                    key={list.id}
                    href={`/resources/${list.id}`}
                    className="group flex flex-col rounded-2xl border border-stone-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-amber-500 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
                  >
                    <div className="flex items-start justify-between">
                      <span
                        aria-hidden="true"
                        className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br text-2xl ${EMOJI_TILES[category.id]}`}
                      >
                        {list.emoji}
                      </span>
                      <span className="rounded-full bg-stone-100 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-stone-600">
                        {list.words.length} words
                      </span>
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-stone-900 group-hover:text-amber-800">
                      {list.title}
                    </h3>
                    <p className="mt-1 flex-1 text-sm text-stone-600">{list.description}</p>
                    <p className="mt-4 flex items-center gap-1 text-sm font-semibold text-amber-700">
                      Browse
                      <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
                        →
                      </span>
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}