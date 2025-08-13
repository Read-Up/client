"use client";

import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { MemberAPI } from "@/_client/main/member-api";
import { useAuthStore } from "@/_stores/use-auth-store";

export function useCurrentUserQuery() {
  const setUser = useAuthStore((s) => s.setUser);
  const setLastCheckedAt = useAuthStore((s) => s.setLastCheckedAt);
  const qc = useQueryClient();
  const clearAuth = useAuthStore((s) => s.clearAuth);

  const query = useQuery({
    queryKey: ["currentUser"],
    queryFn: () => {
      console.log("[useCurrentUserQuery] Fetching current user");
      return MemberAPI.getCurrentUser();
    }, // 로그인 안 되어 있으면 null 반환
    refetchInterval: 5 * 60 * 1000, // 5분 폴링(원하면 조정)
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    retry: false, // 401 같은 건 재시도 의미 없음
  });

  // 결과를 Zustand에 반영
  useEffect(() => {
    if (!query.isLoading) {
      setUser(query.data ?? null);
      setLastCheckedAt(Date.now());
    }
  }, [query.data, query.isLoading, setUser, setLastCheckedAt]);

  // 401 이벤트 → 즉시 무효화/재조회
  useEffect(() => {
    const onUnauthorized = () => {
      qc.invalidateQueries({ queryKey: ["currentUser"] });
    };
    window.addEventListener("auth:unauthorized", onUnauthorized);
    return () => window.removeEventListener("auth:unauthorized", onUnauthorized);
  }, [qc]);

  return {
    ...query,
    isLoggedIn: !!query.data,
    user: query.data ?? null,
    clearAuth,
  };
}
