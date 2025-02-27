import TransactionsItem from "@/components/transaction-item";
import { Transaction } from "@/models/transaction";
import { getTransactionsByMonthAndYear } from "@/services/transactions";
import { styles } from "@/styling";
import { currentMonth, currentYear } from "@/utils/date";
import { useQuery } from "@tanstack/react-query";
import { Pressable, SafeAreaView, ScrollView, Text } from "react-native";

export default function TransactionsScreen() {
  const { data, isLoading, error } = useQuery<Transaction[]>({
    queryKey: ["transactions", currentMonth, currentYear],
    queryFn: () => getTransactionsByMonthAndYear(currentMonth, currentYear),
  });
  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error loading transactions</Text>;
  return (
    <ScrollView style={[styles.container, { paddingTop: 20 }]}>
      {data ? (
        data.map((transaction) => (
          <Pressable key={transaction.id} style={{ marginBottom: 12 }}>
            <TransactionsItem data={transaction} />
          </Pressable>
        ))
      ) : (
        <Text style={{ textAlign: "center", marginTop: 28 }}>
          Sem resultados
        </Text>
      )}
    </ScrollView>
  );
}
