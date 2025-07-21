import { useInfiniteQuery } from "@tanstack/react-query";
import { getClientApi } from "@/_server/main/get-instance";
import { END_POINT } from "@/_constant/end-point";
import { NewQuizSetListResponseSchema } from "@/_schemas/quiz/quiz-set";

interface UseInfiniteQuizSetsOptions {
  bookId: number;
  filterType?: string;
  sortOption?: string;
  direction?: string;
  pageSize?: number;
  enabled?: boolean;
}

export function useInfiniteQuizSets({
  bookId,
  filterType = "all",
  sortOption = "like",
  direction = "DESC",
  pageSize = 10,
  enabled = true,
}: UseInfiniteQuizSetsOptions) {
  return useInfiniteQuery({
    queryKey: ["quizSets", bookId, filterType, sortOption, direction, pageSize],
    queryFn: async ({ pageParam = 0 }) => {
      const res = await getClientApi()
        .get(
          `${END_POINT.QUIZ.SETS.BY_BOOK_ID(bookId)}&page=${pageParam}&size=10&sort=${sortOption}&direction=${direction}`,
        )
        .json();

      console.log("Fetched quiz sets:", res);
      const parsed = NewQuizSetListResponseSchema.parse(res);
      return parsed;
    },
    getNextPageParam: (lastPage) => {
      const currentPage = lastPage.data.number;
      const isLast = lastPage.data.last;
      return isLast ? undefined : currentPage + 1;
    },
    initialPageParam: 0,
    enabled,
    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 1000 * 60 * 10, // 10분
  });
}
