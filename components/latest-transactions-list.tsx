import React from "react";
import { getTransactionsByPeriod } from "@/services/transactions";
import { getLastWeekDaysPeriod } from "@/utils/date";
import { Transaction } from "@/models/transaction";
import { useQuery } from "@tanstack/react-query";
import TransactionsItem from "./transaction-item";
import { Text, View } from "react-native";

type Props = {};

export default function LatestTransactionsList({}: Props) {
  const { start, end } = getLastWeekDaysPeriod();
  const { data, isLoading, error } = useQuery<Transaction[]>({
    queryKey: ["transactions", start, end],
    queryFn: () => getTransactionsByPeriod(start, end),
  });

  if (isLoading) return <Text>Carregando...</Text>;
  if (error) return <Text>Ocorreu um erro.</Text>;
  return (
    <View style={{ gap: 10 }}>
      {data ? (
        data.map((d) => {
          return <TransactionsItem key={d.id} data={d} />;
        })
      ) : (
        <Text>Sem resultados</Text>
      )}
    </View>
  );
}
