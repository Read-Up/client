"use client";

import { BottomNavigation, Topbar, TopbarProps } from "@readup/ui/molecules";
import Link from "next/link";
import React from "react";
interface LayoutProps {
  children: React.ReactNode;
  pathname?: string;
  topVariant?: "original" | "icon1" | "icon2" | "close";
  top?: boolean;
  bottom?: boolean;
  topbarProps?: TopbarProps;
}

export default function Layout({
  children,
  pathname = "",
  topVariant = "icon2",
  top = true,
  bottom = true,
  topbarProps = {},
}: LayoutProps) {
  // const { text, leftSVG, rightSVG, onLeftClick, onRightClick } = topbarProps;

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
    <div className="relative h-screen pb-[90px]">
      {top && <Topbar variant={topVariant} {...topbarProps} />}
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
