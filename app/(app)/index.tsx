import { Theme } from "@/constants/theme";
import { signOut } from "@/services/auth";
import { Button, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DashboardScreen() {
  return (
    <SafeAreaView style={{ padding: 20 }}>
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
            R$30,00
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
              R$30,00
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
              R$30,00
            </Text>
          </View>
        </View>
      </View>
      <Button onPress={signOut} title="Logout" />
    </SafeAreaView>
  );
}
