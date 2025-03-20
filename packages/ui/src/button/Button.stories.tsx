import type { Meta, StoryObj } from "@storybook/react";
import { Button, ButtonProps } from "./default";

const meta = {
  title: "Button",
  component: Button,
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
      options: ["default", "pressed", "secondary", "disabled", "outline", "period", "ghost", "link", "modal"],
    },
    size: {
      control: {
        type: "select",
      },
      options: ["default", "sm", "supporting", "lg", "full", "icon", "icon_small", "grid"],
    }
  }
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// variant와 label을 받아 스토리를 생성하는 헬퍼 함수
const createStory = ({ variant, children }: ButtonProps): Story => ({
  args: {
    variant,
    children,
    size: "default",
  },
});

export const Default = createStory({ variant: "default", children: "I am a default button." });
export const Pressed = createStory({ variant: "pressed", children: "I am a pressed button." });
export const Secondary = createStory({ variant: "secondary", children: "I am a secondary button." });
export const Disabled = createStory({ variant: "disabled", children: "I am a disabled button." });
export const Outline = createStory({ variant: "outline", children: "I am an outline button." });
export const Period = createStory({ variant: "period", children: "I am a period button." });
export const Ghost = createStory({ variant: "ghost", children: "I am a ghost button." });
export const Link = createStory({ variant: "link", children: "I am a link button." });
export const Modal = createStory({ variant: "modal", children: "I am a modal button." });
