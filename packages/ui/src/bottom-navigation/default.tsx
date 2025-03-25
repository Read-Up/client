import React from "react";
import { PiBooksBold, PiHouseBold, PiUserCircleBold } from "react-icons/pi";

export interface BottomNavigationProps {
  activeTab?: "library" | "home" | "mypage";
  onTabChange?: (tab: "library" | "home" | "mypage") => void;
}

export const BottomNavigation = ({ activeTab, onTabChange }: BottomNavigationProps) => {
  const tabs = [
    { key: "library", label: "내 서재", icon: PiBooksBold },
    { key: "home", label: "홈", icon: PiHouseBold },
    { key: "mypage", label: "마이페이지", icon: PiUserCircleBold },
  ] as const;

  return (
    <nav className="absolute bottom-0 w-full flex flex-row bg-surface text-white items-center h-[90px] justify-evenly" >
      {tabs.map(({ key, label, icon: Icon }) => {
        const isActive = activeTab === key;
        return (
          <button
            key={key}
            onClick={() => onTabChange?.(key)}
            className="flex flex-col items-center justify-center gap-1 text-sm cursor-pointer"
          >
            <Icon size={24} className={isActive ? "text-primary" : "text-white"} />
            <span className={isActive ? "text-primary font-medium" : "text-white"}>
              {label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
