import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContentBlocks } from "@/components/lessons/blocks";
import { VocabTable } from "@/components/lessons/VocabTable";
import { LessonExercises } from "@/components/lessons/LessonExercises";
import { Sidebar } from "@/components/syllabus/Sidebar";
import { repository } from "@/content";
import type { LevelId } from "@/content/schema";

interface LessonPageProps {
  params: Promise<{ level: string; unit: string; lesson: string }>;
}

export async function generateStaticParams() {
  return repository.readyLessons().map(({ lesson, unit, level }) => ({
    level: level.id,
    unit: unit.id,
    lesson: lesson.id,
  }));
}

export async function generateMetadata({
  params,
}: LessonPageProps): Promise<Metadata> {
  const { level: levelId, unit: unitId, lesson: lessonId } = await params;
  const lesson = repository.getLesson(
    levelId as "a1" | "a2",
    unitId,
    lessonId,
  );
  if (!lesson) return {};
  return { title: lesson.title };
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { level: levelId, unit: unitId, lesson: lessonId } = await params;
  const level = repository.getLevel(levelId as "a1" | "a2");
  if (!level) notFound();
  const unit = repository.getUnit(level.id, unitId);
  if (!unit) notFound();
  const lesson = repository.getLesson(level.id, unit.id, lessonId);
  if (!lesson || lesson.status !== "ready") notFound();

  const unitIndex = level.units.findIndex((candidate) => candidate.id === unit.id);

  const flats = repository.allLessons();
  const currentIndex = flats.findIndex(
    (flat) =>
      flat.key ===
      repository.lessonKey(level.id, unit.id, lesson.id),
  );
  const nextReady = flats
    .slice(currentIndex + 1)
    .find((flat) => flat.lesson.status === "ready");
  const nextLesson = nextReady
    ? {
        href: `/l/${nextReady.level.id}/${nextReady.unit.id}/${nextReady.lesson.id}`,
        title: nextReady.lesson.title,
      }
    : null;

  const sectionTargets = lesson.sections.map((section, index) => ({
    id: `section-${index + 1}`,
    heading: section.heading,
  }));
  const trailingTargets = [
    lesson.vocab.length > 0
      ? { id: "vocabulary", heading: "Vocabulary" }
      : null,
    lesson.exercises.length > 0
      ? { id: "exercises", heading: "Exercises" }
      : null,
  ].filter((target): target is { id: string; heading: string } => target !== null);
  const allTargets = [...sectionTargets, ...trailingTargets];

  const currentLessonKey = repository.lessonKey(level.id, unit.id, lesson.id);

  const sidebarLevels = (["a1", "a2"] as LevelId[])
    .map((candidateLevelId) => repository.getLevel(candidateLevelId))
    .filter((candidateLevel): candidateLevel is NonNullable<typeof candidateLevel> => candidateLevel !== undefined)
    .map((candidateLevel) => ({
      id: candidateLevel.id,
      title: candidateLevel.title,
      units: candidateLevel.units.map((candidateUnit) => ({
        id: candidateUnit.id,
        title: candidateUnit.title,
        lessons: candidateUnit.lessons.map((candidateLesson) => ({
          id: candidateLesson.id,
          title: candidateLesson.title,
          status: candidateLesson.status,
        })),
      })),
    }));

  return (
    <div className="mx-auto flex flex-col lg:flex-row max-w-6xl items-stretch gap-3 lg:gap-8 px-4 py-10">
      <div className="lg:w-56 lg:shrink-0">
        <Sidebar levels={sidebarLevels} currentKey={currentLessonKey} />
      </div>
      <article className="min-w-0 flex-1 max-w-3xl">
      <nav aria-label="Breadcrumb" className="text-sm text-stone-500">
        <Link href="/" className="hover:text-amber-700">
          Course
        </Link>
        <span aria-hidden="true"> / </span>
        <span>
          {level.title} · Unit {unitIndex + 1}: {unit.title}
        </span>
      </nav>

      <h1 className="mt-4 text-3xl font-bold tracking-tight text-stone-900">
        {lesson.title}
      </h1>
      <p className="mt-2 text-stone-600">{lesson.summary}</p>

      {lesson.sections.length > 0 ? (
        <section className="mt-8 space-y-6">
          {lesson.sections.map((section, sectionIndex) => {
            const currentTarget = sectionTargets[sectionIndex];
            const nextTarget = allTargets[sectionIndex + 1];
            return (
              <section key={section.heading} id={currentTarget.id}>
                <h2 className="mb-3 text-xl font-semibold text-stone-900">
                  {section.heading}
                </h2>
                <ContentBlocks blocks={section.blocks} />
                {nextTarget ? (
                  <nav aria-label="Next section" className="mt-6">
                    <a
                      href={`#${nextTarget.id}`}
                      className="flex w-full items-center justify-between gap-3 rounded-lg border border-amber-600 bg-amber-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-amber-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
                    >
                      <span>
                        Next section:{" "}
                        <span className="font-bold underline underline-offset-2">
                          {nextTarget.heading}
                        </span>
                      </span>
                      <span aria-hidden="true" className="text-lg leading-none">
                        ↓
                      </span>
                    </a>
                  </nav>
                ) : null}
              </section>
            );
          })}
        </section>
      ) : null}

      {lesson.vocab.length > 0 ? (
        <section className="mt-10" id="vocabulary">
          <h2 className="mb-3 text-xl font-semibold text-stone-900">
            Vocabulary
          </h2>
          <VocabTable items={lesson.vocab} />
        </section>
      ) : null}

      {lesson.exercises.length > 0 ? (
        <section className="mt-10 space-y-6" id="exercises">
          <h2 className="text-xl font-semibold text-stone-900">Exercises</h2>
          <LessonExercises
            levelId={level.id}
            unitId={unit.id}
            lessonId={lesson.id}
            exercises={lesson.exercises}
            nextLesson={nextLesson}
            lessonStatus={lesson.status}
          />
        </section>
      ) : null}

      {nextLesson ? (
        <nav aria-label="Next lesson" className="mt-10">
          <Link
            href={nextLesson.href}
            className="flex w-full items-center justify-between gap-3 rounded-lg border border-stone-300 bg-white px-4 py-3 text-sm transition-colors hover:border-amber-600 hover:bg-amber-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
          >
            <span>
              <span className="block text-xs font-medium uppercase tracking-wide text-stone-500">
                Up next
              </span>
              <span className="mt-0.5 block font-semibold text-stone-900">
                {nextLesson.title}
              </span>
            </span>
            <span aria-hidden="true" className="text-lg leading-none text-amber-700">
              →
            </span>
          </Link>
        </nav>
      ) : null}
      </article>
    </div>
  );
}