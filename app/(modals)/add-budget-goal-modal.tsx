import Header from "@/components/header";
import { Theme } from "@/constants/theme";
import { styles } from "@/styling";
import { zodResolver } from "@hookform/resolvers/zod";
import { router, useLocalSearchParams } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Alert,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  AddBudgetGoalFormData,
  addBudgetGoalSchema,
} from "@/schemas/add-budget-goal-schema";
import {
  deleteBudgetGoal,
  getBudgetGoalById,
  postBudgetGoal,
  updateBudgetGoal,
} from "@/services/budgetGoals";
import { BudgetGoal, BudgetGoalType } from "@/models/budgetGoal";
import { Label } from "@/models/label";
import DropdownLabelInput from "@/components/dropdowns/dropdown-label-input";
import Toast from "react-native-toast-message";

type Params = {
  id: string;
  month: string;
  year: string;
  fromBudgetGoal: string;
};

export default function AddBudgetGoalModal() {
  const params: Params = useLocalSearchParams();
  console.log;
  const { data, isLoading, error } = useQuery<BudgetGoal>({
    queryKey: ["budgetGoal", params.id],
    queryFn: () => getBudgetGoalById(params.id),
    enabled: !!params.id,
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<AddBudgetGoalFormData>({
    resolver: zodResolver(addBudgetGoalSchema),
    defaultValues: {
      type: BudgetGoalType.CURRENCY,
    },
  });

  const selectedType = watch("type");
  useEffect(() => {
    if (data) {
      setValue("value", data.value.toLocaleString("pt-BR"));
      setValue("type", data.type);
      setValue("label", { id: data.label.id, title: data.label.title });
    }
  }, [data]);

  const { mutateAsync } = useMutation({
    mutationFn: (data: AddBudgetGoalFormData) => {
      return params.id
        ? updateBudgetGoal(params.id, data)
        : postBudgetGoal(data, Number(params.month), Number(params.year));
    },
    onSuccess: () => {
      router.replace("/(app)/goals");
    },
  });

  const { mutateAsync: deleteAsync } = useMutation({
    mutationFn: (budgetGoalId: string) => deleteBudgetGoal(budgetGoalId),
    onSuccess: () => {
      router.replace("/(app)/goals");
    },
    onError: (error: any) => {
      Toast.show({
        type: "error",
        text1: "Ops!",
        text2: error.response.data,
      });
    },
  });

  const onSubmit = async (data: AddBudgetGoalFormData) => {
    mutateAsync(data);
  };

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
          onPress: () => deleteAsync(params.id),
        },
      ],
      {
        userInterfaceStyle: "dark",
        cancelable: true,
      }
    );

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error loading transaction</Text>;
  return (
    <View style={[styles.container, { flex: 1 }]}>
      <Header
        middle="Adicionar"
        left={
          <TouchableOpacity onPress={() => router.replace("/(app)/goals")}>
            <ChevronLeft color={Theme.colors.white} />
          </TouchableOpacity>
        }
      />
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 28,
        }}
      >
        <Controller
          control={control}
          name="type"
          render={({ field: { onChange, value } }) => (
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 10,
                backgroundColor: Theme.colors.bgSecondary,
                padding: 8,
                borderRadius: Theme.radius.xl,
              }}
            >
              <Pressable
                onPress={() => onChange(BudgetGoalType.PERCENTAGE)}
                style={[
                  {
                    backgroundColor:
                      value == BudgetGoalType.PERCENTAGE
                        ? Theme.colors.primary
                        : Theme.colors.bgSecondary,
                    padding: 10,
                    flex: 1,
                    borderRadius: Theme.radius.lg,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.text,
                    {
                      textAlign: "center",
                      fontWeight:
                        value == BudgetGoalType.PERCENTAGE ? 800 : 400,
                    },
                  ]}
                >
                  Porcentagem
                </Text>
              </Pressable>
              <Pressable
                onPress={() => onChange(BudgetGoalType.CURRENCY)}
                style={[
                  {
                    backgroundColor:
                      value == BudgetGoalType.CURRENCY
                        ? Theme.colors.primary
                        : Theme.colors.bgSecondary,
                    padding: 10,
                    flex: 1,
                    borderRadius: Theme.radius.lg,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.text,
                    {
                      textAlign: "center",
                      fontWeight: value == BudgetGoalType.CURRENCY ? 800 : 400,
                    },
                  ]}
                >
                  Reais
                </Text>
              </Pressable>
            </View>
          )}
        />

        <Controller
          control={control}
          name="value"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[styles.input, errors.value && styles.errorInput]}
              placeholder={
                selectedType === BudgetGoalType.CURRENCY ? "R$0,00" : "0%"
              }
              autoCapitalize="none"
              keyboardType="number-pad"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholderTextColor={Theme.colors.secondary}
            />
          )}
        />

        <Controller
          control={control}
          name="label"
          render={({ field: { onChange, value } }) => (
            <View>
              <DropdownLabelInput
                style={{ height: 50 }}
                onChange={onChange}
                value={{ ...value, colorHex: "" }}
                month={Number(params.month)}
                year={Number(params.year)}
                fromBudgetGoal={
                  params.id ? false : Boolean(params.fromBudgetGoal)
                }
              />
              <Text
                style={[
                  styles.text,
                  {
                    color: Theme.colors.secondary,
                    fontSize: Theme.typography.sm,
                    marginTop: 60,
                  },
                ]}
              >
                Exibe apenas categorias não configuradas para este mês
              </Text>
            </View>
          )}
        />
      </View>
      <View
        style={[
          styles.footer,
          { display: "flex", flexDirection: "row", gap: 20 },
        ]}
      >
        <TouchableOpacity
          style={[styles.button, { flex: 1 }]}
          onPress={handleSubmit(onSubmit)}
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
            {params.id ? "Salvar" : "Criar"}
          </Text>
        </TouchableOpacity>
        {params.id && (
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
        )}
      </View>
    </View>
  );
}
