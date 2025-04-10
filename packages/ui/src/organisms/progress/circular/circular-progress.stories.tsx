import type { Meta, StoryObj } from "@storybook/react";
import { CircularProgress } from "./default";
import { color } from "@readup/tokens";

const meta: Meta<typeof CircularProgress> = {
  title: "Organisms/progress/CircularProgress",
  component: CircularProgress,
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: { type: "range", min: 0, max: 100, step: 1 },
      description: "현재 진행률 (%)",
    },
    size: {
      control: { type: "select" },
      options: [20, 40, 60, 80, 100],
      description: "원의 크기 (px)",
    },
    strokeWidth: {
      control: { type: "number", min: 1, max: 10 },
      description: "원 stroke 두께",
    },
    fill: {
      control: "color",
      description: "진행 바 색상",
    },
  },
  args: {
    value: 50,
    size: 60,
    strokeWidth: 5,
    fill: color.primary,
  },
};

export default meta;
type Story = StoryObj<typeof CircularProgress>;

export const Playground: Story = {
  render: (args) => <CircularProgress {...args} />,
};

export const ThinSmall: Story = {
  args: {
    value: 30,
    size: 40,
    strokeWidth: 2,
    fill: color.primary,
  },
};

export const ThickLarge: Story = {
  args: {
    value: 80,
    size: 100,
    strokeWidth: 8,
    fill: "#E91E63",
  },
};

export const FullProgress: Story = {
  args: {
    value: 100,
    size: 60,
    strokeWidth: 6,
    fill: "oklch(60% 0.15 150)",
  },
};
