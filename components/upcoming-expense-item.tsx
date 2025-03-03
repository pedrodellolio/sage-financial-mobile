import { Theme } from "@/constants/theme";
import { Transaction, TransactionType } from "@/models/transaction";
import { styles } from "@/styling";
import { Text, View } from "react-native";

interface Props {
  data: Transaction;
}

export default function UpcomingExpenseItem({ data }: Props) {
  return (
    <View
      style={styles.card}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
        <Text style={[styles.text, {fontSize: Theme.typography.sm}]}>{data.title}</Text>

        <Text
          style={[
            styles.text,
            { color: Theme.colors.secondary, fontSize: Theme.typography.sm },
          ]}
        >
          {new Date(data.occurredAt).toLocaleDateString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Text>
      </View>
      <Text
        style={[
          styles.text,
          { fontWeight: 600, fontSize: Theme.typography.md },
        ]}
      >
        {data.type === TransactionType.EXPENSE ? "-" : "+"}
        {data.valueBrl.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}
      </Text>
    </View>
  );
}
