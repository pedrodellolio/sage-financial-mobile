import WeekExpensesChart from "@/components/charts/week-expenses-chart";
import WeekIncomeChart from "@/components/charts/week-income-chart";
import Header from "@/components/header";
import LatestTransactionsList from "@/components/latest-transactions-list";
import RecalculateWalletButton from "@/components/recalculate-wallet-button";
import UpcomingExpensesList from "@/components/upcoming-expenses-list";
import { Theme } from "@/constants/theme";
import { Summary } from "@/models/summary";
import { TransactionType } from "@/models/transaction";
import { getSummary } from "@/services/wallet";
import { styles } from "@/styling";
import { currentMonth, currentYear } from "@/utils/date";
import { useQuery } from "@tanstack/react-query";
import { ChevronRight, Plus } from "lucide-react-native";
import { useState } from "react";
import {
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function DashboardScreen() {
  const [chartType, setChartType] = useState<TransactionType>(
    TransactionType.EXPENSE
  );
  const { data, isLoading, error } = useQuery<Summary>({
    queryKey: ["summary", currentMonth, currentYear],
    queryFn: () => getSummary(currentMonth, currentYear),
  });

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error loading transactions</Text>;
  return (
    <View style={[styles.container]}>
      <Header
        middle={"Início"}
        left={
          <RecalculateWalletButton month={currentMonth} year={currentYear} />
        }
        right={
          <TouchableOpacity>
            <Plus color={Theme.colors.white} />
          </TouchableOpacity>
        }
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ display: "flex", gap: 10 }}>
          <View
            style={{
              backgroundColor: Theme.colors.bgSecondary,
              padding: 20,
              borderRadius: Theme.radius.lg,
            }}
          >
            <View style={[styles.row, { justifyContent: "space-between" }]}>
              <View>
                <Text
                  style={{
                    fontSize: Theme.typography.sm,
                    color: Theme.colors.secondary,
                  }}
                >
                  Saldo
                </Text>
                <Text
                  style={[
                    styles.text,
                    {
                      fontWeight: 600,
                      fontSize: Theme.typography["2xl"],
                    },
                  ]}
                >
                  {(data?.balance ?? 0).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </Text>
              </View>
              <TouchableOpacity>
                <ChevronRight color={Theme.colors.white} />
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              backgroundColor: Theme.colors.bgSecondary,
              borderRadius: Theme.radius.lg,
              padding: 20,
            }}
          >
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: Theme.typography.sm,
                  color: Theme.colors.secondary,
                }}
              >
                Receitas
              </Text>
              <Text
                style={{
                  fontSize: Theme.typography.lg,
                  fontWeight: 600,
                  marginTop: 4,
                  color: Theme.colors.white,
                }}
              >
                {(data?.income ?? 0).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </Text>
            </View>
            <View
              style={[
                styles.divider,
                { flex: 0, borderColor: Theme.colors.secondary },
              ]}
            ></View>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: Theme.typography.sm,
                  color: Theme.colors.secondary,
                  marginLeft: 20,
                }}
              >
                Despesas
              </Text>
              <Text
                style={{
                  fontSize: Theme.typography.lg,
                  fontWeight: 800,
                  marginTop: 4,
                  color: Theme.colors.white,
                  marginLeft: 20,
                }}
              >
                {(data?.expenses ?? 0).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </Text>
            </View>
          </View>
        </View>

        {/* <View style={{ marginTop: 40 }}>
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
              onPress={() => setChartType(TransactionType.EXPENSE)}
              style={[
                {
                  backgroundColor:
                    chartType == TransactionType.EXPENSE
                      ? Theme.colors.primary
                      : Theme.colors.bgSecondary,
                  padding: 6,
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
                    fontWeight:
                      chartType == TransactionType.EXPENSE ? 800 : 400,
                  },
                ]}
              >
                Despesas
              </Text>
            </Pressable>
            <Pressable
              onPress={() => setChartType(TransactionType.INCOME)}
              style={[
                {
                  backgroundColor:
                    chartType == TransactionType.INCOME
                      ? Theme.colors.primary
                      : Theme.colors.bgSecondary,
                  padding: 6,
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
                    fontWeight: chartType == TransactionType.INCOME ? 800 : 400,
                  },
                ]}
              >
                Receitas
              </Text>
            </Pressable>
          </View>
          {chartType === TransactionType.EXPENSE ? (
            <WeekExpensesChart />
          ) : (
            <WeekIncomeChart />
          )}
        </View> */}

        <View style={{ marginTop: 40 }}>
          <View
            style={[
              styles.row,
              { marginBottom: 20, justifyContent: "space-between" },
            ]}
          >
            <Text style={[styles.text, { fontWeight: 600 }]}>
              Próximos Pagamentos
            </Text>
            <TouchableOpacity>
              <Text style={styles.text}>
                Ver tudo <ChevronRight color={Theme.colors.white} size={12} />
              </Text>
            </TouchableOpacity>
          </View>
          <UpcomingExpensesList />
        </View>

        <View style={{ marginTop: 40 }}>
          <View
            style={[
              styles.row,
              { marginBottom: 20, justifyContent: "space-between" },
            ]}
          >
            <Text style={[styles.text, { fontWeight: 600 }]}>
              Últimas Movimentações
            </Text>
            <TouchableOpacity>
              <Text style={styles.text}>
                Ver tudo <ChevronRight color={Theme.colors.white} size={12} />
              </Text>
            </TouchableOpacity>
          </View>
          <LatestTransactionsList />
        </View>
      </ScrollView>
    </View>
  );
}
