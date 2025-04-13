import DropdownLabelInput from "@/components/dropdowns/dropdown-label-input";
import Header from "@/components/header";
import TransactionsList from "@/components/lists/transactions-list";
import MonthSummaryCard from "@/components/month-summary-card";
import RecalculateWalletButton from "@/components/recalculate-wallet-button";
import TypeGroupButton from "@/components/type-group-button";
import { MONTHS } from "@/constants/months";
import { Theme } from "@/constants/theme";
import { TransactionType } from "@/models/transaction";
import { AddTransactionFormData } from "@/schemas/add-transaction-schema";
import {
  FilterTransactionFormData,
  filterTransactionSchema,
} from "@/schemas/filter-transaction-schema";
import { getTransactionsByMonthAndYear } from "@/services/transactions";
import { styles } from "@/styling";
import {
  currentMonth,
  currentYear,
  getFirstDayOfMonth,
  getLastDayOfMonth,
} from "@/utils/date";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { zodResolver } from "@hookform/resolvers/zod";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Search,
  ArrowUpAZ,
} from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Switch, Text, TextInput, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function TransactionsScreen() {
  const [searchValue, setSearchValue] = useState("");
  const [selectedMonth, setSelectedMonth] = useState<number>(currentMonth - 1);
  const [selectedYear, setSelectedYear] = useState<number>(currentYear);
  const [validatedFilters, setValidatedFilters] =
    useState<FilterTransactionFormData | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const searchRef = useRef<TextInput | null>(null);
  const queryClient = useQueryClient();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FilterTransactionFormData>({
    resolver: zodResolver(filterTransactionSchema),
    defaultValues: {
      isInstallment: false,
      isRecurrent: false,
    },
  });

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = ["25%", "50%", "90%"];

  const openBottomSheet = () => {
    bottomSheetModalRef.current?.present();
  };

  const closeBottomSheet = () => {
    bottomSheetModalRef.current?.dismiss();
  };

  const handlePreviousMonth = () => {
    queryClient.invalidateQueries({ queryKey: ["summary"] });
    setSelectedMonth((prevMonth) => {
      if (prevMonth === 0) {
        setSelectedYear((prevYear) => prevYear - 1);
        return 11; // December
      }
      return prevMonth - 1;
    });
  };

  const handleNextMonth = () => {
    queryClient.invalidateQueries({ queryKey: ["summary"] });
    setSelectedMonth((prevMonth) => {
      if (prevMonth === 11) {
        setSelectedYear((prevYear) => prevYear + 1);
        return 0; // January
      }
      return prevMonth + 1;
    });
  };

  const handleSearch = () => {
    setIsSearching(true);
  };

  // const openDatePicker = (value: Date, onChange: (...event: any[]) => void) => {
  //   DateTimePickerAndroid.open({
  //     value,
  //     onChange: (event, selectedDate) => {
  //       if (event.type === "set" && selectedDate) {
  //         onChange(selectedDate);
  //       }
  //     },
  //     mode: "date",
  //     is24Hour: true,
  //   });
  // };

  const onSubmit = (data: FilterTransactionFormData) => {
    queryClient.invalidateQueries({ queryKey: ["transactions"] });
    setValidatedFilters(data);
    closeBottomSheet();
  };

  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <View style={[styles.container, { gap: 24 }]}>
          <Header
            middle={
              <>
                <TouchableOpacity onPress={handlePreviousMonth}>
                  <ChevronLeft color={Theme.colors.white} />
                </TouchableOpacity>
                <TouchableOpacity
                // onPress={() => openDatePicker(new Date(), setDate)}
                >
                  <Text style={styles.headerText}>
                    {MONTHS[selectedMonth].short} {selectedYear}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleNextMonth}>
                  <ChevronRight color={Theme.colors.white} />
                </TouchableOpacity>
              </>
            }
            left={
              <RecalculateWalletButton
                month={selectedMonth + 1}
                year={selectedYear}
              />
            }
            right={
              <TouchableOpacity
                onPress={() =>
                  router.push({
                    pathname: "/(modals)/add-transaction-modal",
                  })
                }
              >
                <Plus color={Theme.colors.white} />
              </TouchableOpacity>
            }
          />

          <MonthSummaryCard month={selectedMonth + 1} year={selectedYear} />

          <View style={{ display: "flex", flexDirection: "row", gap: 8 }}>
            {isSearching ? (
              <TextInput
                autoFocus={isSearching}
                onBlur={(e) => e.preventDefault()}
                onChangeText={setSearchValue}
                onEndEditing={(e) => {
                  if (e.nativeEvent.text === "") {
                    setIsSearching(false);
                    queryClient.invalidateQueries({
                      queryKey: ["transactions"],
                    });
                  }
                }}
                ref={searchRef}
                editable={isSearching}
                style={[
                  styles.input,
                  { flex: 1, borderColor: Theme.colors.bgSecondary },
                ]}
              />
            ) : (
              <TouchableOpacity
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  borderWidth: 1,
                  borderColor: Theme.colors.bgSecondary,
                  padding: 14,
                  gap: 10,
                  borderRadius: Theme.radius.xl,
                }}
                onPress={handleSearch}
              >
                <Search color={Theme.colors.secondary} size={18} />
                <Text style={[styles.text, { color: Theme.colors.secondary }]}>
                  Buscar
                </Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={{
                flex: isSearching ? undefined : 1,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                borderWidth: 1,
                borderColor: Theme.colors.bgSecondary,
                padding: 14,
                gap: 10,
                borderRadius: Theme.radius.xl,
              }}
              onPress={openBottomSheet}
            >
              <ArrowUpAZ color={Theme.colors.secondary} size={18} />
              {!isSearching && (
                <Text style={[styles.text, { color: Theme.colors.secondary }]}>
                  Filtros
                </Text>
              )}
            </TouchableOpacity>
          </View>

          <TransactionsList
            month={selectedMonth + 1}
            year={selectedYear}
            searchValue={searchValue}
            filters={validatedFilters}
          />

          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={2}
            snapPoints={snapPoints}
            onDismiss={closeBottomSheet}
            backgroundStyle={{ backgroundColor: Theme.colors.background }}
            handleIndicatorStyle={{ backgroundColor: Theme.colors.secondary }}
          >
            <BottomSheetView
              style={{
                padding: 28,
                height: "100%",
              }}
            >
              <Text
                style={[
                  styles.text,
                  { fontWeight: 600, fontSize: Theme.typography["2xl"] },
                ]}
              >
                Filtros
              </Text>
              <View style={{ marginTop: 28, gap: 16 }}>
                <Controller
                  control={control}
                  name="isRecurrent"
                  render={({ field: { onChange, value } }) => (
                    <View
                      style={[styles.row, { justifyContent: "space-between" }]}
                    >
                      <Text style={styles.text}>Recorrente</Text>
                      <Switch
                        trackColor={{
                          false: Theme.colors.secondary,
                          true: Theme.colors.bgSecondary,
                        }}
                        thumbColor={value ? Theme.colors.primary : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={onChange}
                        value={value}
                      />
                    </View>
                  )}
                />

                <Controller
                  control={control}
                  name="isInstallment"
                  render={({ field: { onChange, value } }) => (
                    <View
                      style={[styles.row, { justifyContent: "space-between" }]}
                    >
                      <Text style={styles.text}>Parcelado</Text>
                      <Switch
                        trackColor={{
                          false: Theme.colors.secondary,
                          true: Theme.colors.bgSecondary,
                        }}
                        thumbColor={value ? Theme.colors.primary : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={onChange}
                        value={value}
                      />
                    </View>
                  )}
                />

                <Controller
                  control={control}
                  name="minValue"
                  render={({ field: { onChange, value } }) => (
                    <View
                      style={[styles.row, { justifyContent: "space-between" }]}
                    >
                      <Text style={[styles.text, { width: 120 }]}>
                        Valor Mínimo
                      </Text>
                      <TextInput
                        style={[styles.input, { flex: 1 }]}
                        placeholder="R$0,00"
                        keyboardType="numeric"
                        placeholderTextColor={Theme.colors.secondary}
                        value={value ? String(value) : ""}
                        onChangeText={onChange}
                      />
                    </View>
                  )}
                />

                <Controller
                  control={control}
                  name="maxValue"
                  render={({ field: { onChange, value } }) => (
                    <View
                      style={[styles.row, { justifyContent: "space-between" }]}
                    >
                      <Text style={[styles.text, { width: 120 }]}>
                        Valor Mínimo
                      </Text>
                      <TextInput
                        style={[styles.input, { flex: 1 }]}
                        placeholder="R$0,00"
                        keyboardType="numeric"
                        placeholderTextColor={Theme.colors.secondary}
                        value={value ? String(value) : ""}
                        onChangeText={onChange}
                      />
                    </View>
                  )}
                />

                {/* <Controller
                  control={control}
                  name="label"
                  render={({ field: { onChange, value } }) => (
                    <View
                      style={[
                        {
                          display: "flex",
                          flexDirection: "column",
                          gap: 10,
                        },
                      ]}
                    >
                      <Text style={[styles.text]}>Categorias</Text>
                      <DropdownLabelInput
                        placeholder="Categorias"
                        onChange={onChange}
                        value={value}
                        style={{ height: 48 }}
                      />
                    </View>
                  )}
                /> */}

                {/* <Controller
                  control={control}
                  name="type"
                  render={({ field: { onChange, value } }) => (
                    <TypeGroupButton onChange={onChange} value={value} />
                  )}
                /> */}

                {/* <View style={[styles.row, { justifyContent: "space-between" }]}>
                  <Text style={[styles.text, { width: 120 }]}>
                    Data Inicial
                  </Text>
                  <TouchableOpacity
                    style={[styles.input, { flex: 1 }]}
                    onPress={() => openDatePicker(minDate, setMinDate)}
                  >
                    <Text style={styles.text}>
                      {minDate.toLocaleDateString("pt-BR")}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={[styles.row, { justifyContent: "space-between" }]}>
                  <Text style={[styles.text, { width: 120 }]}>Data Final</Text>
                  <TouchableOpacity
                    style={[styles.input, { flex: 1 }]}
                    onPress={() => openDatePicker(maxDate, setMaxDate)}
                  >
                    <Text style={styles.text}>
                      {maxDate.toLocaleDateString("pt-BR")}
                    </Text>
                  </TouchableOpacity>
                </View> */}
              </View>
              <TouchableOpacity
                style={[
                  styles.button,
                  {
                    alignSelf: "center",
                    width: "100%",
                    bottom: 0,
                    position: "absolute",
                    marginBottom: 20,
                  },
                ]}
                onPress={handleSubmit(onSubmit)}
              >
                <Text
                  style={[
                    styles.text,
                    {
                      textAlign: "center",
                      fontWeight: "800",
                      fontSize: Theme.typography.md,
                    },
                  ]}
                >
                  Filtrar
                </Text>
              </TouchableOpacity>
            </BottomSheetView>
          </BottomSheetModal>
        </View>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
