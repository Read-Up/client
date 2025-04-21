import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import SignupPage from "./page";

const meta: Meta = {
  title: "Pages/Signup",
  component: SignupPage,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <SignupPage />,
};
