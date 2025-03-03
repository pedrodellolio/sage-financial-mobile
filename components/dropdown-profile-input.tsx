import { Theme } from "@/constants/theme";
import { useSession } from "@/hooks/use-session";
import { Profile } from "@/models/profile";
import { getProfiles } from "@/services/profile";
import { styles } from "@/styling";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Tag, Users } from "lucide-react-native";
import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

interface Props {}

const DropdownProfileInput = ({}: Props) => {
  const queryClient = useQueryClient();
  const { profile, changeProfile } = useSession();
  const [isFocus, setIsFocus] = useState(false);
  const { data, isLoading, error } = useQuery<Profile[]>({
    queryKey: ["profiles"],
    queryFn: () => getProfiles(),
  });

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error loading profiles</Text>;
  return (
    <View>
      <Dropdown
        style={[
          styles.input,
          { paddingTop: 8, paddingBottom: 8 },
          isFocus && { borderColor: Theme.colors.primary },
        ]}
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
        placeholder={!isFocus ? "Selecione..." : "..."}
        searchPlaceholder="Buscar..."
        value={profile}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          changeProfile({ id: item.id, title: item.title } as Profile);
          queryClient.resetQueries();
          setIsFocus(false);
        }}
        renderLeftIcon={() => (
          <Users color={Theme.colors.secondary} size={18} />
        )}
      />
    </View>
  );
};

export default DropdownProfileInput;

const styleSheet = StyleSheet.create({
  container: {
    backgroundColor: Theme.colors.background,
  },
  dropdown: {
    borderColor: Theme.colors.white,
    borderWidth: 1,
    borderRadius: Theme.radius.lg,
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
