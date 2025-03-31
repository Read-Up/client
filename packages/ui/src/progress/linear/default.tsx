import * as React from "react";

export interface LinearProgressProps {
  value: number; // 진행률 (%)
  max?: number; // 최대값 (기본값: 100)
  height?: number; // 높이 (기본값: 2px)
}

const LinearProgress: React.FC<LinearProgressProps> = ({ value, max = 100, height = 2 }) => {
  const progress = Math.min(Math.max(value, 0), max); // 0 ~ max 범위 유지
  const percentage = (progress / max) * 100;

  return (
    <div
      className="w-full bg-progress_background rounded-full overflow-hidden"
      style={{ height: `${height}px`, minHeight: `${height}px` }}
    >
      <div className="h-full bg-primary transition-all duration-300 ease-in-out" style={{ width: `${percentage}%` }} />
    </div>
  );
};

export { LinearProgress };
