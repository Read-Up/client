"use server";

import { END_POINT } from "@/_constant/end-point";
import { BaseApi } from "./instance";

// ! 서버 api 호출 샘플
export const getSample = async () => {
  return BaseApi(END_POINT.BOOKS.DEFAULT, {
    method: "GET",
  }).json<ResJson<MemberDTO["member"]>>();
};
