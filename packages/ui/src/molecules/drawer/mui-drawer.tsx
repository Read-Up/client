"use client";

import { Paper, Slide } from "@mui/material";

type Direction = "left" | "right" | "up" | "down";

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
  size: string;
  overlayOpacity?: OverlayOpacity;
  className?: string;
  children?: React.ReactNode;
}

const parseTailwindHeight = (size: string): string | number => {
  if (size === "h-full") return "100%";
  if (size === "h-screen") return "100vh";

  // e.g. h-[300px], h-[80%], h-[calc(100vh-50px)]
  const match = size.match(/^h-\[(.+)\]$/);
  if (match && match[1]) {
    return match[1];
  }

  return "300px"; // default fallback
};

export function MUIDrawer({
  isOpen,
  onClose,
  direction = "up",
  size = "h-[300px]",
  overlayOpacity = "bg-black/60",
  className = "",
  children,
}: DrawerProps) {
  const height = parseTailwindHeight(size);

  return (
    isOpen && (
      <>
        <div className={`absolute inset-0 ${overlayOpacity} z-10`} onClick={onClose} />
        <Slide direction={direction} in={isOpen} mountOnEnter unmountOnExit>
          <Paper
            elevation={4}
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: height,
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
              p: 3,
              color: "#fff",
              zIndex: 20, // ✅ 배경보다 위에
            }}
            className={className}
            onClick={(e) => e.stopPropagation()} // ✅ 내부 클릭 시 닫힘 방지
          >
            {children}
          </Paper>
        </Slide>
      </>
    )
  );
}
