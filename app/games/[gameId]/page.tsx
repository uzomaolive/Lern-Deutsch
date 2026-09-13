import Link from "next/link";
import { notFound } from "next/navigation";
import { games } from "@/content/games";
import { GameLevelView } from "@/components/games/GameLevelView";
import type { Metadata } from "next";

interface GamePageProps {
  params: Promise<{ gameId: string }>;
}

export function generateStaticParams() {
  return games.map((game) => ({ gameId: game.id }));
}

export async function generateMetadata({ params }: GamePageProps): Promise<Metadata> {
  const { gameId } = await params;
  const game = games.find((candidate) => candidate.id === gameId);
  return game ? { title: game.title } : {};
}

export default async function GamePage({ params }: GamePageProps) {
  const { gameId } = await params;
  const game = games.find((candidate) => candidate.id === gameId);
  if (!game) notFound();

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <nav aria-label="Breadcrumb" className="text-sm text-stone-500">
        <Link href="/" className="hover:text-amber-700">
          Course
        </Link>
        <span aria-hidden="true"> / </span>
        <Link href="/games" className="hover:text-amber-700">
          Games
        </Link>
        <span aria-hidden="true"> / </span>
        <span>{game.title}</span>
      </nav>

      <header className="mt-4 flex items-start gap-4">
        <p className="text-4xl" aria-hidden="true">
          {game.emoji}
        </p>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-stone-900">
            {game.title}
          </h1>
          <p className="mt-1 text-stone-600">{game.description}</p>
        </div>
      </header>

      <GameLevelView game={game} />
    </div>
  );
}