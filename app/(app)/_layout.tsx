import { useSession } from "@/hooks/use-session";
import { Redirect, Tabs } from "expo-router";
import { Home, Book, Goal, Bell, User, Users } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "react-native";
import { Theme } from "@/constants/theme";

export default function AppLayout() {
  const { user, loading } = useSession();
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
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: Theme.colors.background,
          paddingTop: 4,
        },
        headerStyle: {
          backgroundColor: Theme.colors.background,
        },
        headerTintColor: Theme.colors.white,
      }}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          tabBarIcon: ({ color }) => <Home size={22} color={color} />,
        }}
      />
      <Tabs.Screen
        name="transactions"
        options={{
          tabBarIcon: ({ color }) => <Book size={22} color={color} />,
        }}
      />
      <Tabs.Screen
        name="goals"
        options={{
          tabBarIcon: ({ color }) => <Goal size={22} color={color} />,
        }}
      />
      <Tabs.Screen
        name="reminders"
        options={{
          tabBarIcon: ({ color }) => <Bell size={22} color={color} />,
        }}
      />
      <Tabs.Screen
        name="(user)"
        options={{
          tabBarIcon: ({ color }) => <User size={22} color={color} />,
        }}
      />
    </Tabs>
  );
}
