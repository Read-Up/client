"use client";

import type { KyInstance } from "ky";

import { END_POINT } from "@/_constant/end-point";
import { revalidateCache } from "@/_server/main/helper";
import { clientApi } from "@/_server/main/instance";

class API {
  API: KyInstance = clientApi;

  constructor(ky?: KyInstance) {
    if (ky) {
      this.API = ky;
    } else {
      this.API = clientApi;
    }
  }

  // ! 샘플

  async getMainList() {
    const { data } = await this.API(END_POINT.BOOK.DEFAULT, {
      method: "GET",
    }).json<ResJson<MemberDTO["member"]>>();
    // .catch(parseErrorData);

    return data;
  }

  async createMain() {
    const { statusCode, message } = await this.API(END_POINT.BOOK.DEFAULT, {
      method: "POST",
    }).json<ResJson<null>>();
    // .catch(parseErrorData);

    const isValid = statusCode === "OK";

    if (isValid) {
      await revalidateCache({ key: END_POINT.BOOK.DEFAULT });
    }

    return { isValid, message };
  }
}

export const MemberAPI = new API(clientApi);
