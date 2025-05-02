export const END_POINT = {
  BASE_URL: process.env.BACKEND_URL ?? process.env.NEXT_PUBLIC_BACKEND_URL,
  // 도메인 별로 API 경로를 정의합니다.
  MAIN: {
    예시1: "/api/v1/예시1",
    예시2: "/api/v1/예시2",
  },
  USERS: {
    RANDOM_NICKNAME: "/api/public/users/random-nickname",
  },
};
