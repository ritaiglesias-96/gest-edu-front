import type { Meta, StoryObj } from '@storybook/react';
import CarrerasPage from './page';
// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'page/CarrerasPage',
  component: CarrerasPage,
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
} satisfies Meta<typeof CarrerasPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Carrera1: Story = {
  render: () => (
    <CarrerasPage
      params={{
        id: '1',
      }}
    />
  ),
};
