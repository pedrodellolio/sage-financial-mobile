import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/supabaseClient";
import { User } from "@supabase/supabase-js";
import { Wallet } from "@/models/wallet";
import { useQuery } from "@tanstack/react-query";
import { getWalletByMonthAndYear } from "@/services/wallet";
import { currentMonth, currentYear } from "@/utils/date";

const WalletContext = createContext<{
  wallet: Wallet | null;
  loading: boolean;
  error: Error | null;
}>({
  wallet: null,
  loading: true,
  error: null,
});

export function useWallet() {
  const value = useContext(WalletContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useWallet must be wrapped in a <WalletProvider />");
    }
  }
  return value;
}

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const { data, isLoading, error } = useQuery<Wallet>({
    queryKey: ["wallet", currentMonth, currentYear],
    queryFn: () => getWalletByMonthAndYear(currentMonth, currentYear),
  });

  useEffect(() => {}, []);

  return (
    <WalletContext.Provider
      value={{
        wallet: data ?? null,
        loading: isLoading,
        error,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}
