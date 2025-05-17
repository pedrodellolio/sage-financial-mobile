import React from "react";
import { getTransactionsByPeriod } from "@/services/transactions";
import { getLastWeekDaysPeriod, today } from "@/utils/date";
import { Transaction } from "@/models/transaction";
import { useQuery } from "@tanstack/react-query";
import { FlatList, Text } from "react-native";
import UpcomingExpenseItem from "./items/upcoming-expense-item";
import NoResultsText from "../no-results-text";
import { addDays } from "date-fns";
import Loading from "../loading";
import ErrorScreen from "../error-screen";

type Props = {};

export default function UpcomingExpensesList({}: Props) {
  const { start, end } = getLastWeekDaysPeriod();
  const { data, isLoading, error } = useQuery<Transaction[]>({
    queryKey: ["transactions", "upcoming", start, end],
    queryFn: () =>
      getTransactionsByPeriod(
        addDays(today, 1),
        addDays(today, 3),
        undefined,
        undefined,
        true
      ),
  });

 if (isLoading) return <Loading />;
  if (error) return <ErrorScreen error={error} />;
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
