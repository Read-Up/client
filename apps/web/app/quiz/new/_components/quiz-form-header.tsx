"use client";

import { BackSVG } from "@readup/icons";
import QuizFormSaveButton from "./quiz-form-save-button";

export default function QuizFormHeader() {
  return (
    <header className="flex justify-between items-center px-[15px] py-[11px]">
      <button className="flex items-center">
        <BackSVG />
      </button>
      <h1 className="typo-title1">퀴즈 작성하기</h1>
      <QuizFormSaveButton />
    </header>
  );
}
