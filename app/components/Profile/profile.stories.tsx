import type { Meta, StoryObj } from '@storybook/react';
import Profile from './profile';

const meta = {
  title: 'component/Profile',
  component: Profile,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Profile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Public: Story = {
  args: {},
};
