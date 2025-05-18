"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { QuizCreateFormData, quizCreateFormSchema } from "../_types/quiz-create";
import QuizFormContent from "./quiz-form-content";
import QuizNewHeader from "./quiz-new-header";

export default function QuizForm() {
  const form = useForm<QuizCreateFormData>({
    resolver: zodResolver(quizCreateFormSchema),
    mode: "onSubmit",
    defaultValues: {
      bookId: 1,
      chapterId: 1,
      quizRequestList: [
        {
          question: "",
          explanation: "",
          quizOptionRequestList: [
            { content: "", isCorrect: false },
            { content: "", isCorrect: false },
          ],
        },
      ],
    },
  });

  return (
    <FormProvider {...form}>
      <div className="flex flex-col gap-1">
        <QuizNewHeader />
        <section className="flex flex-col gap-1 px-4">
          <QuizFormContent />
        </section>
      </div>
    </FormProvider>
  );
}
