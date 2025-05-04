import axios from "axios";
import { supabase } from "@/supabaseClient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Profile } from "@/models/profile";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor: attach access token if available.
api.interceptors.request.use(
  async (config) => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (session)
      config.headers["Authorization"] = `Bearer ${session.access_token}`;
    const profileJson = await AsyncStorage.getItem(
      `profile:${session?.user.id}`
    );
    if (profileJson) {
      config.headers["X-Profile-Id"] = (JSON.parse(profileJson) as Profile).id;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// api.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     // console.log(JSON.stringify(error));

//     return Promise.reject(error.message);
//   }
// );
export default api;
