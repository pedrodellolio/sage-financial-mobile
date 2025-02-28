import Header from "@/components/header";
import MonthSummaryCard from "@/components/month-summary-card";
import TransactionsItem from "@/components/transaction-item";
import { MONTHS } from "@/constants/months";
import { Theme } from "@/constants/theme";
import { Transaction } from "@/models/transaction";
import { getTransactionsByMonthAndYear } from "@/services/transactions";
import { styles } from "@/styling";
import { currentMonth, currentYear } from "@/utils/date";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react-native";
import { useState } from "react";
import {
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function TransactionsScreen() {
  const [selectedMonth, setSelectedMonth] = useState<number>(currentMonth - 1);
  const [selectedYear, setSelectedYear] = useState<number>(currentYear);

  const { data, isLoading, error } = useQuery<Transaction[]>({
    queryKey: ["transactions", selectedMonth, selectedYear],
    queryFn: () =>
      getTransactionsByMonthAndYear(selectedMonth + 1, selectedYear),
    enabled: !!selectedMonth && !!selectedYear,
  });

  const handlePreviousMonth = () => {
    setSelectedMonth((prevMonth) => {
      if (prevMonth === 0) {
        setSelectedYear((prevYear) => prevYear - 1);
        return 11; // December
      }
      return prevMonth - 1;
    });
  };

  const handleNextMonth = () => {
    setSelectedMonth((prevMonth) => {
      if (prevMonth === 11) {
        setSelectedYear((prevYear) => prevYear + 1);
        return 0; // January
      }
      return prevMonth + 1;
    });
  };

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error loading transactions</Text>;
  return (
    <View style={[styles.container]}>
      <Header
        middle={
          <>
            <TouchableOpacity onPress={handlePreviousMonth}>
              <ChevronLeft color={Theme.colors.white} />
            </TouchableOpacity>
            <TouchableOpacity
            // onPress={() => openDatePicker(new Date(), setDate)}
            >
              <Text style={styles.headerText}>
                {MONTHS[selectedMonth].short} {selectedYear}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleNextMonth}>
              <ChevronRight color={Theme.colors.white} />
            </TouchableOpacity>
          </>
        }
        right={
          <Pressable
            onPress={() => router.push("/(modals)/add-transaction-modal")}
          >
            <Plus color={Theme.colors.white} />
          </Pressable>
        }
      />

      <MonthSummaryCard month={selectedMonth + 1} year={selectedYear} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ paddingBlock: 12 }}
      >
        {data ? (
          data.map((transaction) => (
            <Pressable
              key={transaction.id}
              style={{ marginBottom: 12 }}
              onPress={() =>
                router.push({
                  pathname: "/(modals)/details-transaction-modal",
                  params: {
                    id: transaction.id,
                    title: transaction.title,
                    occurredAt: transaction.occurredAt,
                    type: transaction.type,
                    valueBrl: transaction.valueBrl,
                  },
                })
              }
            >
              <TransactionsItem data={transaction} />
            </Pressable>
          ))
        ) : (
          <Text style={[styles.text, { textAlign: "center", marginTop: 28 }]}>
            Sem resultados
          </Text>
        )}
      </ScrollView>
    </View>
  );
}
