import { Stack } from "expo-router";
import { ChevronLeft } from "lucide-react-native";

export default function TransactionsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="add-transaction-modal"
        options={{
          presentation: "modal",
          headerShown: true,
          headerLeft: () => <ChevronLeft />,
        }}
      />
      <Stack.Screen
        name="details-transaction-modal"
        options={{
          presentation: "modal",
          headerShown: true,
          headerLeft: () => <ChevronLeft />,
        }}
      />
    </Stack>
  );
}
