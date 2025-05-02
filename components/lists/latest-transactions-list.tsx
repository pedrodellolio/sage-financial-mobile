import React from "react";
import { getTransactionsByPeriod } from "@/services/transactions";
import { getLastWeekDaysPeriod } from "@/utils/date";
import { Transaction } from "@/models/transaction";
import { useQuery } from "@tanstack/react-query";
import TransactionsItem from "./items/transaction-item";
import { FlatList, Text, View } from "react-native";
import { styles } from "@/styling";
import { Theme } from "@/constants/theme";
import NoResultsText from "../no-results-text";

type Props = {};

export default function LatestTransactionsList({}: Props) {
  const { start, end } = getLastWeekDaysPeriod();
  const { data, isLoading, error } = useQuery<Transaction[]>({
    queryKey: ["transactions", start, end],
    queryFn: () => getTransactionsByPeriod(start, end),
  });

  if (isLoading) return <Text>Carregando...</Text>;
  if (error) return <Text>Ocorreu um erro.</Text>;

  if (data && data.length > 0)
    return (
      <FlatList
        style={{
          width: "100%",
        }}
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={(value) => (
          <TransactionsItem key={value.item.id} data={value.item} />
        )}
      />
    );

  return <NoResultsText />;
}
