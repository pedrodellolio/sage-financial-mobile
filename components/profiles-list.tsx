import React from "react";
import { ScrollView, Text } from "react-native";
import { Profile } from "@/models/profile";
import ProfileListItem from "./profile-list-item";
import { useQuery } from "@tanstack/react-query";
import { currentMonth, currentYear } from "@/utils/date";
import { getProfilesBalance } from "@/services/profile";
import { ProfileBalance } from "@/models/profileBalance";

type Props = {};

export default function ProfilesList({}: Props) {
  const { data, isLoading, error } = useQuery<ProfileBalance[]>({
    queryKey: ["profiles", currentMonth, currentYear],
    queryFn: () => getProfilesBalance(currentMonth, currentYear),
  });

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error loading goals</Text>;
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {data ? (
        data.map((d) => {
          return <ProfileListItem key={d.profile.id} data={d} />;
        })
      ) : (
        <Text>Sem resultados</Text>
      )}
    </ScrollView>
  );
}
