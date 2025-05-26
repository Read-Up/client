"use client";

import { Button } from "@readup/ui/atoms/button";
import { useFormContext } from "react-hook-form";
import { QuizCreateFormData } from "../_types/quiz-create";

export default function QuizFormSaveButton() {
  const { handleSubmit } = useFormContext<QuizCreateFormData>();

  const onSubmit = async (data: QuizCreateFormData) => {
    try {
      console.log("Form data:", data);
      // TODO: API 호출 로직 추가
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Button variant="filled" size="sm" onClick={handleSubmit(onSubmit)}>
      저장
    </Button>
  );
}
