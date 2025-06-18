const ROOTS = {
  HOME: "/",
  BOOKS: "/books",
  LIBRARY: "/library",
  LOGIN: "/login",
  MYPAGE: "/mypage",
  SIGNUP: "/signup",
  QUIZ: "/quiz",
  SETTINGS: "/settings",
};

/**
 * @this PATH
 *
 */
export default Object.freeze({
  HOME: {
    ROOT: ROOTS.HOME,
  },
  BOOKS: {
    ROOT: ROOTS.BOOKS,
    ADD: {
      ROOT: `${ROOTS.BOOKS}/add`, // 책 추가 페이지
      COMPLETE: `${ROOTS.BOOKS}/add/complete`, // 책 추가 완료 페이지
      CHAPTER: `${ROOTS.BOOKS}/add/chapter`, // 책 목차 추가 페이지
    },
  },
  LIBRARY: {
    ROOT: ROOTS.LIBRARY,
  },
  MYPAGE: {
    ROOT: ROOTS.MYPAGE,
  },
  LOGIN: {
    ROOT: ROOTS.LOGIN,
  },
  SIGNUP: {
    ROOT: ROOTS.SIGNUP,
  },
  QUIZ: {
    ROOT: ROOTS.QUIZ,
    SOLVE: {
      ROOT: `${ROOTS.QUIZ}/solve`, // 퀴즈 풀기 페이지
    },
    LIST: {
      ROOT: `${ROOTS.QUIZ}/list`, // 퀴즈 목록 페이지
    },
  },
  SETTINGS: {
    ROOT: ROOTS.SETTINGS,
    PROFILE: `${ROOTS.SETTINGS}/profile`, // 회원정보 수정
    LOGOUT: `${ROOTS.SETTINGS}/logout`, // 로그아웃
    WITHDRAWAL: `${ROOTS.SETTINGS}/withdrawal`, // 회원탈퇴
    TERMS_OF_SERVICE: `${ROOTS.SETTINGS}/terms-of-service`, // 서비스 이용약관
    PRIVACY_POLICY: `${ROOTS.SETTINGS}/privacy-policy`, // 개인정보 처리방침
    NOTICE: `${ROOTS.SETTINGS}/notice`, // 공지사항
  },
});
