import { z } from "zod";

// 퀴즈 세트 진행 상태 스키마 정의
export const MyQuizSetProgressSchema = z.object({
  success: z.boolean(),
  data: z.object({
    userQuizSetId: z.number(),
    lastQuizId: z.number(),
    isEvaluated: z.boolean(),
  }),
  message: z.string().optional(),
});

export type MyQuizSetProgress = z.infer<typeof MyQuizSetProgressSchema>;

// 퀴즈 정답 제출 응답 스키마 정의
export const QuizAnswerSubmitResponseSchema = z.object({
  success: z.boolean(),
  data: z.object({
    isCorrect: z.boolean(),
    explanation: z.string().nullable(),
  }),
  message: z.string().optional(),
});

export type QuizAnswerSubmitResponse = z.infer<typeof QuizAnswerSubmitResponseSchema>;
