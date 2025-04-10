import type { Meta, StoryObj } from "@storybook/react";
import { BookSearchResult, BookSearchResultProps } from "./default";
import dummyBookSearchResults from "./data";

const meta: Meta<typeof BookSearchResult> = {
  title: "Book/SearchResult",
  component: BookSearchResult,
  tags: ["autodocs"],
  argTypes: {
    bookmark: {
      control: "boolean",
      description: "책갈피 여부",
      options: [true, false],
    },
    id: {
      control: "number",
      description: "서버 ID",
    },
    isbn: {
      control: "number",
      description: "ISBN",
    },
    image: {
      control: "text",
      description: "책 이미지 URL",
    },
    title: {
      control: "text",
      description: "책 제목",
    },
    author: {
      control: "text",
      description: "저자",
    },
    publisher: {
      control: "text",
      description: "출판사",
    },
  },
  args: {
    id: 1,
    isbn: 9788931476804,
    bookmark: false,
    image: "https://image.yes24.com/goods/139798289/XL",
    title: "2025 이기적 라눅스마스터 1급 (1·2차)",
    author: "권소라",
    publisher: "영진닷컴",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="flex w-full h-60 bg-surface p-4 items-center">
      <BookSearchResult {...args} />
    </div>
  ),
};

export const List: Story = {
  render: () => {
    const bookSearchResults: BookSearchResultProps[] = dummyBookSearchResults;
    return (
      <div className="flex flex-col w-full h-100 bg-surface px-4 py-10 overflow-y-auto gap-4">
        {bookSearchResults.map((result) => (
          <BookSearchResult
            key={result.id}
            id={result.id}
            isbn={result.isbn}
            image={result.image}
            title={result.title}
            author={result.author}
            publisher={result.publisher}
            bookmark={result.bookmark}
          />
        ))}
      </div>
    );
  },
};
