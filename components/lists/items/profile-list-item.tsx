import { Theme } from "@/constants/theme";
import { ProfileBalance } from "@/models/profileBalance";
import { styles } from "@/styling";
import { capitalize } from "@/utils/format";
import { Text, View } from "react-native";

interface Props {
  data: ProfileBalance;
}

export default function ProfileListItem({ data }: Props) {
  return (
    <View style={[styles.card, {marginRight: 10}]}>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          width: 124,
          gap: 4,
        }}
      >
        <Text style={[styles.text, { fontSize: Theme.typography.sm, color: Theme.colors.secondary }]}>
          {capitalize(data.profile.title)}
        </Text>
        <Text style={[styles.text, { fontSize: Theme.typography.lg, fontWeight: 600 }]}>
          {data.balance.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </Text>
      </View>
    </View>
  );
}
