import type { Meta, StoryObj } from "@storybook/react";
import { LinearProgress } from "./default";
import { color } from "@readup/tokens";

const meta: Meta<typeof LinearProgress> = {
  title: "ProgressBar/LinearProgress",
  component: LinearProgress,
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: { type: "range", min: 0, max: 100, step: 1 },
      description: "현재 진행률 (%)",
    },
    max: {
      control: { type: "number", min: 1, max: 1000, step: 10 },
      description: "최대값 (기본값: 100)",
    },
    height: {
      control: { type: "number", min: 2, max: 20, step: 1 },
      description: "진행 바 높이 (px)",
    },
    fill: {
      control: "color",
      description: "진행 바 색상",
    },
    background: {
      control: "color",
      description: "배경 색상",
    },
  },
  args: {
    value: 50,
    max: 100,
    height: 4,
    fill: color.primary, // 기본 색상
    background: color.progress_background, // 배경 기본 색상
  },
};

export default meta;
type Story = StoryObj<typeof LinearProgress>;

export const Playground: Story = {
  render: (args) => <LinearProgress {...args} />,
};

export const Height6: Story = {
  args: {
    value: 75,
    height: 6,
    fill: "#FF5722",
  },
};

export const FullProgress: Story = {
  args: {
    value: 100,
    height: 8,
    fill: "#4CAF50",
    background: "#D0D0D0",
  },
};
