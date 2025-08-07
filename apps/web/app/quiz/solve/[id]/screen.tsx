"use client";

import { useEffect } from "react";
import { Button } from "@readup/ui/atoms";
import { LinearProgress } from "@readup/ui/organisms";
import { useSolveQuizStore } from "@/quiz/_store/useSolveQuizStore";
import SolveQuizLayout from "@/quiz/_components/solve-quiz-layout";
import { QuizCheckModal } from "@readup/ui/molecules";
import { useRouter } from "next/navigation";
import { PATH } from "@/_constant/routes";
import { Quiz } from "@/_schemas/quiz/quiz-set";

type QuizSolveScreenProps = {
  quizSetId: string; // 퀴즈 세트 ID
};

export default function QuizSolveScreen({ quizSetId }: QuizSolveScreenProps) {
  const router = useRouter();
  const {
    quizSet,
    currentIndex,
    showAnswer,
    selectedOptionId,
    isCorrect,
    openModal,
    openIncorrectModal,
    explanation,
    fetchState,
    setSelectedOptionId,
    fetchQuizSet,
    resetQuiz,
    postAnswer,
    nextQuiz,
    retryQuiz,
  } = useSolveQuizStore();

  const moveToResultPage = () => {
    router.push(PATH.QUIZ.SOLVE.RESULT);
  };

  useEffect(() => {
    resetQuiz();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (quizSetId) {
      // fetchQuizSet(quizSetId);

      // 테스트용 딜레이 - 딜레이를 걸어주지 않는 경우, mocking api 호출 시 문제가 발생함
      setTimeout(() => {
        fetchQuizSet(quizSetId);
      }, 1000);
    }
  }, [quizSetId, fetchQuizSet]);

  useEffect(() => {
    const quiz = quizSet?.quizResponseList[currentIndex];
    console.log("quiz", quiz, "currentIndex", currentIndex);
  }, [quizSet, currentIndex]);

  useEffect(() => {
    if (fetchState === "error") {
      resetQuiz();
      // router.push(PATH.QUIZ.LIST.ROOT);
    }
  }, [fetchState, resetQuiz, router, fetchQuizSet, quizSetId]);

  if (!quizSet) {
    return <div>로딩중...</div>;
  }

  const quizzes = quizSet.quizResponseList;
  const quiz: Quiz | undefined = quizzes[currentIndex];

  const handleClickOption = (optionId: number) => {
    if (!showAnswer) {
      setSelectedOptionId(optionId);
    }
  };

  const handleClickNext = () => {
    if (currentIndex + 1 < quizzes.length) {
      nextQuiz();
    } else {
      moveToResultPage();
    }
  };

  const renderQuizOptionButtonStyle = (optionId: number) => {
    const baseStyle = "border border-gray-50 rounded-md px-4 py-2 text-center text-gray-50 typo-title3 ";
    if (showAnswer) {
      if (optionId === selectedOptionId) {
        if (isCorrect) {
          return baseStyle + "bg-primary/35 text-white border-primary";
        } else {
          return baseStyle + "bg-error/35 text-white border-error";
        }
      }
      return baseStyle + "bg-surface";
    } else {
      if (optionId === selectedOptionId) {
        return baseStyle + "bg-primary/35 text-white border-primary";
      }
      return baseStyle + "bg-surface";
    }
  };

  return (
    <SolveQuizLayout title={quizSet.chapterId.toString()} onRightClickAction={() => {}}>
      <div className="h-[calc(100vh-50px)] flex flex-col gap-6 text-white p-4 relative pb-10">
        <LinearProgress value={((currentIndex + 1) / quizzes.length) * 100} max={100} height={6} background="#313335" />
        {quiz && (
          <>
            <div className="flex flex-row items-center justify-end gap-1 typo-body text-white">
              <p className="text-primary">{currentIndex + 1}</p>
              <p>/</p>
              <p>{quizzes.length}문제</p>
            </div>
            <div className="typo-title2 text-center">{quiz?.question}</div>
            <div className="flex flex-col gap-2">
              {quiz?.quizOptionResponseList.map((option) => (
                <div
                  key={option.quizOptionId}
                  className={renderQuizOptionButtonStyle(option.quizOptionId)}
                  onClick={() => handleClickOption(option.quizOptionId)}
                  role="button"
                  tabIndex={0}
                >
                  {option.content}
                </div>
              ))}
            </div>
            <div className="grow" />
            <Button disabled={selectedOptionId === null} onClick={postAnswer} className="w-full">
              정답 확인
            </Button>
          </>
        )}
      </div>
      <QuizCheckModal
        open={openModal}
        onClose={undefined}
        title="정답을 맞추셨습니다! 🎉"
        subtext={explanation || undefined}
        cancelText=""
        confirmText="다음 문제"
        onConfirm={handleClickNext}
        variant="contained"
      />
      <QuizCheckModal
        open={openIncorrectModal}
        onClose={undefined}
        title="아쉽지만 좋은 시도였어요 🔥"
        subtext={explanation || undefined}
        cancelText="재도전"
        confirmText="다음 문제"
        onConfirm={handleClickNext}
        variant="contained"
        onCancel={retryQuiz}
      />
    </SolveQuizLayout>
  );
}
