import { Stack } from "expo-router";

export default function RemindersLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="add"
        options={{
          headerTitle: "Add Lembrete",
          headerRight: () => null,
        }}
      />
    </Stack>
  );
}
