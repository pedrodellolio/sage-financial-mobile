import { Theme } from "@/constants/theme";
import { TransactionType } from "@/models/transaction";
import { styles } from "@/styling";
import React from "react";
import { Pressable, View, Text } from "react-native";

export enum NotificationType {
  TRANSACTION,
  GOAL,
}

type Props = {
  onChange: (...event: any[]) => void;
  value: NotificationType | null;
  isFiltering?: boolean;
};

export default function NotificationGroupButton({
  onChange,
  value,
}: Props) {
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
        onPress={() => onChange(NotificationType.TRANSACTION)}
        style={[
          {
            backgroundColor:
              value == NotificationType.TRANSACTION
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
              fontWeight: value == NotificationType.TRANSACTION ? 800 : 400,
            },
          ]}
        >
          Movimentações
        </Text>
      </Pressable>
      <Pressable
        onPress={() => onChange(NotificationType.GOAL)}
        style={[
          {
            backgroundColor:
              value == NotificationType.GOAL
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
              fontWeight: value == NotificationType.GOAL ? 800 : 400,
            },
          ]}
        >
          Metas
        </Text>
      </Pressable>
    </View>
  );
}
