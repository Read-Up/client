import type { Meta, StoryObj } from "@storybook/react";
import { TextBox, type TextBoxProps } from "./default";
import React, { useState } from "react";

const meta = {
  title: "TextBox",
  component: TextBox,
  tags: ["autodocs"],
} satisfies Meta<typeof TextBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SearchBox: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <TextBox
        variant="searchbox"
        placeholder="검색어를 입력해주세요."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  },
};

export const TextBoxComponent: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <TextBox
        variant="textbox"
        placeholder="안내문구가 입력됩니다."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  },
};

export const ErrorTextBox: Story = {
  render: () => (
    <TextBox
      variant="error"
      value="오류 발견 시, 텍스트 색상은 ‘on primary’ 유지"
      placeholder="에러 문구"
    />
  ),
};

export const QuestionBox: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <TextBox
        variant="questionbox"
        placeholder={`최대 255자까지 작성 가능합니다.\n한글, 영문 대·소문자, 숫자를 입력할 수 있습니다.`}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  }
};

export const ChapterBox: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <TextBox
        variant="chapterbox"
        placeholder="안내문구가 입력됩니다."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        index={1}
      />
    );
  }
};

export const ErrorChapterBox: Story = {
  render: () => {
    return (
      <TextBox
        variant="error_chapterbox"
        value="오류 발견"
        placeholder="에러 문구"
        index={1}
      />
    );
  }
};

export const ChapterBoxWithChange: Story = {
  render: () => (
    <TextBox
      variant="chapterbox"
      value="순서 변경 시"
      placeholder="안내문구가 입력됩니다."
      index={1}
      change={true}
    />
  ),
};
