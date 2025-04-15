import { Meta, StoryObj } from "@storybook/react";
import { SocialLoginLink } from "../atoms";

const meta = {
  title: "Pages/Login",
  tags: ["autodocs"],
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {
  render: () => {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen p-5 bg-background">
        <h2 className="typo-h2 text-on-primary">Log-in</h2>
        <SocialLoginLink provider="kakao" className="mt-15" />
        <SocialLoginLink provider="naver" className="mt-2.5" />
        <SocialLoginLink provider="google" className="mt-2.5" />
        <SocialLoginLink provider="apple" className="mt-2.5" />
      </main>
    );
  },
};
