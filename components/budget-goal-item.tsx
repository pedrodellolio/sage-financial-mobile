import { Theme } from "@/constants/theme";
import { BudgetGoal, BudgetGoalType } from "@/models/budgetGoal";
import { Transaction, TransactionType } from "@/models/transaction";
import { Wallet } from "@/models/wallet";
import { getTotalExpensesByLabel } from "@/services/transactions";
import { getWalletByMonthAndYear } from "@/services/wallet";
import { styles } from "@/styling";
import { useQuery } from "@tanstack/react-query";
import { DimensionValue, Text, View } from "react-native";
import ProgressBar from "./progress-bar";

interface Props {
  data: BudgetGoal;
  month: number;
  year: number;
}

export default function BudgetGoalItem({ data, month, year }: Props) {
  const {
    data: wallet,
    isLoading: isWalletLoading,
    error: isWalletError,
  } = useQuery<Wallet>({
    queryKey: ["wallet", month, year],
    queryFn: () => getWalletByMonthAndYear(month, year),
  });

  const {
    data: total,
    isLoading: isTotalLoading,
    error: isTotalError,
  } = useQuery<number>({
    queryKey: ["label-total", data.label?.id, month, year],
    queryFn: () => getTotalExpensesByLabel(data.label.id, month, year),
  });

  let goalLimitValue = data.value;
  if (data.type === BudgetGoalType.PERCENTAGE)
    goalLimitValue = (wallet?.incomesBrl ?? 0) * (data.value / 100);
  const totalValue = total ?? 0;
  const progress = (totalValue / goalLimitValue) * 100;
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 18,
        backgroundColor: Theme.colors.bgSecondary,
        borderRadius: Theme.radius.lg,
        padding: 18,
        paddingInline: 18,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={[styles.text, { fontSize: Theme.typography.sm }]}>
          {data.label.title}
        </Text>
        {isWalletLoading || isTotalLoading ? (
          <Text>Carregando...</Text>
        ) : isWalletError || isTotalError ? (
          <Text>Erro</Text>
        ) : (
          <Text
            style={[
              styles.text,
              { fontWeight: 600, fontSize: Theme.typography.md },
            ]}
          >
            {totalValue.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}{" "}
            de{" "}
            {goalLimitValue.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </Text>
        )}
      </View>

      <ProgressBar progress={progress} />
    </View>
  );
}
