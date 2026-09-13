import type { Unit } from "../../schema";
import { goetheHoeren } from "./exams/goethe-hoeren";

export const examPrep: Unit = {
  id: "exam-prep",
  title: "Exam Prep",
  theme: "Prüfungsvorbereitung: Prüfungen im Originalformat",
  lessons: [goetheHoeren],
};