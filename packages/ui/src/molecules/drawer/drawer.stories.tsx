import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { Drawer } from "../../molecules/drawer";
import { Button } from "../../atoms";
import { MUIDrawer } from "./mui-drawer";
import { Typography } from "@mui/material";

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
      options: ["top", "bottom"],
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

const ControlledMUIDrawer = (
  args: Omit<React.ComponentProps<typeof MUIDrawer>, "isOpen" | "onClose"> & { children?: React.ReactNode },
) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open MUI Drawer</Button>
      <MUIDrawer {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
        {/* {args.children ?? (
          <>
            <Typography variant="h6" className="text-white mb-4">
              MUI Drawer Content
            </Typography>
            <Typography variant="body1" className="text-gray-300 mb-4">
              This is an interactive MUI drawer component.
            </Typography>
          </>
        )} */}
        <div className="w-full h-full bg-background">
          <Typography variant="h6" className="text-white mb-4">
            MUI Drawer Content
          </Typography>
          <Typography variant="body1" className="text-gray-300 mb-4">
            This is an interactive MUI drawer component.
          </Typography>
          <Button onClick={() => setIsOpen(false)}>Close</Button>
        </div>
      </MUIDrawer>
    </>
  );
};

export const MUIDrawerExample: Story = {
  render: () => (
    <div className="w-full h-screen flex items-center justify-center bg-background p-4">
      <ControlledMUIDrawer direction="right" size="h-[300px]" overlayOpacity="bg-black/60" />
    </div>
  ),
  args: {
    direction: "up",
    size: "h-[300px]",
    overlayOpacity: "bg-black/60",
  },
};
