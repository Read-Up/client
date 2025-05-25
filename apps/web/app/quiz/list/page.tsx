import { Topbar } from "@readup/ui/molecules/topbar";
import { Suspense } from "react";
import QuizListContent from "./_components/quiz-list-content";

export default function QuizList() {
  return (
    <div>
      <div className="flex flex-col gap-1">
        <Topbar text="마스터링 트랜스포머" variant="icon2" />
        <Suspense fallback={<div className="p-4">Loading...</div>}>
          <QuizListContent />
        </Suspense>
      </div>
    </div>
  );
}
