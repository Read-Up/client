import PATH from "./path";

export default Object.freeze({
  HOME: {
    DEFAULT: {
      name: "홈",
      url: PATH.HOME.ROOT,
    },
  },
  LIBRARY: {
    DEFAULT: {
      name: "내 서재",
      url: PATH.LIBRARY.ROOT,
    },
  },
  MYPAGE: {
    DEFAULT: {
      name: "마이페이지",
      url: PATH.MYPAGE.ROOT,
    },
  },
  LOGIN: {
    DEFAULT: {
      name: "유저/로그인",
      url: PATH.LOGIN.ROOT,
    },
  },
  SIGNUP: {
    DEFAULT: {
      name: "유저/회원가입",
      url: PATH.SIGNUP.ROOT,
    },
  },
  QUIZ: {
    DEFAULT: {
      name: "퀴즈",
      url: PATH.QUIZ.ROOT,
    },
  },
});
