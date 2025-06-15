import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import BookAddScreen from "@/books/add/screen";
import userEvent from "@testing-library/user-event";

jest.mock("@/_server/main/get-instance", () => ({
  getClientApi: () => ({
    post: () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const error: any = new Error("이미 추가된 책입니다.");
      error.name = "HTTPError";
      error.response = {
        status: 409,
        json: async () => ({ message: "이미 추가된 책입니다." }),
      };
      return {
        json: async () => {
          throw error; // 여기서 에러 발생
        },
      };
    },
  }),
}));

describe("BookAddScreen 테스트", () => {
  it("렌더링 테스트", async () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <BookAddScreen />
      </QueryClientProvider>,
    );

    expect(screen.getByText("책 추가하기")).toBeInTheDocument();
  });

  it("ISBN을 입력하고 Enter를 누르면 로딩 스켈레톤이 나타나야 한다", async () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <BookAddScreen />
      </QueryClientProvider>,
    );

    const input = screen.getByPlaceholderText("ISBN을 입력해주세요") as HTMLInputElement;
    await userEvent.type(input, "1234567890123{enter}");

    expect(await screen.findByTestId("book-search-loading-skeleton")).toBeInTheDocument();
  });

  it("이미 추가된 ISBN을 입력하면 에러 메시지를 보여준다 (409 Conflict)", async () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <BookAddScreen />
      </QueryClientProvider>,
    );

    const input = screen.getByPlaceholderText("ISBN을 입력해주세요");
    await userEvent.type(input, "9791162245262{enter}");

    await waitFor(
      () => expect(screen.getByText((content) => content.includes("이미 추가된 책이예요"))).toBeInTheDocument(),
      {
        timeout: 5000, // 최대 5초까지 기다림 (기본값은 1000ms)
        interval: 100, // 100ms 간격으로 다시 시도 (기본값은 50ms)
      },
    );
  });
});
