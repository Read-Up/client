import { Meta, StoryObj } from "@storybook/react";
import { CircularProgress } from "./default";

const meta = {
  title: "ProgressBar/CircularProgress",
  component: CircularProgress,
  tags: ["autodocs"],
} satisfies Meta<typeof CircularProgress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 50,
  },
  render: () => <CircularProgress value={50} />,
};

export const Size40: Story = {
  args: {
    value: 70,
    size: 40,
  },
  render: () => <CircularProgress value={70} size={40} />,
};

export const Size100: Story = {
  args: {
    value: 90,
    size: 100,
  },
  render: () => <CircularProgress value={90} size={100} />,
};
