import Link from "next/link";
import { games } from "@/content/games";
import type { Game } from "@/content/games/schema";

const CATEGORY_LABELS: Record<string, string> = {
  vocabulary: "Vocabulary",
  grammar: "Grammar",
  listening: "Listening",
  speaking: "Speaking",
  mixed: "Mixed",
};

const CATEGORY_ORDER = ["vocabulary", "grammar", "listening", "speaking", "mixed"];

const EMOJI_TILES: Record<string, string> = {
  vocabulary: "from-amber-200 to-orange-100",
  grammar: "from-emerald-200 to-teal-100",
  listening: "from-sky-200 to-blue-100",
  speaking: "from-rose-200 to-pink-100",
  mixed: "from-violet-200 to-purple-100",
};

function LevelChips({ game }: { game: Game }) {
  const tags = game.tags ?? ["A1", "A2"];
  return (
    <span className="flex flex-wrap gap-1">
      {tags.map((tag) => (
        <span
          key={tag}
          className="rounded-full bg-stone-100 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-stone-600"
        >
          {tag}
        </span>
      ))}
    </span>
  );
}

function GameCard({ game }: { game: Game }) {
  return (
    <Link
      key={game.id}
      href={`/games/${game.id}`}
      className="group flex flex-col rounded-2xl border border-stone-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-amber-500 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
    >
      <div className="flex items-start justify-between">
        <span
          aria-hidden="true"
          className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br text-2xl ${EMOJI_TILES[game.category] ?? EMOJI_TILES.mixed}`}
        >
          {game.emoji}
        </span>
        <LevelChips game={game} />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-stone-900 group-hover:text-amber-800">
        {game.title}
      </h3>
      <p className="mt-1 flex-1 text-sm text-stone-600">{game.description}</p>
      <p className="mt-4 flex items-center gap-1 text-sm font-semibold text-amber-700">
        Play
        <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
          →
        </span>
      </p>
    </Link>
  );
}

export default function GamesPage() {
  const featured = games.find((game) => game.id === "article-challenge") ?? games[0];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-stone-900">
          German Games <span className="text-amber-700">A1-A2</span>
        </h1>
        <p className="mt-2 max-w-2xl text-stone-600">
          Fun, interactive German vocabulary and grammar games for learners.
          No signup, no tracking: just play your way through the course.
        </p>
      </header>

      <section aria-label="Featured game" className="mb-12">
        <Link
          href={`/games/${featured.id}`}
          className="group block rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 p-6 shadow-sm transition-all hover:border-amber-400 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 sm:p-8"
        >
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <span
              aria-hidden="true"
              className="inline-flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-white text-5xl shadow-sm"
            >
              {featured.emoji}
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-amber-700">
                Featured game
              </p>
              <h2 className="mt-1 text-2xl font-bold text-stone-900 group-hover:text-amber-800">
                {featured.title}
              </h2>
              <p className="mt-1 max-w-2xl text-stone-600">{featured.description}</p>
              <div className="mt-3 flex items-center gap-3">
                <LevelChips game={featured} />
                <span className="text-sm font-semibold text-amber-700">
                  Play the full version{" "}
                  <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
                    →
                  </span>
                </span>
              </div>
            </div>
          </div>
        </Link>
      </section>

      <div className="space-y-12">
        {CATEGORY_ORDER.map((category) => {
          const categoryGames = games.filter((game) => game.category === category);
          if (categoryGames.length === 0) return null;
          return (
            <section key={category} aria-labelledby={`category-${category}`}>
              <h2
                id={`category-${category}`}
                className="text-xl font-semibold text-stone-900"
              >
                {CATEGORY_LABELS[category]}
              </h2>
              <p className="mt-1 text-sm text-stone-500">
                {categoryGames.length} game{categoryGames.length === 1 ? "" : "s"}
              </p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {categoryGames.map((game) => (
                  <GameCard key={game.id} game={game} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}