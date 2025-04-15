import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import LoginPage from "./page";

const meta: Meta = {
  title: "Pages/Login",
  component: LoginPage,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <LoginPage />,
};
