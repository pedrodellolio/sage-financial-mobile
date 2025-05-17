import { Theme } from "@/constants/theme";
import { styles } from "@/styling";
import { router } from "expo-router";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import DropdownProfileInput from "./dropdowns/dropdown-profile-input";

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
      <Text style={[styles.text, { fontWeight: 600 }]}>Selecione um perfil para tentar novamente</Text>
      <View
        style={{
          backgroundColor: Theme.colors.bgSecondary,
          padding: 10,
          borderRadius: Theme.radius.lg,
        }}
      >
        <DropdownProfileInput />
      </View>
      {/* <TouchableOpacity
        style={styles.button}
        onPress={() =>
          router.push({
            pathname: "/(app)/(home)",
          })
        }
      >
        <Text style={[styles.text, { fontWeight: 600 }]}>Tentar novamente</Text>
      </TouchableOpacity> */}
    </View>
  );
}
