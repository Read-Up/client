import { END_POINT } from "@/_constant/end-point";
import { HttpResponse, http } from "msw";
import { faker } from "@faker-js/faker";
import { MyQuizSetProgressSchema, QuizAnswerSubmitResponseSchema } from "@/_schemas/quiz/quiz";
import {
  QuizSetResponse,
  QuizSetResponseSchema,
  QuizSetResultResponseSchema,
  NewQuizSetListResponseSchema,
  QuizSetListItem,
} from "@/_schemas/quiz/quiz-set";
import { QuizSetListResponseSchema } from "@/_types/quiz/schema";

// 동일한 결과를 위해 seed 설정
faker.seed(1234);

// 전역에서 한 번 생성된 더미 데이터 (100개) - 기존 스키마용
const TOTAL_ELEMENTS = 100;
const dummyQuizSets = Array.from({ length: TOTAL_ELEMENTS }).map((_, i) => ({
  id: i + 1,
  userId: faker.number.int({ min: 1, max: 50 }),
  userNickname: faker.internet.username(),
  userProfileImageUrl: faker.image.avatar(),
  numberOfQuizzes: faker.number.int({ min: 2, max: 5 }),
  createdAt: faker.date.recent().toISOString().split("T")[0],
  averageScore: parseFloat(faker.number.float({ min: 3, max: 5 }).toFixed(2)), // 3.00 ~ 5.00 사이의 값
  correctRate: parseFloat(faker.number.float({ min: 0, max: 30 }).toFixed(1)),
  averageTime: faker.number.int({ min: 30, max: 300 }),
  numberOfParticipants: faker.number.int({ min: 10, max: 500 }),
}));

// 새로운 스키마에 맞는 더미 데이터 (100개)
const newDummyQuizSets = (chapterId: number): QuizSetListItem[] => {
  faker.seed(chapterId);
  return Array.from({ length: TOTAL_ELEMENTS }).map((_, i) => ({
    quizSetId: i + 1,
    userId: faker.number.int({ min: 1, max: 50 }),
    nickname: faker.internet.username(),
    profileImageUrl: faker.image.avatar(),
    createdAt: faker.date.recent().toISOString(),
    participantCount: faker.number.int({ min: 10, max: 500 }),
    likeAverage: parseFloat(faker.number.float({ min: 0, max: 5 }).toFixed(1)), // 0.0 ~ 5.0 사이의 값
    correctAnswerAverage: parseFloat(faker.number.float({ min: 0, max: 100 }).toFixed(1)), // 0.0 ~ 100.0 사이의 값
    estimatedTime: faker.number.int({ min: 60, max: 1800 }), // 1분 ~ 30분 (초 단위)
    totalQuizCount: faker.number.int({ min: 2, max: 10 }),
  }));
};

const dummyQuizSetWithQuizzes = (index: number, bookId: number): QuizSetResponse => {
  const quizSet = dummyQuizSets[index];

  if (!quizSet) {
    throw new Error(`Quiz set with index ${index} does not exist.`);
  }
  const quizzes = Array.from({ length: quizSet.numberOfQuizzes }).map((_, quizIndex) => ({
    quizId: quizIndex + 1,
    question: faker.lorem.sentence(),
    sequence: quizIndex + 1,
    quizOptionResponseList: Array.from({ length: 4 }).map((_, optionIndex) => ({
      quizOptionId: optionIndex + 1,
      sequence: optionIndex + 1,
      content: faker.lorem.word(),
    })),
  }));
  const createdAt = faker.date.recent().toISOString();

  const response: QuizSetResponse = {
    success: true,
    data: {
      bookId: bookId,
      chapterId: faker.number.int({ min: 1, max: 10 }), // 임의의 챕터 ID
      quizSetId: quizSet.id,
      createdAt: createdAt,
      quizResponseList: quizzes,
    },
    message: "Quiz set retrieved successfully",
  };
  return response;
};

export const quizMockups = [
  // 새로운 스키마를 사용한 퀴즈 세트 목록 조회 (페이징 처리)
  http.get(`${END_POINT.BASE_URL}/${END_POINT.QUIZ.SETS.DEFAULT}`, ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page") || 0);
    const size = Number(url.searchParams.get("size") || 10);
    const sort = url.searchParams.get("sort") || "like";
    const direction = url.searchParams.get("direction") || "DESC";
    const chapterId = Number(url.searchParams.get("chapterId") || 0);
    const dummyQuizSets = newDummyQuizSets(chapterId);

    const totalPages = Math.ceil(TOTAL_ELEMENTS / size);
    const start = page * size;
    const end = start + size;
    // 정렬 로직
    const sortedData = [...dummyQuizSets];
    console.log("sort", sort, "direction", direction);
    if (sort === "like") {
      console.log("인기순", direction);
      sortedData.sort((a, b) => (direction === "DESC" ? b.likeAverage - a.likeAverage : a.likeAverage - b.likeAverage));
    } else if (sort === "createdAt") {
      console.log("최신순", direction);
      sortedData.sort((a, b) =>
        direction === "DESC"
          ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      );
    } else if (sort === "difficulty") {
      console.log("난이도순", direction);
      sortedData.sort((a, b) =>
        direction === "DESC"
          ? b.correctAnswerAverage - a.correctAnswerAverage
          : a.correctAnswerAverage - b.correctAnswerAverage,
      );
    }
    console.log("sortedData", sortedData);
    const paginatedData = sortedData.slice(start, end);

    const response = {
      success: true,
      data: {
        content: paginatedData,
        pageable: {
          pageNumber: page,
          pageSize: size,
          sort: [
            {
              direction: direction,
              property:
                sort === "최신순"
                  ? "createdAt"
                  : sort === "인기순"
                    ? "likeAverage"
                    : sort === "난이도순"
                      ? "correctAnswerAverage"
                      : "participantCount",
              ignoreCase: false,
              nullHandling: "NATIVE",
              ascending: direction === "ASC",
              descending: direction === "DESC",
            },
          ],
          offset: page * size,
          paged: true,
          unpaged: false,
        },
        size: size,
        number: page,
        sort: [
          {
            direction: direction,
            property:
              sort === "최신순"
                ? "createdAt"
                : sort === "인기순"
                  ? "likeAverage"
                  : sort === "난이도순"
                    ? "correctAnswerAverage"
                    : "participantCount",
            ignoreCase: false,
            nullHandling: "NATIVE",
            ascending: direction === "ASC",
            descending: direction === "DESC",
          },
        ],
        first: page === 0,
        last: page === totalPages - 1,
        numberOfElements: sortedData.length,
        empty: sortedData.length === 0,
      },
      message: "Request succeeded.",
    };

    console.log("Mocked New Quiz Set List Response:", response);
    // 응답 타입 검증
    NewQuizSetListResponseSchema.parse(response);

    return HttpResponse.json(response);
  }),

  // 기존 스키마를 사용한 퀴즈 세트 목록 조회 (하위 호환성을 위해 유지)
  http.get(`${END_POINT.BASE_URL}/api/quiz-sets/legacy`, ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page") || 0);
    const size = Number(url.searchParams.get("size") || 10);

    const totalPages = Math.ceil(TOTAL_ELEMENTS / size);
    const start = page * size;
    const end = start + size;
    const paginatedData = dummyQuizSets.slice(start, end);

    const response = {
      quizSets: paginatedData,
      page: {
        size,
        number: page,
        totalElements: TOTAL_ELEMENTS,
        totalPages,
      },
    };

    console.log("Mocked Legacy Quiz Set List Response:", response);
    // 응답 타입 검증
    QuizSetListResponseSchema.parse(response);

    return HttpResponse.json(response);
  }),

  // 퀴즈 진행 사항 조회 (quizSetId로 조회)
  http.get(`${END_POINT.BASE_URL}/${END_POINT.QUIZ.SETS.MY_PROGRESS(":quizSetId")}`, ({ params }) => {
    const quizSetId = Number(params.quizSetId);

    const dummyData = {
      userQuizSetId: quizSetId,
      lastQuizId: 2,
      isEvaluated: false,
    };

    const dummyResponse = {
      success: true,
      data: dummyData,
    };

    MyQuizSetProgressSchema.parse(dummyResponse);
    console.log("Mocked Quiz Set Progress Response:", dummyResponse);

    return HttpResponse.json(dummyResponse);
  }),

  // 특정 퀴즈 세트 조회 (ID로 조회)
  http.get(`${END_POINT.BASE_URL}/api/private/quiz-sets/:quizSetId`, ({ params, request }) => {
    const url = new URL(request.url);
    const lastQuizId = Number(url.searchParams.get("lastQuizId") ?? 0);
    const quizSetId = Number(params.quizSetId);

    console.log("Fetching quiz set with ID:", quizSetId, "and lastQuizId:", lastQuizId);
    const bookId = 1; // 예시용
    const quizResponse = dummyQuizSetWithQuizzes(quizSetId - 1, bookId);

    console.log("Mocked Quiz Set Response:", quizResponse);
    QuizSetResponseSchema.parse(quizResponse);

    return HttpResponse.json(quizResponse);
  }),

  // 퀴즈 정답 제출 (quizSetId와 quizId로 조회)
  http.post(
    `${END_POINT.BASE_URL}/${END_POINT.QUIZ.SETS.ANSWER(":quizSetId", ":quizId")}`,
    async ({ params, request }) => {
      const quizSetId = Number(params.quizSetId);
      const quizId = Number(params.quizId);
      const { answerId } = (await request.json()) as { answerId: number };
      console.log("Submitting answer for quizSetId:", quizSetId, "quizId:", quizId, "answerId:", answerId);
      //     {
      //     "success": true,
      //     "data": {
      //         "isCorrect": false,
      //         "explanation": null
      //     },
      //     "message": "Request succeeded."
      // }
      const response = {
        success: true,
        data: {
          isCorrect: answerId === 1, // 예시로 항상 정답이 1이라고 가정
          explanation: faker.lorem.sentence(), // 예시로 임의의 설명
        },
        message: "Request succeeded.",
      };
      console.log("Mocked Quiz Answer Response:", response);
      // 응답 타입 검증
      QuizAnswerSubmitResponseSchema.parse(response);
      return HttpResponse.json(response);
    },
  ),

  // 퀴즈 세트 결과 조회 (quizSetId로 조회)
  http.get(`${END_POINT.BASE_URL}/${END_POINT.QUIZ.SETS.RESULT(":quizSetId")}`, ({ params }) => {
    const quizSetId = Number(params.quizSetId);
    console.log("Fetching quiz set result for quizSetId:", quizSetId);
    const totalQuizCount = faker.number.int({ min: 5, max: 20 });
    const onceCorrectQuizCount = faker.number.int({ min: 0, max: totalQuizCount });
    const retryCorrectQuizCount = faker.number.int({ min: 0, max: totalQuizCount - onceCorrectQuizCount });
    const is50Percent = (onceCorrectQuizCount + retryCorrectQuizCount) / totalQuizCount >= 0.5;

    const response = {
      success: true,
      data: {
        totalQuizCount,
        onceCorrectQuizCount,
        retryCorrectQuizCount,
        is50Percent,
      },
      message: "Quiz set result retrieved successfully",
    };
    console.log("Mocked Quiz Set Result Response:", response);
    // 응답 타입 검증
    QuizSetResultResponseSchema.parse(response);
    return HttpResponse.json(response);
  }),
];
