"use client";

import { motion, AnimatePresence } from "framer-motion";
import React, { ReactNode } from "react";
import { cn } from "../../lib";

type Direction = "top" | "bottom";

type OverlayOpacity =
  | "bg-black/0"
  | "bg-black/10"
  | "bg-black/20"
  | "bg-black/30"
  | "bg-black/40"
  | "bg-black/50"
  | "bg-black/60"
  | "bg-black/70"
  | "bg-black/80"
  | "bg-black/90";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  direction?: Direction;
  /**
   * size: Tailwind의 width/height 클래스 또는 커스텀 CSS (예: 'h-full', 'h-[80vh]', 'h-[360px]')
   * 상단/하단: height 클래스 사용
   * For top/bottom: use height classes
   */
  size?: string;
  overlayOpacity?: OverlayOpacity;
  className?: string;
  children?: ReactNode;
}

const getAnimation = (direction: Direction) => {
  const variants = {
    initial: {},
    animate: { x: 0, y: 0 },
    exit: {},
  };

  switch (direction) {
    case "top":
      variants.initial = { y: "-100%" };
      variants.exit = { y: "-100%" };
      break;
    case "bottom":
      variants.initial = { y: "100%" };
      variants.exit = { y: "100%" };
      break;
  }

  return variants;
};

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  direction = "bottom",
  size = "h-[300px]",
  overlayOpacity = "bg-black/60",
  className = "",
  children,
}) => (
  <AnimatePresence>
    {isOpen && (
      <div
        className={cn(
          "absolute inset-0 z-50",
          overlayOpacity,
          direction === "bottom" ? "flex items-end justify-center" : "flex items-start justify-center",
        )}
        onClick={onClose}
      >
        <motion.div
          className={cn(
            "absolute bg-background flex flex-col p-6 left-0 right-0",
            size,
            className,
            // rounded 조건: top/bottom + h-full이면 미적용, left/right + w-full이면 미적용
            direction === "bottom" && size !== "h-full" ? "rounded-t-2xl" : "",
            direction === "top" && size !== "h-full" ? "rounded-b-2xl" : "",
          )}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={getAnimation(direction)}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          onClick={(e) => e.stopPropagation()}
          style={{ [direction]: 0 }}
        >
          {children}
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);
