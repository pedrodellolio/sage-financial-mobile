import BalanceBarChart from "@/components/charts/balance-bar-chart";
import LabelsPieChart from "@/components/charts/labels-pie-chart";
import SummaryBarChart from "@/components/charts/summary-bar-chart";
import Header from "@/components/header";
import { Theme } from "@/constants/theme";
import { styles } from "@/styling";
import { router } from "expo-router";
import { ChevronLeft, Ellipsis, Menu } from "lucide-react-native";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";

export default function DashboardScreen() {
  return (
    <View style={[styles.container, {paddingBottom: 10}]}>
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
        // style={{ marginBottom: 10}}
      >
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
            <TouchableOpacity>
              <Ellipsis color={Theme.colors.white} />
            </TouchableOpacity>
          </View>
          <SummaryBarChart />
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
            <Text style={[styles.text, { fontWeight: 600 }]}>Saldo Anual</Text>
            <TouchableOpacity>
              <Ellipsis color={Theme.colors.white} />
            </TouchableOpacity>
          </View>
          <BalanceBarChart />
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
              Categorias Recorrentes
            </Text>
            <TouchableOpacity>
              <Ellipsis color={Theme.colors.white} />
            </TouchableOpacity>
          </View>
          <LabelsPieChart />
        </View>
      </ScrollView>
    </View>
  );
}
