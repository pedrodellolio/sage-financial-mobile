import { Theme } from "@/constants/theme";
import { styles } from "@/styling";
import { router } from "expo-router";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

type Props = {
  error: Error | null;
};

export default function ErrorScreen({ error }: Props) {
  return (
    <View
      style={[
        styles.container,
        {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 20,
        },
      ]}
    >
      <View style={{ display: "flex", alignItems: "center", gap: 4 }}>
        <Text
          style={[styles.text, { fontSize: 1.5 * Theme.typography["2xl"] }]}
        >
          Ops!
        </Text>
        <Text
          style={[
            styles.text,
            { color: Theme.colors.secondary, fontSize: Theme.typography.lg },
          ]}
        >
          Ocorreu um erro
        </Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          router.push({
            pathname: "/(modals)/add-transaction-modal",
          })
        }
      >
        <Text style={[styles.text, { fontWeight: 600 }]}>Tentar novamente</Text>
      </TouchableOpacity>
    </View>
  );
}
