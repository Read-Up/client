import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import BookSearchLayout from "./layout";
import BookSearchPage from "./page";

const meta: Meta = {
  title: "Pages/Book/Search",
  component: BookSearchPage,
  decorators: [
    (Story) => (
      <BookSearchLayout>
        <Story />
      </BookSearchLayout>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <BookSearchPage />,
};
