import type { Unit } from "../../schema";
import { goetheHoeren } from "./exams/goethe-hoeren";
import { goetheExam01 } from "./exams/goethe-exam-01";
import { goetheExam02 } from "./exams/goethe-exam-02";
import { goetheExam03 } from "./exams/goethe-exam-03";
import { goetheExam04 } from "./exams/goethe-exam-04";
import { goetheExam05 } from "./exams/goethe-exam-05";
import { goetheExam06 } from "./exams/goethe-exam-06";
import { goetheExam07 } from "./exams/goethe-exam-07";
import { goetheExam08 } from "./exams/goethe-exam-08";
import { goetheExam09 } from "./exams/goethe-exam-09";
import { goetheExam10 } from "./exams/goethe-exam-10";

export const examPrep: Unit = {
  id: "exam-prep",
  title: "Exam Prep",
  theme: "Prüfungsvorbereitung: Prüfungen im Originalformat",
  lessons: [
    goetheExam01,
    goetheExam02,
    goetheExam03,
    goetheExam04,
    goetheExam05,
    goetheExam06,
    goetheExam07,
    goetheExam08,
    goetheExam09,
    goetheExam10,
    goetheHoeren,
  ],
};