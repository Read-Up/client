export const END_POINT = {
  BASE_URL: process.env.BACKEND_URL ?? process.env.NEXT_PUBLIC_BACKEND_URL,
  // 도메인 별로 API 경로를 정의합니다.
  BOOKS: {
    DEFAULT: "api/public/books",
    DEFAULT_ISBN: (isbn: string | number) => `api/public/books?isbn=${isbn}`,
    DETAIL: (id: string | number) => `api/public/books/${id}`,
  },
  BOOKINFO: {
    EXTERNAL_BOOKS: (isbn: string | number) => `api/public/external-books/${isbn}`,
  },
  QUIZ: {
    SETS: {
      DEFAULT: "api/public/quiz-sets",
      BY_BOOK_ID: (bookId: string | number) => `api/public/quiz-sets?bookId=${bookId}`,
      BY_ID: (id: string | number) => `api/public/quiz-sets/${id}`,
      MY_PROGRESS: (quizSetId: string | number) => `api/private/quiz-sets/${quizSetId}/my-progress`,
      BY_LAST_QUIZ_ID: (quizSetId: string | number, lastQuizId: string | number) =>
        `api/private/quiz-sets/${quizSetId}?lastQuizId=${lastQuizId}`,
      ANSWER: (quizSetId: string | number, quizId: string | number) =>
        `api/private/quiz-sets/${quizSetId}/quizzes/${quizId}/answer`,
      RESULT: (quizSetId: string | number) => `api/private/quiz-sets/${quizSetId}/result`,
    },
    QUIZZES: {
      DEFAULT: "api/public/quizzes",
      BY_SET_ID: (setId: string | number) => `api/public/quizzes?setId=${setId}`,
      BY_ID: (id: string | number) => `api/public/quizzes/${id}`,
    },
  },
  SIGNUP: {
    TERMS: "api/public/terms",
  },
  LOGIN: {
    OAUTH: "api/public/oauth2",
  },
  USERS: {
    RANDOM_NICKNAME: "api/public/users/random-nickname",
    SIGNUP: "api/private/users/signup",
  },
};
