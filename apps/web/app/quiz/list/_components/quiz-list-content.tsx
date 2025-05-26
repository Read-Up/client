"use client";

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@readup/ui/atoms/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";
import { QuizSet } from "./quiz-set";
import { QuizTabs } from "./quiz-tabs";

// Mock data for demonstration
const MOCK_QUIZZES = [
  {
    id: "1",
    username: "Z_7 아이",
    isCreator: true,
    profileImage: "https://i.pravatar.cc/300?img=1",
    totalAccuracy: 99,
    likeCount: 999,
    setNumber: 2,
    questionCount: 6,
    date: "2025. 04. 24",
    accuracy: 76,
    averageTime: 16,
    cardLikes: 56,
    hasParticipated: false,
  },
  {
    id: "2",
    username: "Z_7 아이",
    isCreator: true,
    profileImage: "https://i.pravatar.cc/300?img=1",
    totalAccuracy: 99,
    likeCount: 999,
    setNumber: 1,
    questionCount: 4,
    date: "2025. 04. 21",
    accuracy: 96,
    averageTime: 10,
    cardLikes: 77,
    hasParticipated: false,
  },
  {
    id: "3",
    username: "노란벌떡",
    isCreator: false,
    profileImage: "https://i.pravatar.cc/300?img=2",
    totalAccuracy: 80,
    likeCount: 99,
    setNumber: 3,
    questionCount: 11,
    date: "2025. 04. 27",
    accuracy: 86,
    averageTime: 22,
    cardLikes: 0,
    hasParticipated: false,
  },
];

export default function QuizListContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Memoize the current type value to avoid unnecessary re-renders
  const currentType = useMemo(() => searchParams.get("type") || "all", [searchParams]);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams],
  );

  const handleTypeChange = useCallback(
    (type: string) => {
      router.push(`${pathname}?${createQueryString("type", type)}`);
    },
    [router, pathname, createQueryString],
  );

  return (
    <section className="flex flex-col gap-3 px-4">
      <Select>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="챕터를 선택해주세요" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="1">Chapter 1</SelectItem>
            <SelectItem value="2">Chapter 2</SelectItem>
            <SelectItem value="3">Chapter 3</SelectItem>
            <SelectItem value="4">Chapter 4</SelectItem>
            <SelectItem value="5">Chapter 5</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <QuizTabs currentType={currentType} onTypeChange={handleTypeChange} />

      {MOCK_QUIZZES.map((quiz) => (
        <QuizSet
          key={quiz.id}
          username={quiz.username}
          isCreator={quiz.isCreator}
          profileImage={quiz.profileImage}
          totalAccuracy={quiz.totalAccuracy}
          likeCount={quiz.likeCount}
          setNumber={quiz.setNumber}
          questionCount={quiz.questionCount}
          date={quiz.date}
          accuracy={quiz.accuracy}
          averageTime={quiz.averageTime}
          cardLikes={quiz.cardLikes}
          hasParticipated={quiz.hasParticipated}
        />
      ))}
    </section>
  );
}
