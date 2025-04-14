import React from "react";
import type { Meta } from "@storybook/react";
import BookSearchLayout from "./layout";
import BookSearchPage from "./page";

const meta: Meta = {
  title: "Pages/Book/Search", // 사이드바에서 보일 경로와 이름
  component: BookSearchPage,
  decorators: [
    (Story) => (
      <BookSearchLayout>
        <Story />
      </BookSearchLayout>
    ),
  ],
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
};

export default meta;

export const Default = () => <BookSearchPage />;
