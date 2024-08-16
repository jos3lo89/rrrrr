import { z } from "zod";

export const taskCreateZod = z.object({
  title: z.string({
    invalid_type_error: "El titulo debe ser  una cadena de texto",
    required_error: "Titulo requerido",
  }),
  description: z.string({
    invalid_type_error: "La descripción debe ser una cadena de texto",
    required_error: "Descripción requerida",
  }),
});
