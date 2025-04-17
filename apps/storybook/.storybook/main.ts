import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/README.mdx"],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  addons: ["@storybook/addon-docs"],
  refs: (config, { configType }) => {
    if (configType === "DEVELOPMENT") {
      return {
        web: {
          title: "Web Development",
          url: "http://localhost:6007",
          expanded: false,
        },
        ui: {
          title: "UI Development",
          url: "http://localhost:6008",
          expanded: false,
        },
      };
    }
    return {
      web: {
        title: "web",
        url: "https://main--6800ded28f2f8141486ec84a.chromatic.com",
        expanded: false,
      },
      ui: {
        title: "UI",
        url: "https://main--6800e088b742033bb3f706a6.chromatic.com",
        expanded: false,
      },
    };
  },
};
export default config;
