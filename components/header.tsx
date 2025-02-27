import { Theme } from "@/constants/theme";
import { Transaction, TransactionType } from "@/models/transaction";
import { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";

interface Props {
  title?: string;
  leftIcon: ReactNode;
}

export default function Header({ title, leftIcon }: Props) {
  return (
    <View style={styles.header}>
      {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
      {title && <Text style={styles.title}>{title}</Text>}
      {leftIcon && (
        <View style={(styles.leftIcon, { width: 40, height: 14 })}></View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // borderWidth: 1
  },
  leftIcon: {
    backgroundColor: Theme.colors.bgSecondary,
    borderRadius: Theme.radius.lg,
    padding: 8,
  },
  title: {
    color: Theme.colors.white,
    fontWeight: 800,
    fontSize: Theme.typography.xl,
  },
});
