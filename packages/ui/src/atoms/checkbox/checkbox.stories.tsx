import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { Checkbox, CheckboxProps } from "./default";

const meta: Meta<typeof Checkbox> = {
  title: "Atoms/CheckBox",
  component: Checkbox,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
      description: "체크박스 크기",
      defaultValue: "md",
    },
    color: {
      control: { type: "select" },
      options: ["default", "primary", "gray"],
      description: "체크박스 색상",
      defaultValue: "default",
    },
    checked: {
      control: "boolean",
      description: "체크 여부",
    },
    onChange: {
      action: "changed",
      description: "체크 상태 변경 시 호출",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const ControlledCheckBox = (args: CheckboxProps) => {
  const [checked, setChecked] = useState(args.checked || false);

  React.useEffect(() => {
    setChecked(args.checked || false);
  }, [args.checked]);

  return <Checkbox {...args} checked={checked} onChange={setChecked} />;
};

export const Playground: Story = {
  render: (args) => (
    <div className="w-full flex flex-col p-4 gap-4 bg-background">
      <ControlledCheckBox {...args} />
    </div>
  ),
  args: {
    size: "md",
    color: "default",
    checked: false,
  },
};
