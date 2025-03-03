import { z } from "zod";

export const addProfileSchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
});

export type AddProfileFormData = z.infer<typeof addProfileSchema>;
