import { z } from "zod";

export const registerSchemaZod = z.object({
  name: z.string({
    invalid_type_error: "El nombre debe ser una cadena de text",
    required_error: "Nombre requerido",
  }),
  email: z
    .string({
      invalid_type_error: "El correo electronico debe ser una cadena de texto",
      required_error: "Correo electronico requerido",
    })
    .email({ message: "Debe ser un correo valido" }),
  password: z
    .string({
      invalid_type_error: "La contraseña deber ser una cadena de caracteres",
      required_error: "Contraseña requerida",
    })
    .min(6, { message: "Contraseña minima de 6 caracters" }),
});

export const loginSchemaZod = z.object({
  email: z
    .string({
      invalid_type_error: "el correo electronico debe ser una cadena de texto",
      required_error: "Correo electronico requerido",
    })
    .email({ message: "Correo invalido" }),
  password: z
    .string({
      invalid_type_error: "La contraseña deber ser una cadena de caracteres",
      required_error: "Contraseña requerida",
    })
    .min(6, { message: "Contraseña minima de 6 caracters" }),
});
