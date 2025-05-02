import { BarChart } from "react-native-gifted-charts";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Transaction } from "@/models/transaction";
import { getTransactionsByPeriod } from "@/services/transactions";
import { getLastWeekDaysPeriod } from "@/utils/date";
import { formatSummaryChart } from "@/utils/chart";
import { Text, View } from "react-native";
import { Theme } from "@/constants/theme";
import { styles } from "@/styling";

export default function SummaryBarChart() {
  const { start, end } = getLastWeekDaysPeriod();

  const { data, isLoading, error } = useQuery<Transaction[]>({
    queryKey: ["transaction", start, end],
    queryFn: () => getTransactionsByPeriod(start, end),
  });

  const chartData = useMemo(() => {
    if (!data) return [];
    return formatSummaryChart(data);
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
                backgroundColor: Theme.colors.primary,
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
        backgroundColor: "#1E1E1E",
        borderRadius: Theme.radius.lg,
        padding: 10,
        paddingBlock: 20,
      }}
    >
      {renderTitle()}
      <BarChart
        xAxisLabelTextStyle={{ color: Theme.colors.secondary }}
        yAxisTextStyle={{ color: Theme.colors.secondary }}
        barBorderRadius={Theme.radius.md}
        yAxisThickness={0}
        xAxisThickness={0}
        barWidth={12}
        noOfSections={4}
        spacing={22}
        height={180}
        stackData={chartData}
        renderTooltip={(item: any, index: number) => {
          return (
            <View
              style={[
                styles.card,
                {
                  zIndex: 100,
                  position: "absolute",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                },
              ]}
            >
              <Text style={[styles.text, { fontSize: Theme.typography.sm }]}>
                Despesas:{" "}
                {item.stacks[0].value.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </Text>
              <Text style={[styles.text, { fontSize: Theme.typography.sm }]}>
                Receitas:{" "}
                {item.stacks[1].value.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </Text>
            </View>
          );
        }}
        autoCenterTooltip
      />
    </View>
  );
}
