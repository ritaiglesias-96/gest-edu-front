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
    rol: { control: Role },
  },
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Public: Story = {
  args: {
    rol: Role.public,
    mail: '',
  },
};

export const Admin: Story = {
  args: {
    rol: Role.admin,
    mail: '',
  },
};

export const Estudiante: Story = {
  args: {
    rol: Role.estudiante,
    mail: '',
  },
};

export const Coordinador: Story = {
  args: {
    rol: Role.coordinador,
    mail: '',
  },
};

export const Funcionario: Story = {
  args: {
    rol: Role.funcionario,
    mail: '',
  },
};
