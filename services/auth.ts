import { supabase } from "@/supabaseClient";
import api from "./axios-config";

export const signInWithEmail = async (email: string, password: string) => {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error(error.message);
  }
};

export const signUpWithEmail = async (email: string, password: string) => {
  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) throw new Error(error.message);
    if (user) await api.post(`auth/register`, { email, userId: user.id });
  } catch (err) {
    console.error(err);
  }
};

export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);
  } catch (err) {
    console.error(err);
  }
};
