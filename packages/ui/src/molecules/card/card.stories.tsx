import type { Meta, StoryObj } from "@storybook/react";
import { ChapterCard } from "./default";

const meta = {
  title: "Molecules/ChapterCard",
  component: ChapterCard,
  tags: ["autodocs"],
  argTypes: {
    chapter: {
      control: "text",
      description: "챕터 번호 (예: 'Chapter 00')",
    },
    title: {
      control: "text",
      description: "카드의 제목",
    },
    status: {
      control: "text",
      description: "카드 상태(또는 안내 문구)",
    },
    variant: {
      control: { type: "select" },
      options: ["finished", "unfinished"],
      description: "카드 상태에 따른 스타일 (finished / unfinished)",
    },
  },
} satisfies Meta<typeof ChapterCard>;

export default meta;
type Story = StoryObj<typeof meta>;

/** 완료된 챕터(variant: 'finished') 스토리 */
export const Finished: Story = {
  args: {
    variant: "finished",
    chapter: "Chapter 00",
    title: "제목이 여기에 입력됩니다. 내용이 길면 중...",
    status: "퀴즈 작성 완료!",
  },
};

/** 미완료 챕터(variant: 'unfinished') 스토리 */
export const Unfinished: Story = {
  args: {
    variant: "unfinished",
    chapter: "Chapter 01",
    title: "아직 작성되지 않은 퀴즈가 있어요.",
    status: "퀴즈 작성 필요!",
  },
};
