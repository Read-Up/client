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
        title: "@eb",
        url: "web/",
        expanded: false,
      },
      ui: {
        title: "UI",
        url: "ui/",
        expanded: false,
      },
    };
  },
};
export default config;
