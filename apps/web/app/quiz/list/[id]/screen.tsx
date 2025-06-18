"use client";

import { BookDetail } from "@/_types/books/schema";

interface QuizListScreenProps {
  book: BookDetail;
}

export default function QuizListScreen({ book }: QuizListScreenProps) {
  return (
    <div className="flex flex-col w-full min-h-screen text-white p-4 gap-2">
      <h1 className="typo-title2">{book.title}</h1>
      <p className="typo-footnote text-primary">아직 퀴즈가 없습니다.</p>
      <div className="flex flex-col h-full overflow-y-auto gap-2">
        {/* 퀴즈 목록이 여기에 표시됩니다. */}
        {/* 예시로 빈 목록을 표시합니다. 실제로는 API에서 데이터를 받아와야 합니다. */}
        <div className="text-center text-gray-400">퀴즈가 없습니다.</div>
      </div>
    </div>
  );
}
