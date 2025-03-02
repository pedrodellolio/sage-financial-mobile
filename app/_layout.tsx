import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { AppState, SafeAreaView } from "react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { supabase } from "@/supabaseClient";
import "react-native-reanimated";
import { SessionProvider } from "@/hooks/use-session";
import { WalletProvider } from "@/hooks/use-wallet";

SplashScreen.preventAutoHideAsync();
const queryClient = new QueryClient();

const RootLayout = () => {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  AppState.addEventListener("change", (state) => {
    if (state == "active") supabase.auth.startAutoRefresh();
    else supabase.auth.stopAutoRefresh();
  });

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <WalletProvider>
          <Slot />
        </WalletProvider>
        <StatusBar style="light" />
      </SessionProvider>
    </QueryClientProvider>
  );
};

export default RootLayout;
