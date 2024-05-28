import type { Meta, StoryObj } from '@storybook/react';
// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'styles/Typography',
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Heading1: Story = {
  render: () => <h1>This is an H1</h1>,
};

export const Heading2: Story = {
  render: () => <h2>This is an H2</h2>,
};
export const Heading3: Story = {
  render: () => <h3>This is an H3</h3>,
};
export const Heading4: Story = {
  render: () => <h4>This is an H4</h4>,
};

export const ParagraphAnchor: Story = {
  render: () => (
    <>
      <p>I am a Paragraph</p>
      <a>I am an anchor</a>
    </>
  ),
};
