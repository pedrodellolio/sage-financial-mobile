import WeekExpensesChart from "@/components/charts/week-expenses-chart";
import WeekIncomeChart from "@/components/charts/week-income-chart";
import Header from "@/components/header";
import LatestTransactionsList from "@/components/latest-transactions-list";
import { Theme } from "@/constants/theme";
import { Summary } from "@/models/summary";
import { TransactionType } from "@/models/transaction";
import { getSummary } from "@/services/wallet";
import { styles } from "@/styling";
import { currentMonth, currentYear } from "@/utils/date";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react-native";
import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

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
        right={
          <Pressable>
            <Plus color={Theme.colors.white} />
          </Pressable>
        }
      />
      <ScrollView style={[{ paddingTop: 0 }]}>
        <View
          style={{
            backgroundColor: Theme.colors.white,
            padding: 28,
            borderRadius: Theme.radius.lg,
            display: "flex",
            gap: 28,
          }}
        >
          <View>
            <Text
              style={{
                fontWeight: 600,
                fontSize: Theme.typography.lg,
                color: Theme.colors.bgSecondary,
              }}
            >
              Saldo
            </Text>
            <Text
              style={{
                fontWeight: 800,
                fontSize: 2 * Theme.typography.xl,
              }}
            >
              {data?.balance.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </Text>
          </View>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View>
              <Text
                style={{
                  fontWeight: 600,
                  fontSize: Theme.typography.md,
                  color: Theme.colors.bgSecondary,
                }}
              >
                Receitas
              </Text>
              <Text
                style={{
                  fontSize: Theme.typography.xl,
                  fontWeight: 800,
                  marginTop: 4,
                  color: "green",
                }}
              >
                {data?.income.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </Text>
            </View>
            <View>
              <Text
                style={{
                  fontWeight: 600,
                  fontSize: Theme.typography.md,
                  color: Theme.colors.bgSecondary,
                }}
              >
                Despesas
              </Text>
              <Text
                style={{
                  fontSize: Theme.typography.xl,
                  fontWeight: 800,
                  marginTop: 4,
                  color: "red",
                }}
              >
                {data?.expenses.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </Text>
            </View>
          </View>
        </View>

        <View style={{ marginTop: 40 }}>
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
        </View>

        <View style={{ marginTop: 40 }}>
          <Text style={[styles.text, { marginBottom: 20, fontWeight: 600 }]}>
            Movimentações recentes
          </Text>
          <LatestTransactionsList />
        </View>
        {/* <Button onPress={signOut} title="Logout" /> */}
      </ScrollView>
    </View>
  );
}
