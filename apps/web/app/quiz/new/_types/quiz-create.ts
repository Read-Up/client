import { z } from "zod";

export const quizCreateFormSchema = z.object({
  bookId: z.number().int(),
  chapterId: z.number().int(),
  quizRequestList: z
    .array(
      z.object({
        question: z.string().min(1, "질문을 입력해주세요."),
        explanation: z.string().optional(),
        quizOptionRequestList: z
          .array(
            z.object({
              content: z.string().min(1, "옵션 내용을 입력해주세요."),
              isCorrect: z.boolean(),
            }),
          )
          .min(1, "최소 하나의 선택지를 입력해주세요."),
      }),
    )
    .min(1, "최소 하나의 퀴즈를 추가해주세요."),
});

export type QuizCreateFormData = z.infer<typeof quizCreateFormSchema>;
