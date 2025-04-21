import { Meta, StoryObj } from "@storybook/react";
import { Divider } from "./default";

const meta: Meta<typeof Divider> = {
  title: "Atoms/Divider",
  component: Divider,
  tags: ["autodocs"],
  argTypes: {
    direction: {
      control: {
        type: "select",
      },
      options: ["horizontal", "vertical"],
    },
    variantColor: {
      control: {
        type: "select",
      },
      options: ["default", "gray", "light", "dark", "primary", "error"],
    },
  },
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof Divider>;

export const Default: Story = {
  args: {
    direction: "horizontal",
    variantColor: "gray",
  },
};

export const Vertical: Story = {
  args: {
    direction: "vertical",
    variantColor: "gray",
  },
};
