import { z } from "zod";

const quizSchema = z.object({
  question: z.string().min(1, "퀴즈 내용을 입력해주세요.").max(150, "최대 150자까지 입력 가능합니다."),
  explanation: z.string().optional(),
  quizOptionRequestList: z
    .array(
      z.object({
        content: z.string().min(1, "답안을 입력하거나, 삭제해주세요."),
        isCorrect: z.boolean(),
      }),
    )
    .min(2, "최소 두 개의 선택지를 입력해주세요.")
    .refine((options) => options.some((option) => option.isCorrect), {
      message: "정답을 하나 이상 선택해주세요.",
    }),
});

export const quizCreateFormSchema = z.object({
  bookId: z.number().int(),
  chapterId: z.number().int(),
  quizRequestList: z.array(quizSchema).min(1, "최소 하나의 퀴즈를 추가해주세요."),
});

export type QuizCreateFormData = z.infer<typeof quizCreateFormSchema>;
