"use client";

import initMocks from "@/_mocks";
import { useEffect } from "react";

/**
 * MSWProvider는 개발 환경에서만 MSW를 초기화하는 컴포넌트입니다.
 * 이 컴포넌트를 사용하여 MSW를 설정하면, 개발 중에 API 요청을 가로채고 모킹된 응답을 반환할 수 있습니다.
 */
export const MSWProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      initMocks();
    }
  }, []);

  return <>{children}</>;
};
