import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Mypage from "./page";
import MypageLayout from "./layout";

const meta: Meta = {
  title: "Pages/Mypage",
  component: Mypage,
  decorators: [
    (Story) => (
      <MypageLayout>
        <Story />
      </MypageLayout>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <Mypage />,
};
