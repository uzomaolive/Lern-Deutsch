import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SpeakButton } from "@/components/ui/SpeakButton";
import { WordListPractice } from "@/components/wordlists/WordListPractice";
import { getWordList, wordLists } from "@/content/wordlists";

interface WordListPageProps {
  params: Promise<{ listId: string }>;
}

export function generateStaticParams() {
  return wordLists.map((list) => ({ listId: list.id }));
}

export async function generateMetadata({ params }: WordListPageProps): Promise<Metadata> {
  const { listId } = await params;
  const list = getWordList(listId);
  return list ? { title: list.title } : {};
}

export default async function WordListPage({ params }: WordListPageProps) {
  const { listId } = await params;
  const list = getWordList(listId);
  if (!list) notFound();

  const hasPlural = list.words.some((word) => word.plural);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <nav aria-label="Breadcrumb" className="text-sm text-stone-500">
        <Link href="/" className="hover:text-amber-700">
          Course
        </Link>
        <span aria-hidden="true"> / </span>
        <Link href="/resources/word-categories" className="hover:text-amber-700">
          Word lists
        </Link>
        <span aria-hidden="true"> / </span>
        <span>{list.title}</span>
      </nav>

      <header className="mt-4 flex items-start gap-4">
        <p className="text-4xl" aria-hidden="true">
          {list.emoji}
        </p>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-stone-900">{list.title}</h1>
          <p className="mt-1 text-stone-600">{list.description}</p>
          <p className="mt-1 text-sm text-stone-500">
            {list.words.length} words · tap the speaker to hear each one
          </p>
        </div>
      </header>

      <div className="mt-6 overflow-x-auto rounded-xl border border-stone-200 bg-white">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="bg-stone-50">
              <th scope="col" className="px-3 py-2 font-semibold text-stone-900">
                Deutsch
              </th>
              <th scope="col" className="px-3 py-2 font-semibold text-stone-900">
                English
              </th>
              {hasPlural ? (
                <th scope="col" className="hidden px-3 py-2 font-semibold text-stone-900 sm:table-cell">
                  Plural
                </th>
              ) : null}
              <th scope="col" className="hidden px-3 py-2 font-semibold text-stone-900 md:table-cell">
                Part
              </th>
            </tr>
          </thead>
          <tbody>
            {list.words.map((word, index) => (
              <tr key={`${word.de}-${index}`} className="odd:bg-white even:bg-stone-50">
                <td className="px-3 py-2 text-stone-800">
                  <span className="inline-flex items-center gap-2">
                    {word.de}
                    <SpeakButton text={word.de} />
                  </span>
                </td>
                <td className="px-3 py-2 text-stone-600">{word.en}</td>
                {hasPlural ? (
                  <td className="hidden px-3 py-2 text-stone-600 sm:table-cell">
                    {word.plural ?? "-"}
                  </td>
                ) : null}
                <td className="hidden px-3 py-2 text-stone-500 md:table-cell">
                  {word.part ?? "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <WordListPractice words={list.words} title={list.title} />

      <p className="mt-8 text-sm text-stone-500">
        Practise these words in the games section — every list pairs with the
        flashcard, matching and scramble games.
      </p>
    </div>
  );
}