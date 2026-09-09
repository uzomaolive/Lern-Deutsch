import { CourseMap } from "@/components/syllabus/CourseMap";
import { levels } from "@/content";

function toSummary() {
  return levels.map((level) => ({
    id: level.id,
    title: level.title,
    subtitle: level.subtitle,
    description: level.description,
    units: level.units.map((unit) => ({
      id: unit.id,
      title: unit.title,
      theme: unit.theme,
      lessons: unit.lessons.map((lesson) => ({
        id: lesson.id,
        title: lesson.title,
        status: lesson.status,
      })),
    })),
  }));
}

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-stone-900">
          Lern Deutsch <span className="text-amber-700">A1-A2</span>
        </h1>
        <p className="mt-2 max-w-2xl text-stone-600">
          The complete beginner syllabus: grammar, vocabulary, and interactive
          exercises. Everything below is part of the A1 and A2 levels; new
          lessons appear here as they are written.
        </p>
      </header>
      <CourseMap levels={toSummary()} />
    </div>
  );
}