import Header from "@/components/header";
import { Theme } from "@/constants/theme";
import {
  formatRecurrenceType,
  RecurrenceType,
  toRecurrenceType,
  Transaction,
  TransactionType,
} from "@/models/transaction";
import {
  AddTransactionFormData,
  addTransactionSchema,
} from "@/schemas/add-transaction-schema";
import { styles } from "@/styling";
import { compareDates, today, tomorrow } from "@/utils/date";
import { zodResolver } from "@hookform/resolvers/zod";
import { router, useLocalSearchParams } from "expo-router";
import { Calendar, ChevronDown, ChevronLeft } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Pressable,
  ScrollView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import ChipButton from "@/components/chip-button";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getTransactionById,
  postTransaction,
  updateTransaction,
} from "@/services/transactions";
import DropdownLabelInput from "@/components/dropdown-label-input";
import DropdownInput from "@/components/dropdown-input";
import { addDays, addMonths } from "date-fns";

type Params = {
  id: string;
  month: string;
  year: string;
};

export default function AddTransactionsModal() {
  const params: Params = useLocalSearchParams();
  const { data, isLoading, error } = useQuery<Transaction>({
    queryKey: ["transaction", params.id],
    queryFn: () => getTransactionById(params.id),
    enabled: !!params.id,
  });

  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const [isRecurrent, setIsRecurrent] = useState(false);
  const [isInstallment, setIsInstallment] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<AddTransactionFormData>({
    resolver: zodResolver(addTransactionSchema),
    defaultValues: {
      type: TransactionType.enum.EXPENSE,
      occurredAt: today,
    },
  });

  useEffect(() => {
    isRecurrent && setValue("frequency", RecurrenceType.enum.MONTHLY);
  }, [isRecurrent]);

  const occurredAt = watch("occurredAt");
  useEffect(() => {
    if (data) {
      setValue("title", data.title);
      setValue("occurredAt", new Date(data.occurredAt));
      setValue("valueBrl", data.valueBrl.toLocaleString("pt-BR"));
      setValue("type", data.type);
      setValue("label", data.label ?? undefined);
    }
  }, [data]);

  const { mutateAsync } = useMutation({
    mutationFn: (data: AddTransactionFormData) => {
      return params.id
        ? updateTransaction(params.id, data)
        : postTransaction(data);
    },
    onSuccess: () => {
      router.replace("/(app)/transactions");
    },
  });

  const onSubmit = async (data: AddTransactionFormData) => {
    mutateAsync(data);
  };

  const openDatePicker = (value: Date, onChange: (...event: any[]) => void) => {
    DateTimePickerAndroid.open({
      value,
      onChange: (event, selectedDate) => {
        if (event.type === "set" && selectedDate) {
          onChange(selectedDate);
        }
      },
      mode: "date",
      is24Hour: true,
    });
  };

  const calculateNextTransaction = (option: string) => {
    switch (option) {
      case RecurrenceType.enum.BIWEEKLY:
        return addDays(occurredAt, 14);
      case RecurrenceType.enum.MONTHLY:
        return addMonths(occurredAt, 1);
      case RecurrenceType.enum.WEEKLY:
        return addDays(occurredAt, 7);
      default:
        return occurredAt;
    }
  };

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error loading transaction</Text>;
  return (
    <View style={[styles.container, { flex: 1 }]}>
      <Header
        middle="Adicionar"
        left={
          <TouchableOpacity
            onPress={() => router.replace("/(app)/transactions")}
          >
            <ChevronLeft color={Theme.colors.white} />
          </TouchableOpacity>
        }
      />
      <ScrollView>
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
                  onPress={() => onChange(TransactionType.enum.EXPENSE)}
                  style={[
                    {
                      backgroundColor:
                        value == TransactionType.enum.EXPENSE
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
                          value == TransactionType.enum.EXPENSE ? 800 : 400,
                      },
                    ]}
                  >
                    Despesa
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => onChange(TransactionType.enum.INCOME)}
                  style={[
                    {
                      backgroundColor:
                        value == TransactionType.enum.INCOME
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
                          value == TransactionType.enum.INCOME ? 800 : 400,
                      },
                    ]}
                  >
                    Receita
                  </Text>
                </Pressable>
              </View>
            )}
          />

          <Controller
            control={control}
            name="occurredAt"
            render={({ field: { onChange, value } }) =>
              compareDates(value, today) || compareDates(value, tomorrow) ? (
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <ChipButton
                    onPress={() => {
                      onChange(today);
                    }}
                    title="Hoje"
                    buttonStyle={{
                      backgroundColor: compareDates(value, today)
                        ? Theme.colors.white
                        : Theme.colors.bgSecondary,
                    }}
                    textStyle={{
                      color: compareDates(value, today)
                        ? Theme.colors.black
                        : Theme.colors.white,
                    }}
                  />

                  <ChipButton
                    onPress={() => onChange(tomorrow)}
                    title="Amanhã"
                    buttonStyle={{
                      backgroundColor: compareDates(value, tomorrow)
                        ? Theme.colors.white
                        : Theme.colors.bgSecondary,
                    }}
                    textStyle={{
                      color: compareDates(value, tomorrow)
                        ? Theme.colors.black
                        : Theme.colors.white,
                    }}
                  />

                  <ChipButton
                    onPress={() => openDatePicker(value, onChange)}
                    title="Outra"
                  />
                </View>
              ) : (
                <Pressable
                  onPress={() => openDatePicker(value, onChange)}
                  style={[
                    styles.input,
                    {
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 20,
                    },
                  ]}
                >
                  <Calendar color={Theme.colors.secondary} size={18} />
                  <Text style={{ color: Theme.colors.white }}>
                    {value.toLocaleDateString("pt-BR")}
                  </Text>
                </Pressable>
              )
            }
          />

          <Controller
            control={control}
            name="title"
            render={({ field: { onChange, onBlur, value } }) => (
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                }}
              >
                {/* <Text className="text-gray-300">Email</Text> */}
                <TextInput
                  style={[styles.input, errors.title && styles.errorInput]}
                  placeholder="Título"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholderTextColor={Theme.colors.secondary}
                />
              </View>
            )}
          />
          {errors.title && <Text>{errors.title.message}</Text>}

          <Controller
            control={control}
            name="valueBrl"
            render={({ field: { onChange, onBlur, value } }) => (
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                }}
              >
                {/* <Text className="text-gray-300">Senha</Text> */}
                <TextInput
                  style={[styles.input, errors.valueBrl && styles.errorInput]}
                  placeholder="R$0,00"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholderTextColor={Theme.colors.secondary}
                />
              </View>
            )}
          />

          {errors.valueBrl && (
            <Text style={{ color: "red" }}>{errors.valueBrl.message}</Text>
          )}

          <Controller
            control={control}
            name="label"
            render={({ field: { onChange, value } }) => (
              <DropdownLabelInput
                onChange={onChange}
                value={value}
                month={Number(params.month)}
                year={Number(params.year)}
              />
            )}
          />

          <TouchableOpacity
            onPress={() => setShowAdvancedOptions((prevState) => !prevState)}
            style={[styles.row, { gap: 10 }]}
          >
            <Text style={styles.text}>Avançado</Text>
            <ChevronDown color={Theme.colors.white} size={18} />
          </TouchableOpacity>
          <View style={{ display: showAdvancedOptions ? "flex" : "none" }}>
            <View style={[styles.row, { justifyContent: "space-between" }]}>
              <Text style={styles.text}>Recorrente</Text>
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={isRecurrent ? Theme.colors.primary : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={setIsRecurrent}
                value={isRecurrent}
              />
            </View>

            <View
              style={[
                styles.row,
                {
                  justifyContent: "space-between",
                  alignItems: "center",
                  display: isRecurrent ? "flex" : "none",
                  marginTop: 14,
                  backgroundColor: Theme.colors.bgSecondary,
                  borderRadius: Theme.radius.lg,
                  padding: 20,
                },
              ]}
            >
              <Text style={[styles.text, { flex: 1, marginBottom: 28 }]}>
                Ocorre{" "}
              </Text>
              <Controller
                control={control}
                name="frequency"
                render={({ field: { onChange, value } }) => (
                  <View>
                    <DropdownInput
                      onChange={onChange}
                      value={value}
                      options={RecurrenceType.options.map((t, i) => {
                        return {
                          id: RecurrenceType.options.indexOf(t),
                          title: formatRecurrenceType(t),
                        };
                      })}
                      style={{ width: "100%", height: 48 }}
                    />
                    <Text
                      style={[
                        styles.text,
                        {
                          fontSize: Theme.typography.sm,
                          color: Theme.colors.secondary,
                          marginTop: 10,
                        },
                      ]}
                    >
                      Próxima cobrança será em{" "}
                      {calculateNextTransaction(value).toLocaleDateString(
                        "pt-BR"
                      )}
                    </Text>
                  </View>
                )}
              />
            </View>

            {/* <View style={[styles.row, { justifyContent: "space-between" }]}>
              <Text style={styles.text}>Parcelado</Text>
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={isRecurrent ? Theme.colors.primary : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={setIsRecurrent}
                value={isRecurrent}
              />
            </View> */}
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.button, { width: "100%" }]}
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
      </View>
    </View>
  );
}
