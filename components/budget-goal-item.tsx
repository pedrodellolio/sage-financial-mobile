import { Theme } from "@/constants/theme";
import { BudgetGoal, BudgetGoalType } from "@/models/budgetGoal";
import { Transaction, TransactionType } from "@/models/transaction";
import { styles } from "@/styling";
import { Text, View } from "react-native";

interface Props {
  data: BudgetGoal;
}

export default function BudgetGoalItem({ data }: Props) {
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
          {"Saúde"}
        </Text>

        <Text
          style={[
            styles.text,
            { fontWeight: 600, fontSize: Theme.typography.xl },
          ]}
        >
          10% / {data.value}
          {data.type === BudgetGoalType.PERCENTAGE && "%"}
        </Text>
      </View>

      <View
        style={{
          width: "100%",
          height: 4,
          backgroundColor: Theme.colors.secondary,
        }}
      ></View>
    </View>
  );
}
