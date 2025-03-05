import { BarChart } from "react-native-gifted-charts";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Transaction, TransactionType } from "@/models/transaction";
import { getTransactionsByPeriod } from "@/services/transactions";
import { getLastWeekDaysPeriod } from "@/utils/date";
import { formatExpensesChart } from "@/utils/chart";
import { Text, View } from "react-native";
import { Theme } from "@/constants/theme";

export default function WeekExpensesChart() {
  const { start, end } = getLastWeekDaysPeriod();

  const { data, isLoading, error } = useQuery<Transaction[]>({
    queryKey: ["transaction", start, end],
    queryFn: () => getTransactionsByPeriod(start, end, TransactionType.EXPENSE),
  });

  const chartData = useMemo(() => {
    if (!data) return [];
    return formatExpensesChart(data);
  }, [data]);

  if (isLoading) return <Text>Carregando...</Text>;
  if (error) return <Text>Ocorreu um erro.</Text>;
  return (
    <View
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Theme.colors.bgSecondary,
        borderRadius: Theme.radius.lg,
        marginTop: 10,
        paddingBlock: 14,
      }}
    >
      <BarChart
        barWidth={22}
        noOfSections={3}
        barBorderRadius={4}
        data={chartData}
        xAxisLabelTextStyle={{ color: Theme.colors.secondary }}
        yAxisThickness={0}
        xAxisThickness={0}
        hideYAxisText
        hideRules
        adjustToWidth
        parentWidth={480}
      />
    </View>
  );
}
