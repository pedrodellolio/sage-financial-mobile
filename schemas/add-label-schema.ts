import { z } from "zod";

export const addLabelSchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
});

export type AddLabelFormData = z.infer<typeof addLabelSchema>;
