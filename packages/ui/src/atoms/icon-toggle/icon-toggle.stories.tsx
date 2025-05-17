import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { ArrowLineUpSVG, ArrowLineUnderSVG } from "@readup/icons"; // 아이콘 경로에 맞게 조정하세요
import { IconToggle, IconToggleProps } from "./default";

const meta: Meta<typeof IconToggle> = {
  title: "Atoms/IconToggle",
  component: IconToggle,
  tags: ["autodocs"],
  argTypes: {
    active: {
      control: "boolean",
      description: "현재 활성 상태",
    },
    activeIcon: {
      control: false,
      description: "활성화 상태일 때 표시할 아이콘",
    },
    inactiveIcon: {
      control: false,
      description: "비활성화 상태일 때 표시할 아이콘",
    },
    onChange: {
      action: "changed",
      description: "상태 변경 시 호출",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const ControlledIconToggle = (args: Partial<Omit<IconToggleProps, "activeIcon" | "inactiveIcon">>) => {
  const [active, setActive] = useState(args.active ?? false);

  React.useEffect(() => {
    setActive(args.active ?? false);
  }, [args.active]);

  return (
    <IconToggle
      {...args}
      active={active}
      onChange={setActive}
      activeIcon={<ArrowLineUpSVG size="lg" />}
      inactiveIcon={<ArrowLineUnderSVG size="lg" />}
    />
  );
};

export const Playground: Story = {
  render: (args) => (
    <div className="w-full flex flex-col p-4 gap-4 bg-background">
      <ControlledIconToggle {...args} />
    </div>
  ),
  args: {
    active: false,
  },
};
