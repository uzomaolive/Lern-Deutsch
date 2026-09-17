import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { ProgressProvider } from "@/components/progress/ProgressProvider";
import { VoicePicker } from "@/components/ui/VoicePicker";
import { BackToTop } from "@/components/ui/BackToTop";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Lern Deutsch A1-A2",
    template: "%s | Lern Deutsch A1-A2",
  },
  description:
    "Interactive German course covering the complete A1 and A2 syllabus: grammar, vocabulary, and exercises.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-stone-50 text-stone-900">
        <header className="border-b border-stone-200 bg-white">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
            <Link
              href="/"
              className="text-lg font-semibold tracking-tight text-stone-900"
            >
              Lern Deutsch <span className="text-amber-700">A1-A2</span>
            </Link>
            <nav aria-label="Main" className="flex items-center gap-3 sm:gap-4">
              <VoicePicker />
              <Link
                href="/practice"
                className="text-sm text-stone-600 hover:text-stone-900"
              >
                Sprechen
              </Link>
              <Link
                href="/resources/word-categories"
                className="text-sm text-stone-600 hover:text-stone-900"
              >
                Words
              </Link>
              <Link
                href="/games"
                className="text-sm text-stone-600 hover:text-stone-900"
              >
                Games
              </Link>
              <Link
                href="/"
                className="text-sm text-stone-600 hover:text-stone-900"
              >
                Course
              </Link>
            </nav>
          </div>
        </header>
        <main className="flex-1">
          <ProgressProvider>{children}</ProgressProvider>
        </main>
        <footer className="border-t border-stone-200 bg-white">
          <div className="mx-auto max-w-5xl px-4 py-4 text-sm text-stone-500">
            Lern Deutsch A1-A2: the complete beginner syllabus, free and
            interactive.
          </div>
        </footer>
        <BackToTop />
      </body>
    </html>
  );
}