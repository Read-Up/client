import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { BottomNavigation } from "./default";

const meta = {
  title: "BottomNavigation",
  component: BottomNavigation,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    activeTab: {
      control: { type: "select" },
      options: ["library", "home", "mypage"],
      description: "현재 활성화된 탭",
      defaultValue: "home",
    },
    onTabChange: {
      action: "탭 변경됨",
      description: "탭이 변경될 때 호출되는 함수",
    },
  },
} satisfies Meta<typeof BottomNavigation>;

export default meta;
type Story = StoryObj<typeof BottomNavigation>;

/** ✅ Playground: Storybook Controls 활용 가능 */
export const Playground: Story = {
  args: {
    activeTab: "home",
  },
  render: (args: { activeTab: "library" | "home" | "mypage" }) => (
    <div className="w-full h-[90px] bg-surface">
      <BottomNavigation activeTab={args.activeTab} />
    </div>
  ),
};

/** ✅ State 기반 상호작용 스토리 */
export const Interactive: Story = {
  render: () => {
    const BottomNavWithState = () => {
      const [tab, setTab] = useState<"library" | "home" | "mypage">("home");
      return (
        <div className="w-full h-[90px] bg-surface">
          <BottomNavigation activeTab={tab} onTabChange={setTab} />
        </div>
      );
    };

    return <BottomNavWithState />;
  },
};
