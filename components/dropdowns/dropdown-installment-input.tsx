import { Theme } from "@/constants/theme";
import { Label } from "@/models/label";
import {
  RecurrenceOptions,
  RecurrenceType,
  toRecurrenceType,
} from "@/models/transaction";
import { styles } from "@/styling";
import { Clock } from "lucide-react-native";
import React, { useState } from "react";
import { StyleSheet, View, StyleProp, ViewStyle } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

interface Props {
  options: { title: string; id: number }[];
  value?: RecurrenceType;
  onChange: (value: string) => void;
  style?: StyleProp<ViewStyle>;
}

const DropdownInstallmentInput = ({ options, value, onChange, style }: Props) => {
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View>
      <Dropdown
        style={[
          styles.input,
          isFocus && { borderColor: Theme.colors.primary },
          style,
        ]}
        activeColor={Theme.colors.bgSecondary}
        placeholderStyle={[styleSheet.placeholderStyle]}
        selectedTextStyle={styleSheet.selectedTextStyle}
        inputSearchStyle={styleSheet.inputSearchStyle}
        itemTextStyle={styles.text}
        containerStyle={styleSheet.container}
        iconStyle={styleSheet.iconStyle}
        data={options}
        maxHeight={300}
        labelField="title"
        valueField="id"
        placeholder={!isFocus ? "Selecione..." : "..."}
        searchPlaceholder="Buscar..."
        value={{
          id: value,
          title: value,
        }}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          onChange(RecurrenceType[item.title]);
          setIsFocus(false);
        }}
        renderLeftIcon={() => (
          <Clock color={Theme.colors.secondary} size={18} />
        )}
      />
    </View>
  );
};

export default DropdownInstallmentInput;

const styleSheet = StyleSheet.create({
  container: {
    backgroundColor: Theme.colors.background,
  },
  dropdown: {
    height: 50,
    borderColor: Theme.colors.border,
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    color: Theme.colors.secondary,
    paddingLeft: 18,
    fontSize: Theme.typography.sm,
  },
  selectedTextStyle: {
    color: Theme.colors.white,
    paddingLeft: 18,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    borderRadius: Theme.radius.lg,
    borderColor: Theme.colors.border,
  },
});
