"use client";

import { HeartFilledSVG } from "@readup/icons";
import Image from "next/image";
import { QuizSet } from "@/_types/quiz/schema";

interface QuizSetItemProps {
  quiz: QuizSet;
}

export default function QuizSetItem({ quiz }: QuizSetItemProps) {
  return (
    <div className="px-3 py-4 flex flex-col gap-3 bg-surface">
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
  );
}
