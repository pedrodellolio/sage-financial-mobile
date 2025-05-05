import { ImportedFile } from "@/models/file";
import { z } from "zod";

export const importFileSchema = z.object({
  file: z
    .object({ name: z.string(), numColumns: z.number(), size: z.number() })
    .refine(
      (file) => file.size && file.size <= 5 * 1024 * 1024,
      "File size must be less than 5MB"
    ),
});

export type ImportFileFormData = z.infer<typeof importFileSchema>;
