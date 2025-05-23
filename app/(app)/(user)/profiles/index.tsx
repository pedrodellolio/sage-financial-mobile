import ErrorScreen from "@/components/error-screen";
import Header from "@/components/header";
import ProfileItem from "@/components/lists/items/profile-item";
import Loading from "@/components/loading";
import NoResultsText from "@/components/no-results-text";
import { Theme } from "@/constants/theme";
import { Profile } from "@/models/profile";
import { getProfiles } from "@/services/profile";
import { styles } from "@/styling";
import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import { ChevronLeft, Plus } from "lucide-react-native";
import { FlatList, TouchableOpacity, View } from "react-native";

export default function ProfilesScreen() {

  const { data, isLoading, error } = useQuery<Profile[]>({
    queryKey: ["profiles"],
    queryFn: () => getProfiles(),
  });

  if (isLoading) return <Loading />;
  if (error) return <ErrorScreen error={error} />;
  return (
    <View style={[styles.container]}>
      <Header
        middle={"Perfis"}
        left={
          <TouchableOpacity onPress={() => router.back()}>
            <ChevronLeft color={Theme.colors.white} />
          </TouchableOpacity>
        }
        right={
          <TouchableOpacity
            onPress={() => router.push("/(modals)/add-profile-modal")}
          >
            <Plus color={Theme.colors.white} />
          </TouchableOpacity>
        }
      />

      {data && data.length > 0 ? (
        <FlatList
          style={{
            width: "100%",
          }}
          showsHorizontalScrollIndicator={false}
          data={data}
          renderItem={(value) => (
            <TouchableOpacity
              key={value.item.id}
              style={{ marginBottom: 12 }}
              onPress={() =>
                router.push({
                  pathname: "/(modals)/add-profile-modal",
                  params: {
                    id: value.item.id,
                  },
                })
              }
            >
              <ProfileItem data={value.item} />
            </TouchableOpacity>
          )}
        />
      ) : (
        <NoResultsText />
      )}
    </View>
  );
}
