import { Meta, StoryObj } from "@storybook/react";
import { Dropdown } from "./default";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";

const meta: Meta<typeof Dropdown> = {
  title: "Atoms/Dropdown",
  component: Dropdown,
  tags: ["autodocs"],
  argTypes: {
    children: {
      control: {
        type: "text",
      },
    },
  },
  args: {
    children: "Dropdown",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <div className="w-full h-[300px] flex flex-col gap-2 items-center justify-center bg-white text-black">
      <Dropdown {...args} backgroundColor="background" className="bg-background">
        <DropdownMenuItem>Item 1</DropdownMenuItem>
        <DropdownMenuItem>Item 2</DropdownMenuItem>
        <DropdownMenuItem>Item 3</DropdownMenuItem>
      </Dropdown>
      <div className="typo-title3 mt-4">This is a dropdown component. Click the button to see the items.</div>
      <div className="typo-title3 mt-2">You can customize the items inside the dropdown.</div>
    </div>
  ),
};
