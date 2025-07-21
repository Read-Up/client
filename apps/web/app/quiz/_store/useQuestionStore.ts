import { Question } from "@/_types/quiz/types";
import { create } from "zustand";
import { createQuestion } from "../_utils/question";
import { BookDetail } from "@/_types/books/schema";

interface QuestionState {
  book: BookDetail | null;
  setBook: (book: BookDetail | null) => void;

  chapterId: string;
  setChapterId: (chapterId: string) => void;

  questions: Question[];
  setQuestions: (qs: Question[]) => void;

  updateQuestion: (index: number, updater: (q: Question) => Question) => void;
  removeQuestion: (questionId: number) => void;
  addQuestion: () => void;
  reset: () => void;
  validate: () => boolean;
}

export const useQuestionStore = create<QuestionState>((set, get) => ({
  book: null,
  setBook: (book) => set({ book }),

  chapterId: "",
  setChapterId: (chapterId) => set({ chapterId }),

  questions: [],
  setQuestions: (qs) => set({ questions: qs }),
  updateQuestion: (index, updater) =>
    set((state) => ({
      questions: state.questions.map((q, i) => (i === index ? updater(q) : q)),
    })),
  removeQuestion: (id) =>
    set((state) => ({
      questions: state.questions.filter((q) => q.id !== id),
    })),
  addQuestion: () => {
    const index = get().questions.length;
    const question = createQuestion(index, get().updateQuestion);
    set((state) => ({ questions: [...state.questions, question] }));
  },
  reset: () => set({ questions: [] }),
  validate: () => {
    let isValid = true;

    const validated = get().questions.map((q) => {
      let questionError = false;
      let hasSelectedChoice = false;

      const updatedChoices = q.choices.map((choice) => {
        const hasText = choice.text.trim() !== "";
        if (!hasText) {
          isValid = false;
        }
        if (choice.isSelected) {
          hasSelectedChoice = true;
        }

        return {
          ...choice,
          isError: !hasText,
        };
      });

      if (q.question.trim() === "") {
        questionError = true;
        isValid = false;
      }

      if (!hasSelectedChoice) {
        isValid = false;
      }

      return {
        ...q,
        isError: questionError,
        choices: updatedChoices,
        choicesError: !hasSelectedChoice,
      };
    });

    set({ questions: validated });
    return isValid;
  },
}));
