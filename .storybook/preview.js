import "../docs/design-system/stories/storybook.css";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/i
    }
  },
  a11y: {
    test: "todo"
  },
  docs: {
    source: {
      state: "open"
    }
  }
};
