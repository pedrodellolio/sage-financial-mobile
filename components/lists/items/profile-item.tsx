import { Theme } from "@/constants/theme";
import { styles } from "@/styling";
import { Text, View } from "react-native";
import { Profile } from "@/models/profile";
import { capitalize } from "@/utils/format";

interface Props {
  data: Profile;
}

export default function ProfileItem({ data }: Props) {
  console.log(data);
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
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={[styles.text, { fontSize: Theme.typography.sm }]}>
          {capitalize(data.title)}
        </Text>
        {data.isDefault && (
          <View
            style={[
              styles.chipButton,
              {
                paddingHorizontal: 16,
                backgroundColor: Theme.colors.primary,
                padding: 4
              },
            ]}
          >
            <Text
              style={[
                styles.text,
                { fontSize: Theme.typography.sm, fontWeight: 600 },
              ]}
            >
              Padrão
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}
