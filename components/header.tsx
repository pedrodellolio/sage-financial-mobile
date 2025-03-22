import { Theme } from "@/constants/theme";
import { Transaction, TransactionType } from "@/models/transaction";
import { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";

interface Props {
  middle?: string | ReactNode;
  left?: ReactNode;
  right?: ReactNode;
}

export default function Header({ left, middle, right }: Props) {
  return (
    <View style={styles.header}>
      {left ? (
        <View style={[styles.icon]}>{left}</View>
      ) : (
        <View style={(styles.icon, { width: 40, height: 14 })}></View>
      )}
      {middle && typeof middle == "string" ? (
        <Text style={styles.title}>{middle}</Text>
      ) : (
        middle
      )}
      {right ? (
        <View style={styles.icon}>{right}</View>
      ) : (
        <View style={(styles.icon, { width: 40, height: 14 })}></View>
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
    marginBottom: 10
    // borderWidth: 1
  },
  icon: {
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
