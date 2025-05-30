import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="labels/index" />
      <Stack.Screen name="profiles/index" />
      <Stack.Screen name="import/index" />
    </Stack>
  );
}
