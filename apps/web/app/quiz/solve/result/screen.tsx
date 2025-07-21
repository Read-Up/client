"use client";

import { PATH } from "@/_constant/routes";
import { useSolveQuizStore } from "@/quiz/_store/useSolveQuizStore";
import { HeartFilledSVG, HeartLineSVG } from "@readup/icons";
import { Button } from "@readup/ui/atoms";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function QuizSolveResultScreen() {
  const { quizSet, quizSetResult, fetchResultState, fetchResult, resetQuiz, postScore } = useSolveQuizStore();
  const [step, setStep] = useState<"result" | "scoring">("result");
  const router = useRouter();
  const [scoring, setScoring] = useState<number>(0);

  const handleClickNext = () => {
    setStep("scoring");
  };

  const handleClickComplete = () => {
    const bookId = quizSet?.bookId;
    postScore(scoring);
    resetQuiz();
    router.push(`${PATH.QUIZ.LIST.ROOT}/${bookId}`);
  };

  useEffect(() => {
    fetchResult();
  }, [fetchResult]);

  useEffect(() => {
    if (fetchResultState === "error") {
      resetQuiz();
      router.push(PATH.QUIZ.LIST.ROOT);
    }
  }, [fetchResultState, resetQuiz, router]);

  return (
    <div className="flex flex-col w-full h-screen text-white p-4 relative items-center pt-[15vh]">
      {step === "result" ? (
        <div className="flex flex-col w-full max-w-md items-center gap-6">
          <div className="flex flex-col items-center typo-title1 font-semibold">
            <h1>퀴즈 완료!</h1>
            <h1>어쩌구</h1>
            <h1>퀴즈 완료!</h1>
          </div>
          <div className="w-50 h-50 bg-primary text-center">image</div>
          <div className="flex flex-col gap-2 w-full max-w-md">
            <div className="bg-surface p-4 rounded-md w-full max-w-md flex flex-row justify-between">
              <p>참여한 퀴즈 수</p>
              <p>{quizSetResult?.totalQuizCount}개</p>
            </div>
            <div className="px-4 rounded-md w-full max-w-md text-secondary flex flex-row justify-between">
              <p>한 번에 마스터한 지식</p>
              <p>{quizSetResult?.onceCorrectQuizCount}개</p>
            </div>
            <div className="px-4 rounded-md w-full max-w-md text-secondary flex flex-row justify-between">
              <p>재도전으로 강화된 지식</p>
              <p>{quizSetResult?.retryCorrectQuizCount}개</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col w-full max-w-md items-center gap-6">
          <div className="flex flex-col items-center typo-title1 font-semibold">
            <h1>이번 퀴즈는 어떠셨나요?</h1>
          </div>
          <div className="flex flex-col typo-body items-center">
            <p>퀴즈에 대한 만족도를 표시해주시면</p>
            <p>다른 유저들에게도 도움이 될 거예요👍🏻</p>
          </div>
          <div className="flex flex-row items-center justify-center gap-2 mt-10">
            {Array.from({ length: 5 }, (_, index) =>
              scoring <= index ? (
                <HeartLineSVG
                  key={index}
                  className="w-[30px] h-[30px] cursor-pointer"
                  onClick={() => setScoring(index + 1)}
                />
              ) : (
                <HeartFilledSVG
                  key={index}
                  className="w-[30px] h-[30px] cursor-pointer"
                  onClick={() => setScoring(index + 1)}
                  fill="#16CCC3"
                />
              ),
            )}
          </div>
        </div>
      )}
      <Button
        className="fixed bottom-10 left-4 right-4"
        variant="filled"
        onClick={step === "result" ? handleClickNext : handleClickComplete}
        disabled={step === "scoring" && scoring === 0}
      >
        {step === "result" ? "다음" : "완료"}
      </Button>
    </div>
  );
}
