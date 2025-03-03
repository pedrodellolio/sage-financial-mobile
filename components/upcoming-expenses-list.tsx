import React from "react";
import { getTransactionsByPeriod } from "@/services/transactions";
import { getLastWeekDaysPeriod, today } from "@/utils/date";
import { Transaction, TransactionType } from "@/models/transaction";
import { useQuery } from "@tanstack/react-query";
import TransactionsItem from "./transaction-item";
import { Text, View } from "react-native";
import { Label } from "@/models/label";
import UpcomingExpenseItem from "./upcoming-expense-item";

type Props = {};

export default function UpcomingExpensesList({}: Props) {
  // const { start, end } = getLastWeekDaysPeriod();
  // const { data, isLoading, error } = useQuery<Transaction[]>({
  //   queryKey: ["transactions", start, end],
  //   queryFn: () => getTransactionsByPeriod(start, end),
  // });

  // if (isLoading) return <Text>Carregando...</Text>;
  // if (error) return <Text>Ocorreu um erro.</Text>;

  const data: Transaction[] = [
    {
      id: "1",
      title: "INTERNET",
      valueBrl: 100,
      type: TransactionType.EXPENSE,
      occurredAt: today.toLocaleDateString("pt-BR", {
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }),
      label: {} as Label,
    },
  ];

  return (
    <View style={{ gap: 10 }}>
      {data ? (
        data.map((d) => {
          return <UpcomingExpenseItem key={d.id} data={d} />;
        })
      ) : (
        <Text>Sem resultados</Text>
      )}
    </View>
  );
}
