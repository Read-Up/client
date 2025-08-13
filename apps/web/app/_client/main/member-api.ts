"use client";

import type { KyInstance } from "ky";

import { clientApi } from "@/_server/main/instance";
import { revalidateCache } from "@/_server/main/helper";
import { END_POINT } from "@/_constant/end-point";
import { getClientApi } from "@/_server/main/get-instance";
import { useAuthStore } from "@/_stores/use-auth-store";

class API {
  // API: KyInstance = clientApi;
  API: KyInstance = getClientApi();

  constructor(ky?: KyInstance) {
    if (ky) {
      this.API = ky;
    } else {
      // this.API = clientApi;
      this.API = getClientApi();
    }
  }

  // ! 샘플

  async getMainList() {
    const { data } = await this.API(END_POINT.BOOKS.DEFAULT, {
      method: "GET",
    }).json<ResJson<MemberDTO["member"]>>();
    // .catch(parseErrorData);

    return data;
  }

  async createMain() {
    const { statusCode, message } = await this.API(END_POINT.BOOKS.DEFAULT, {
      method: "POST",
    }).json<ResJson<null>>();
    // .catch(parseErrorData);

    const isValid = statusCode === "OK";

    if (isValid) {
      await revalidateCache({ key: END_POINT.BOOKS.DEFAULT });
    }

    return { isValid, message };
  }

  async getCurrentUser() {
    try {
      const response = await this.API(END_POINT.USERS.DEFAULT, {
        method: "GET",
        credentials: "include", // 쿠키 포함
      }).json<ResJson<MemberDTO["member"]>>();
      return response.data; // 유저 정보 반환
    } catch {
      return null; // 로그인되지 않은 경우
    }
  }

  async logout() {
    try {
      // 로그아웃 API 호출
      console.log("로그아웃 API 추가 예정");

      // useAuthStore user 상태 변경
      useAuthStore.getState().clearAuth();

      // 쿼리 무효화 - 커스텀 이벤트로 알림
      window.dispatchEvent(new CustomEvent("auth:logout"));
    } catch (error) {
      console.error("로그아웃 중 오류 발생:", error);
    }
  }
}

export const MemberAPI = new API(clientApi);
