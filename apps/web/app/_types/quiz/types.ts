export interface Choice {
  id: number;
  text: string;
  isSelected: boolean;
  isError: boolean;
  onTextChange: (value: string) => void;
  onSelectChange: (selected: boolean) => void;
}

export interface Question {
  id: number;
  question: string;
  isError: boolean;
  onQuestionChange: (value: string) => void;

  // 선택지
  choices: Choice[];
  choicesError: boolean;
  handleAddChoice: () => void;
  handleRemoveChoice: (choiceId: number) => void;

  // 해설
  explanation: string;
  onExplanationChange: (value: string) => void;
}
