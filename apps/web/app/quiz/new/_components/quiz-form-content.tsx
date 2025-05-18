import { Form } from "@readup/ui/atoms";
import { useFormContext } from "react-hook-form";
import ChapterSelect from "./chapter-select";
import QuizCreateList from "./quiz-create-list";

export default function QuizFormContent() {
  const form = useFormContext();

  return (
    <Form {...form}>
      <ChapterSelect />
      <div className="flex flex-col gap-6">
        <QuizCreateList />
      </div>
    </Form>
  );
}
