import type { StorybookConfig } from "@storybook/nextjs";

const config: StorybookConfig = {
  stories: ["../**/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: ["@storybook/addon-essentials", "@chromatic-com/storybook"],
  framework: {
    name: "@storybook/nextjs",
    options: {
      appDirectory: true,
    },
  },
  features: {
    experimentalRSC: true,
  },
};
export default config;
