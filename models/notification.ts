import { Transaction } from "./transaction";

export interface Notification {
  transaction: Transaction;
  triggerDate: string;
  isEnabled: boolean;
}
