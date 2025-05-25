import { Form } from "@readup/ui/atoms/form";
import { useFormContext } from "react-hook-form";
import QuizFormChapterSelect from "./quiz-form-chapter-select";
import QuizFormList from "./quiz-form-list";

export default function QuizFormContent() {
  const form = useFormContext();

  return (
    <Form {...form}>
      <QuizFormChapterSelect />
      <div className="flex flex-col gap-6">
        <QuizFormList />
      </div>
    </Form>
  );
}
