"use client";

import { cva, VariantProps } from "class-variance-authority";
import { cn } from "../lib";

import { KeyLineSVG, ShareLine2SVG } from "@readup/icons";

const cardVariants = cva("flex flex-col justify-between p-4 rounded-md text-on_primary w-[140px] h-[180px]", {
  variants: {
    variant: {
      finished: "bg-primary_variant", // 완료된 챕터 스타일
      unfinished: "text-gray-50 bg-gray-20", // 미완료 챕터 스타일
    },
  },
  defaultVariants: {
    variant: "finished",
  },
});

/** ChapterCardProps */
interface ChapterCardProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {
  chapter: string;
  title: string;
  status: string;
  onClick?: () => void;
}

export function ChapterCard({ chapter, title, status, onClick, variant, className, ...props }: ChapterCardProps) {
  // variant가 unfinished인 경우 상태 및 버튼을 다르게 처리
  const isUnfinished = variant === "unfinished";

  return (
    <div className={cn(cardVariants({ variant }), className)} {...props}>
      <div>
        {/* 상단 텍스트: 챕터 정보, 제목, 상태(또는 안내문) */}
        <div className="text-xs">{chapter}</div>
        <div className="mt-2 text-sm font-bold line-clamp-2 break-words">{title}</div>
        <div className="mt-2 text-xs">{isUnfinished ? "작성한 퀴즈가 없어요" : status}</div>
      </div>

      {/* 하단 버튼: variant에 따라 UI와 동작이 다름 */}
      <button
        onClick={onClick}
        disabled={isUnfinished}
        className={cn(
          "mt-5.5 flex items-center justify-center gap-1 rounded px-3 py-2 text-sm font-medium",
          isUnfinished ? "bg-gray-600 text-gray-400 cursor-not-allowed" : "bg-white text-blue-600 hover:bg-gray-100",
        )}
      >
        {isUnfinished ? (
          <>
            {/* 잠금 아이콘 */}
            <KeyLineSVG size="sm" fill="oklch(0.707 0.022 261.325)" />
            퀴즈 만들기
          </>
        ) : (
          <>
            {/* 리스트 아이콘 TODO: designer님께 목차보기 아이콘 확인한다음 추가 */}
            <ShareLine2SVG size="sm" fill="oklch(0.707 0.022 261.325)" />
            목차 보기
          </>
        )}
      </button>
    </div>
  );
}
