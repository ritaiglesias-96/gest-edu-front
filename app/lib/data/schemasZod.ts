import { z } from 'zod';

export const AltaAsignaturaFormSchema = z.object({
  nombre: z.string({
    invalid_type_error: 'Ingrese un nombre valido',
    required_error: 'Campo requerido',
  }),
  descripcion: z.string({
    invalid_type_error: 'Ingrese un descripcion valida',
    required_error: 'Campo requerido',
  }),
  creditos: z.string({
    invalid_type_error: 'Ingrese un numero valido',
    required_error: 'Campo requerido',
  }),
  carreraId: z.string(),
});

export const CarreraFormSchema = z.object({
  nombre: z.string({
    invalid_type_error: 'Ingrese un nombre valido',
    required_error: 'Campo requerido',
  }),
  descripcion: z.string({
    invalid_type_error: 'Ingrese un descripcion valida',
    required_error: 'Campo requerido',
  }),
  carreraId: z.string(),
});

export const AsignaturaEditFormSchema = z.object({
  nombre: z.string({
    invalid_type_error: 'Ingrese un nombre valido',
    required_error: 'Campo requerido',
  }),
  descripcion: z.string({
    invalid_type_error: 'Ingrese un descripcion valida',
    required_error: 'Campo requerido',
  }),
  asignaturaId: z.string(),
  carreraId: z.string(),
});

export const SignInFormSchema = z.object({
  email: z
    .string({ required_error: 'Campo requerido' })
    .email({ message: 'Ingrese un correo valido' }),
  password: z
    .string({ required_error: 'Campo requerido' })
    .min(4, { message: 'La contraseña debe tener al menos 4 caracteres' }),
});

export const ResetPassFormSchema = z
  .object({
    password: z
      .string({ required_error: 'Campo requerido' })
      .min(4, { message: 'La contraseña debe tener al menos 8 caracteres' }),
    confirmPassword: z
      .string({ required_error: 'Campo requerido' })
      .min(4, { message: 'La contraseña debe tener al menos 8 caracteres' }),
    tokenPassword: z.string({ required_error: 'Campo requerido' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'], // path of error
  });

export const RegisterFormSchema = z
  .object({
    nombre: z.string({
      invalid_type_error: 'Ingrese un nombre valido',
      required_error: 'Campo requerido',
    }),
    apellido: z.string({
      invalid_type_error: 'Ingrese un apellido valido',
      required_error: 'Campo requerido',
    }),
    email: z
      .string({ required_error: 'Campo requerido' })
      .email({ message: 'Ingrese un correo valido' }),
    ci: z
      .string({ required_error: 'Campo requerido' })
      .regex(/^[1-9][\.]?\d{3}[\.]?\d{3}[\.\-/_]?[1-9]/, {
        message: 'Ingrese un CI valido',
      }),
    fechaNac: z.string({ required_error: 'Campo requerido' }).date(),
    domicilio: z.string({ required_error: 'Campo requerido' }),
    telefono: z.string({ required_error: 'Campo requerido' }),
    password: z
      .string({ required_error: 'Campo requerido' })
      .min(4, { message: 'La contraseña debe tener al menos 4 caracteres' }),
    confirmPassword: z
      .string({ required_error: 'Campo requerido' })
      .min(4, { message: 'La contraseña debe tener al menos 4 caracteres' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'], // path of error
  });

export const AltaDocenteFormSchema = z.object({
  nombre: z.string({
    invalid_type_error: 'Ingrese un nombre valido',
    required_error: 'Campo requerido',
  }),
  apellido: z.string({
    invalid_type_error: 'Ingrese un apellido valido',
    required_error: 'Campo requerido',
  }),
  documento: z
    .string({ required_error: 'Campo requerido' })
    .regex(/^[1-9]\d{3}\d{3}[1-9]/, {
      message: 'Ingrese un CI valido',
    }),
});

export const RegistrarFechaExamenFormSchema = z.object({
  fecha: z.date({
    invalid_type_error: 'Ingrese una fecha valida',
    required_error: 'Campo requerido',
  }),
  diasPrevInsc: z.number({
    invalid_type_error: 'Ingrese una cantidad de dias validos',
    required_error: 'Campo requerido',
  }),
  asignaturaId: z.string(),
  stringArray: z.number().array(),
});

export const RegistrarPeriopdoExamenFormSchema = z.object({
  fechaInicio: z.string({
    invalid_type_error: 'Ingrese una fecha valida',
    required_error: 'Campo requerido',
  }),
  fechaFin: z.string({
    invalid_type_error: 'Ingrese una fecha valida',
    required_error: 'Campo requerido',
  }),
  carreraId: z.string(),
});

export const RegisterUserFormSchema = z
  .object({
    nombre: z.string({
      invalid_type_error: 'Ingrese un nombre valido',
      required_error: 'Campo requerido',
    }),
    apellido: z.string({
      invalid_type_error: 'Ingrese un apellido valido',
      required_error: 'Campo requerido',
    }),
    email: z
      .string({ required_error: 'Campo requerido' })
      .email({ message: 'Ingrese un correo valido' }),
    ci: z
      .string({ required_error: 'Campo requerido' })
      .regex(/^[1-9][\.]?\d{3}[\.]?\d{3}[\.\-/_]?[1-9]/, {
        message: 'Ingrese un CI valido',
      }),
    fechaNac: z.string({ required_error: 'Campo requerido' }).date(),
    domicilio: z.string({ required_error: 'Campo requerido' }),
    telefono: z.string({ required_error: 'Campo requerido' }),
    password: z
      .string({ required_error: 'Campo requerido' })
      .min(4, { message: 'La contraseña debe tener al menos 4 caracteres' }),
    confirmPassword: z
      .string({ required_error: 'Campo requerido' })
      .min(4, { message: 'La contraseña debe tener al menos 4 caracteres' }),
    tipoUsuario: z.string({ required_error: 'Campo requerido' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  });
