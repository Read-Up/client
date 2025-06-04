"use client";

import { CompleteCheckSVG } from "@readup/icons";
import { CircularProgress } from "@readup/ui/organisms";
import { useEffect, useState } from "react";

export default function BookAddCompleteScreen() {
  const [value, setValue] = useState(0);
  // query params로 isbn 받기
  const searchParams = new URLSearchParams(window.location.search);
  const isbn = searchParams.get("isbn");
  if (!isbn) {
    // isbn이 없으면 다시 책 추가 페이지로 리다이렉트
    window.location.href = "/books/add";
  }

  // isbn이 있으면 책 추가 요청 API 호출
  if (isbn) {
    console.log("책 추가 요청 API 호출", isbn);
  }

  useEffect(() => {
    if (value >= 100) {
      // 100%에 도달하면 /books 로 리다이렉트
      window.location.href = "/books";
      return;
    }

    const progress = 1 - Math.pow(1 - value / 100, 3); // ease-out
    const increment = (1 - progress) * 10 + 1; // 더 빠르게 증가
    const delay = 10 + progress * 50; // 더 짧은 간격

    const timer = setTimeout(() => {
      setValue((prev) => Math.min(prev + increment, 100));
    }, delay);

    return () => clearTimeout(timer);
  }, [value]);

  return (
    <div className="text-white flex flex-col items-center justify-center h-screen">
      <p className="typo-title1">책 추가 완료!</p>
      <p className="typo-title1">검색화면에서 확인할 수 있어요.</p>

      <div className="mt-8 relative flex items-center justify-center h-[120px] w-[120px]">
        <CircularProgress value={value} size={120} strokeWidth={8} />

        {value >= 100 && (
          <CompleteCheckSVG
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            size="2xl"
            fill="#FEE500"
          />
        )}
      </div>
    </div>
  );
}
