import { z } from "zod";

// 퀴즈 세트 정보 스키마 정의
export const QuizSetSchema = z.object({
  id: z.number(),

  // 유저 정보
  userId: z.number(),
  userNickname: z.string(),
  userProfileImageUrl: z.string().nullable(),

  // 퀴즈 세트 정보
  numberOfQuizzes: z.number(),
  createdAt: z.string(), // YYYY-MM-DD 형식의 문자열
  averageScore: z.number(), // 평균 점수 (0.00 ~ 5.00 사이의 값)
  correctRate: z.number(), // 정답률
  averageTime: z.number(), // 평균 푸는 시간 (초 단위)
  numberOfParticipants: z.number(), // 참여자 수
});

export const QuizSetListResponseSchema = z.object({
  quizSets: z.array(QuizSetSchema),
  page: z.object({
    size: z.number(), // 페이지 크기
    number: z.number(), // 현재 페이지 번호
    totalElements: z.number(), // 전체 요소 수
    totalPages: z.number(), // 전체 페이지 수
  }),
  message: z.string().optional(), // 성공 메시지
});

export type QuizSet = z.infer<typeof QuizSetSchema>;
export type QuizSetListResponse = z.infer<typeof QuizSetListResponseSchema>;

// 퀴즈 정보 스키마 정의
export const QuizSchema = z.object({
  id: z.number(),
  question: z.string(), // 퀴즈 질문
  options: z.array(z.string()), // 선택지 배열
  answer: z.number(), // 정답 인덱스 (0부터 시작)
  explanation: z.string().nullable(), // 해설 (선택 사항)
});

// 퀴즈 세트에 포함된 퀴즈 정보 스키마 정의
export const QuizSetWithQuizzesSchema = QuizSetSchema.extend({
  quizzes: z.array(QuizSchema), // 퀴즈 세트에 포함된 퀴즈 배열
});

export type Quiz = z.infer<typeof QuizSchema>;
export type QuizSetWithQuizzes = z.infer<typeof QuizSetWithQuizzesSchema>;
