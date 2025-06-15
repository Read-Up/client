import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { Button } from "../../atoms";

describe("Button 컴포넌트", () => {
  it("기본 텍스트를 렌더링해야 한다", () => {
    render(<Button>확인</Button>);
    expect(screen.getByRole("button")).toHaveTextContent("확인");
  });

  it("filled variant를 기본으로 사용해야 한다", () => {
    render(<Button>기본 버튼</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("bg-primary"); // className 조합에 따라 수정 필요
  });

  it("outline variant를 적용하면 outline 스타일이 적용되어야 한다", () => {
    render(<Button variant="outline">테두리 버튼</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("border");
    expect(button).toHaveTextContent("테두리 버튼");
  });

  it("disabled 속성이 적용되면 버튼이 비활성화되어야 한다", () => {
    render(<Button disabled>비활성 버튼</Button>);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });

  it("color와 backgroundColor 스타일이 잘 적용되어야 한다", () => {
    render(
      <Button color="#ff0000" backgroundColor="#000000">
        커스텀 스타일
      </Button>,
    );
    const button = screen.getByRole("button");
    expect(button).toHaveStyle({
      color: "#ff0000",
      backgroundColor: "#000000",
    });
  });

  it("클릭하면 onClick 핸들러가 호출되어야 한다", async () => {
    const handleClick = jest.fn();
    const user = userEvent.setup();

    render(<Button onClick={handleClick}>클릭 테스트</Button>);

    const button = screen.getByRole("button", { name: "클릭 테스트" });

    await user.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("disabled 상태에서는 onClick이 호출되지 않아야 한다", async () => {
    const handleClick = jest.fn();
    const user = userEvent.setup();

    render(
      <Button onClick={handleClick} disabled>
        비활성 버튼
      </Button>,
    );

    const button = screen.getByRole("button", { name: "비활성 버튼" });

    await user.click(button);

    expect(handleClick).not.toHaveBeenCalled();
  });
});
