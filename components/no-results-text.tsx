import { Theme } from "@/constants/theme";
import { styles } from "@/styling";
import React from "react";
import { View, Text } from "react-native";

type Props = {};

export default function NoResultsText({}: Props) {
  return (
    <View
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={[
          styles.text,
          {
            color: Theme.colors.secondary,
          },
        ]}
      >
        Sem resultados
      </Text>
    </View>
  );
}
