import { Stack } from "expo-router";

export default function GoalsLayout() {
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
          headerTitle: "Add Meta",
          headerRight: () => null,
        }}
      />
    </Stack>
  );
}
