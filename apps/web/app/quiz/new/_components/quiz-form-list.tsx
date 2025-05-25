"use client";

import { Button } from "@readup/ui/atoms/button";
import { useFieldArray, useFormContext } from "react-hook-form";
import { QuizCreateFormData } from "../_types/quiz-create";
import QuizFormCard from "./quiz-form-card";

export default function QuizFormList() {
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
          <QuizFormCard key={field.id} index={index + 1} />
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
