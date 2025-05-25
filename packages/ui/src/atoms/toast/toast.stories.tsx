import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { Toast } from "./default";
import { Button } from "../button";

const meta: Meta<typeof Toast> = {
  title: "Atoms/Toast",
  component: Toast,
  tags: ["autodocs"],
  argTypes: {
    text: { control: "text", defaultValue: "해당 계정으로 로그인 정보를 찾을 수 없습니다." },
    textColor: { control: { type: "select" }, options: ["default", "error"], defaultValue: "default" },
    timeout: { control: "number", defaultValue: 3000 },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const ControllToast = (args: Omit<React.ComponentProps<typeof Toast>, "onDismiss" | "text" | "isOpen">) => {
  const [visible, setVisible] = useState(false);

  const handleDismiss = () => {
    setVisible(false);
  };

  return (
    <>
      <Toast {...args} onDismiss={handleDismiss} text={args.text} isOpen={visible} />
      <Button onClick={() => setVisible(true)}>Show Toast</Button>
    </>
  );
};

export const Playground: Story = {
  render: (args) => (
    <div className="w-full h-[300px] flex flex-col p-10 gap-10 bg-background">
      <ControllToast {...args} />
    </div>
  ),
  args: {
    text: "해당 계정으로 로그인 정보를 찾을 수 없습니다.",
    textColor: "error",
    timeout: 3000,
  },
};
