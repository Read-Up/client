"use client";

import { BookDetail } from "@/_types/books/schema";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@readup/ui/atoms/select";
import { useCallback, useEffect, useRef, useState } from "react";
import { QuizTabs } from "./_components/quiz-tabs";
import { Dropdown, DropdownMenuItem } from "@readup/ui/atoms/dropdown";
import QuizSetItem from "./_components/quiz-set-item";
import { Drawer } from "@readup/ui/molecules";
import { Button, Divider } from "@readup/ui/atoms";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { PATH } from "@/_constant/routes";
import { QuizSetListItem } from "@/_schemas/quiz/quiz-set";
import { useInfiniteQuizSets } from "@/_hooks/use-infinite-quiz-sets";

interface QuizListScreenProps {
  book: BookDetail;
  chapterId: number;
}

const SORT_OPTIONS = [
  { label: "인기순", value: "like" },
  { label: "최신순", value: "createdAt" },
  { label: "난이도순", value: "difficulty" },
];

const DIRECTION_OPTIONS = [
  { label: "높은순", value: "DESC" },
  { label: "낮은순", value: "ASC" },
];

const PARTICIPATED_SORT_OPTIONS = [
  { label: "최신순", value: "recent" },
  { label: "오래된순", value: "old" },
];

const PARTICIPATED_FILTER_OPTIONS = [
  { label: "전체", value: "all" },
  { label: "완료", value: "completed" },
  { label: "미완료", value: "notCompleted" },
];

export default function QuizListScreen({ book, chapterId }: QuizListScreenProps) {
  const router = useRouter();
  const [currentType, setCurrentType] = useState("all");
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const quizListRef = useRef<HTMLDivElement | null>(null);
  const [selectedQuizSet, setSelectedQuizSet] = useState<QuizSetListItem | null>(null);
  const [sort, setSort] = useState<string>("like");
  const [direction, setDirection] = useState<string>("DESC");
  const [selectedChapterId, setSelectedChapterId] = useState<number>(chapterId);
  const [participatedSortAndFilter, setParticipatedSortAndFilter] = useState<{ sort: string; filter: string }>({
    sort: "recent",
    filter: "all",
  }); // sort: "recent" | "old" / filter: "all" | "completed" | "notCompleted"

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuizSets({
    bookId: book.bookId,
    filterType: currentType,
    sortOption: sort,
    direction: direction,
    chapterId: selectedChapterId,
  });

  // 정렬/방향 변경 시 퀴즈 목록 스크롤 초기화
  useEffect(() => {
    // 퀴즈 목록 영역의 스크롤을 맨 위로 이동
    if (quizListRef.current) {
      quizListRef.current.scrollTop = 0;
    }
  }, [sort, direction]);

  const handleTypeChange = useCallback(
    (type: string) => {
      setCurrentType(type);
    },
    [setCurrentType],
  );

  const handleClickQuiz = async (quiz: QuizSetListItem) => {
    setSelectedQuizSet(quiz);
  };

  const handleCloseDrawer = () => {
    setSelectedQuizSet(null);
  };

  const handleStartQuiz = (quizSetId: number) => {
    router.push(`${PATH.QUIZ.SOLVE.ROOT}/${quizSetId}`);
  };

  // IntersectionObserver 콜백을 useCallback으로 최적화
  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (entries[0] && entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage],
  );

  useEffect(() => {
    if (!quizListRef.current) {
      return;
    }

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.1,
      root: quizListRef.current, // 스크롤 컨테이너를 root로 설정
    });

    const target = loaderRef.current;
    if (target) {
      observer.observe(target);
    }

    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
  }, [handleIntersection]);

  return (
    <section className="flex flex-col w-full h-[calc(100vh-50px)] text-white p-4 gap-4">
      <h1 className="typo-title2">{book.title}</h1>
      <Select value={selectedChapterId.toString()} onValueChange={(value) => setSelectedChapterId(Number(value))}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="챕터를 선택해주세요"></SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {book.chapterList.map((chapter) => (
              <SelectItem
                key={chapter.chapterId}
                value={chapter.chapterId.toString()}
                onClick={() => setSelectedChapterId(chapter.chapterId)}
              >
                {chapter.chapterName}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <QuizTabs currentType={currentType} onTypeChange={handleTypeChange} />
      {currentType !== "participated" && (
        <div className="flex flex-row items-center gap-2">
          <Dropdown
            className="bg-background"
            triggerLabel={SORT_OPTIONS.find((opt) => opt.value === sort)?.label ?? "정렬"}
          >
            {SORT_OPTIONS.map((opt) => (
              <DropdownMenuItem
                key={opt.value}
                onClick={() => setSort(opt.value)}
                className={sort === opt.value ? "text-primary" : ""}
              >
                {opt.label}
              </DropdownMenuItem>
            ))}
          </Dropdown>
          <Dropdown
            className="bg-background"
            triggerLabel={DIRECTION_OPTIONS.find((opt) => opt.value === direction)?.label ?? "정렬"}
          >
            {DIRECTION_OPTIONS.map((opt) => (
              <DropdownMenuItem
                key={opt.value}
                onClick={() => setDirection(opt.value)}
                className={direction === opt.value ? "text-primary" : ""}
              >
                {opt.label}
              </DropdownMenuItem>
            ))}
          </Dropdown>
        </div>
      )}
      {currentType === "participated" && (
        <div className="flex flex-row items-center gap-2">
          <Dropdown
            className="bg-background"
            triggerLabel={
              PARTICIPATED_SORT_OPTIONS.find((opt) => opt.value === participatedSortAndFilter.sort)?.label ?? "정렬"
            }
          >
            {PARTICIPATED_SORT_OPTIONS.map((opt) => (
              <DropdownMenuItem
                key={opt.value}
                onClick={() =>
                  setParticipatedSortAndFilter({ sort: opt.value, filter: participatedSortAndFilter.filter })
                }
                className={sort === opt.value ? "text-primary" : ""}
              >
                {opt.label}
              </DropdownMenuItem>
            ))}
          </Dropdown>
          <Dropdown
            className="bg-background"
            triggerLabel={
              PARTICIPATED_FILTER_OPTIONS.find((opt) => opt.value === participatedSortAndFilter.filter)?.label ?? "정렬"
            }
          >
            {PARTICIPATED_FILTER_OPTIONS.map((opt) => (
              <DropdownMenuItem
                key={opt.value}
                onClick={() =>
                  setParticipatedSortAndFilter({ sort: participatedSortAndFilter.sort, filter: opt.value })
                }
                className={direction === opt.value ? "text-primary" : ""}
              >
                {opt.label}
              </DropdownMenuItem>
            ))}
          </Dropdown>
        </div>
      )}
      <div ref={quizListRef} className="flex flex-col gap-2 w-full flex-1 overflow-y-auto">
        {/* 퀴즈 목록 */}
        {data?.pages.flatMap((page) =>
          page.data.content.map((quiz) => (
            <QuizSetItem key={quiz.quizSetId} quiz={quiz} onClickAction={handleClickQuiz} />
          )),
        )}
        {/* 무한스크롤 로더 영역 */}
        <div ref={loaderRef} className="py-4 text-center text-gray-400">
          {isFetchingNextPage ? "불러오는 중..." : hasNextPage ? "스크롤을 내려 더보기" : "마지막 퀴즈입니다"}
        </div>
      </div>

      {/* Drawer */}
      {selectedQuizSet && (
        <Drawer
          isOpen={!!selectedQuizSet}
          onClose={handleCloseDrawer}
          direction="top"
          size="h-full"
          overlayOpacity="bg-black/30"
          className="bg-background text-white h-screen pt-0 pb-10"
        >
          {/* Drawer Content */}
          <section className="flex flex-col gap-4 relative h-screen items-center">
            <p className="typo-title1 text-primary mt-40">퀴즈 풀기를 시작합니다!</p>
            <h1 className="typo-h1">준비되셨나요?</h1>
            <div className="flex flex-col gap-3 bg-surface p-3 w-full rounded-md border-overlay-16dp border mt-20">
              <p className="typo-body">{book.title}</p>
              <p className="typo-title3">{book.chapterList[0]?.chapterName}</p>
              <div className="flex flex-row items-center gap-2 justify-end">
                <Image
                  src={selectedQuizSet.profileImageUrl || "/default-profile.png"}
                  alt={selectedQuizSet.nickname}
                  width={24}
                  height={24}
                  className="rounded-full object-cover"
                />
                <p className="typo-body text-white">{selectedQuizSet.nickname}</p>
              </div>
              <Divider className="bg-overlay-16dp" />
              <div className="flex flex-row items-center typo-title3">
                <div className="w-[50%] flex flex-row items-center gap-2">
                  📝 총 {selectedQuizSet.totalQuizCount}문제
                </div>
                <div className="w-[50%] flex flex-row items-center gap-2">
                  ⏰ 약 {Math.round(selectedQuizSet.estimatedTime / 60)}분 소요
                </div>
              </div>
            </div>

            {/* 하단 고정 영역 */}
            <div className="grow" />
            <Button onClick={handleCloseDrawer} variant="outline" className="w-full">
              돌아가기
            </Button>
            <Button onClick={() => handleStartQuiz(selectedQuizSet.quizSetId)} variant="filled" className="w-full">
              시작하기
            </Button>
          </section>
        </Drawer>
      )}
    </section>
  );
}
