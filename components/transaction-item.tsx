import { Transaction, TransactionType } from "@/models/transaction";
import { Text } from "react-native";

interface Props {
  data: Transaction;
}

export default function TransactionsItem({ data }: Props) {
  return (
    <div className="flex flex-row justify-between items-center p-4 rounded-lg">
      <div className="flex flex-col">
        <Text>{data.title}</Text>
        <Text>
          {new Date(data.occurredAt).toLocaleDateString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Text>
      </div>
      <Text>
        {data.type === TransactionType.EXPENSE && "-"}
        {data.valueBrl.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}
      </Text>
    </div>
  );
}
