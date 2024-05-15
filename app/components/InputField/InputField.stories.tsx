import type { Meta, StoryObj } from "@storybook/react";
import InputField from "./inputField";
import KeyIcon from "@/assets/svg/key.svg";
import EmailIcon from "@/assets/svg/email.svg";
// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "component/InputField",
  component: InputField,
  subcomponents: { KeyIcon, EmailIcon },
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    placeholder: { control: "text" },
    type: { control: "select", options: ["password", "email", "text"] },
    name: { control: "text" },
    label: { control: "text" },
    required: { control: "boolean" },
  },
} satisfies Meta<typeof InputField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Email: Story = {
  args: {
    placeholder: "Ingrese su correo electronico",
    type: "email",
    name: "email",
    label: "Correo electronico",
    required: true,
    children: <EmailIcon className="h-auto w-6 fill-garnet sm:w-8" />,
  },
};

export const Password: Story = {
  args: {
    placeholder: "Ingrese su contraseña",
    type: "password",
    name: "password",
    label: "Contraseña",
    required: true,
    children: <KeyIcon className="h-auto w-6 fill-garnet sm:w-8" />,
  },
};
