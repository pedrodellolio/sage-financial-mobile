import { Theme } from "@/constants/theme";
import { View } from "react-native";

interface Props {
  progress: number;
}

const WARNING_PERCENT = 80;
const FULL_PERCENT = 100;

export default function ProgressBar({ progress }: Props) {
  let bgColor = Theme.colors.primary;
  if (progress >= WARNING_PERCENT) bgColor = "yellow";
  if (progress >= FULL_PERCENT) bgColor = "red";

  return (
    <View
      style={{
        width: "100%",
        height: 4,
        backgroundColor: Theme.colors.secondary,
      }}
    >
      <View
        style={{
          width: `${progress > 100 ? 100 : progress}%`,
          height: 4,
          backgroundColor: bgColor,
        }}
      ></View>
    </View>
  );
}
