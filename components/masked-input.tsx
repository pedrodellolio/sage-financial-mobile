import { Theme } from "@/constants/theme";
import { styles } from "@/styling";
import { Noop } from "react-hook-form";
import { StyleProp, TextInput, TextStyle } from "react-native";

interface Props {
  style: StyleProp<TextStyle>;
  placeholder?: string;
  onBlur: Noop;
  onChange: (...event: any[]) => void;
  value: string;
}

export const MaskedInput = ({
  style,
  placeholder,
  value,
  onBlur,
  onChange,
}: Props) => {
  console.log(value);
  const formatBRL = (raw: string) => {
    const number = Number(raw.replace(",", "."));
    return isNaN(number)
      ? "R$ 0,00"
      : number.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });
  };

  return (
    <TextInput
      value={formatBRL(value)}
      onChangeText={(text: string) => {
        const numericValue = text.replace(/\D/g, "");
        const valueInReais = (Number(numericValue) / 100).toFixed(2); // → "2500.00"
        onChange(valueInReais);
      }}
      keyboardType="numeric"
      onBlur={onBlur}
      placeholder={placeholder ?? "R$ 0,00"}
      placeholderTextColor={Theme.colors.secondary}
      style={[styles.input, style]}
    />
  );
};
