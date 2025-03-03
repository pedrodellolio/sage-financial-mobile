import BudgetGoalItem from "@/components/budget-goal-item";
import Header from "@/components/header";
import LabelItem from "@/components/label-item";
import { MONTHS } from "@/constants/months";
import { Theme } from "@/constants/theme";
import { BudgetGoal } from "@/models/budgetGoal";
import { Label } from "@/models/label";
import { getBudgetGoalsByMonthAndYear } from "@/services/budgetGoals";
import { getLabels } from "@/services/label";
import { styles } from "@/styling";
import { currentMonth, currentYear } from "@/utils/date";
import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react-native";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function LabelsScreen() {
  const { data, isLoading, error } = useQuery<Label[]>({
    queryKey: ["labels"],
    queryFn: () => getLabels(),
  });

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error loading goals</Text>;
  return (
    <View style={[styles.container]}>
      <Header
        middle={"Categorias"}
        left={
          <TouchableOpacity onPress={() => router.back()}>
            <ChevronLeft color={Theme.colors.white} />
          </TouchableOpacity>
        }
        right={
          <TouchableOpacity
            onPress={() => router.push("/(modals)/add-label-modal")}
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
          data.map((label) => (
            <TouchableOpacity
              key={label.id}
              style={{ marginBottom: 12 }}
              onPress={() =>
                router.push({
                  pathname: "/(modals)/add-label-modal",
                  params: {
                    id: label.id,
                    value: label.title,
                  },
                })
              }
            >
              <LabelItem data={label} />
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
