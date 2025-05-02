import Header from "@/components/header";
import { getNotifications } from "@/services/notifications";
import { styles } from "@/styling";
import { useQuery } from "@tanstack/react-query";
import { FlatList, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Notification } from "@/models/notification";
import NotificationItem from "@/components/lists/items/notification-item";
import { Bell } from "lucide-react-native";
import { Theme } from "@/constants/theme";
import { router } from "expo-router";

export default function RemindersScreen() {
  const { data, isLoading, error } = useQuery<Notification[]>({
    queryKey: ["notification"],
    queryFn: () => getNotifications(),
  });
  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error loading goals</Text>;
  return (
    <View style={[styles.container]}>
      <Header middle="Lembretes" />

      {data && data.length > 0 ? (
        <FlatList
          style={{
            width: "100%",
          }}
          showsHorizontalScrollIndicator={false}
          data={data}
          renderItem={(value) => (
            <TouchableOpacity
              key={value.item.transaction.id}
              style={{ marginBottom: 12 }}
            >
              <NotificationItem data={value.item} />
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
