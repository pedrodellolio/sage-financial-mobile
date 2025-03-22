import DropdownProfileInput from "@/components/dropdowns/dropdown-profile-input";
import Header from "@/components/header";
import LatestTransactionsList from "@/components/latest-transactions-list";
import Loading from "@/components/loading";
import ProfilesList from "@/components/profiles-list";
import RecalculateWalletButton from "@/components/recalculate-wallet-button";
import SeeMoreButton from "@/components/see-more-button";
import UpcomingExpensesList from "@/components/upcoming-expenses-list";
import { MONTHS } from "@/constants/months";
import { Theme } from "@/constants/theme";
import { Profile } from "@/models/profile";
import { Summary } from "@/models/summary";
import { getSummary } from "@/services/wallet";
import { styles } from "@/styling";
import { currentMonth, currentYear } from "@/utils/date";
import { capitalize } from "@/utils/format";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import { ChevronRight, Plus } from "lucide-react-native";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

const currentProfile = async () => {
  const profileJson = await AsyncStorage.getItem("profile");
  const profile = profileJson && JSON.parse(profileJson);
  return profile as Profile;
};

export default function DashboardScreen() {
  const { data, isLoading, error } = useQuery<Summary>({
    queryKey: ["summary", currentMonth, currentYear],
    queryFn: () => getSummary(currentMonth, currentYear),
  });

  const {
    data: profile,
    isLoading: isLoadingProfile,
    error: profileError,
  } = useQuery<Profile>({
    queryKey: ["profile"],
    queryFn: () => currentProfile(),
  });

  if (isLoading) return <Loading />;
  if (error) return <Text>Error loading transactions</Text>;
  return (
    <View style={[styles.container]}>
      <Header
        // middle={`${MONTHS[currentMonth - 1].short} ${currentYear}`}
        left={<DropdownProfileInput />}
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
            <TouchableOpacity
              style={[styles.row, { justifyContent: "space-between" }]}
              onPress={() => router.push("/(app)/(home)/dashboard")}
            >
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
              <ChevronRight color={Theme.colors.white} />
            </TouchableOpacity>
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

        <View style={{ marginTop: 40 }}>
          <View
            style={[
              styles.row,
              { marginBottom: 20, justifyContent: "space-between" },
            ]}
          >
            <Text style={[styles.text, { fontWeight: 600 }]}>
              Resumo por Perfil
            </Text>
            <SeeMoreButton />
          </View>
          <ProfilesList />
        </View>

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
            <SeeMoreButton />
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
            <SeeMoreButton />
          </View>
          <LatestTransactionsList />
        </View>
      </ScrollView>
    </View>
  );
}
