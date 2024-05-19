"use server";
const bcrypt = require("bcryptjs");
import { z } from "zod";

export type State = {
  errors?: {
    nombre?: string[];
    descripcion?: string[];
  };
  message?: string | null;
};

// forms
const AltaCarreraFormSchema = z.object({
  nombre: z.string({
    invalid_type_error: "Ingrese un nombre valido",
    required_error: "Campo requerido",
  }),
  descripcion: z.string({
    required_error: "Campo requerido",
  }),
});

export async function altaCarrera(prevState: State, formData: FormData) {
  const validatedFields = AltaCarreraFormSchema.safeParse({
    nombre: formData.get("nombre"),
    descripcion: formData.get("email"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create User.",
    };
  }

  const { nombre, descripcion } = validatedFields.data;

  return { message: "Failed to register User." };
}
