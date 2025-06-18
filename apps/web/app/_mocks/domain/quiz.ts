import { END_POINT } from "@/_constant/end-point";
import { QuizSetListResponseSchema } from "@/_types/quiz/schema";
import { HttpResponse, http } from "msw";
import { faker } from "@faker-js/faker";

// 동일한 결과를 위해 seed 설정
faker.seed(1234);

// 전역에서 한 번 생성된 더미 데이터 (100개)
const TOTAL_ELEMENTS = 100;
const dummyQuizSets = Array.from({ length: TOTAL_ELEMENTS }).map((_, i) => ({
  id: i + 1,
  userId: faker.number.int({ min: 1, max: 50 }),
  userNickname: faker.internet.userName(),
  userProfileImageUrl: faker.image.avatar(),
  numberOfQuizzes: faker.number.int({ min: 5, max: 20 }),
  createdAt: faker.date.recent().toISOString().split("T")[0],
  averageScore: parseFloat(faker.number.float({ min: 3, max: 5 }).toFixed(2)), // 3.00 ~ 5.00 사이의 값
  correctRate: parseFloat(faker.number.float({ min: 0, max: 30 }).toFixed(1)),
  averageTime: faker.number.int({ min: 30, max: 300 }),
  numberOfParticipants: faker.number.int({ min: 10, max: 500 }),
}));

export const quizMockups = [
  http.get(`${END_POINT.BASE_URL}/${END_POINT.QUIZ.SETS.DEFAULT}`, ({ request }) => {
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

    console.log("Mocked Quiz Set List Response:", response);
    // 응답 타입 검증
    QuizSetListResponseSchema.parse(response);

    return HttpResponse.json(response);
  }),
];
