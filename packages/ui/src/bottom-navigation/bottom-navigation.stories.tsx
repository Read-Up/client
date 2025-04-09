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
  },
} satisfies Meta<typeof BottomNavigation>;

export default meta;
type Story = StoryObj<typeof BottomNavigation>;

// 🔗 Storybook용 MockLink: 실제 페이지 이동은 막고 렌더만 함
const MockLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a
    href={href}
    onClick={(e) => {
      e.preventDefault();
      alert(`이동: ${href}`);
    }}
    className="no-underline text-inherit"
  >
    {children}
  </a>
);

/** ✅ Playground: static props 테스트 */
export const Playground: Story = {
  args: {
    activeTab: "home",
    LinkComponent: MockLink,
  },
  render: (args) => (
    <div className="w-full h-[90px] bg-surface">
      <BottomNavigation {...args} />
    </div>
  ),
};

/** ✅ Interactive: 상태 기반 탭 변경 시뮬레이션 */
export const Interactive: Story = {
  render: () => {
    const BottomNavWithState = () => {
      const [tab, setTab] = useState<"library" | "home" | "mypage">("home");

      const CustomMockLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
        <a
          href={href}
          onClick={(e) => {
            e.preventDefault();
            if (href === "/") setTab("home");
            else if (href === "/library") setTab("library");
            else if (href === "/mypage") setTab("mypage");
          }}
        >
          {children}
        </a>
      );

      return (
        <div className="w-full h-[90px] bg-surface">
          <BottomNavigation activeTab={tab} LinkComponent={CustomMockLink} />
        </div>
      );
    };

    return <BottomNavWithState />;
  },
};
