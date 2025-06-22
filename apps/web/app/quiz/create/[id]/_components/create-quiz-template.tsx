import { Question } from "@/_types/quiz/types";
import { CloseSVG } from "@readup/icons";
import { TextBox } from "@readup/ui/atoms";
import { CheckBox } from "@readup/ui/atoms/checkbox";
import { useMemo } from "react";

interface CreateQuizTemplateProps {
  index: number;
  question: Question;
  removeQuestion: (questionId: number) => void;
}

export default function CreateQuizTemplate({ index, question, removeQuestion }: CreateQuizTemplateProps) {
  const isSelected = useMemo(() => question.choices.some((c) => c.isSelected), [question.choices]);

  const handleChoiceSelect = (selectedIdx: number) => {
    question.choices.find((choice, idx) => {
      if (idx === selectedIdx) {
        choice.onSelectChange(!choice.isSelected); // Toggle selection
      }
      return idx === selectedIdx;
    });
  };

  return (
    <div className="p-3 flex flex-col gap-3 bg-surface rounded-md">
      <div className="flex flex-row items-center justify-between">
        <p className="typo-title3">{index}</p>
        <CloseSVG className="w-4 h-4 text-gray-60 cursor-pointer" onClick={() => removeQuestion(question.id)} />
      </div>
      <TextBox
        value={question.question}
        placeholder="최대 150자까지 작성 가능합니다."
        className={"w-full bg-black/20" + (question.isError ? " !border-error placeholder-error" : "")}
        isBorder={question.isError}
        variant="questionbox"
        onChange={(e) => question.onQuestionChange(e.target.value)}
        maxLength={150}
      />
      <div className="flex flex-row items-center justify-between">
        <p className="typo-body">선택지</p>
        <p className={`typo-footnote ${question.choicesError ? "text-error" : "text-gray-60"}`}>
          {question.choicesError
            ? "정답을 선택해주세요"
            : isSelected
              ? "정답이 선택됐습니다"
              : "답안 작성 후, 정답을 좌측에 표시해주세요"}
        </p>
      </div>
      {question.choices.map((choice, idx) => (
        <div className="flex flex-row gap-2 items-center" key={choice.id}>
          <CheckBox
            checked={choice.isSelected}
            onChange={() => handleChoiceSelect(idx)}
            className={`w-6 h-6 ${question.choicesError ? "border-error" : "border-primary"}`}
          />
          <TextBox
            value={choice.text}
            placeholder="답안을 입력해주세요."
            className={"w-full bg-black/20" + (choice.isError ? " !border-error placeholder-error" : "")}
            variant="textbox"
            onChange={(e) => choice.onTextChange(e.target.value)}
            onButtonClick={() => choice.onTextChange("")}
            maxLength={50}
            isBorder={choice.isError}
          />
          {idx > 1 && (
            <CloseSVG
              className="w-4 h-4 text-gray-60 cursor-pointer"
              onClick={() => question.handleRemoveChoice(choice.id)}
            />
          )}
        </div>
      ))}
      <div
        className="w-6 h-6 bg-primary rounded-full text-2xl leading-none text-white flex items-center justify-center cursor-pointer self-center"
        onClick={() => question.handleAddChoice()}
      >
        +
      </div>
      <p className="typo-body">해설 (선택)</p>
      <TextBox
        placeholder="정답 내용을 책의 몇 페이지에서 찾을 수 있나요?"
        className="w-full bg-black/20"
        variant="textbox"
        value={question.explanation}
        onChange={(e) => question.onExplanationChange(e.target.value)}
        onButtonClick={() => question.onExplanationChange("")}
        isBorder={false}
      />
    </div>
  );
}
