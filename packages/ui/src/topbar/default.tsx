"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../lib/utils";
import { BackSVG, CloseSVG } from "@readup/icons";

const topbarVariants = cva("flex items-center w-[375px] h-[50px] px-4 py-[13px] bg-background text-white", {
  variants: {
    variant: {
      original: "justify-between gap-2 bg-[#d9d9d9]",
      icon1: "justify-start",
      icon2: "justify-between",
      close: "justify-end",
    },
  },
  defaultVariants: {
    variant: "original",
  },
});

export interface TopbarProps extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof topbarVariants> {
  // 화살표/닫기 버튼에 연결할 이벤트 핸들러 (필요 시)
  onArrowClick?: () => void;
  onCloseClick?: () => void;
}

export function Topbar({ variant, children, onArrowClick, onCloseClick, className, ...props }: TopbarProps) {
  return (
    <header className={cn(topbarVariants({ variant }), className)} {...props}>
      {variant === "original" && (
        <>
          <div className="flex gap-2.5">
            <div className="w-6 h-6 bg-white rounded-sm" />
            <div className="w-6 h-6 bg-white rounded-sm" />
          </div>
          <div className="flex gap-2.5">
            <div className="w-6 h-6 bg-white rounded-sm" />
            <div className="w-6 h-6 bg-white rounded-sm" />
          </div>
        </>
      )}
      {variant === "icon1" && (
        <button onClick={onArrowClick}>
          <BackSVG />
        </button>
      )}
      {variant === "icon2" && (
        <>
          <button onClick={onArrowClick}>
            <BackSVG />
          </button>
          {children && <div className="font-semibold text-xl">{children}</div>}
          <button onClick={onCloseClick}>
            <CloseSVG />
          </button>
        </>
      )}
      {variant === "close" && (
        <button onClick={onCloseClick}>
          <CloseSVG />
        </button>
      )}
    </header>
  );
}
