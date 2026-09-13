import Link from "next/link";
import { games } from "@/content/games";

const CATEGORY_LABELS: Record<string, string> = {
  vocabulary: "Vocabulary",
  grammar: "Grammar",
  listening: "Listening",
  speaking: "Speaking",
  mixed: "Mixed",
};

export default function GamesPage() {
  const categories = ["vocabulary", "grammar", "listening", "speaking", "mixed"];

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-stone-900">
          Games <span className="text-amber-700">A1-A2</span>
        </h1>
        <p className="mt-2 max-w-2xl text-stone-600">
          Play your way through the course. Every game has three levels that get
          harder as you go.
        </p>
      </header>

      <div className="space-y-10">
        {categories.map((category) => {
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
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {categoryGames.map((game) => (
                  <Link
                    key={game.id}
                    href={`/games/${game.id}`}
                    className="group rounded-xl border border-stone-200 bg-white p-5 transition-colors hover:border-amber-500 hover:bg-amber-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
                  >
                    <p className="text-3xl" aria-hidden="true">
                      {game.emoji}
                    </p>
                    <h3 className="mt-3 text-lg font-semibold text-stone-900 group-hover:text-amber-800">
                      {game.title}
                    </h3>
                    <p className="mt-1 text-sm text-stone-600">{game.description}</p>
                    <p className="mt-3 text-xs font-medium uppercase tracking-wide text-amber-700">
                      {game.levels.length} levels →
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