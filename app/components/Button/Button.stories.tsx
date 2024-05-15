import type { Meta, StoryObj } from "@storybook/react";
import Button from "./button";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "component/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    styling: {
      control: "select",
      options: ["primary", "secondary", "pill", "link", "outline"],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    styling: "primary",
    children: "Button",
  },
};

export const Secondary: Story = {
  args: {
    styling: "secondary",
    children: "Button",
  },
};

export const Outline: Story = {
  args: {
    styling: "outline",
    children: "Button",
  },
};

export const Pill: Story = {
  args: {
    styling: "pill",
    children: "Button",
  },
};
