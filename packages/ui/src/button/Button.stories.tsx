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
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// variant와 label을 받아 스토리를 생성하는 헬퍼 함수
const createStory = ({ variant, children, size }: ButtonProps): Story => ({
  args: {
    variant: variant || "default",
    children,
    size: size || "default",
  },
});

export const Default = createStory({ children: "I am a default button." });
export const Pressed = createStory({ variant: "pressed", children: "I am a pressed button." });
export const Disabled = createStory({ variant: "disabled", children: "I am a disabled button." });
export const Secondary = createStory({ variant: "secondary", children: "I am a secondary button." });
export const Outline = createStory({ variant: "outline", children: "I am an outline button." });
export const OutlineDisabled = createStory({
  variant: "disabled_outline",
  children: "I am an outline disabled button.",
});
export const OutlineSecondary = createStory({
  variant: "secondary_outline",
  children: "I am an outline secondary button.",
});
export const Text = createStory({ variant: "text", children: "I am a text button." });
export const TextDisabled = createStory({ variant: "text_disabled", children: "I am a text disabled button." });
export const TextSecondary = createStory({ variant: "text_secondary", children: "I am a text secondary button." });
export const TextConnected = createStory({ variant: "text_connected", children: "I am a text connected button." });
export const Small = createStory({ size: "sm", children: "I am a small button." });
export const SmallOutline = createStory({ size: "sm", variant: "outline", children: "I am a small outline button." });
export const SmallDisabled = createStory({
  size: "sm",
  variant: "disabled",
  children: "I am a small disabled button.",
});
export const Supporting = createStory({ size: "supporting", children: "I am a small supporting button." });
export const SupportingOutline = createStory({
  size: "supporting",
  variant: "outline",
  children: "I am a small supporting outline button.",
});
export const SupportingDisabled = createStory({
  size: "supporting",
  variant: "disabled",
  children: "I am a small supporting disabled button.",
});
export const Full = createStory({ size: "full", children: "I am a full button." });
// export const Period = createStory({ variant: "period", children: "I am a period button." });
// export const Ghost = createStory({ variant: "ghost", children: "I am a ghost button." });
// export const Link = createStory({ variant: "link", children: "I am a link button." });
// export const Modal = createStory({ variant: "modal", children: "I am a modal button." });
