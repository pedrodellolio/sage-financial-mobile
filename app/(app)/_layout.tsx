import { useSession } from "@/hooks/use-session";
import { Redirect, router, Tabs } from "expo-router";
import { Home, Book, Plus } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Pressable, Text } from "react-native";

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
      {/* <Tabs.Screen
        name="transactions"
        options={{
          title: "Movimentações",
          tabBarIcon: ({ color }) => <Book size={22} color={color} />,
          headerRight: () => (
            <Pressable
              style={{ backgroundColor: Theme.colors.secondary }}
            //   onPress={() => router.push("/(app)/transactions/add")}
            >
              <Plus />
            </Pressable>
          ),
        }}
      /> */}
    </Tabs>
  );
}
