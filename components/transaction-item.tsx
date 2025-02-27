import { Theme } from "@/constants/theme";
import { Transaction, TransactionType } from "@/models/transaction";
import { styles } from "@/styling";
import { Text, View } from "react-native";

interface Props {
  data: Transaction;
}

export default function TransactionsItem({ data }: Props) {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 2,
        backgroundColor: Theme.colors.bgSecondary,
        borderRadius: Theme.radius.lg,
        padding: 18,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
        <Text style={styles.text}>{data.title}</Text>

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
          { fontWeight: 600, fontSize: Theme.typography.lg },
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
