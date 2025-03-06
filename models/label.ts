// export interface Label {
//   id: string;
//   title: string;
// }
import { z } from "zod";

// Label Schema
export const LabelSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1).transform((val) => val.trim()),
});

// TypeScript Type
export type Label = z.infer<typeof LabelSchema>;
