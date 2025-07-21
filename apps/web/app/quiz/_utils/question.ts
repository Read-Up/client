import { Question } from "@/_types/quiz/types";
import { createChoice, enhanceChoices } from "./choice";

export const createQuestion = (
  questionIndex: number,
  updateQuestion: (index: number, updater: (q: Question) => Question) => void,
): Question => {
  const baseChoices = [createChoice(1), createChoice(2)];
  const questionId = Date.now();

  return {
    id: questionId,
    question: "",
    isError: false,
    onQuestionChange: (value) => {
      updateQuestion(questionIndex, (q) => ({ ...q, question: value }));
    },
    explanation: "",
    onExplanationChange: (value) => {
      updateQuestion(questionIndex, (q) => ({ ...q, explanation: value }));
    },
    choices: enhanceChoices(baseChoices, questionIndex, updateQuestion),
    choicesError: false,
    handleAddChoice: () => {
      const id = Date.now();
      const newChoice = createChoice(id);
      updateQuestion(questionIndex, (q) => ({
        ...q,
        choices: enhanceChoices([...q.choices, newChoice], questionIndex, updateQuestion),
      }));
    },
    handleRemoveChoice: (choiceId: number) => {
      updateQuestion(questionIndex, (q) => ({
        ...q,
        choices: q.choices.filter((c) => c.id !== choiceId),
      }));
    },
  };
};
