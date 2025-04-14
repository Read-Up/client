"use client";

import { KeywordLineSVG, ScanSVG } from "@readup/icons";
import { TextBox } from "@readup/ui/atoms";

export default function BookSearchScreen() {
  return (
    <main className="min-h-screen flex flex-col mx-4">
      <div className="flex items-center justify-center gap-3.5">
        <TextBox placeholder="검색어를 입력해주세요." />
        <ScanSVG size="xl" />
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div className="flex flex-col gap-3.5 items-center text-gray-60">
          <KeywordLineSVG stroke="#95999D" fill="#95999D" />
          <div>
            <p>원하는 책을 찾아드릴게요!</p>
            <p>간단한 키워드를 알려주세요.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
