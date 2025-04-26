"use client";

import type { KyInstance } from "ky";

import { clientApi } from "@/_server/instance";
import { revalidateCache } from "@/_server/helper";
import END_POINT from "@/_constant/end-point";

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
    const { data } = await this.API(END_POINT.BOOK.SEARCH.ISBN, {
      method: "GET",
    }).json<ResJson<MemberDTO["member"]>>();
    // .catch(parseErrorData);

    return data;
  }

  async createMain() {
    const { statusCode, message } = await this.API(END_POINT.BOOK.SEARCH.ISBN, {
      method: "POST",
    }).json<ResJson<null>>();
    // .catch(parseErrorData);

    const isValid = statusCode === "OK";

    if (isValid) {
      await revalidateCache({ key: END_POINT.BOOK.SEARCH.ISBN });
    }

    return { isValid, message };
  }
}

export const MemberAPI = new API(clientApi);
