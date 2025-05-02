import { BarChart, PieChart } from "react-native-gifted-charts";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Transaction } from "@/models/transaction";
import {
  getTransactionsByMonthAndYear,
  getTransactionsByPeriod,
} from "@/services/transactions";
import { currentMonth, currentYear, getLastWeekDaysPeriod } from "@/utils/date";
import { formatFixedVariableExpensesChart } from "@/utils/chart";
import { Text, View } from "react-native";
import { Theme } from "@/constants/theme";
import { styles } from "@/styling";

export default function FixedVariableExpensesChart() {
  const { data, isLoading, error } = useQuery<Transaction[]>({
    queryKey: ["transaction", currentMonth, currentYear],
    queryFn: () => getTransactionsByMonthAndYear(currentMonth, currentYear),
  });

  const chartData = useMemo(() => {
    if (!data) return [];
    return formatFixedVariableExpensesChart(data);
  }, [data]);

  const renderTitle = () => {
    return (
      <View style={{ marginVertical: 10, marginBottom: 20 }}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                height: 12,
                width: 12,
                borderRadius: 6,
                backgroundColor: Theme.colors.secondary,
                marginRight: 8,
              }}
            />

            <Text
              style={{
                width: 70,
                height: 20,
                color: Theme.colors.secondary,
              }}
            >
              Recorrentes
            </Text>
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                height: 12,
                width: 12,
                borderRadius: 6,
                backgroundColor: "green",
                marginRight: 8,
              }}
            />

            <Text
              style={{
                width: 60,
                height: 20,
                color: Theme.colors.secondary,
              }}
            >
              Variáveis
            </Text>
          </View>
        </View>
      </View>
    );
  };

  if (isLoading) return <Text>Carregando...</Text>;
  if (error) return <Text>Ocorreu um erro.</Text>;
  return (
    <View
      style={{
        backgroundColor: "#1E1E1E",
        borderRadius: Theme.radius.lg,
        padding: 10,
        paddingBlock: 20,
      }}
    >
      {renderTitle()}
      <PieChart
        radius={130}
        paddingHorizontal={2}
        paddingVertical={10}
        textSize={20}
        textBackgroundRadius={26}
        data={chartData}
        showTooltip
      />
    </View>
  );
}
