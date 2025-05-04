import { styles } from "@/styling";
import React from "react";
import { View, Text } from "react-native";
import { router } from "expo-router";
import UpcomingExpensesList from "../lists/upcoming-expenses-list";
import SeeMoreButton from "../buttons/see-more-button";

export default function UpcomingPaymentsCards() {
  return (
    <View style={{ marginTop: 32 }}>
      <View
        style={[
          styles.row,
          { marginBottom: 20, justifyContent: "space-between" },
        ]}
      >
        <Text style={[styles.text, { fontWeight: 600 }]}>
          Próximos Pagamentos
        </Text>
        <SeeMoreButton onPress={() => router.push("/(app)/goals")} />
      </View>
      <UpcomingExpensesList />
    </View>
  );
}
