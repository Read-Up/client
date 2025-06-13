// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

jest.mock("ky", () => {
  const create = jest.fn(() => ({
    get: jest.fn(() => ({
      json: jest.fn().mockResolvedValue({ success: true, data: {} }),
    })),
    post: jest.fn(() => ({
      json: jest.fn().mockResolvedValue({ success: true, data: {} }),
    })),
  }));

  return {
    __esModule: true,
    default: {
      get: jest.fn(),
      post: jest.fn(),
    },
    create,
  };
});

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
  }),
}));
