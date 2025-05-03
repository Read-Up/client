import { Meta, StoryObj } from "@storybook/react";
import { SnackBar } from "./default";

const meta: Meta<typeof SnackBar> = {
  title: "Atoms/SnackBar",
  component: SnackBar,
  tags: ["autodocs"],
  argTypes: {
    children: {
      control: {
        type: "text",
      },
    },
    variant: {
      control: {
        type: "radio",
      },
      options: ["notice", "warning"],
    },
  },
  args: {
    children: "경고메세지 문구가 입력됩니다.",
    variant: "notice",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => <SnackBar {...args}>{args.children}</SnackBar>,
};
