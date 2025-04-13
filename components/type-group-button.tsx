import { Theme } from "@/constants/theme";
import { TransactionType } from "@/models/transaction";
import { styles } from "@/styling";
import React from "react";
import { Pressable, View, Text } from "react-native";

type Props = {
  onChange: (...event: any[]) => void;
  value?: TransactionType;
};

export default function TypeGroupButton({ onChange, value }: Props) {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 10,
        backgroundColor: Theme.colors.bgSecondary,
        padding: 8,
        borderRadius: Theme.radius.xl,
      }}
    >
      <Pressable
        onPress={() => onChange(TransactionType.EXPENSE)}
        style={[
          {
            backgroundColor:
              value == TransactionType.EXPENSE
                ? Theme.colors.primary
                : Theme.colors.bgSecondary,
            padding: 10,
            flex: 1,
            borderRadius: Theme.radius.lg,
          },
        ]}
      >
        <Text
          style={[
            styles.text,
            {
              textAlign: "center",
              fontWeight: value == TransactionType.EXPENSE ? 800 : 400,
            },
          ]}
        >
          Despesa
        </Text>
      </Pressable>
      <Pressable
        onPress={() => onChange(TransactionType.INCOME)}
        style={[
          {
            backgroundColor:
              value == TransactionType.INCOME
                ? Theme.colors.primary
                : Theme.colors.bgSecondary,
            padding: 10,
            flex: 1,
            borderRadius: Theme.radius.lg,
          },
        ]}
      >
        <Text
          style={[
            styles.text,
            {
              textAlign: "center",
              fontWeight: value == TransactionType.INCOME ? 800 : 400,
            },
          ]}
        >
          Receita
        </Text>
      </Pressable>
    </View>
  );
}
