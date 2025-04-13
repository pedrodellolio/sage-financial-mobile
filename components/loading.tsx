import { Theme } from "@/constants/theme";
import { styles } from "@/styling";
import { ActivityIndicator, SafeAreaView } from "react-native";

export default function Loading() {
  return (
    <SafeAreaView style={[styles.container]}>
      <ActivityIndicator
        size="large"
        style={{ flex: 1 }}
        color={Theme.colors.primary}
      />
    </SafeAreaView>
  );
}
