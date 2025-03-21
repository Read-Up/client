'use client';

import * as React from 'react';

interface CircularProgressProps {
  value: number; // 진행률 (%)
  size?: number; // SVG 크기
  strokeWidth?: number; // 테두리 두께
}

const CircularProgress: React.FC<CircularProgressProps> = ({ value, size = 60, strokeWidth = 5 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progressOffset = circumference - (value / 100) * circumference;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* 배경 원 */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="transparent"
        strokeWidth={strokeWidth}
        fill="transparent"
      />
      {/* 진행 바 */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="oklch(64.6% 0.1423 253.92)"
        strokeWidth={strokeWidth}
        fill="transparent"
        strokeDasharray={circumference}
        strokeDashoffset={progressOffset}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`} // 12시 방향 시작
      />
    </svg>
  );
};

export { CircularProgress };
