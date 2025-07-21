import { QuizSet, QuizSetResponse, QuizSetResult, QuizSetResultResponse } from "@/_schemas/quiz/quiz-set";
import { create } from "zustand";
import { getClientApi } from "@/_server/main/get-instance";
import { END_POINT } from "@/_constant/end-point";
import { MyQuizSetProgress } from "@/_schemas/quiz/quiz";

type State = "loading" | "success" | "error";
type fetchState = State;
type fetchResultState = State;

interface SolveQuizState {
  quizSet: QuizSet | null;
  quizSetResult: QuizSetResult | null;
  currentIndex: number;
  showAnswer: boolean;
  selectedOptionId: number | null;
  isCorrect: boolean | null;
  explanation: string | null;
  openModal: boolean;
  openIncorrectModal: boolean;
  fetchState: fetchState;
  fetchResultState: fetchResultState;

  fetchQuizSet: (quizSetId: string) => Promise<void>;
  setSelectedOptionId: (id: number | null) => void;
  resetQuiz: () => void;
  fetchResult: () => void;
  postAnswer: () => Promise<void>;
  postScore: (score: number) => Promise<void>;
  nextQuiz: () => void;
  retryQuiz: () => void;
}

export const useSolveQuizStore = create<SolveQuizState>((set, get) => ({
  quizSet: null,
  quizSetResult: null,
  currentIndex: 0,
  showAnswer: false,
  selectedOptionId: null,
  isCorrect: null,
  explanation: null,
  openModal: false,
  openIncorrectModal: false,
  fetchState: "loading",
  fetchResultState: "loading",

  fetchQuizSet: async (quizSetId) => {
    try {
      const lastQuizIdRes = await getClientApi()
        .get(END_POINT.QUIZ.SETS.MY_PROGRESS(quizSetId))
        .json<MyQuizSetProgress>();

      if (!lastQuizIdRes.success) {
        set({ fetchState: "error" });
        return;
      }
      const lastQuizId = lastQuizIdRes.data.lastQuizId;

      const res = await getClientApi()
        .get(END_POINT.QUIZ.SETS.BY_LAST_QUIZ_ID(quizSetId, lastQuizId || "0"))
        .json<QuizSetResponse>();

      if (res.success) {
        const fullList = res.data.quizResponseList;
        const startIndex = lastQuizId === 0 ? 0 : fullList.findIndex((q) => q.quizId === lastQuizId) + 1;

        if (startIndex < 0 || startIndex >= fullList.length) {
          set({ fetchState: "error" });
          return;
        }

        set({
          quizSet: res.data,
          currentIndex: startIndex,
          showAnswer: false,
          selectedOptionId: null,
        });
      }
    } catch (error) {
      console.error("Error fetching quiz set:", error);
      set({ fetchState: "error" });
      return;
    }
    set({ fetchState: "success" });
  },

  // 퀴즈 결과를 가져오는 함수
  fetchResult: async () => {
    const { quizSet } = get();
    if (!quizSet) {
      set({ fetchResultState: "error" });
      return;
    }
    const res = await getClientApi().get(END_POINT.QUIZ.SETS.RESULT(quizSet.quizSetId)).json<QuizSetResultResponse>();

    if (res.success) {
      set({
        fetchResultState: "success",
        quizSetResult: res.data,
      });
    } else {
      set({
        fetchResultState: "error",
        quizSetResult: null,
      });
    }
  },

  // 퀴즈 정답 제출
  postAnswer: async () => {
    const { quizSet, currentIndex, selectedOptionId } = get();
    if (!quizSet || selectedOptionId === null) {
      return;
    }

    const quiz = quizSet.quizResponseList[currentIndex];
    if (!quiz) {
      return;
    }

    const res = await getClientApi()
      .post(END_POINT.QUIZ.SETS.ANSWER(quizSet.quizSetId, quiz.quizId), {
        json: { answerId: selectedOptionId },
      })
      .json<{ success: boolean; data: { isCorrect: boolean; explanation?: string } }>();

    if (res.success) {
      set({
        showAnswer: true,
        isCorrect: res.data.isCorrect,
        explanation: res.data.explanation || null,
      });
      if (res.data.isCorrect) {
        set({
          openModal: true,
        });
      } else {
        set({
          openIncorrectModal: true,
        });
      }
    }
  },

  // 퀴즈 점수 제출
  postScore: async (score: number) => {
    const { quizSet } = get();
    if (!quizSet) {
      return;
    }
    console.log("score", score);
    // try {
    //   const res = await getClientApi()
    //     .post(END_POINT.QUIZ.SETS.SCORE(quizSet.quizSetId), {
    //       json: { score },
    //     })
    //     .json<{ success: boolean }>();

    //   if (!res.success) {
    //     console.error("Failed to submit score");
    //   }
    // } catch (error) {
    //   console.error("Error submitting score:", error);
    // }
  },

  // 다음 퀴즈로 이동
  nextQuiz: () => {
    set((state) => {
      const nextIndex = state.currentIndex + 1;
      return {
        currentIndex: nextIndex,
        showAnswer: false,
        selectedOptionId: null,
        isCorrect: null,
        explanation: null,
        openModal: false,
        openIncorrectModal: false,
        fetchResultState: "loading",
        quizSetResult: null,
      };
    });
  },

  retryQuiz: () => {
    // 현재 인덱스를 유지하면서 퀴즈를 다시 시작
    const { currentIndex } = get();
    set({
      currentIndex: currentIndex,
      showAnswer: false,
      selectedOptionId: null,
      isCorrect: null,
      explanation: null,
      openModal: false,
      openIncorrectModal: false,
      fetchResultState: "loading",
      quizSetResult: null,
    });
  },

  setSelectedOptionId: (id) => set({ selectedOptionId: id }),

  resetQuiz: () =>
    set({
      quizSet: null,
      quizSetResult: null,
      currentIndex: 0,
      showAnswer: false,
      selectedOptionId: null,
      isCorrect: null,
      explanation: null,
      openModal: false,
      openIncorrectModal: false,
      fetchState: "loading",
      fetchResultState: "loading",
    }),
}));
