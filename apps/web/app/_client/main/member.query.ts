"use client";

import { useQuery } from "@tanstack/react-query";

import { MemberAPI } from "./member-api";
import { END_POINT } from "@/constant/end-point";

export const useMemPointAllListQuery = (open: boolean) => {
  const queryFn = () => MemberAPI.getMainList();

  return useQuery({
    queryKey: [END_POINT.MAIN.예시1],
    queryFn,
    enabled: open,
  });
};
