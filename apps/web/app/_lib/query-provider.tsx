"use client";

import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider, useQueryClient } from "@tanstack/react-query";
import { useCurrentUserQuery } from "@/_hooks/use-current-user-query";

// Provider 아래에서만 useQuery를 호출하기 위해 분리
function AuthBootstrap() {
  const qc = useQueryClient();

  // 주기적 로그인 상태 확인(훅 내부에서 refetchInterval 등 설정)
  useCurrentUserQuery();

  // 탭 재진입 시 강제 리페치
  useEffect(() => {
    const handler = () => {
      if (document.visibilityState === "visible") {
        qc.invalidateQueries({ queryKey: ["currentUser"] });
      }
    };

    const onLogout = () => {
      console.log("[AuthBootstrap] User logged out, invalidating queries");
      qc.setQueryData(["currentUser"], null);
      qc.cancelQueries({ queryKey: ["currentUser"] });
      qc.invalidateQueries({ queryKey: ["currentUser"] });
    };

    document.addEventListener("visibilitychange", handler);
    window.addEventListener("auth:logout", onLogout as EventListener);

    return () => {
      document.removeEventListener("visibilitychange", handler);
      window.removeEventListener("auth:logout", onLogout as EventListener);
    };
  }, [qc]);

  return null; // UI 없음
}

export const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  // 단일 QueryClient 인스턴스
  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            networkMode: "offlineFirst",
            refetchOnWindowFocus: false,
            staleTime: 60_000,
            retry: false,
          },
          mutations: {
            networkMode: "offlineFirst",
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={client}>
      <AuthBootstrap />
      {children}
    </QueryClientProvider>
  );
};
