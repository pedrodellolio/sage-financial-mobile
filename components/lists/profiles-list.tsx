import React from "react";
import { FlatList, ScrollView, Text, View } from "react-native";
import { Profile } from "@/models/profile";
import ProfileListItem from "./items/profile-list-item";
import { useQuery } from "@tanstack/react-query";
import { currentMonth, currentYear } from "@/utils/date";
import { getProfilesBalance } from "@/services/profile";
import { ProfileBalance } from "@/models/profileBalance";
import { useSession } from "@/hooks/use-session";
import NoResultsText from "../no-results-text";
import Loading from "../loading";
import ErrorScreen from "../error-screen";

type Props = {};

export default function ProfilesList({}: Props) {
  const { user } = useSession();

  const { data, isLoading, error } = useQuery<ProfileBalance[]>({
    queryKey: ["profiles", currentMonth, currentYear, user?.id],
    queryFn: () => getProfilesBalance(currentMonth, currentYear, user?.id),
  });

 if (isLoading) return <Loading />;
  if (error) return <ErrorScreen error={error} />;

  if (data && data.length > 0)
    return (
      <FlatList
        style={{
          width: "100%",
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={(value) => (
          <ProfileListItem key={value.item.profile.id} data={value.item} />
        )}
      />
    );

  return <NoResultsText />;
}
