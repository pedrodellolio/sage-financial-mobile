import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TouchableOpacity } from "react-native";
import { syncWallet } from "@/services/wallet";
import { RefreshCcw } from "lucide-react-native";
import { Theme } from "@/constants/theme";

interface Props {
  month: number;
  year: number;
}

export default function RecalculateWalletButton({ month, year }: Props) {
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: () => syncWallet(month, year),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["summary"] });
    },
  });

  return (
    <TouchableOpacity
      style={{
        width: 24,
        height: 24,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      onPress={() => mutateAsync()}
    >
      <RefreshCcw color={Theme.colors.white} size={20} />
    </TouchableOpacity>
  );
}
