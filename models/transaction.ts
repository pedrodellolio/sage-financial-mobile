// import { z } from "zod";
// import { Label } from "./label";

// export const Transaction = z.object({
//   id: z.string().uuid(),
//   title: z.string()
//   valueBrl: z.number(),
//   type: z.nativeEnum(TransactionType),
//   occurredAt: z.string(),
//   label: z.string(),
//   parentTransaction: z.object(Transaction)
// });

// type Transaction = z.infer<typeof Transaction>;
// // })
// // export interface Transaction {
// //   id: string;
// //   title: string;
// //   valueBrl: number;
// //   type: TransactionType;
// //   occurredAt: string;
// //   label: Label | null;
// //   parentTransaction: Transaction | null;
// //   installment: number;
// //   totalInstallments: number;
// //   frequency: RecurrenceType | null;
// // }

// export enum TransactionType {
//   EXPENSE,
//   INCOME,
// }

// export enum RecurrenceType {
//   WEEKLY,
//   BIWEEKLY,
//   MONTHLY,
// }

import { z } from "zod";
import { LabelSchema } from "./label";

export const TransactionType = z.enum(["EXPENSE", "INCOME"]);
export const RecurrenceType = z.enum(["WEEKLY", "BIWEEKLY", "MONTHLY"]);

export const ParentTransactionSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  valueBrl: z.number().positive(),
  type: TransactionType,
  occurredAt: z.coerce.date(),
  frequency: RecurrenceType.nullable().optional(),
  installment: z.number().int().min(1).default(1),
  totalInstallments: z.number().int().min(1).default(1),
  label: LabelSchema.nullable().optional(),
});

export const TransactionSchema = ParentTransactionSchema.extend({
  parentTransaction: ParentTransactionSchema.nullable().optional(),
});

export const formatRecurrenceType = (option: string) => {
  switch (option) {
    case RecurrenceType.enum.BIWEEKLY:
      return "Quinzenalmente";
    case RecurrenceType.enum.MONTHLY:
      return "Mensalmente";
    case RecurrenceType.enum.WEEKLY:
      return "Semanalmente";
    default:
      return "";
  }
};

export const toRecurrenceType = (option: string) => {
  switch (option) {
    case "Quinzenalmente":
      return RecurrenceType.enum.BIWEEKLY;
    case "Mensalmente":
      return RecurrenceType.enum.MONTHLY;
    case "Semanalmente":
      return RecurrenceType.enum.WEEKLY;
    default:
      return "";
  }
};

export type ParentTransaction = z.infer<typeof ParentTransactionSchema>;
export type Transaction = z.infer<typeof TransactionSchema>;
