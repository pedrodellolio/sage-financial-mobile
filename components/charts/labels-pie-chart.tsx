import { BarChart, PieChart } from "react-native-gifted-charts";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Transaction } from "@/models/transaction";
import { getTransactionsByPeriod } from "@/services/transactions";
import { getLastWeekDaysPeriod, today } from "@/utils/date";
import { formatLabelsPieChart } from "@/utils/chart";
import { Text, View } from "react-native";
import { Theme } from "@/constants/theme";

export default function LabelsPieChart() {
  const { start, end } = getLastWeekDaysPeriod();
  const { data, isLoading, error } = useQuery<Transaction[]>({
    queryKey: ["transaction", start, end],
    queryFn: () => getTransactionsByPeriod(start, end),
  });

  const chartData = useMemo(() => {
    if (!data) return [];
    return formatLabelsPieChart(data);
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
                width: 60,
                height: 20,
                color: Theme.colors.secondary,
              }}
            >
              Despesas
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
              Receitas
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
        backgroundColor: Theme.colors.bgSecondary,
        borderRadius: Theme.radius.lg,
        padding: 10,
        paddingBlock: 20,
      }}
    >
      {renderTitle()}
      <View style={{ alignItems: "center" }}>
        <PieChart data={chartData} />
      </View>
    </View>
  );
}
