"use server";
const bcrypt = require("bcryptjs");
import { z } from "zod";

export type State = {
  errors?: {
    nombre?: string[];
    descripcion?: string[];
    creditos?: number[];
    duracion?: number[];
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
  creditos: z.number({
    required_error: "Campo requerido",
    invalid_type_error: "Los creditos deben ser un numero",
  }),

  duracion: z.number({
    required_error: "Campo requerido",
    invalid_type_error: "La duracion debe ser un numero",
  }),
});

export async function altaCarrera(prevState: State, formData: FormData) {
  const validatedFields = AltaCarreraFormSchema.safeParse({
    nombre: formData.get("nombre"),
    descripcion: formData.get("email"),
    creditos: formData.get("password"),
    duracion: formData.get("confirmPassword"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create User.",
    };
  }

  const { nombre, descripcion, creditos, duracion } = validatedFields.data;

  return { message: "Failed to register User." };
}
