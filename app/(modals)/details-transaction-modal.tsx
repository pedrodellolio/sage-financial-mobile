import Header from "@/components/header";
import { Theme } from "@/constants/theme";
import { TransactionType } from "@/models/transaction";
import { deleteTransaction } from "@/services/transactions";
import { styles } from "@/styling";
import { capitalize } from "@/utils/format";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { router, useLocalSearchParams } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";

type Params = {
  id: string;
  title: string;
  valueBrl: string;
  occurredAt: string;
  type: string;
  labelTitle: string;
};

export default function DetailsTransactionsModal() {
  const params: Params = useLocalSearchParams();
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: (transactionId: string) => deleteTransaction(transactionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["summary"] });
      router.replace("/(app)/transactions");
    },
  });

  const confirmDelete = () =>
    Alert.alert(
      "Atenção",
      "Tem certeza que deseja apagar? Essa ação não é reversível.",
      [
        {
          text: "Voltar",
          style: "cancel",
        },
        {
          text: "Apagar",
          style: "destructive",
          onPress: () => mutateAsync(params.id),
        },
      ],
      {
        userInterfaceStyle: "dark",
        cancelable: true,
      }
    );

  return (
    <View style={[styles.container, { flex: 1 }]}>
      <Header
        middle={params.title}
        left={
          <ChevronLeft
            color={Theme.colors.white}
            onPress={() => router.replace("/(app)/transactions")}
          />
        }
      />
      <ScrollView>
        <View
          style={{
            borderRadius: 1000,
            backgroundColor: Theme.colors.bgSecondary,
            margin: "auto",
            width: 100,
            height: 100,
          }}
        >
          <Text
            style={[
              styles.text,
              {
                textAlign: "center",
                margin: "auto",
                fontWeight: 600,
                fontSize: 2 * Theme.typography.xl,
              },
            ]}
          >
            {params.title.slice(0, 1)}
          </Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: 40,
          }}
        >
          <Text style={[styles.text, { color: Theme.colors.secondary }]}>
            Valor
          </Text>
          <Text style={[styles.text]}>
            {Number(params.valueBrl).toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </Text>
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: 40,
          }}
        >
          <Text style={[styles.text, { color: Theme.colors.secondary }]}>
            Tipo
          </Text>
          <Text style={[styles.text]}>
            {TransactionType[Number(params.type)] == "EXPENSE"
              ? "Despesa"
              : "Receita"}
          </Text>
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: 40,
          }}
        >
          <Text style={[styles.text, { color: Theme.colors.secondary }]}>
            Data
          </Text>
          <Text style={[styles.text]}>
            {new Date(params.occurredAt).toLocaleDateString("pt-BR", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: 40,
          }}
        >
          <Text style={[styles.text, { color: Theme.colors.secondary }]}>
            Categoria
          </Text>
          <View style={[styles.chipButton, {paddingHorizontal: 20}]}>
            <Text style={[styles.text, { fontSize: Theme.typography.sm, fontWeight: 600 }]}>
              {capitalize(params.labelTitle)}
            </Text>
          </View>
        </View>
      </ScrollView>
      <View
        style={[
          styles.footer,
          { display: "flex", flexDirection: "row", gap: 20 },
        ]}
      >
        <TouchableOpacity
          style={[styles.button, { flex: 1 }]}
          onPress={() =>
            router.push({
              pathname: "/(modals)/add-transaction-modal",
              params: { id: params.id },
            })
          }
        >
          <Text
            style={[
              styles.text,
              {
                textAlign: "center",
                fontWeight: 800,
                fontSize: Theme.typography.md,
              },
            ]}
          >
            Editar
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.outlineButton, { flex: 1, borderColor: "red" }]}
          onPress={confirmDelete}
        >
          <Text
            style={[
              styles.text,
              {
                textAlign: "center",
                fontWeight: 800,
                fontSize: Theme.typography.md,
                color: "red",
              },
            ]}
          >
            Apagar
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
