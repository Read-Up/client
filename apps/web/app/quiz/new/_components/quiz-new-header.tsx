"use client";

import { BackSVG } from "@readup/icons";
import { Button } from "@readup/ui/button";

export default function QuizNewHeader() {
  return (
    <header className="flex justify-between items-center px-[15px] py-[11px]">
      <button className="flex items-center">
        <BackSVG />
      </button>
      <h1 className="typo-title1">퀴즈 작성하기</h1>
      <Button variant="filled" size="sm">
        저장
      </Button>
    </header>
  );
}
