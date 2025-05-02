import Header from "@/components/header";
import BudgetGoalItem from "@/components/lists/items/budget-goal-item";
import { MONTHS } from "@/constants/months";
import { Theme } from "@/constants/theme";
import { BudgetGoal } from "@/models/budgetGoal";
import { getBudgetGoalsByMonthAndYear } from "@/services/budgetGoals";
import { styles } from "@/styling";
import { currentMonth, currentYear } from "@/utils/date";
import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import {
  Bell,
  ChevronLeft,
  ChevronRight,
  Goal,
  Plus,
} from "lucide-react-native";
import { useState } from "react";
import {
  FlatList,
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

      {data && data.length > 0 ? (
        <FlatList
          style={{
            width: "100%",
          }}
          showsHorizontalScrollIndicator={false}
          data={data}
          renderItem={(value) => (
            <TouchableOpacity
              key={value.item.id}
              style={{ marginBottom: 12 }}
              onPress={() =>
                router.push({
                  pathname: "/(modals)/add-budget-goal-modal",
                  params: {
                    id: value.item.id,
                    value: value.item.value,
                    type: value.item.type,
                    labelId: value.item.label.id,
                    month: selectedMonth + 1,
                    year: selectedYear,
                    fromBudgetGoal: 1,
                  },
                })
              }
            >
              <BudgetGoalItem
                data={value.item}
                month={selectedMonth + 1}
                year={selectedYear}
              />
            </TouchableOpacity>
          )}
        />
      ) : (
        <View
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            marginTop: 100,
          }}
        >
          <Goal color={Theme.colors.bgSecondary} size={120} />
          <Text
            style={[
              styles.text,
              {
                textAlign: "center",
                marginTop: 20,
                color: Theme.colors.secondary,
              },
            ]}
          >
            Não existem metas cadastradas
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              router.push({
                pathname: "/(modals)/add-budget-goal-modal",
                params: {
                  month: selectedMonth + 1,
                  year: selectedYear,
                  // fromBudgetGoal: 1,
                },
              })
            }
          >
            <Text style={[styles.text, { fontWeight: 600 }]}>
              Criar nova meta
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
