import Header from "@/components/header";
import { getNotifications } from "@/services/notifications";
import { styles } from "@/styling";
import { useQuery } from "@tanstack/react-query";
import {
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Notification } from "@/models/notification";
import NotificationItem from "@/components/lists/items/notification-item";
import { Bell } from "lucide-react-native";
import { Theme } from "@/constants/theme";
import { router } from "expo-router";
import { getNotificationData } from "@/utils/notifications";
import NotificationGroupButton, {
  NotificationType,
} from "@/components/notification-group-button";
import { useState } from "react";

export default function RemindersScreen() {
  const [selectedTab, setSelectedTab] = useState(NotificationType.TRANSACTION);
  const { data, isLoading, error } = useQuery<Notification[]>({
    queryKey: ["notification"],
    queryFn: () => getNotifications(),
  });

  const goalNotifications = data?.filter((d) => d.budgetGoal != null);
  const transactionNotifications = data?.filter((d) => d.transaction != null);

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error loading goals</Text>;
  return (
    <View style={[styles.container]}>
      <Header middle="Lembretes" />

      <NotificationGroupButton value={selectedTab} onChange={setSelectedTab} />
      {data && data.length > 0 ? (
        <FlatList
          style={{
            width: "100%",
          }}
          showsHorizontalScrollIndicator={false}
          data={
            selectedTab === NotificationType.TRANSACTION
              ? transactionNotifications
              : goalNotifications
          }
          renderItem={(value) => (
            <TouchableOpacity
              key={getNotificationData(value.item).id}
              style={{ marginBottom: 12 }}
            >
              <NotificationItem data={value.item} type={selectedTab}/>
            </TouchableOpacity>
          )}
        />
      ) : (
        <View
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            marginTop: 100,
          }}
        >
          <Bell color={Theme.colors.bgSecondary} size={120} />
          <Text
            style={[
              styles.text,
              {
                textAlign: "center",
                marginTop: 20,
                color: Theme.colors.secondary,
              },
            ]}
          >
            Não existem lembretes cadastrados
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              router.push({
                pathname: "/(modals)/add-transaction-modal",
              })
            }
          >
            <Text style={[styles.text, { fontWeight: 600 }]}>
              Criar nova movimentação
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
