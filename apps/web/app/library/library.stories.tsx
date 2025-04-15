import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import LibraryPage from "./page";
import LibraryLayout from "./layout";

const meta: Meta = {
  title: "Pages/Library",
  component: LibraryPage,
  decorators: [
    (Story) => (
      <LibraryLayout>
        <Story />
      </LibraryLayout>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <LibraryPage />,
};
