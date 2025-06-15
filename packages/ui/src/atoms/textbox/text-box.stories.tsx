import type { Meta, StoryObj } from "@storybook/react";
import { TextBox } from "./default";
import React, { useState } from "react";

const meta: Meta<typeof TextBox> = {
  title: "Atoms/TextBox",
  component: TextBox,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["searchbox", "textbox", "error", "questionbox", "chapterbox", "error_chapterbox"],
      description: "텍스트 박스의 스타일 타입",
      defaultValue: "searchbox",
    },
    placeholder: {
      control: "text",
      description: "입력 필드에 표시되는 안내 문구",
    },
    value: {
      control: "text",
      description: "현재 입력된 텍스트 값",
    },
    disabled: {
      control: "boolean",
      description: "입력 비활성화 여부",
    },
    index: {
      control: "number",
      description: "챕터 또는 에러 챕터 박스에서 인덱스를 표시할 때 사용",
      if: { arg: "variant", eq: "chapterbox" },
    },
    rounded: {
      control: "boolean",
      description: "입력 필드의 모서리를 둥글게 처리할지 여부 (default: false)",
    },
    onChange: {
      action: "changed",
      description: "입력 값이 변경될 때 호출되는 함수",
    },
    onClear: {
      action: "cleared",
      description: "입력 필드 초기화 버튼 클릭 시 호출되는 함수",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const ControlledTextBox = (args: ControlledTextBoxProps) => {
  const [value, setValue] = useState(args.value || "");

  React.useEffect(() => {
    setValue(args.value || "");
  }, [args.value]);

  return (
    <TextBox
      {...args}
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
      }}
      onClear={() => {
        setValue("");
      }}
    />
  );
};

interface ControlledTextBoxProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  [key: string]: unknown;
}

export const Playground: Story = {
  render: (args: ControlledTextBoxProps) => <ControlledTextBox {...args} />,
  args: {
    variant: "searchbox",
    placeholder: "텍스트를 입력하세요",
    value: "",
    index: 1,
    change: false,
    rounded: false,
  },
};
