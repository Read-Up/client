import ky from 'ky';
// package
import { parseJWT } from '@readup/utils';

import { apiLogger, serverLogger, HttpError } from '@/_lib';
import { END_POINT } from '@/_constant/end-point';
// import { getServerToken } from './helper';

// ----------------------------------------------------------------------
// ! direct backend api instance

export const BaseApi = ky.create({
  prefixUrl: END_POINT.BASE_URL,
  timeout: false,
  headers: {
    'Content-Type': 'application/json',
  },
  hooks: {
    beforeRequest: [
      async request => {
        // const JWT = parseJWT(await getServerToken('토큰명', ''));

        // request.headers.set('X-IDEATEC-AT-CLAIMS', encodeURIComponent(JSON.stringify(JWT)));

        return request;
      },
    ],

    afterResponse: [
      async (request, options, response) => {
        serverLogger({ result: 'SUCCESS', request, status: response.status });

        return response;
      },
    ],
    beforeError: [
      async error => {
        serverLogger({ result: 'ERROR', request: error.request, status: error.response.status });

        HttpError.backend(error);

        return error;
      },
    ],
  },
});

// ----------------------------------------------------------------------
// ! client api instance

export const clientApi = ky.create({
  prefixUrl: END_POINT.BASE_URL,
  timeout: false,
  hooks: {
    beforeRequest: [
      async request => {
        // 클라이언트 용 / 백엔드에서 쿠키 가져가면 사용할 필요 없음

        return request;
      },
    ],

    afterResponse: [
      (request, options, response) => {
        if (response.ok) {
          apiLogger({
            status: response.status,
            reqData: request,
            resData: response,
            method: 'log',
          });
        }

        return response;
      },
    ],
    beforeError: [
      async error => {
        apiLogger({
          status: error.response.status,
          reqData: error.request,
          resData: error.response,
          method: 'error',
        });

        HttpError.backend(error);

        return error;
      },
    ],
  },
});