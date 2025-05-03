import React from "react";
import { FlatList, Text, TouchableOpacity } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { Transaction } from "@/models/transaction";
import { getTransactionsByMonthAndYear } from "@/services/transactions";
import { router } from "expo-router";
import TransactionsItem from "./items/transaction-item";
import Loading from "../loading";
import { FilterTransactionFormData } from "@/schemas/filter-transaction-schema";
import NoResultsText from "../no-results-text";

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
  if (data && data.length > 0)
    return (
      <FlatList
        style={{
          width: "100%",
        }}
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={(value) => (
          <TouchableOpacity
            key={value.item.id}
            style={{ marginBottom: 8 }}
            onPress={() =>
              router.push({
                pathname: "/(modals)/details-transaction-modal",
                params: {
                  id: value.item.id,
                  title: value.item.title,
                  occurredAt: value.item.occurredAt.toString(),
                  type: value.item.type,
                  valueBrl: value.item.valueBrl,
                  labelTitle: value.item.label?.title,
                  frequency: value.item.frequency,
                  totalInstallments: value.item.totalInstallments,
                  installment: value.item.installment,
                },
              })
            }
          >
            <TransactionsItem data={value.item} />
          </TouchableOpacity>
        )}
      />
    );

  return <NoResultsText />;
}
