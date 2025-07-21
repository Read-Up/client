"use client";

import { QuizSetListItem } from "@/_schemas/quiz/quiz-set";
import { HeartFilledSVG } from "@readup/icons";
import Image from "next/image";
interface QuizSetItemProps {
  quiz: QuizSetListItem;
  onClickAction: (quiz: QuizSetListItem) => void;
}

export default function QuizSetItem({ quiz, onClickAction }: QuizSetItemProps) {
  const convertDate = (date: string) => {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="px-3 py-4 flex flex-col gap-3 bg-surface" onClick={() => onClickAction(quiz)}>
      <div className="flex flex-row items-center justify-between typo-badge text-gray-60">
        <div className="flex flex-row items-center gap-1">
          <HeartFilledSVG fill="#95999d" size="xs" />
          <p>{quiz.likeAverage.toFixed(1)}</p>
        </div>
        <p>{convertDate(quiz.createdAt)}</p>
      </div>
      <p className="typo-title3 text-white">{quiz.totalQuizCount}개의 퀴즈를 풀 수 있어요</p>
      <div className="flex flex-row items-center gap-2 typo-badge text-black">
        <p className="bg-secondary px-2 py-1 rounded-full">정답률 {quiz.correctAnswerAverage.toFixed(1)}%</p>
        <p className="bg-primary px-2 py-1 rounded-full">평균 {Math.round(quiz.estimatedTime / 60)}분</p>
      </div>
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-2">
          <Image
            src={quiz.profileImageUrl || "/default-profile.png"}
            alt={quiz.nickname}
            width={24}
            height={24}
            className="rounded-full object-cover"
          />
          <p className="typo-body text-white">{quiz.nickname}</p>
        </div>
        <p className="typo-badge text-white">{quiz.participantCount}명이 이 퀴즈를 풀었어요</p>
      </div>
    </div>
  );
}
