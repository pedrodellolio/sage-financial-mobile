import { Theme } from "@/constants/theme";
import { styles } from "@/styling";
import { Text, View } from "react-native";
import { Label } from "@/models/label";
import { capitalize } from "@/utils/format";

interface Props {
  data: Label;
}

export default function LabelItem({ data }: Props) {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 18,
        backgroundColor: Theme.colors.bgSecondary,
        borderRadius: Theme.radius.lg,
        padding: 18,
        paddingInline: 18,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: 16,
        }}
      >
        <View
          style={{
            backgroundColor: data.colorHex,
            width: 20,
            height: 20,
            borderRadius: Theme.radius.lg,
          }}
        ></View>
        <Text style={[styles.text, { fontSize: Theme.typography.sm }]}>
          {capitalize(data.title)}
        </Text>
      </View>
    </View>
  );
}
