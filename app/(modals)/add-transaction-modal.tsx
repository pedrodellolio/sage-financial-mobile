import Header from "@/components/header";
import { Theme } from "@/constants/theme";
import { TransactionType } from "@/models/transaction";
import {
  AddTransactionFormData,
  addTransactionSchema,
} from "@/schemas/add-transaction-schema";
import { styles } from "@/styling";
import { compareDates, today, tomorrow } from "@/utils/date";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, router } from "expo-router";
import { Calendar, ChevronLeft, ShoppingCart } from "lucide-react-native";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Button,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import DateTimePicker, {
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import ChipButton from "@/components/chip-button";
import DropdownInput from "@/components/dropdown-input";
import { useMutation } from "@tanstack/react-query";
import { postTransaction } from "@/services/transactions";

export default function AddTransactionsModal() {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting},
    getValues
  } = useForm<AddTransactionFormData>({
    resolver: zodResolver(addTransactionSchema),
    defaultValues: {
      type: TransactionType.EXPENSE,
      occurredAt: today,
    },
  });

  const { mutateAsync } = useMutation({
    mutationFn: (data: AddTransactionFormData) => postTransaction(data),
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

  return (
    <View style={[styles.container, { flex: 1 }]}>
      <Header
        title="Adicionar"
        leftIcon={
          <ChevronLeft
            color={Theme.colors.white}
            onPress={() => router.replace("/(app)/transactions")}
          />
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
                onPress={() => onChange(TransactionType.EXPENSE)}
                style={[
                  {
                    backgroundColor:
                      value == TransactionType.EXPENSE
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
                      fontWeight: value == TransactionType.EXPENSE ? 800 : 400,
                    },
                  ]}
                >
                  Despesa
                </Text>
              </Pressable>
              <Pressable
                onPress={() => onChange(TransactionType.INCOME)}
                style={[
                  {
                    backgroundColor:
                      value == TransactionType.INCOME
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
                      fontWeight: value == TransactionType.INCOME ? 800 : 400,
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
                  onPress={() => onChange(today)}
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
                autoCapitalize="none"
                keyboardType="email-address"
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

        {/* <Controller
          control={control}
          name="label"
          render={({ field: { onChange, value } }) => (
            <DropdownInput onChange={onChange} value={value} />
          )}
        /> */}
      </View>
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
            Criar Movimentação
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
