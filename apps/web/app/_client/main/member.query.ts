"use client";

import { useQuery } from "@tanstack/react-query";

import { END_POINT } from "@/_constant/end-point";
import { MemberAPI } from "./member-api";

export const useMemPointAllListQuery = (open: boolean) => {
  const queryFn = () => MemberAPI.getMainList();

  return useQuery({
    queryKey: [END_POINT.BOOK.DEFAULT],
    queryFn,
    enabled: open,
  });
};
