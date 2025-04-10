import type { Meta, StoryObj } from "@storybook/react";
import { Topbar, TopbarProps } from "./default";

const meta = {
  title: "Molecules/Topbar",
  component: Topbar,
  tags: ["autodocs"],
  argTypes: {
    children: {
      control: {
        type: "text",
      },
    },
    variant: {
      control: {
        type: "select",
      },
      options: ["original", "icon1", "icon2", "close"],
    },
  },
} satisfies Meta<typeof Topbar>;

export default meta;
type Story = StoryObj<typeof meta>;

const createStory = ({ variant, children }: TopbarProps): Story => ({
  args: {
    variant,
    children,
  },
});

export const Original = createStory({ variant: "original" });
export const Icon1 = createStory({ variant: "icon1" });
export const Icon2 = createStory({ variant: "icon2", children: "닉네임 설정" });
export const Close = createStory({ variant: "close" });
