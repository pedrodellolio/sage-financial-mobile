import React from "react";
import { getTransactionsByPeriod } from "@/services/transactions";
import { getLastWeekDaysPeriod } from "@/utils/date";
import { Transaction } from "@/models/transaction";
import { useQuery } from "@tanstack/react-query";
import { FlatList, Text } from "react-native";
import UpcomingExpenseItem from "./items/upcoming-expense-item";
import NoResultsText from "../no-results-text";

type Props = {};

export default function UpcomingExpensesList({}: Props) {
  const { start, end } = getLastWeekDaysPeriod();
  const { data, isLoading, error } = useQuery<Transaction[]>({
    queryKey: ["transactions", start, end],
    queryFn: () =>
      getTransactionsByPeriod(start, end, undefined, undefined, true),
  });

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error loading goals</Text>;
  if (data && data.length > 0)
    return (
      <FlatList
        style={{
          width: "100%",
        }}
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
        data={data}
        renderItem={(value) => (
          <UpcomingExpenseItem key={value.item.id} data={value.item} />
        )}
      />
    );

  return <NoResultsText />;
}
