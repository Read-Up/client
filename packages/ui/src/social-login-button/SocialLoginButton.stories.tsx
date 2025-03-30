import type { Meta, StoryObj } from "@storybook/react";
import { SocialLoginButton } from "./default";

const meta: Meta<typeof SocialLoginButton> = {
  title: "Components/SocialLoginButton",
  component: SocialLoginButton,
  tags: ["autodocs"],
  argTypes: {
    onClick: { action: "clicked" },
  },
};

export default meta;
type Story = StoryObj<typeof SocialLoginButton>;

export const Kakao: Story = {
  args: {
    provider: "kakao",
  },
};

export const Naver: Story = {
  args: {
    provider: "naver",
  },
};

export const Google: Story = {
  args: {
    provider: "google",
  },
};

export const Apple: Story = {
  args: {
    provider: "apple",
  },
};
