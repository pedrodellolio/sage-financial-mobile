import { Theme } from "@/constants/theme";
import { Label } from "@/models/label";
import { getLabels } from "@/services/label";
import { styles } from "@/styling";
import { useQuery } from "@tanstack/react-query";
import { Tag } from "lucide-react-native";
import React, { useState } from "react";
import { StyleSheet, View, Text, StyleProp, ViewStyle } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import Loading from "../loading";
import ErrorScreen from "../error-screen";

interface Props {
  value?: Label;
  onChange: (value: Label) => void;
  month?: number;
  year?: number;
  fromBudgetGoal?: boolean;
  placeholder?: string;
  style?: StyleProp<ViewStyle>;
}

const DropdownLabelInput = ({
  value,
  onChange,
  month,
  year,
  fromBudgetGoal,
  placeholder,
  style,
}: Props) => {
  const [isFocus, setIsFocus] = useState(false);
  const { data, isLoading, error } = useQuery<Label[]>({
    queryKey: ["labels", fromBudgetGoal ?? false, month, year],
    queryFn: () => getLabels(fromBudgetGoal ?? false, month, year),
  });

  const placeholderText = placeholder ?? "Selecione uma categoria...";
 if (isLoading) return <Loading />;
  if (error) return <ErrorScreen error={error} />;
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
        data={data ?? []}
        search
        maxHeight={300}
        labelField="title"
        valueField="id"
        placeholder={!isFocus ? placeholderText : "..."}
        searchPlaceholder="Buscar..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          onChange({ id: item.id, title: item.title, colorHex: item.colorHex });
          setIsFocus(false);
        }}
        renderLeftIcon={() => <Tag color={Theme.colors.secondary} size={18} />}
      />
    </View>
  );
};

export default DropdownLabelInput;

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
