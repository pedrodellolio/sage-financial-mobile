import { Theme } from "@/constants/theme";
import { Summary } from "@/models/summary";
import { styles } from "@/styling";
import { router } from "expo-router";
import { ChevronRight, TrendingDown, TrendingUp } from "lucide-react-native";
import React from "react";
import { TouchableOpacity, View, Text } from "react-native";

type Props = {
  data?: Summary;
};

export default function SummaryCards({ data }: Props) {
  return (
    <View style={{ display: "flex", gap: 10 }}>
      <View
        style={{
          backgroundColor: Theme.colors.bgSecondary,
          padding: 20,
          borderRadius: Theme.radius.lg,
        }}
      >
        <TouchableOpacity
          style={[styles.row, { justifyContent: "space-between" }]}
          onPress={() => router.push("/(app)/(home)/dashboard")}
        >
          <View>
            <Text
              style={{
                fontSize: Theme.typography.sm,
                color: Theme.colors.secondary,
              }}
            >
              Saldo
            </Text>
            <Text
              style={[
                styles.text,
                {
                  fontWeight: 600,
                  fontSize: Theme.typography["2xl"],
                },
              ]}
            >
              {(data?.balance ?? 0).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </Text>
          </View>
          <ChevronRight color={Theme.colors.white} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          gap: 8,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 20,
            backgroundColor: Theme.colors.bgSecondary,
            borderRadius: Theme.radius.lg,
            padding: 20,
            flex: 1,
          }}
        >
          <View
            style={{
              backgroundColor: "#4B831A",
              borderRadius: Theme.radius.lg,
              padding: 4,
            }}
          >
            <TrendingUp color={Theme.colors.white} size={22} />
          </View>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: Theme.typography.md,
                color: Theme.colors.secondary,
              }}
            >
              Receita
            </Text>
            <Text
              style={{
                fontSize: Theme.typography.xl,
                fontWeight: 600,
                marginTop: 4,
                color: Theme.colors.white,
              }}
            >
              {(data?.income ?? 0).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </Text>
          </View>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 20,
            backgroundColor: Theme.colors.bgSecondary,
            borderRadius: Theme.radius.lg,
            padding: 20,
            flex: 1,
          }}
        >
          <View
            style={{
              backgroundColor: "#A73E2C",
              borderRadius: Theme.radius.lg,
              padding: 4,
            }}
          >
            <TrendingDown color={Theme.colors.white} size={22} />
          </View>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: Theme.typography.md,
                color: Theme.colors.secondary,
              }}
            >
              Despesas
            </Text>
            <Text
              style={{
                fontSize: Theme.typography.xl,
                fontWeight: 600,
                marginTop: 4,
                color: Theme.colors.white,
              }}
            >
              {(data?.expenses ?? 0).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
