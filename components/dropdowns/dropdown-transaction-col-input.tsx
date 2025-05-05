import { transactionProps } from "@/app/(modals)/import-file-modal";
import { Theme } from "@/constants/theme";
import { Label } from "@/models/label";
import { styles } from "@/styling";
import { Tag } from "lucide-react-native";
import React, { useState } from "react";
import { StyleSheet, View, StyleProp, ViewStyle } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

interface Props {
  value?: string;
  onChange: (value: { prop: string; required: boolean }) => void;
  placeholder?: string;
  style?: StyleProp<ViewStyle>;
}

const DropdownTransactionColInput = ({
  value,
  onChange,
  placeholder,
  style,
}: Props) => {
  const [isFocus, setIsFocus] = useState(false);

  const placeholderText = placeholder ?? "Coluna...";
  return (
    <View style={{ flex: 1 }}>
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
        data={transactionProps ?? []}
        search
        maxHeight={300}
        labelField="prop"
        valueField="prop"
        placeholder={!isFocus ? placeholderText : "..."}
        searchPlaceholder="Buscar..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          onChange({ prop: item.prop, required: item.required });
          setIsFocus(false);
        }}
        renderLeftIcon={() => <Tag color={Theme.colors.secondary} size={18} />}
      />
    </View>
  );
};

export default DropdownTransactionColInput;

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
