"use client";

import QuizNewHeader from "../new/_components/quiz-new-header";
import QuizCreateForm from "./_components/quiz-create-form";

export default function QuizNew() {
  return (
    <div className="flex flex-col gap-1">
      <QuizNewHeader />
      <section className="flex flex-col gap-1 px-4">
        <QuizCreateForm />
      </section>
    </div>
  );
}
