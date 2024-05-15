import type { Meta, StoryObj } from '@storybook/react';
import Navbar from './navbar';
import { Role } from '@/lib/definitions';
// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'component/Navbar',
  component: Navbar,
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    type: { control: Role },
  },
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Public: Story = {
  args: {
    type: Role.public,
  },
};

export const Admin: Story = {
  args: {
    type: Role.admin,
  },
};

export const Estudiante: Story = {
  args: {
    type: Role.estudiante,
  },
};

export const Coordinador: Story = {
  args: {
    type: Role.coordinador,
  },
};

export const Funcionario: Story = {
  args: {
    type: Role.funcionario,
  },
};
