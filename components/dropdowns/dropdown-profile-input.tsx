import { Theme } from "@/constants/theme";
import { useSession } from "@/hooks/use-session";
import { Profile } from "@/models/profile";
import { getProfiles } from "@/services/profile";
import { styles } from "@/styling";
import { capitalize } from "@/utils/format";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Check } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import Loading from "../loading";
import ErrorScreen from "../error-screen";

interface Props {}

const DropdownProfileInput = ({}: Props) => {
  const queryClient = useQueryClient();
  const { profile, changeToDefaultProfile, changeProfile } = useSession();
  const [isFocus, setIsFocus] = useState(false);
  const { data, isLoading, error } = useQuery<Profile[]>({
    queryKey: ["profiles"],
    queryFn: () => getProfiles(),
  });

  useEffect(() => {
    if (!profile) changeToDefaultProfile();
  }, [profile]);

 if (isLoading) return <Loading />;
  if (error) return <ErrorScreen error={error} />;
  return (
    <View>
      <Dropdown
        style={[
          { width: 100 },
          isFocus && { borderColor: Theme.colors.primary },
        ]}
        placeholderStyle={[styleSheet.placeholderStyle]}
        selectedTextStyle={styleSheet.selectedTextStyle}
        inputSearchStyle={styleSheet.inputSearchStyle}
        itemTextStyle={styles.text}
        containerStyle={styleSheet.container}
        iconStyle={styleSheet.iconStyle}
        itemContainerStyle={{ backgroundColor: Theme.colors.background }}
        data={
          data?.map((d) => {
            return { ...d, title: capitalize(d.title) };
          }) ?? []
        }
        search
        mode="modal"
        maxHeight={300}
        labelField="title"
        valueField="id"
        placeholder={!isFocus ? "Selecione..." : "..."}
        searchPlaceholder="Buscar..."
        value={profile}
        renderItem={(item) => {
          const selected = profile?.id === item.id;
          return (
            <View
              style={[
                styleSheet.item,
                { display: "flex", flexDirection: "row", gap: 10 },
              ]}
            >
              {selected && (
                <Check
                  color={Theme.colors.primary}
                  size={16}
                  style={{ marginTop: 2 }}
                />
              )}
              <Text style={[styles.text, selected && styleSheet.selectedItem]}>
                {capitalize(item.title)}
              </Text>
            </View>
          );
        }}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          changeProfile({ id: item.id, title: item.title } as Profile);
          queryClient.resetQueries();
          setIsFocus(false);
        }}
      />
    </View>
  );
};

export default DropdownProfileInput;

const styleSheet = StyleSheet.create({
  container: {
    backgroundColor: Theme.colors.bgSecondary,
    bottom: 0,
    position: "absolute",
    width: "100%",
    height: 300,
    paddingInline: 20,
    borderWidth: 0,
    borderTopStartRadius: Theme.radius.xl,
    borderTopEndRadius: Theme.radius.xl,
    paddingTop: 20,
  },
  item: {
    backgroundColor: Theme.colors.bgSecondary,
    padding: 14,
  },
  selectedItem: {
    fontWeight: 600,
    color: Theme.colors.primary,
  },
  dropdown: {
    borderColor: Theme.colors.white,
    borderWidth: 0,
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
    marginLeft: 6,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    borderRadius: Theme.radius.lg,
    borderColor: Theme.colors.border,
    color: Theme.colors.white,
  },
});
