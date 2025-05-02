import { Theme } from "@/constants/theme";
import { Transaction } from "@/models/transaction";
import { getTransactionsByPeriod } from "@/services/transactions";
import { formatLabelsDistributionChart } from "@/utils/chart";
import { getFirstDayOfMonth, getLastDayOfMonth, today } from "@/utils/date";
import { capitalize } from "@/utils/format";
import { useQuery } from "@tanstack/react-query";
import React, { useMemo } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

interface Props {
  height?: number;
}

export const LabelsDistributionChart: React.FC<Props> = ({ height = 14 }) => {
  const first = getFirstDayOfMonth(today.getMonth(), today.getFullYear());
  const last = getLastDayOfMonth(today.getMonth(), today.getFullYear());
  const { data, isLoading, error } = useQuery<Transaction[]>({
    queryKey: ["transaction", first, last],
    queryFn: () => getTransactionsByPeriod(first, last),
  });

  const chartData = useMemo(() => {
    if (!data) return [];
    return formatLabelsDistributionChart(data);
  }, [data]);

  const total = chartData.reduce((sum, cat) => sum + cat.value, 0);

  if (isLoading) return <Text>Carregando...</Text>;
  if (error) return <Text>Ocorreu um erro.</Text>;
  return (
    <View style={[styles.container]}>
      <View style={[styles.barContainer, { height }]}>
        {chartData.map((cat, i) => {
          const widthPercent = total > 0 ? (cat.value / total) * 100 : 0;
          return (
            <View
              key={i}
              style={{
                flex: widthPercent,
                backgroundColor: cat.color,
                height: "100%",
              }}
            />
          );
        })}
      </View>

      <View style={styles.legendContainer}>
        {chartData.map((cat, i) => (
          <View style={styles.legendItem} key={i}>
            <View
              style={[styles.legendColorBox, { backgroundColor: cat.color }]}
            />
            <Text style={styles.legendLabel}>
              {capitalize(cat.name)}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 16,
    backgroundColor: "#1E1E1E",
    borderRadius: 8,
  },
  barContainer: {
    flexDirection: "row",
    width: "100%",
    overflow: "hidden",
    borderRadius: 4,
  },
  legendContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 12,
    justifyContent: "flex-start",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
    marginBottom: 8,
  },
  legendColorBox: {
    width: 12,
    height: 12,
    borderRadius: 2,
    marginRight: 6,
  },
  legendLabel: {
    color: "white",
    fontSize: 12,
  },
});
