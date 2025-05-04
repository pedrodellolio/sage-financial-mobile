import { Theme } from "@/constants/theme";
import { styles } from "@/styling";
import { ChevronRight } from "lucide-react-native";
import {
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

interface Props {
  onPress: () => void;
}

export default function SeeMoreButton({onPress}: Props) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text
        style={[
          styles.text,
          {
            fontSize: Theme.typography.sm,
            fontWeight: 600,
            color: Theme.colors.secondary,
          },
        ]}
      >
        Ver tudo <ChevronRight color={Theme.colors.secondary} size={10} />
      </Text>
    </TouchableOpacity>
  );
}
