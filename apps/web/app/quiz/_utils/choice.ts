import { Choice } from "@/_types/quiz/types";

export const createChoice = (id: number): Omit<Choice, "onTextChange" | "onSelectChange"> => ({
  id,
  text: "",
  isSelected: false,
  isError: false,
});

export const enhanceChoices = (
  baseChoices: Omit<Choice, "onTextChange" | "onSelectChange">[],
  questionIndex: number,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateQuestion: (index: number, updater: (q: any) => any) => void,
): Choice[] => {
  return baseChoices.map((choice) => ({
    ...choice,
    onTextChange: (value: string) => {
      updateQuestion(questionIndex, (q) => ({
        ...q,
        choices: q.choices.map((c: Choice) => (c.id === choice.id ? { ...c, text: value } : c)),
      }));
    },
    onSelectChange: (selected: boolean) => {
      updateQuestion(questionIndex, (q) => ({
        ...q,
        choices: q.choices.map((c: Choice) =>
          c.id === choice.id ? { ...c, isSelected: selected } : { ...c, isSelected: false },
        ),
      }));
    },
  }));
};
