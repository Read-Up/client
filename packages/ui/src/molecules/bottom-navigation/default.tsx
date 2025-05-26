"use client";

import { BooksSVG, HomeSVG, UserCircleSVG } from "@readup/icons";

export interface BottomNavigationProps {
  activeTab?: "library" | "home" | "mypage";
  LinkComponent: React.ComponentType<{ href: string; children: React.ReactNode }>;
}

export const BottomNavigation = ({ activeTab, LinkComponent }: BottomNavigationProps) => {
  const tabs = [
    { key: "library", label: "내 서재", icon: BooksSVG, href: "/library" },
    { key: "home", label: "홈", icon: HomeSVG, href: "/" },
    { key: "mypage", label: "마이페이지", icon: UserCircleSVG, href: "/mypage" },
  ] as const;

  return (
    <nav className="absolute bottom-0 w-full flex flex-row bg-surface text-white h-[90px] justify-evenly shadow-bottom-nav">
      {tabs.map(({ key, label, icon: Icon, href }) => {
        const isActive = activeTab === key;
        return (
          <LinkComponent key={key} href={href}>
            <div className="flex flex-col items-center gap-1 text-sm cursor-pointer mt-3">
              <Icon size="md" fill={isActive ? "#4A90E2" : "#FFFFFF"} />
              <span className={isActive ? "text-primary font-medium" : "text-white"}>{label}</span>
            </div>
          </LinkComponent>
        );
      })}
    </nav>
  );
};
