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
    PROFILE: `${ROOTS.SETTINGS}/profile`,
  },
});
