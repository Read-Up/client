import { BookcaseSVG, HomeSVG, UserCircleSVG } from "@readup/icons";
import React from "react";

export interface BottomNavigationProps {
  activeTab?: "library" | "home" | "mypage";
  onTabChange?: (tab: "library" | "home" | "mypage") => void;
}

export const BottomNavigation = ({ activeTab, onTabChange }: BottomNavigationProps) => {
  const tabs = [
    { key: "library", label: "내 서재", icon: BookcaseSVG },
    { key: "home", label: "홈", icon: HomeSVG },
    { key: "mypage", label: "마이페이지", icon: UserCircleSVG },
  ] as const;

  return (
    <nav className="absolute bottom-0 w-full flex flex-row bg-surface text-white items-center h-[90px] justify-evenly">
      {tabs.map(({ key, label, icon: Icon }) => {
        const isActive = activeTab === key;
        return (
          <button
            key={key}
            onClick={() => onTabChange?.(key)}
            className="flex flex-col items-center justify-center gap-1 text-sm cursor-pointer"
          >
            <Icon size="md" fill={isActive ? "#4A90E2" : "#FFFFFF"} />
            <span className={isActive ? "text-primary font-medium" : "text-white"}>{label}</span>
          </button>
        );
      })}
    </nav>
  );
};
