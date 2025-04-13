import React from "react";
import { ScrollView, Text, TouchableOpacity } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { Transaction } from "@/models/transaction";
import { getTransactionsByMonthAndYear } from "@/services/transactions";
import { router } from "expo-router";
import TransactionsItem from "../transaction-item";
import { styles } from "@/styling";
import Loading from "../loading";
import { FilterTransactionFormData } from "@/schemas/filter-transaction-schema";

type Props = {
  month: number;
  year: number;
  searchValue: string;
  filters: FilterTransactionFormData | null;
};

export default function TransactionsList({
  month,
  year,
  searchValue,
  filters,
}: Props) {
  const { data, isLoading, error } = useQuery<Transaction[]>({
    queryKey: ["transactions", month, year, searchValue, filters],
    queryFn: () =>
      getTransactionsByMonthAndYear(
        month,
        year,
        searchValue,
        filters ?? undefined
      ),
  });

  if (isLoading)
    return (
      <Text>
        <Loading />
      </Text>
    );
  if (error) return <Text>Erro ao carregar as movimentações</Text>;
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {data ? (
        data.map((transaction) => (
          <TouchableOpacity
            key={transaction.id}
            style={{ marginBottom: 12 }}
            onPress={() =>
              router.push({
                pathname: "/(modals)/details-transaction-modal",
                params: {
                  id: transaction.id,
                  title: transaction.title,
                  occurredAt: transaction.occurredAt.toString(),
                  type: transaction.type,
                  valueBrl: transaction.valueBrl,
                  labelTitle: transaction.label?.title,
                  frequency: transaction.frequency,
                  totalInstallments: transaction.totalInstallments,
                  installment: transaction.installment,
                },
              })
            }
          >
            <TransactionsItem data={transaction} />
          </TouchableOpacity>
        ))
      ) : (
        <Text style={[styles.text, { textAlign: "center", marginTop: 28 }]}>
          Sem resultados
        </Text>
      )}
    </ScrollView>
  );
}
