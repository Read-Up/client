import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@readup/ui/button";
import { Form } from "@readup/ui/form";
import { FormProvider, useForm } from "react-hook-form";
import { QuizCreateFormData, quizCreateFormSchema } from "../_types/quiz-create";
import ChapterSelect from "./chapter-select";
import QuizCreateList from "./quiz-create-list";

export default function QuizCreateForm() {
  const form = useForm<QuizCreateFormData>({
    resolver: zodResolver(quizCreateFormSchema),
    defaultValues: {
      bookId: 1,
      chapterId: 1,
      quizRequestList: [
        {
          question: "",
          explanation: "",
          quizOptionRequestList: [{ content: "", isCorrect: false }],
        },
      ],
    },
  });

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <ChapterSelect />
        <div className="flex flex-col gap-6">
          <QuizCreateList />
          <div className="fw-[98px] mx-auto">
            <Button variant="outline">퀴즈 추가하기</Button>
          </div>
        </div>
      </Form>
    </FormProvider>
  );
}
