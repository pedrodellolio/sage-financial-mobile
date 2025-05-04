import { Theme } from "@/constants/theme";
import { Transaction, TransactionType } from "@/models/transaction";
import { styles } from "@/styling";
import { capitalize } from "@/utils/format";
import { Text, View } from "react-native";

interface Props {
  data: Transaction;
}

export default function TransactionsItem({ data }: Props) {
  return (
    <View style={[styles.card, { marginBottom: 2 }]}>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 4,
          paddingVertical: 4,
        }}
      >
        <View style={styles.row}>
          <View
            style={{
              height: 36,
              width: 36,
              borderRadius: "100%",
              backgroundColor: Theme.colors.background,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={[styles.text, { fontWeight: 500 }]}>
              {capitalize(data.title[0])}
            </Text>
          </View>

          <View>
            <Text style={[styles.text, { fontSize: Theme.typography.sm }]}>
              {capitalize(data.title)}
            </Text>

            <Text
              style={[
                styles.text,
                {
                  color: Theme.colors.secondary,
                  fontSize: Theme.typography.sm,
                },
              ]}
            >
              {new Date(data.occurredAt).toLocaleDateString("pt-BR")}
            </Text>
          </View>
        </View>
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
