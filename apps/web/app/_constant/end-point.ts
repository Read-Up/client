export const END_POINT = {
  BASE_URL: process.env.BACKEND_URL ?? process.env.NEXT_PUBLIC_BACKEND_URL,
  // 도메인 별로 API 경로를 정의합니다.
  BOOK: {
    DEFAULT: "api/public/books",
    DETAIL: (id: string | number) => `api/public/books/${id}`,
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
