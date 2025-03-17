'use client';

import type { KyInstance } from 'ky';

import { clientApi } from '@/_server/instance';
import { revalidateCache } from '@/_server/helper';
import { END_POINT } from '@/_constant/end-point';

// ----------------------------------------------------------------------

class API {
  API: KyInstance = clientApi;

  constructor(ky?: KyInstance) {
    if (ky) this.API = ky;
    else {
      this.API = clientApi;
    }
  }

  // ----------------------------------------------------------------------
  // ! 샘플

  async getMainList() {
    const { data } = await this.API(END_POINT.MAIN.예시1, {
      method: 'GET',
    })
      .json<{ data: any[] }>()
    // .catch(parseErrorData);

    return data;
  }

  async createMain() {
    const { status, message } = await this.API(END_POINT.MAIN.예시1, {
      method: 'POST',
    })
      .json<{ status: number, message: string }>()
    // .catch(parseErrorData);

    const isValid = status < 300;
    isValid && (await revalidateCache({ key: END_POINT.MAIN.예시1 }));

    return { isValid, message };
  }
}

export const MemberAPI = new API(clientApi);
