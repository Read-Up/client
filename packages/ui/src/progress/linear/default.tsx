import { color } from "@readup/tokens";
import * as React from "react";

export interface LinearProgressProps {
  value: number; // 진행률 (%)
  max?: number; // 최대값 (기본값: 100)
  height?: number; // 높이 (기본값: 2px)
  fill?: string; // 채우기 색상 (기본값: primary)
  background?: string; // 배경 색상 (기본값: progress_background)
}

const LinearProgress: React.FC<LinearProgressProps> = ({
  value,
  max = 100,
  height = 2,
  fill = color.primary,
  background = color.progress_background,
}) => {
  const progress = Math.min(Math.max(value, 0), max); // 0 ~ max 범위 유지
  const percentage = (progress / max) * 100;

  return (
    <div
      className="w-full rounded-full overflow-hidden"
      style={{ height: `${height}px`, minHeight: `${height}px`, background }}
    >
      <div
        className="h-full transition-all duration-300 ease-in-out"
        style={{ width: `${percentage}%`, background: fill }}
      />
    </div>
  );
};

export { LinearProgress };
