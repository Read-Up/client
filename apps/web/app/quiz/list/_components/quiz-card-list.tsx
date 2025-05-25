import type { QuizCardProps } from "./quiz-card";
import QuizCard from "./quiz-card";

export default function QuizCardList({ quizSets }: { quizSets: QuizCardProps[] }) {
  return (
    <div className="flex flex-col gap-2">
      {quizSets.map((quizSet) => (
        <QuizCard key={quizSet.setNumber} {...quizSet} />
      ))}
    </div>
  );
}
