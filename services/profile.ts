import { AddProfileFormData } from "@/schemas/add-profile-schema";
import api from "./axios-config";
import { Profile } from "@/models/profile";
import { ProfileBalance } from "@/models/profileBalance";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface AddProfileDto {
  title: string;
}

export async function getProfiles(): Promise<Profile[]> {
  try {
    const response = await api.get<Profile[]>(`profile/all`);
    return response.data;
  } catch (error) {
    console.error("Error fetching profiles:", error);
    throw error;
  }
}

export async function getProfilesBalance(month: number, year: number) {
  try {
    const response = await api.get<ProfileBalance[]>(
      `profile/all-profile-balance`,
      { params: { month, year } }
    );
    const profileJson = await AsyncStorage.getItem("profile");
    const profile = profileJson && JSON.parse(profileJson);
    return response.data.filter(i => i.profile.id !== profile.id);
  } catch (error) {
    console.error("Error fetching profiles:", error);
    throw error;
  }
}

export async function getProfileById(profileId: string) {
  try {
    const response = await api.get<Profile>(`profile/${profileId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }
}

export async function postProfile(profile: AddProfileFormData) {
  try {
    return await api.post<Profile>(`profile`, profile);
  } catch (error) {
    console.error("Error creating profiles:", error);
    throw error;
  }
}

export async function deleteProfile(profileId: string) {
  try {
    return await api.delete<Profile>(`profile/${profileId}`);
  } catch (error) {
    console.error("Error deleting profile:", error);
    throw error;
  }
}

export async function updateProfile(
  profileId: string,
  profile: AddProfileFormData
) {
  try {
    return await api.put<Profile>(`profile`, {
      id: profileId,
      title: profile.title,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
}
