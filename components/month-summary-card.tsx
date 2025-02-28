import React from "react";
import { useQuery } from "@tanstack/react-query";
import TransactionsItem from "./transaction-item";
import { Text, View } from "react-native";
import { Summary } from "@/models/summary";
import { getSummary } from "@/services/wallet";
import { Theme } from "@/constants/theme";
import { styles } from "@/styling";

interface Props {
  month: number;
  year: number;
}

export default function MonthSummaryCard({ month, year }: Props) {
  const { data, isLoading, error } = useQuery<Summary>({
    queryKey: ["summary", month, year],
    queryFn: () => getSummary(month, year),
  });

  if (isLoading) return <Text>Carregando...</Text>;
  if (error) return <Text>Ocorreu um erro.</Text>;
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingInline: 28,
      }}
    >
      <View style={{ gap: 4 }}>
        <Text style={[styles.text, { color: Theme.colors.secondary }]}>
          Receita
        </Text>
        <Text
          style={[
            styles.text,
            { fontSize: Theme.typography.xl, fontWeight: 600 },
          ]}
        >
          {(data && data.income ? data.income : 0).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </Text>
      </View>
      {/* <View style={styles.divider}></View> */}
      <View style={{ gap: 4 }}>
        <Text style={[styles.text, { color: Theme.colors.secondary }]}>
          Despesas
        </Text>
        <Text
          style={[
            styles.text,
            { fontSize: Theme.typography.xl, fontWeight: 600 },
          ]}
        >
          -
          {(data && data.expenses ? data.expenses : 0).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </Text>
      </View>
    </View>
  );
}
