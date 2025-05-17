import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Settings from "./page";
import SettingsLayout from "./layout";

const meta: Meta = {
  title: "Pages/Settings",
  component: Settings,
  decorators: [
    (Story) => (
      <SettingsLayout>
        <Story />
      </SettingsLayout>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <Settings />,
};
