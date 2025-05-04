import DropdownProfileInput from "@/components/dropdowns/dropdown-profile-input";
import Header from "@/components/header";
import LatestTransactionsList from "@/components/lists/latest-transactions-list";
import Loading from "@/components/loading";
import SeeMoreButton from "@/components/buttons/see-more-button";
import { Summary } from "@/models/summary";
import { getSummary } from "@/services/wallet";
import { styles } from "@/styling";
import { currentMonth, currentYear } from "@/utils/date";
import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import { ScrollView, Text, View } from "react-native";
import ErrorScreen from "@/components/error-screen";
import SummaryCards from "@/components/cards/summary-cards";
import ProfileSummaryCards from "@/components/cards/profile-summary-cards";
import UpcomingPaymentsCards from "@/components/cards/upcoming-payments-cards";
import Avatar from "@/components/avatar";

export default function DashboardScreen() {
  const { data, isLoading, error } = useQuery<Summary>({
    queryKey: ["summary", currentMonth, currentYear],
    queryFn: () => getSummary(currentMonth, currentYear),
  });

  if (isLoading) return <Loading />;
  if (error) return <ErrorScreen error={error} />;
  return (
    <View style={[styles.container]}>
      <Header
        left={<DropdownProfileInput />}
        right={<Avatar />}
        showIcon={false}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <SummaryCards data={data} />
        <ProfileSummaryCards />
        <UpcomingPaymentsCards />
        <View style={{ marginTop: 32 }}>
          <View
            style={[
              styles.row,
              { marginBottom: 20, justifyContent: "space-between" },
            ]}
          >
            <Text style={[styles.text, { fontWeight: 600 }]}>
              Últimas Movimentações
            </Text>
            <SeeMoreButton onPress={() => router.push("/(app)/transactions")} />
          </View>
          <LatestTransactionsList />
        </View>
      </ScrollView>
    </View>
  );
}
