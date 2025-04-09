// TODO: api/swagger-ui 이후 backend endpoint을 확인하여 정리하기
export default Object.freeze({
  BASE_URL: process.env.BACKEND_URL ?? process.env.NEXT_PUBLIC_BACKEND_URL,
  // 도메인 별로 API 경로를 정의합니다.
  BOOK: {
    SEARCH: {
      ISBN: "/api/public/external-books",
    },
  },
  LOGIN: {
    DEFAULT: "/api/login",
    KAKAO: "/api/login/kakao",
    NAVER: "/api/login/naver",
    GOOGLE: "/api/login/google",
  },
  USER: {
    DEFAULT: "/api/user",
  },
});
