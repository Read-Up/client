"use client";

import { BookDetail } from "@/_types/books/schema";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@readup/ui/atoms/select";
import { useCallback, useEffect, useRef, useState } from "react";
import { QuizTabs } from "./_components/quiz-tabs";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getClientApi } from "@/_server/main/get-instance";
import { END_POINT } from "@/_constant/end-point";
import { QuizSetListResponseSchema } from "@/_types/quiz/schema";
import { HeartFilledSVG } from "@readup/icons";
import Image from "next/image";
import { Dropdown, DropdownMenuItem } from "@readup/ui/atoms/dropdown";

interface QuizListScreenProps {
  book: BookDetail;
}

export default function QuizListScreen({ book }: QuizListScreenProps) {
  const [currentType, setCurrentType] = useState("all");
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["quizSets", book.bookId, currentType],
    queryFn: async ({ pageParam = 0 }) => {
      const res = await getClientApi()
        .get(`${END_POINT.QUIZ.SETS.BY_BOOK_ID(book.bookId)}&page=${pageParam}`)
        .json();

      console.log("Fetched quiz sets:", res);
      const parsed = QuizSetListResponseSchema.parse(res);
      return parsed;
    },
    getNextPageParam: (lastPage) => {
      const currentPage = lastPage.page.number;
      const totalPages = lastPage.page.totalPages;
      return currentPage + 1 < totalPages ? currentPage + 1 : undefined;
    },
    initialPageParam: 0,
  });

  const handleTypeChange = useCallback(
    (type: string) => {
      setCurrentType(type);
    },
    [setCurrentType],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0] && entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 },
    );

    const target = loaderRef.current;
    if (target) {
      observer.observe(target);
    }

    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <section className="flex flex-col w-full min-h-screen text-white p-4 gap-4">
      <h1 className="typo-title2">{book.title}</h1>
      <Select>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="챕터를 선택해주세요" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {book.chapterList.map((chapter) => (
              <SelectItem key={chapter.chapterId} value={chapter.chapterId.toString()}>
                {chapter.chapterName}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <QuizTabs currentType={currentType} onTypeChange={handleTypeChange} />
      <Dropdown className="bg-background">
        {["인기순", "최신순", "난이도상", "난이도하"].map((option) => (
          <DropdownMenuItem
            key={option}
            onClick={() => console.log(`Selected: ${option}`)}
            className="bg-background typo-title3 text-white hover:text-white"
          >
            {option}
          </DropdownMenuItem>
        ))}
      </Dropdown>
      <div className="flex flex-col gap-2 w-full flex-grow overflow-y-auto">
        {data?.pages.flatMap((page) =>
          page.quizSets.map((quiz) => (
            <div key={quiz.id} className="px-3 py-4 flex flex-col gap-3 bg-surface">
              <div className="flex flex-row items-center justify-between typo-badge text-gray-60">
                <div className="flex flex-row items-center gap-1">
                  <HeartFilledSVG fill="#95999d" size="xs" />
                  <p>{quiz.averageScore}</p>
                </div>
                <p>{quiz.createdAt}</p>
              </div>
              <p className="typo-title3 text-white">{quiz.numberOfQuizzes}개의 퀴즈를 풀 수 있어요</p>
              <div className="flex flex-row items-center gap-2 typo-badge text-black">
                <p className="bg-secondary px-2 py-1 rounded-full">정답률 {quiz.correctRate}%</p>
                <p className="bg-primary px-2 py-1 rounded-full">평균 {quiz.averageTime}분</p>
              </div>
              <div className="flex flex-row items-center justify-between">
                <div className="flex flex-row items-center gap-2">
                  <Image
                    src={quiz.userProfileImageUrl || "/default-profile.png"}
                    alt={quiz.userNickname}
                    width={24}
                    height={24}
                    className="rounded-full object-cover"
                  />
                  <p className="typo-body text-white">{quiz.userNickname}</p>
                </div>
                <p className="typo-badge text-white">{quiz.numberOfParticipants}명이 이 퀴즈를 풀었어요</p>
              </div>
            </div>
          )),
        )}
        {/* 무한스크롤 로더 영역 */}
        <div ref={loaderRef} className="py-4 text-center text-gray-400">
          {isFetchingNextPage ? "불러오는 중..." : hasNextPage ? "스크롤을 내려 더보기" : "마지막 퀴즈입니다"}
        </div>
      </div>
    </section>
  );
}
