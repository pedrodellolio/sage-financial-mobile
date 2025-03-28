import DropdownProfileInput from "@/components/dropdowns/dropdown-profile-input";
import { Theme } from "@/constants/theme";
import { useSession } from "@/hooks/use-session";
import { signOut } from "@/services/auth";
import { styles } from "@/styling";
import { useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import { ChevronRight, Cog, Tag, Users } from "lucide-react-native";
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function DrawerScreen() {
  const { user } = useSession();
  const queryClient = useQueryClient();

  const handleProfileChange = () => {
    queryClient.resetQueries();
  };

  return (
    <ScrollView
      style={[styles.container, { paddingBlock: 12 }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={[styleSheet.row, { marginTop: 10 }]}>
        <View style={styleSheet.avatar}>
          <Text
            style={[
              styles.text,
              {
                textAlign: "center",
                margin: "auto",
                fontWeight: 600,
                fontSize: 1.5 * Theme.typography.xl,
              },
            ]}
          >
            {user?.email?.slice(0, 1).toUpperCase()}
          </Text>
        </View>
        <View style={{ display: "flex", gap: 10 }}>
          <Text style={styles.text}>{user?.email}</Text>
          <DropdownProfileInput />
        </View>
      </View>
      <View style={{ marginTop: 30 }}>
        <TouchableOpacity
          style={styleSheet.menuButton}
          onPress={() => router.push("/(app)/(user)/profiles")}
        >
          <View style={styleSheet.row}>
            <Users color={Theme.colors.white} size={20} />
            <Text style={styles.text}>Perfis</Text>
          </View>
          <ChevronRight color={Theme.colors.white} size={20} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styleSheet.menuButton}
          onPress={() => router.push("/(app)/(user)/labels")}
        >
          <View style={styleSheet.row}>
            <Tag color={Theme.colors.white} size={20} />
            <Text style={styles.text}>Categorias</Text>
          </View>
          <ChevronRight color={Theme.colors.white} size={20} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styleSheet.menuButton}
          onPress={() => router.push("/(app)/(user)/labels")}
        >
          <View style={styleSheet.row}>
            <Cog color={Theme.colors.white} size={20} />
            <Text style={styles.text}>Configurações</Text>
          </View>
          <ChevronRight color={Theme.colors.white} size={20} />
        </TouchableOpacity>
      </View>

      <Button title="Sair" onPress={signOut} />
    </ScrollView>
  );
}

const styleSheet = StyleSheet.create({
  avatar: {
    height: 78,
    width: 78,
    backgroundColor: Theme.colors.bgSecondary,
    borderRadius: 1000,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  menuButton: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: Theme.colors.bgSecondary,
    height: 80,
  },
});
