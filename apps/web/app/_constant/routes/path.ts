const ROOTS = {
  HOME: "/",
  BOOK: "/book",
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
  BOOK: {
    ROOT: ROOTS.BOOK,
    SEARCH: `${ROOTS.BOOK}/search`,
    DETAIL: `${ROOTS.BOOK}/detail`,
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
