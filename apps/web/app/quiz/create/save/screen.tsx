"use client";

import { PATH } from "@/_constant/routes";
import { useQuestionStore } from "@/quiz/_store/useQuestionStore";
import { CompleteCheckSVG } from "@readup/icons";
import { CircularProgress } from "@readup/ui/organisms";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function QuizCreateSaveScreen() {
  const router = useRouter();
  const { questions, book, chapterId } = useQuestionStore();
  const [value, setValue] = useState(0);

  useEffect(() => {
    // 페이지가 로드될 때 질문 목록을 콘솔에 출력
    console.log("현재 질문 목록:", questions);
    console.log("현재 책 정보:", book);
    console.log("현재 챕터 ID:", chapterId);
  }, [questions, book, chapterId]);

  useEffect(() => {
    if (value >= 100) {
      // 100%에 도달하면 다음 페이지로 이동
      // console.log("퀴즈 저장 완료");
      if (book) {
        router.push(`${PATH.QUIZ.LIST.ROOT}/${book.bookId}`);
      } else {
        router.push(PATH.BOOKS.ROOT);
      }
      return;
    }

    const progress = 1 - Math.pow(1 - value / 100, 3); // ease-out
    const increment = (1 - progress) * 10 + 1; // 더 빠르게 증가
    const delay = 10 + progress * 50; // 더 짧은 간격

    const timer = setTimeout(() => {
      setValue((prev) => Math.min(prev + increment, 100));
    }, delay);

    return () => clearTimeout(timer);
  }, [value, router, book]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 gap-10">
      <h1 className="typo-title1 text-white">{value < 100 ? "퀴즈를 저장하고 있어요" : "퀴즈가 저장되었습니다"}</h1>
      <div className="relative flex items-center justify-center h-[120px] w-[120px]">
        <CircularProgress value={value} size={120} strokeWidth={8} />
        {value >= 100 ? (
          <CompleteCheckSVG
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            size="2xl"
            fill="#FEE500"
          />
        ) : (
          <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 typo-title3 text-white">
            {Math.round(value)}%
          </p>
        )}
      </div>
      <div className="flex flex-col typo-title3 text-gray-80 items-center">
        <p>멋진 퀴즈를 내주셨네요!</p>
        <p>이로써 내 개발 지식도 업그레이드 됐을 거예요.</p>
      </div>
    </div>
  );
}
