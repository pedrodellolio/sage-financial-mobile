import BudgetGoalItem from "@/components/budget-goal-item";
import Header from "@/components/header";
import { MONTHS } from "@/constants/months";
import { Theme } from "@/constants/theme";
import { BudgetGoal } from "@/models/budgetGoal";
import { getBudgetGoalsByMonthAndYear } from "@/services/budgetGoals";
import { styles } from "@/styling";
import { currentMonth, currentYear } from "@/utils/date";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react-native";
import { useState } from "react";
import {
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

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
          // onPress={() => router.push("/(modals)/add-goal-modal")}
          >
            <Plus color={Theme.colors.white} />
          </Pressable>
        }
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ paddingBlock: 12 }}
      >
        {data ? (
          data.map((goal) => (
            <Pressable
              key={goal.id}
              style={{ marginBottom: 12 }}
              // onPress={() =>
              //   router.push({
              //     pathname: "/(modals)/details-budget-goal-modal",
              //     params: {
              //       id: goal.id,
              //       type: goal.type,
              //       value: goal.value,
              //       labelId: goal.label.id
              //     },
              //   })
              // }
            >
              <BudgetGoalItem data={goal} />
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
