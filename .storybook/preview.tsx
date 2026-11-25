import type { Preview } from "@storybook/react";

import "../app/styles/globals.css";

const preview: Preview = {
  decorators: [
    (Story) => (
      <div className="font-sans bg-background text-foreground min-h-screen">
        <Story />
      </div>
    ),
  ],
  parameters: {
    backgrounds: {
      options: { page: { name: "Page", value: "var(--page-background)" } },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
      exclude: ["className", "onClick", "iconLeft", "iconRight"],
    },
  },
  initialGlobals: {
    backgrounds: { value: "page" },
  },
  tags: ["autodocs"],
};

export default preview;
