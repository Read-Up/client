import { Meta, StoryObj } from "@storybook/react";
import React from "react";
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
    const BottomNavWithState = () => {
      const [tab, setTab] = React.useState<"library" | "home" | "mypage">("home");

      return (
        <div className="w-full h-[90px]">
          <BottomNavigation activeTab={tab} onTabChange={setTab} />
        </div>
      );
    };

    return <BottomNavWithState />;
  },
  args: {},
};
