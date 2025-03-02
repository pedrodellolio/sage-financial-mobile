import BudgetGoalItem from "@/components/budget-goal-item";
import Header from "@/components/header";
import { MONTHS } from "@/constants/months";
import { Theme } from "@/constants/theme";
import { BudgetGoal } from "@/models/budgetGoal";
import { getBudgetGoalsByMonthAndYear } from "@/services/budgetGoals";
import { styles } from "@/styling";
import { currentMonth, currentYear } from "@/utils/date";
import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react-native";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function GoalsScreen() {
  const [selectedMonth, setSelectedMonth] = useState<number>(currentMonth - 1);
  const [selectedYear, setSelectedYear] = useState<number>(currentYear);

  const { data, isLoading, error } = useQuery<BudgetGoal[]>({
    queryKey: ["budgetGoals", selectedMonth + 1, selectedYear],
    queryFn: () =>
      getBudgetGoalsByMonthAndYear(selectedMonth + 1, selectedYear),
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
  if (error) return <Text>Error loading goals</Text>;
  return (
    <View style={[styles.container]}>
      <Header
        middle={
          <>
            <TouchableOpacity onPress={handlePreviousMonth}>
              <ChevronLeft color={Theme.colors.white} />
            </TouchableOpacity>
            <TouchableOpacity>
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
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/(modals)/add-budget-goal-modal",
                params: {
                  month: selectedMonth + 1,
                  year: selectedYear,
                  fromBudgetGoal: 1,
                },
              })
            }
          >
            <Plus color={Theme.colors.white} />
          </TouchableOpacity>
        }
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ paddingBlock: 12 }}
      >
        {data ? (
          data.map((goal) => (
            <TouchableOpacity
              key={goal.id}
              style={{ marginBottom: 12 }}
              onPress={() =>
                router.push({
                  pathname: "/(modals)/add-budget-goal-modal",
                  params: {
                    id: goal.id,
                    value: goal.value,
                    type: goal.type,
                    labelId: goal.label.id,
                    month: selectedMonth + 1,
                    year: selectedYear,
                    fromBudgetGoal: 1,
                  },
                })
              }
            >
              <BudgetGoalItem
                data={goal}
                month={selectedMonth + 1}
                year={selectedYear}
              />
            </TouchableOpacity>
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
