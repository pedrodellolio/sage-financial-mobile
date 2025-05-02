import { BarChart } from "react-native-gifted-charts";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { formatBalanceChart } from "@/utils/chart";
import { Text, View } from "react-native";
import { Theme } from "@/constants/theme";
import { getWalletsByPeriod } from "@/services/wallet";
import { Wallet } from "@/models/wallet";
import { endOfYear, startOfYear } from "date-fns";

export default function BalanceBarChart() {
  const year = 2025;
  const start = startOfYear(new Date(year, 0, 1));
  const end = endOfYear(new Date(year, 11, 31));

  const { data, isLoading, error } = useQuery<Wallet[]>({
    queryKey: ["wallets", start, end],
    queryFn: () => getWalletsByPeriod(start, end),
  });

  const chartData = useMemo(() => {
    if (!data) return [];
    return formatBalanceChart(data);
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
        padding: 20,
        paddingTop: 30,
        overflow: "hidden"
      }}
    >
      {/* {renderTitle()} */}
      <BarChart
        noOfSections={3}
        barBorderRadius={Theme.radius.lg}
        data={chartData}
        xAxisLabelTextStyle={{ color: Theme.colors.secondary }}
        yAxisTextStyle={{ color: Theme.colors.secondary }}
        yAxisThickness={0}
        xAxisThickness={0}
        // hideYAxisText
        // hideRules
        adjustToWidth
        // parentWidth={400}
        height={140}
        autoShiftLabels
        // yAxisIndicesWidth={1000}
        yAxisLabelWidth={50}
        // mostNegativeValue={-200}
        noOfSectionsBelowXAxis={3}
        stepValue={3000}
      />
    </View>
  );
}
