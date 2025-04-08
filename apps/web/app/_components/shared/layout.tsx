import React from "react";
import Link from "next/link";
import { BottomNavigation } from "@readup/ui/bottom-navigation";
import { Topbar } from "@readup/ui/topbar";

interface LayoutProps {
  children: React.ReactNode;
  pathname?: string;
  top?: boolean;
  topbarText?: string;
  bottom?: boolean;
}

export default function Layout({ children, pathname = "", top = true, topbarText = "", bottom = true }: LayoutProps) {
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
      {top && <Topbar variant="icon2" text={topbarText} />}
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
