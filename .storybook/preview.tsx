import type { Preview, StoryFn, StoryContext } from "@storybook/react";
import "../app/styles/globals.css";

const preview: Preview = {
  parameters: {
    options: {
      storySort: {
        order: [
          "intro",
          ["Readme", "Copy", "Typography", "Colors", "Effects", "SVG"],
          "pages",
          "screens",
          "components",
        ],
      },
    },
    backgrounds: {
      default: "medium",
      values: [
        { name: "light", value: "#ffffff" },
        { name: "dark", value: "#000000" },
      ],
    },
    viewport: {
      viewports: {
        responsive: {
          name: "Responsive",
        },
        phone: {
          name: "Phone",
          type: "mobile",
          styles: { height: "560px", width: "375px" },
        },
        tablet: {
          name: "Tablet",
          type: "tablet",
          styles: { height: "910px", width: "768px" },
        },
        desktop: {
          name: "Desktop",
          type: "tablet",
          styles: { height: "810px", width: "1440px" },
        },
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story: StoryFn) => {
      return (
        <div>
          <Story />
        </div>
      );
    },
  ],
};

export default preview;
