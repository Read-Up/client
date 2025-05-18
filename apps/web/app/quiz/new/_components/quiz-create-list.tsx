"use client";

import { Button } from "@readup/ui/atoms";
import { useFieldArray, useFormContext } from "react-hook-form";
import { QuizCreateFormData } from "../_types/quiz-create";
import QuizCreateCard from "./quiz-create-card";

export default function QuizCreateList() {
  const { control } = useFormContext<QuizCreateFormData>();
  const { fields, append } = useFieldArray({
    control,
    name: "quizRequestList",
  });

  const handleAddQuiz = () => {
    append({
      question: "",
      explanation: "",
      quizOptionRequestList: [
        { content: "", isCorrect: false },
        { content: "", isCorrect: false },
      ],
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        {fields.map((field, index) => (
          <QuizCreateCard key={field.id} index={index + 1} />
        ))}
      </div>
      <div className="fw-[98px] mx-auto">
        <Button variant="outline" onClick={handleAddQuiz}>
          퀴즈 추가하기
        </Button>
      </div>
    </div>
  );
}
