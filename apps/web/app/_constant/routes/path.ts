const ROOTS = {
  HOME: "/",
  BOOK: "/book",
  LIBRARY: "/library",
  LOGIN: "/login",
  MYPAGE: "/mypage",
  SIGNUP: "/signup",
  QUIZ: "/quiz",
  API: "/api",
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
  API: {
    ROOT: ROOTS.API,
    PUBLIC: {
      OAUTH: `${ROOTS.API}/public/oauth2`,
    },
  },
});
