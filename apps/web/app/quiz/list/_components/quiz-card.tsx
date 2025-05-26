import { HearFilledSVG } from "@readup/icons";

export type QuizCardProps = {
  setNumber: number;
  date: string;
  questionCount: number;
  accuracy: number;
  averageTime: number;
  cardLikes: number;
  hasParticipated: boolean;
  isCreator?: boolean;
};

export default function QuizCard({
  setNumber,
  date,
  questionCount,
  accuracy,
  averageTime,
  cardLikes,
  hasParticipated,
  isCreator,
}: QuizCardProps) {
  return (
    <div className={`bg-surface rounded-lg py-3 pt-2 px-3 ${isCreator ? "border-l-2 border-primary" : ""}`}>
      <div className="flex justify-between items-start mb-0.5">
        <span className="text-primary typo-bedge">세트 {setNumber}</span>
        <span className="text-gray-60 typo-bedge">{date}</span>
      </div>

      <h3 className="typo-title2 mb-4">{questionCount}개의 문제가 들어있어요.</h3>

      <div className="flex gap-2 mb-4.5">
        <span className="px-2 py-1 bg-secondary rounded-full typo-bedge text-background">정답률 {accuracy}%</span>
        <span className="px-2 py-1 bg-primary rounded-full typo-bedge text-background">평균 {averageTime}분</span>
      </div>

      <div className="flex justify-between items-center typo-bedge">
        <div className="flex items-center">
          <HearFilledSVG fill="var(--color-primary)" className="w-4 h-4" />
          <span className="text-primary">{cardLikes}</span>
        </div>
        <span className="text-on-surface">{hasParticipated ? "참여함" : "참여자가 아직 없어요"}</span>
      </div>
    </div>
  );
}
