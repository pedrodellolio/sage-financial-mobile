import { Theme } from "@/constants/theme";
import { BudgetGoal, BudgetGoalType } from "@/models/budgetGoal";
import { Transaction, TransactionType } from "@/models/transaction";
import { Wallet } from "@/models/wallet";
import { getTotalExpensesByLabel } from "@/services/transactions";
import { getWalletByMonthAndYear } from "@/services/wallet";
import { styles } from "@/styling";
import { useQuery } from "@tanstack/react-query";
import { DimensionValue, Text, View } from "react-native";
import ProgressBar from "./progress-bar";
import { Label } from "@/models/label";
import { Profile } from "@/models/profile";

interface Props {
  data: Profile;
}

export default function ProfileItem({ data }: Props) {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 18,
        backgroundColor: Theme.colors.bgSecondary,
        borderRadius: Theme.radius.lg,
        padding: 18,
        paddingInline: 18,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={[styles.text, { fontSize: Theme.typography.sm }]}>
          {data.title}
        </Text>
      </View>
    </View>
  );
}
