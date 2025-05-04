import { Theme } from "@/constants/theme";
import { useSession } from "@/hooks/use-session";
import { styles } from "@/styling";
import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity } from "react-native";

type Props = {
  width?: number;
  height?: number;
  fontSize?: number;
};

export default function Avatar({
  height = 40,
  width = 40,
  fontSize = Theme.typography.lg,
}: Props) {
  const { user } = useSession();
  return (
    <TouchableOpacity
      onPress={() => router.push("/(app)/(user)")}
      style={{
        height: height,
        width: width,
        borderRadius: "100%",
        backgroundColor: Theme.colors.bgSecondary,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={[styles.text, { fontWeight: 500, fontSize }]}>
        {user?.email?.slice(0, 1).toUpperCase()}
      </Text>
    </TouchableOpacity>
  );
}
