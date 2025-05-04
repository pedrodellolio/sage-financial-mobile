import { Summary } from "@/models/summary";
import { styles } from "@/styling";
import React from "react";
import { View, Text } from "react-native";
import ProfilesList from "../lists/profiles-list";

export default function ProfileSummaryCards() {
  return (
    <View style={{ marginTop: 32 }}>
      <View
        style={[
          styles.row,
          { marginBottom: 20, justifyContent: "space-between" },
        ]}
      >
        <Text style={[styles.text, { fontWeight: 600 }]}>
          Resumo por Perfil
        </Text>
      </View>
      <ProfilesList />
    </View>
  );
}
