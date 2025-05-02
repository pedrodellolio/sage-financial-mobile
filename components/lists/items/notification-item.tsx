import { Theme } from "@/constants/theme";
import { styles } from "@/styling";
import { Text, TouchableOpacity, View } from "react-native";
import { capitalize } from "@/utils/format";
import { Notification } from "@/models/notification";
import { Bell, BellOff } from "lucide-react-native";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleNotification } from "@/services/notifications";

interface Props {
  data: Notification;
}

export default function NotificationItem({ data }: Props) {
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: (id: string) => toggleNotification(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notification"] });
    },
  });

  const handleToggleNotification = (id: string) => {
    mutateAsync(id);
  };

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
        <View style={{ display: "flex", gap: 6 }}>
          <Text style={[styles.text, { fontSize: Theme.typography.sm }]}>
            {capitalize(data.transaction.title)}
          </Text>
          <Text
            style={[
              styles.text,
              { fontWeight: 600, fontSize: Theme.typography.lg },
            ]}
          >
            {data.transaction.valueBrl.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </Text>
          <Text
            style={[
              styles.text,
              { color: Theme.colors.secondary, fontSize: Theme.typography.sm },
            ]}
          >
            Próxima notificação:{" "}
            {new Date(data.triggerDate).toLocaleDateString("pt-BR")}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => handleToggleNotification(data.transaction.id)}
          style={{
            backgroundColor: data.isEnabled
              ? Theme.colors.background
              : Theme.colors.background,
            borderRadius: Theme.radius.lg,
            padding: 10,
          }}
        >
          {data.isEnabled ? (
            <Bell fill={Theme.colors.primary} size={18} />
          ) : (
            <BellOff fill={Theme.colors.secondary} color={Theme.colors.secondary} size={18} />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
