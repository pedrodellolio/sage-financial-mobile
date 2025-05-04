import { styles } from "@/styling";
import {
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

interface Props {
  title: string;
  onPress: () => void;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export default function ChipButton({
  title,
  onPress,
  buttonStyle,
  textStyle,
}: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.chipButton, { flex: 1 }, buttonStyle]}
    >
      <Text
        style={[
          styles.text,
          { textAlign: "center", fontWeight: 800 },
          textStyle,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}
