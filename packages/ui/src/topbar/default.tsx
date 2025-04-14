import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../lib/utils";
import { BackSVG, CloseSVG } from "@readup/icons";

const topbarVariants = cva("flex w-full items-center px-4 bg-background text-white", {
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
  text?: string;
  leftSVG?: React.ReactNode;
  rightSVG?: React.ReactNode;
  onLeftClick?: () => void;
  onRightClick?: () => void;
  heightClass?: string;
}

// NOTE: height prop은 default로 50을 사용하도록 설정(px단위). 이후 필요에 따라 변경 가능
export function Topbar({
  variant,
  text,
  leftSVG = <BackSVG />,
  rightSVG = <CloseSVG />,
  onLeftClick,
  onRightClick,
  heightClass = "h-[50px]",
  className,
  ...props
}: TopbarProps) {
  // TailwindCSS의 arbitrary class를 사용하여 동적 높이 클래스 생성

  return (
    <>
      <header className={cn(topbarVariants({ variant }), className, heightClass)} {...props}>
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
          <>
            <button onClick={onLeftClick}>{leftSVG}</button>
            {text && <div className="absolute left-1/2 transform -translate-x-1/2 typo-title1">{text}</div>}
          </>
        )}
        {variant === "icon2" && (
          <>
            <button onClick={onLeftClick}>{leftSVG}</button>
            {text && <div className="typo-title1">{text}</div>}
            <button onClick={onRightClick}>{rightSVG}</button>
          </>
        )}
        {variant === "close" && <button onClick={onRightClick}>{rightSVG}</button>}
      </header>
    </>
  );
}
