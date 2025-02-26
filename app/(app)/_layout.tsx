import { useSession } from "@/hooks/use-session";
import { Redirect, router, Tabs } from "expo-router";
import { Home, Book, Plus } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Pressable, Text, StyleSheet } from "react-native";
import { Theme } from "@/constants/theme";

export default function AppLayout() {
  const { user, loading } = useSession();
  console.log(user);
  if (loading)
    return (
      <SafeAreaView>
        <Text style={{ textAlign: "center", marginTop: 20 }}>Loading...</Text>
      </SafeAreaView>
    );

  if (!user) return <Redirect href="/(auth)/login" />;

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          paddingTop: 4,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Início",
          tabBarIcon: ({ color }) => <Home size={22} color={color} />,
        }}
      />
      <Tabs.Screen
        name="transactions"
        options={{
          title: "Movimentações",
          tabBarIcon: ({ color }) => <Book size={22} color={color} />,
          headerRight: () => (
            <Pressable
              style={styles.addButton}
              onPress={() => router.push("/(app)/transactions/add")}
            >
              <Plus color={Theme.colors.black}/>
            </Pressable>
          ),
        }}
      />
      <Tabs.Screen
        name="goals"
        options={{
          title: "Metas",
          tabBarIcon: ({ color }) => <Book size={22} color={color} />,
          headerRight: () => (
            <Pressable
              style={styles.addButton}
            //   onPress={() => router.push("/(app)/transactions/add")}
            >
              <Plus color={Theme.colors.black}/>
            </Pressable>
          ),
        }}
      />
      <Tabs.Screen
        name="reminders"
        options={{
          title: "Lembretes",
          tabBarIcon: ({ color }) => <Book size={22} color={color} />,
          headerRight: () => (
            <Pressable
              style={styles.addButton}
            //   onPress={() => router.push("/(app)/transactions/add")}
            >
              <Plus color={Theme.colors.black}/>
            </Pressable>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  addButton: {
    backgroundColor: Theme.colors.secondary,
    borderRadius: 1000,
    padding: 8,
    marginRight: 8
  },
});
