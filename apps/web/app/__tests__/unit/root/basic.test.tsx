import HomeScreen from "@/screen";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("Page", () => {
  it("renders a heading", async () => {
    render(<HomeScreen />);
    const heading = await screen.findByRole("heading", {
      level: 1,
      name: "Home",
    });

    expect(heading).toBeInTheDocument();
  });
});
