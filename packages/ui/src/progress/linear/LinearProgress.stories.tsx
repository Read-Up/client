import { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { LinearProgress } from "./default";

const meta = {
  title: "ProgressBar/LinearProgress",
  component: LinearProgress,
  tags: ["autodocs"],
} satisfies Meta<typeof LinearProgress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 50,
  },
  render: () => <LinearProgress value={50} />,
};

export const Height4: Story = {
  args: {
    value: 70,
    height: 4,
  },
  render: () => <LinearProgress value={70} height={4} />,
};

export const Height8: Story = {
  args: {
    value: 100,
    height: 8,
  },
  render: () => <LinearProgress value={100} height={8} />,
};
