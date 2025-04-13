import React, { useCallback, useMemo, useRef, useState } from "react";
import { View, Text, StyleSheet, Button, Switch } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { TransactionType } from "@/models/transaction";
import { Theme } from "@/constants/theme";
import { styles } from "@/styling";
import DropdownRecurrenceInput from "../dropdowns/dropdown-recurrence-input";

const TransactionsFilterBottomSheet = () => {
  const [isRecurrent, setIsRecurrent] = useState(false);
  const [isInstallment, setIsInstallment] = useState(false);
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(0);
  const [types, setTypes] = useState<TransactionType[]>([]);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = ["25%", "50%", "90%"];

  const openBottomSheet = () => {
    bottomSheetModalRef.current?.present();
  };

  const closeBottomSheet = () => {
    bottomSheetModalRef.current?.dismiss();
  };

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={0}
      snapPoints={snapPoints}
      onDismiss={closeBottomSheet}
      backgroundStyle={{ backgroundColor: Theme.colors.bgSecondary }}
      handleIndicatorStyle={{ backgroundColor: Theme.colors.secondary }}
    >
      <BottomSheetView style={{ padding: 28 }}>
        <Text
          style={[
            styles.text,
            { fontWeight: 600, fontSize: Theme.typography["2xl"] },
          ]}
        >
          Filtros
        </Text>
        <View>
          <View>
            <Text>Recorrente</Text>
            <Switch
              trackColor={{
                false: Theme.colors.secondary,
                true: Theme.colors.bgSecondary,
              }}
              thumbColor={isRecurrent ? Theme.colors.primary : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={setIsRecurrent}
              value={isRecurrent}
            />
          </View>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
};

export default TransactionsFilterBottomSheet;
