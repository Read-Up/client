import { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { BottomNavigation } from "./default";

const meta: Meta<typeof BottomNavigation> = {
  title: "BottomNavigation",
  component: BottomNavigation,
  tags: ["autodocs"],
  argTypes: {
    onTabChange: { action: "탭 변경" },
  },
};

export default meta;
type Story = StoryObj<typeof BottomNavigation>;

export const Interactive: Story = {
  render: () => {
    const [tab, setTab] = useState<"library" | "home" | "mypage">("home");
    return (
      <div className="w-full bg-black p-4">
        <BottomNavigation activeTab={tab} onTabChange={setTab} />
      </div>
    );
  },
  args: {},
};
