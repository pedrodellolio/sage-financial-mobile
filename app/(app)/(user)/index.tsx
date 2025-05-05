import Avatar from "@/components/avatar";
import { Theme } from "@/constants/theme";
import { useSession } from "@/hooks/use-session";
import { signOut } from "@/services/auth";
import { styles } from "@/styling";
import { router } from "expo-router";
import { ChevronRight, Tag, Upload, Users } from "lucide-react-native";
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

  return (
    <>
      <ScrollView
        style={[styles.container, { paddingBlock: 12 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styleSheet.row, { marginTop: 10, paddingInline: 8 }]}>
          <Avatar width={60} height={60} fontSize={24} />
          <View style={{ display: "flex", gap: 10 }}>
            <Text style={styles.text}>{user?.email}</Text>
          </View>
        </View>
        <View style={{ marginTop: 30, height: "100%" }}>
          <TouchableOpacity
            style={styleSheet.menuButton}
            onPress={() => router.push("/(app)/(user)/profiles")}
          >
            <View style={[styleSheet.row]}>
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
            onPress={() => router.push("/(app)/(user)/import")}
          >
            <View style={styleSheet.row}>
              <Upload color={Theme.colors.white} size={20} />
              <Text style={styles.text}>Importar CSV</Text>
            </View>
            <ChevronRight color={Theme.colors.white} size={20} />
          </TouchableOpacity>
        </View>
      </ScrollView>
      <TouchableOpacity
        style={[
          styles.outlineButton,
          { position: "absolute", bottom: 0, margin: 20, right: 0, left: 0 },
        ]}
        onPress={signOut}
      >
        <Text style={[styles.text, { textAlign: "center" }]}>Sair</Text>
      </TouchableOpacity>
    </>
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
    paddingInline: 14,
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
