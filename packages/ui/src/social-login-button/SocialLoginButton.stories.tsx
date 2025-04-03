import type { Meta, StoryObj } from "@storybook/react";
import { SocialLoginLink } from "./default";

const meta: Meta<typeof SocialLoginLink> = {
  title: "Components/SocialLoginButton",
  component: SocialLoginLink,
  tags: ["autodocs"],
  argTypes: {
    provider: {
      control: "select",
      options: ["kakao", "naver", "google", "apple"],
    },
    label: {
      control: "text",
    },
    href: {
      control: "text",
    },
  },
} satisfies Meta<typeof SocialLoginLink>;

export default meta;
type Story = StoryObj<typeof SocialLoginLink>;

export const Kakao: Story = {
  args: {
    provider: "kakao",
    label: "카카오 계정으로 로그인",
    href: "/api/auth/signin/kakao",
  },
};

export const Naver: Story = {
  args: {
    provider: "naver",
    label: "네이버 계정으로 로그인",
    href: "/api/auth/signin/naver",
  },
};

export const Google: Story = {
  args: {
    provider: "google",
    label: "구글 계정으로 로그인",
    href: "/api/auth/signin/google",
  },
};

export const Apple: Story = {
  args: {
    provider: "apple",
    label: "애플 계정으로 로그인",
    href: "/api/auth/signin/apple",
  },
};
