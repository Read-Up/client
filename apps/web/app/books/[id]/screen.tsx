"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { BaseApi } from "@/_server/main/instance";
import { BookItem } from "@/_types/books/schema";
import { END_POINT } from "@/_constant/end-point";
import Image from "next/image";
import { Button } from "@readup/ui/atoms";
import { PATH } from "@/_constant/routes";

export default function BookDetailScreen() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const {
    data: book,
    isLoading,
    error,
  } = useQuery<BookItem | null>({
    queryKey: ["book", id],
    queryFn: async () => {
      if (!id) {
        return null;
      }
      const res = await BaseApi.get(END_POINT.BOOKS.DETAIL(id)).json<{ data: BookItem }>();
      return res.data;
    },
    enabled: !!id,
  });

  const handleChoiceQuiz = () => {
    router.push(`${PATH.QUIZ.CHOICE.ROOT}/${id}`);
  };

  const handleCreateQuiz = () => {
    router.push(`${PATH.QUIZ.CREATE.ROOT}/${id}`);
  };

  const handleSeeMoreQuizzes = () => {
    // 해당 책의 퀴즈를 작성 했는지 안했는지 확인하는 로직 필요
    // 작성하지 않았다면 퀴즈 작성 모달 표시
    // 작성했다면 퀴즈 목록 페이지로 이동
    // if (!book?.hasQuiz) {}
    router.push(`${PATH.QUIZ.LIST.ROOT}/${id}`);
  };

  if (isLoading) {
    return <div style={{ color: "#fff", padding: 32 }}>로딩중...</div>;
  }
  if (error) {
    return <div style={{ color: "#fff", padding: 32 }}>책 정보를 불러오는 중 오류가 발생했습니다.</div>;
  }
  if (!book) {
    return <div style={{ color: "#fff", padding: 32 }}>책 정보를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="bg-background min-h-screen text-white">
      {/* 표지 및 기본 정보 */}
      <section className="flex flex-col w-full items-center p-4 gap-2">
        <Image
          src={`https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/${book.isbn}.jpg`}
          alt="책 표지"
          width={181}
          height={275}
          className="rounded-lg object-cover"
        />
        <h1 style={{ margin: "24px 0 8px 0", fontSize: 20, fontWeight: 600, textAlign: "center" }}>{book.title}</h1>
        <div style={{ fontSize: 12, color: "#95999d", marginBottom: 2 }}>
          저자명 <span style={{ color: "#fff" }}>{book.author}</span>
        </div>
        <div style={{ fontSize: 12, color: "#95999d", marginBottom: 2 }}>
          출판사 <span style={{ color: "#fff" }}>{book.publisher}</span>
        </div>
        <div style={{ fontSize: 12, color: "#95999d", marginBottom: 2 }}>
          ISBN <span style={{ color: "#fff" }}>{book.isbn}</span>
        </div>
        <Button variant="filled" className="w-full" onClick={handleChoiceQuiz}>
          퀴즈 풀어보기
        </Button>
        <Button variant="filled" className="w-full" onClick={handleCreateQuiz}>
          퀴즈 작성하기
        </Button>
        <Button variant="filled" className="w-full" onClick={handleSeeMoreQuizzes}>
          퀴즈 더 보기
        </Button>
      </section>
    </div>
  );
}
