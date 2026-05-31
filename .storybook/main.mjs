const config = {
  stories: ["../docs/design-system/stories/**/*.stories.@(js|mjs)"],
  addons: ["@storybook/addon-a11y"],
  framework: {
    name: "@storybook/html-vite",
    options: {}
  },
  docs: {
    autodocs: true
  }
};

export default config;
