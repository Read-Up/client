import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { Drawer } from "../../molecules/drawer";
import { Button } from "../../atoms";

const meta: Meta<typeof Drawer> = {
  title: "Molecules/Drawer",
  component: Drawer,
  tags: ["autodocs"],
  argTypes: {
    isOpen: {
      control: false,
      description: "Drawer 열림 여부 (내부적으로 제어됨)",
    },
    direction: {
      control: { type: "select" },
      options: ["top", "bottom", "left", "right"],
      description: "슬라이드 방향",
      defaultValue: "bottom",
    },
    size: {
      control: "text",
      description: "Drawer 크기 (Tailwind 클래스 또는 px, vw 단위)",
      defaultValue: "h-[300px]",
    },
    overlayOpacity: {
      control: { type: "select" },
      options: ["bg-black/50", "bg-black/60", "bg-black/70", "bg-black/80", "bg-black/90"],
      description: "오버레이 투명도",
      defaultValue: "bg-black/60",
    },
    onClose: {
      action: "closed",
      description: "닫을 때 호출되는 콜백",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const ControlledDrawer = (
  args: Omit<React.ComponentProps<typeof Drawer>, "isOpen" | "onClose"> & { children?: React.ReactNode },
) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Drawer</Button>
      <Drawer {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
        {args.children ?? (
          <>
            <h2 className="text-white text-xl mb-4">Drawer Content</h2>
            <p className="text-gray-300 mb-4">This is an interactive drawer component.</p>
            <Button onClick={() => setIsOpen(false)}>Close</Button>
          </>
        )}
      </Drawer>
    </>
  );
};

export const Playground: Story = {
  render: (args) => (
    <div className="w-full h-screen flex items-center justify-center bg-background p-4">
      <ControlledDrawer {...args} />
    </div>
  ),
  args: {
    direction: "bottom",
    size: "h-[300px]",
    overlayOpacity: "bg-black/60",
  },
};

export const FromLeft: Story = {
  render: (args) => (
    <div className="w-full h-screen flex items-center justify-center bg-background p-4">
      <ControlledDrawer {...args} />
    </div>
  ),
  args: {
    direction: "left",
    size: "w-[300px]",
    overlayOpacity: "bg-black/70",
  },
};

export const FromRight: Story = {
  render: (args) => (
    <div className="w-full h-screen flex items-center justify-center bg-background p-4">
      <ControlledDrawer {...args} />
    </div>
  ),
  args: {
    direction: "right",
    size: "w-[300px]",
    overlayOpacity: "bg-black/80",
  },
};

export const FromTop: Story = {
  render: (args) => (
    <div className="w-full h-screen flex items-center justify-center bg-background p-4">
      <ControlledDrawer {...args} />
    </div>
  ),
  args: {
    direction: "top",
    size: "h-[300px]",
    overlayOpacity: "bg-black/70",
  },
};
