import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/supabaseClient";
import { User } from "@supabase/supabase-js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "@/services/axios-config";
import { Profile } from "@/models/profile";

interface AuthContextProps {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  changeProfile: (profile: Profile) => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }
  return value;
}

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    };

    const getDefaultProfile = async () => {
      try {
        const response = await api.get<Profile>("profile/default");
        return response.data;
      } catch (error) {
        throw new Error("Failed to fetch profileId from API");
      }
    };

    const getProfile = async () => {
      let profileJson = await AsyncStorage.getItem("profile");
      if (!profileJson) profileJson = JSON.stringify(await getDefaultProfile());
      await changeProfile(JSON.parse(profileJson));
    };

    getProfile();
    getSession();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) =>
      setUser(session?.user ?? null)
    );

    return () => subscription.unsubscribe();
  }, []);

  const changeProfile = async (profile: Profile) => {
    await AsyncStorage.setItem("profile", JSON.stringify(profile));
    setProfile(profile);
    console.log(profile);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        changeProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
