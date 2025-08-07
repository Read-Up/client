"use client";

type QuizTabsProps = {
  currentType: string;
  onTypeChange: (type: string) => void;
};

export function QuizTabs({ currentType, onTypeChange }: QuizTabsProps) {
  return (
    <nav className="flex w-full rounded-md typo-title3">
      <button
        onClick={() => onTypeChange("all")}
        className={`flex-1 py-2  transition-colors relative ${
          currentType === "all" ? "text-white" : "text-gray-50 hover:text-foreground"
        }`}
      >
        전체퀴즈
        <span
          className={`absolute bottom-0 left-0 w-full ${currentType === "all" ? "h-0.5 bg-primary" : "h-px bg-gray-600"}`}
        />
      </button>
      <button
        onClick={() => onTypeChange("created")}
        className={`flex-1 py-2  transition-colors relative ${
          currentType === "created" ? "text-white" : "text-gray-50 hover:text-foreground"
        }`}
      >
        작성한퀴즈
        <span
          className={`absolute bottom-0 left-0 w-full ${currentType === "created" ? "h-0.5 bg-primary" : "h-px bg-gray-600"}`}
        />
      </button>
      <button
        onClick={() => onTypeChange("participated")}
        className={`flex-1 py-2  transition-colors relative ${
          currentType === "participated" ? "text-white" : "text-gray-50 hover:text-foreground"
        }`}
      >
        참여한퀴즈
        <span
          className={`absolute bottom-0 left-0 w-full ${currentType === "participated" ? "h-0.5 bg-primary" : "h-px bg-gray-600"}`}
        />
      </button>
    </nav>
  );
}
