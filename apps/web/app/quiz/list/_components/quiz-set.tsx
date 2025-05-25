"use client";

import { HearFilledSVG } from "@readup/icons";
import QuizCardList from "./quiz-card-list";

import type { QuizCardProps } from "./quiz-card";

type QuizSetProps = {
  username: string;
  isCreator?: boolean;
  profileImage: string;
  totalAccuracy: number;
  likeCount: number;
  setNumber: number;
  questionCount: number;
  date: string;
  accuracy: number;
  averageTime: number;
  cardLikes: number;
  hasParticipated: boolean;
};

export function QuizSet({
  username,
  isCreator = false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  profileImage,
  totalAccuracy,
  likeCount,
  setNumber,
  questionCount,
  date,
  accuracy,
  averageTime,
  cardLikes,
  hasParticipated,
}: QuizSetProps) {
  // Create quiz card props from the quiz set props
  const quizCardProps: QuizCardProps = {
    setNumber,
    date,
    questionCount,
    accuracy,
    averageTime,
    cardLikes,
    hasParticipated,
    isCreator,
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="relative rounded-full">
            {/* Image component will be used here later */}
            <span className="typo-body">{username}</span>
          </div>
          <div className="flex items-center">{isCreator && <span className=" bg-blue-500 rounded-full">me</span>}</div>
        </div>
        <div className="flex items-center gap-2 typo-footnote">
          <div className="flex items-center gap-0.5">
            <span className="">전체 정답률</span>
            <span className="text-primary">{totalAccuracy}%</span>
          </div>
          <div className="flex items-center gap-0.5">
            <HearFilledSVG className="w-4 h-4 text-blue-500" />
            <span>{likeCount}</span>
          </div>
        </div>
      </div>
      <QuizCardList quizSets={[quizCardProps]} />
    </div>
  );
}
