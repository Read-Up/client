import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./default";

const meta: Meta<typeof Button> = {
  title: "Atoms/Button",
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
      options: ["filled", "outline", "text_only"],
      description: "버튼의 변형을 설정합니다.",
    },
    size: {
      control: {
        type: "select",
      },
      options: ["default", "sm", "supporting", "full", "icon", "icon_small", "grid"],
      description: "버튼의 크기를 설정합니다.",
    },
    textOption: {
      control: {
        type: "select",
      },
      options: ["default", "connected"],
    },
    disabled: {
      control: {
        type: "boolean",
      },
      options: [true, false],
    },
    secondary: {
      control: {
        type: "boolean",
      },
      options: [true, false],
    },
    color: {
      control: {
        type: "color",
      },
      description: "버튼의 색상을 설정합니다.",
    },
    backgroundColor: {
      control: {
        type: "color",
      },
      description: "버튼의 배경 색상을 설정합니다.",
    },
  },
  args: {
    variant: "filled",
    size: "default",
    disabled: false,
    textOption: "default",
    secondary: false,
    children: "Button",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <div className="bg-surface flex flex-row items-center justify-center h-30">
      <Button {...args} />
    </div>
  ),
};

export const Variants: Story = {
  render: (args) => (
    <div className="bg-surface p-6 flex flex-col gap-4">
      <Button {...args} variant="filled">
        Filled
      </Button>
      <Button {...args} variant="outline">
        Outline
      </Button>
      <Button {...args} variant="text_only">
        Text Only
      </Button>
    </div>
  ),
  args: {
    size: "default",
  },
};

export const Sizes: Story = {
  render: (args) => (
    <div className="bg-surface p-6 flex flex-wrap gap-3 items-center">
      <Button {...args} size="default">
        Default
      </Button>
      <Button {...args} size="sm">
        Small
      </Button>
      <Button {...args} size="supporting">
        Supporting
      </Button>
      <Button {...args} size="full">
        Full Width
      </Button>
    </div>
  ),
  args: {
    variant: "filled",
  },
};

export const WithSecondary: Story = {
  render: (args) => (
    <div className="bg-[#121212] p-6 flex flex-col gap-4">
      <Button {...args} variant="filled" secondary>
        Filled Secondary
      </Button>
      <Button {...args} variant="outline" secondary>
        Outline Secondary
      </Button>
      <Button {...args} variant="text_only" secondary>
        Text Only Secondary
      </Button>
    </div>
  ),
};

export const DisabledStates: Story = {
  render: (args) => (
    <div className="bg-surface p-6 flex flex-col gap-4">
      <Button {...args} variant="filled" disabled>
        Filled Disabled
      </Button>
      <Button {...args} variant="outline" disabled>
        Outline Disabled
      </Button>
      <Button {...args} variant="text_only" disabled>
        Text Only Disabled
      </Button>
    </div>
  ),
};

export const CustomColor: Story = {
  render: (args) => (
    <div className="bg-surface p-6 flex gap-4">
      <Button {...args} color="#ff4d4f" backgroundColor="#fff0f0">
        Custom Color
      </Button>
      <Button {...args} color="#1890ff" backgroundColor="#e6f7ff">
        Another Custom
      </Button>
    </div>
  ),
  args: {
    variant: "text_only",
  },
};
