"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { BottomNavigation } from "@readup/ui/bottom-navigation";
import { Topbar } from "@readup/ui/topbar";

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
  const pathname = usePathname();
  const router = useRouter();

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

  const handleTabChange = (tab: "home" | "library" | "mypage") => {
    const path = tab === "home" ? "/" : `/${tab}`;
    router.push(path);
  };

  return (
    <div className="relative min-h-screen pb-[90px]">
      <Topbar variant="icon2" text="책 정보" />
      {children}
      <BottomNavigation activeTab={getActiveTab()} onTabChange={handleTabChange} />
    </div>
  );
};

export default PageLayout;
