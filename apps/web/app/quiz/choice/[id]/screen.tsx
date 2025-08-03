"use client";

import { BookDetail } from "@/_types/books/schema";
import ChapterListItem from "./_components/chapter-list-item";
import { useRouter } from "next/navigation";

type QuizSolveScreenProps = {
  book: BookDetail; // SSR에서 받은 초기 데이터
};

export default function QuizChoiceScreen({ book }: QuizSolveScreenProps) {
  const router = useRouter();
  const handleChapterClick = (chapterId: number) => {
    router.push(`/quiz/list/${book.bookId}?chapterId=${chapterId}`);
  };

  return (
    <div className="flex flex-col w-full h-screen text-white p-4 gap-2">
      <h1 className="typo-title1">어떤 챕터의 퀴즈를 풀어볼까요?</h1>
      <p className="typo-footnote text-primary">내가 만든 퀴즈가 있는 챕터에 대한 유저들의 퀴즈가 열려있어요!</p>
      <div className="flex flex-col h-full overflow-y-auto gap-2">
        {book.chapterList.map((chapter, idx) => (
          <ChapterListItem
            key={idx}
            title={chapter.chapterName}
            disabled={idx % 2 !== 0}
            onClick={() => handleChapterClick(chapter.chapterId)}
          />
        ))}
      </div>
    </div>
  );
}
