import { z } from "zod";

/**
 * 퀴즈 세트 목록 아이템 스키마
 * @property {number} quizSetId - 퀴즈 세트 ID
 * @property {number} userId - 사용자 ID
 * @property {string} nickname - 사용자 닉네임
 * @property {string | null} profileImageUrl - 사용자 프로필 이미지 URL (null 가능)
 * @property {string} createdAt - 퀴즈 세트 생성 날짜 (ISO 8601 형식)
 * @property {number} participantCount - 참여자 수
 * @property {number} likeAverage - 좋아요 평균
 * @property {number} correctAnswerAverage - 정답률 평균
 * @property {number} estimatedTime - 예상 소요 시간 (초 단위)
 * @property {number} totalQuizCount - 총 퀴즈 개수
 */
export const QuizSetListItemSchema = z.object({
  quizSetId: z.number(),
  userId: z.number(),
  nickname: z.string(),
  profileImageUrl: z.string().nullable(),
  createdAt: z.string(),
  participantCount: z.number(),
  likeAverage: z.number(),
  correctAnswerAverage: z.number(),
  estimatedTime: z.number(),
  totalQuizCount: z.number(),
});

/**
 * 정렬 스키마
 * @property {string} direction - 정렬 방향 (ASC, DESC 등)
 * @property {string} property - 정렬 기준 속성
 * @property {boolean} ignoreCase - 대소문자 구분 여부
 * @property {string} nullHandling - null 처리 방식 (NATIVE, NULLS_FIRST, NULLS_LAST 등)
 * @property {boolean} ascending - 오름차순 여부
 * @property {boolean} descending - 내림차순 여부
 */
export const SortSchema = z.object({
  direction: z.string(),
  property: z.string(),
  ignoreCase: z.boolean(),
  nullHandling: z.string(),
  ascending: z.boolean(),
  descending: z.boolean(),
});

/**
 * 퀴즈 세트 목록 응답 스키마
 * @property {boolean} success - 요청 성공 여부
 * @property {object} data - 응답 데이터
 * @property {Array<QuizSetListItem>} data.content - 퀴즈 세트 목록
 * @property {object} data.pageable - 페이지 정보
 * @property {number} data.size - 페이지 크기
 * @property {number} data.number - 현재 페이지 번호
 * @property {Array<Sort>} data.sort - 정렬 정보
 * @property {boolean} data.first - 첫 페이지 여부
 * @property {boolean} data.last - 마지막 페이지 여부
 * @property {number} data.numberOfElements - 현재 페이지의 요소 수
 * @property {boolean} data.empty - 현재 페이지가 비어있는지 여부
 * @property {string} [message] - 추가 메시지 (선택적)
 */
export const NewQuizSetListResponseSchema = z.object({
  success: z.boolean(),
  data: z.object({
    content: z.array(QuizSetListItemSchema),
    pageable: z.object({
      pageNumber: z.number(),
      pageSize: z.number(),
      sort: z.array(SortSchema),
      offset: z.number(),
      paged: z.boolean(),
      unpaged: z.boolean(),
    }),
    size: z.number(),
    number: z.number(),
    sort: z.array(SortSchema),
    first: z.boolean(),
    last: z.boolean(),
    numberOfElements: z.number(),
    empty: z.boolean(),
  }),
  message: z.string().optional(),
});
export type QuizSetListItem = z.infer<typeof QuizSetListItemSchema>;
export type newQuizSetListResponse = z.infer<typeof NewQuizSetListResponseSchema>;

/**
 * 퀴즈 응답 스키마
 * @property {number} quizOptionId - 퀴즈 옵션 ID
 * @property {number} sequence - 퀴즈 옵션의 순서
 * @property {string} content - 퀴즈 옵션 내용
 */
export const QuizOptionResponseSchema = z.object({
  quizOptionId: z.number(), // 퀴즈 옵션 ID
  sequence: z.number(), // 퀴즈 옵션의 순서
  content: z.string(), // 퀴즈 옵션 내용
});

/**
 * 퀴즈 스키마
 * @property {number} quizId - 퀴즈 ID
 * @property {number} sequence - 퀴즈의 순서
 * @property {string} question - 퀴즈 질문
 * @property {Array<QuizOptionResponse>} quizOptionResponseList - 퀴즈 옵션 목록
 */
export const QuizSchema = z.object({
  quizId: z.number(),
  sequence: z.number(), // 퀴즈의 순서
  question: z.string(), // 퀴즈 질문
  quizOptionResponseList: z.array(QuizOptionResponseSchema),
});

/**
 * 퀴즈 세트 스키마
 * @property {number} bookId - 책 ID
 * @property {number} chapterId - 챕터 ID
 * @property {number} quizSetId - 퀴즈 세트 ID
 * @property {string} createdAt - ISO 8601 형식의 날짜 문자열
 * @property {Array<Quiz>} quizResponseList - 퀴즈 목록
 */
export const QuizSetSchema = z.object({
  bookId: z.number(), // 책 ID
  chapterId: z.number(), // 챕터 ID
  quizSetId: z.number(), // 퀴즈 세트 ID
  createdAt: z.string(), // ISO 8601 형식의 날짜 문자열
  quizResponseList: z.array(QuizSchema), // 퀴즈 목록
});

/**
 * 퀴즈 세트 응답 스키마
 * @property {boolean} success - 요청 성공 여부
 * @property {QuizSet} data - 퀴즈 세트 데이터
 * @property {string} [message] - 추가 메시지 (선택적)
 */
export const QuizSetResponseSchema = z.object({
  success: z.boolean(),
  data: QuizSetSchema,
  message: z.string().optional(),
});

export type Quiz = z.infer<typeof QuizSchema>;
export type QuizSet = z.infer<typeof QuizSetSchema>;
export type QuizSetResponse = z.infer<typeof QuizSetResponseSchema>;

/**
 * 퀴즈 세트 결과 스키마
 * @property {number} totalQuizCount - 총 퀴즈 개수
 * @property {number} onceCorrectQuizCount - 한 번에 정답을 맞춘 퀴즈 개수
 * @property {number} retryCorrectQuizCount - 재도전 후 정답을 맞춘 퀴즈 개수
 * @property {boolean} is50Percent - 50% 이상 정답 여부
 */
export const QuizSetResultSchema = z.object({
  totalQuizCount: z.number(),
  onceCorrectQuizCount: z.number(),
  retryCorrectQuizCount: z.number(),
  is50Percent: z.boolean(),
});

/**
 * 퀴즈 세트 결과 응답 스키마
 * @property {boolean} success - 요청 성공 여부
 * @property {QuizSetResult} data - 퀴즈 세트 결과 데이터
 * @property {string} [message] - 추가 메시지 (선택적)
 */
export const QuizSetResultResponseSchema = z.object({
  success: z.boolean(),
  data: QuizSetResultSchema,
  message: z.string().optional(),
});

export type QuizSetResult = z.infer<typeof QuizSetResultSchema>;
export type QuizSetResultResponse = z.infer<typeof QuizSetResultResponseSchema>;
