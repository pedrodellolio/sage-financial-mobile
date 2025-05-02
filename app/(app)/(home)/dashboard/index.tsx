import FixedVariableExpensesChart from "@/components/charts/fixed-variable-expenses-chart";
import { LabelsDistributionChart } from "@/components/charts/labels-distribution-chart";
import SummaryBarChart from "@/components/charts/summary-bar-chart";
import DailyExpenseCard from "@/components/daily-expense-card";
import Header from "@/components/header";
import { Theme } from "@/constants/theme";
import { styles } from "@/styling";
import { router } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";

export default function DashboardScreen() {
  return (
    <View style={[styles.container, { paddingBottom: 10 }]}>
      <Header
        middle={"Dashboard"}
        left={
          <TouchableOpacity onPress={() => router.back()}>
            <ChevronLeft color={Theme.colors.white} />
          </TouchableOpacity>
        }
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        // style={{ marginBottom: 30}}
      >
        <View style={{ marginBottom: 10 }}>
          <DailyExpenseCard />
        </View>
        <View>
          <View
            style={[
              styles.row,
              { justifyContent: "space-between", marginVertical: 20 },
            ]}
          >
            <Text style={[styles.text, { fontWeight: 600 }]}>
              Resumo Semanal
            </Text>
            {/* <TouchableOpacity>
              <Ellipsis color={Theme.colors.white} />
            </TouchableOpacity> */}
          </View>
          <SummaryBarChart />
        </View>
        {/* <View>
          <View
            style={[
              styles.row,
              {
                justifyContent: "space-between",
                marginTop: 40,
                marginVertical: 20,
              },
            ]}
          >
            <Text style={[styles.text, { fontWeight: 600 }]}>Saldo Anual</Text>
            <TouchableOpacity>
              <Ellipsis color={Theme.colors.white} />
            </TouchableOpacity>
          </View>
          <BalanceBarChart />
        </View> */}
        <View>
          <View
            style={[
              styles.row,
              {
                justifyContent: "space-between",
                marginTop: 40,
                marginVertical: 20,
              },
            ]}
          >
            <Text style={[styles.text, { fontWeight: 600 }]}>
              Categorias Recorrentes
            </Text>
            {/* <TouchableOpacity>
              <Ellipsis color={Theme.colors.white} />
            </TouchableOpacity> */}
          </View>
          {/* <LabelsPieChart /> */}
          <LabelsDistributionChart />
        </View>
        <View>
          <View
            style={[
              styles.row,
              {
                justifyContent: "space-between",
                marginTop: 40,
                marginVertical: 20,
              },
            ]}
          >
            <Text style={[styles.text, { fontWeight: 600 }]}>
              Despesas Fixas x Variáveis
            </Text>
            {/* <TouchableOpacity>
              <Ellipsis color={Theme.colors.white} />
            </TouchableOpacity> */}
          </View>
          <FixedVariableExpensesChart />
        </View>
      </ScrollView>
    </View>
  );
}
