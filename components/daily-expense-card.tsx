import React, { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Text, View } from "react-native";
import { getWalletByMonthAndYear } from "@/services/wallet";
import { Theme } from "@/constants/theme";
import { styles } from "@/styling";
import { currentMonth, currentYear, today } from "@/utils/date";
import { Wallet } from "@/models/wallet";
import { getDaysInMonth } from "date-fns";

export default function DailyExpenseCard() {
  const { data, isLoading, error } = useQuery<Wallet>({
    queryKey: ["wallets", currentMonth, currentYear],
    queryFn: () => getWalletByMonthAndYear(currentMonth, currentYear),
  });

  const dailySpending = useMemo(() => {
    if (!data) return [];
    return data.expensesBrl / getDaysInMonth(today);
  }, [data]);

  if (isLoading) return <Text>Carregando...</Text>;
  if (error) return <Text>Ocorreu um erro.</Text>;
  return (
    <View>
      <View style={[styles.card, { backgroundColor: "#1E1E1E" }]}>
        <Text style={styles.text}>Gasto diário estimado</Text>
        <Text
          style={[styles.text, { color: Theme.colors.white, fontWeight: 600 }]}
        >
          {dailySpending.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </Text>
      </View>
    </View>
  );
}
