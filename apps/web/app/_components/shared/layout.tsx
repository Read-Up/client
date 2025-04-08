import React from "react";
import Link from "next/link";
import { BottomNavigation } from "@readup/ui/bottom-navigation";
import { Topbar } from "@readup/ui/topbar";
import { BackSVG } from "@readup/icons";

interface LayoutProps {
  children: React.ReactNode;
  pathname?: string;
  topVariant?: "original" | "icon1" | "icon2" | "close";
  top?: boolean;
  text?: string;
  bottom?: boolean;
  leftSVG?: React.ReactNode;
  rightSVG?: React.ReactNode;
  onLeftClick?: () => void;
  onRightClick?: () => void;
}

export default function Layout({
  children,
  pathname = "",
  topVariant = "icon2",
  top = true,
  text = "",
  bottom = true,
  leftSVG = <BackSVG />,
  rightSVG = <rightSVG />,
  onLeftClick,
  onRightClick,
}: LayoutProps) {
  const getActiveTab = (): "home" | "library" | "mypage" | undefined => {
    if (pathname === "/" || pathname.startsWith("/home")) {
      return "home";
    }
    if (pathname.startsWith("/library")) {
      return "library";
    }
    if (pathname.startsWith("/mypage")) {
      return "mypage";
    }
    return undefined;
  };

  return (
    <div className="relative min-h-screen pb-[90px]">
      {top && (
        <Topbar
          variant={topVariant}
          text={text}
          leftSVG={leftSVG}
          rightSVG={rightSVG}
          onLeftClick={onLeftClick}
          onRightClick={onRightClick}
        />
      )}
      {children}
      {bottom && (
        <BottomNavigation
          activeTab={getActiveTab()}
          LinkComponent={({ href, children }) => (
            <Link href={href} className="no-underline text-inherit">
              {children}
            </Link>
          )}
        />
      )}
    </div>
  );
}
