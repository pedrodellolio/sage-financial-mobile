import TransactionsItem from "@/components/transaction-item";
import { Transaction } from "@/models/transaction";
import { getTransactionsByMonthAndYear } from "@/services/transactions";
import { currentMonth, currentYear } from "@/utils/date";
import { useQuery } from "@tanstack/react-query";
import { Pressable, ScrollView, Text } from "react-native";

export default function GoalsScreen() {
  return (
    <ScrollView>
      <Text>Metas</Text>
    </ScrollView>
  );
}
