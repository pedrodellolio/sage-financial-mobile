import { Theme } from "@/constants/theme";
import { Summary } from "@/models/summary";
import { signOut } from "@/services/auth";
import { getSummary } from "@/services/wallet";
import { styles } from "@/styling";
import { currentMonth, currentYear } from "@/utils/date";
import { useQuery } from "@tanstack/react-query";
import { Button, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DashboardScreen() {
  const { data, isLoading, error } = useQuery<Summary>({
    queryKey: ["summary", currentMonth, currentYear],
    queryFn: () => getSummary(currentMonth, currentYear),
  });

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error loading transactions</Text>;
  return (
    <SafeAreaView style={[styles.container, { paddingTop: 0 }]}>
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
          <Text style={{ fontWeight: 600, fontSize: Theme.typography.lg }}>
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
            <Text style={{ fontWeight: 600, fontSize: Theme.typography.lg }}>
              Receitas
            </Text>
            <Text
              style={{
                fontSize: Theme.typography.xl,
                fontWeight: 800,
                marginTop: 4,
              }}
            >
              {data?.income.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
            </Text>
          </View>
          <View>
            <Text style={{ fontWeight: 600, fontSize: Theme.typography.lg }}>
              Despesas
            </Text>
            <Text
              style={{
                fontSize: Theme.typography.xl,
                fontWeight: 800,
                marginTop: 4,
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
      <Button onPress={signOut} title="Logout" />
    </SafeAreaView>
  );
}
