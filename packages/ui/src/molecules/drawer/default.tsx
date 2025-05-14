"use client";

import { motion, AnimatePresence } from "framer-motion";
import React, { ReactNode } from "react";
import { cn } from "../../lib";

type Direction = "top" | "bottom" | "left" | "right";

type OverlayOpacity = "bg-black/50" | "bg-black/60" | "bg-black/70" | "bg-black/80" | "bg-black/90";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  direction?: Direction;
  /**
   * size: Tailwind의 width/height 클래스 또는 커스텀 CSS (예: 'h-[300px]', 'w-[80vw]')
   * 상단/하단: height 클래스 사용, 좌측/우측: width 클래스 사용
   * For top/bottom: use height classes, for left/right: use width classes
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
    case "left":
      variants.initial = { x: "-100%" };
      variants.exit = { x: "-100%" };
      break;
    case "right":
      variants.initial = { x: "100%" };
      variants.exit = { x: "100%" };
      break;
  }

  return variants;
};

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  direction = "left",
  size = "w-[300px]",
  overlayOpacity = "bg-black/60",
  className = "",
  children,
}) => (
  <AnimatePresence>
    {isOpen && (
      <div className={cn("fixed inset-0 z-50 flex items-center justify-center", overlayOpacity)} onClick={onClose}>
        <motion.div
          className={cn(
            "absolute bg-background flex flex-col p-6",
            direction === "bottom" || direction === "top" ? "left-0 right-0" : "top-0 bottom-0",
            size,
            className,
            direction === "bottom" ? "rounded-t-2xl" : "",
            direction === "top" ? "rounded-b-2xl" : "",
            direction === "left" ? "rounded-r-2xl" : "",
            direction === "right" ? "rounded-l-2xl" : "",
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
