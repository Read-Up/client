import ky, { KyInstance } from "ky";
import { apiLogger, serverLogger, HttpError } from "@/_lib";
import { END_POINT } from "@/_constant/end-point";
import { useAuthStore } from "@/_stores/use-auth-store";

/**
 * 백엔드용 ky 인스턴스를 생성합니다 (SSR or API 요청에 사용).
 */
export const getBaseApi = (): KyInstance =>
  ky.create({
    prefixUrl: END_POINT.BASE_URL,
    timeout: false,
    headers: {
      "Content-Type": "application/json",
    },
    hooks: {
      beforeRequest: [
        async (request) => {
          // const JWT = parseJWT(await getServerToken('토큰명', ''));
          // request.headers.set('X-IDEATEC-AT-CLAIMS', encodeURIComponent(JSON.stringify(JWT)));
          return request;
        },
      ],
      afterResponse: [
        async (request, options, response) => {
          serverLogger({ result: "SUCCESS", request, status: response.status });
          return response;
        },
      ],
      beforeError: [
        async (error) => {
          serverLogger({ result: "ERROR", request: error.request, status: error.response.status });
          HttpError.backend(error);
          return error;
        },
      ],
    },
  });

/**
 * 클라이언트 요청용 ky 인스턴스를 생성합니다 (CSR, 브라우저 전용).
 */
export const getClientApi = (): KyInstance =>
  ky.create({
    prefixUrl: END_POINT.BASE_URL,
    timeout: false,
    hooks: {
      beforeRequest: [
        async (request) => {
          // 클라이언트 용 / 백엔드에서 쿠키 가져가면 사용할 필요 없음
          return request;
        },
      ],
      afterResponse: [
        async (request, options, response) => {
          if (response.ok) {
            apiLogger({
              status: response.status,
              reqData: request,
              resData: response,
              method: "log",
            });
          } else if (response.status === 401) {
            console.warn("Unauthorized access - possibly due to expired token.");
            if (typeof window !== "undefined") {
              window.dispatchEvent(new CustomEvent("auth:unauthorized"));
              window.dispatchEvent(new CustomEvent("auth:logout"));
            }
            useAuthStore.getState().clearAuth();
          }
          return response;
        },
      ],
      beforeError: [
        async (error) => {
          apiLogger({
            status: error.response.status,
            reqData: error.request,
            resData: error.response,
            method: "error",
          });
          HttpError.backend(error);
          return error;
        },
      ],
    },
  });
