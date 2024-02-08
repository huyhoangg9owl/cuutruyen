import { Database } from "@/database.types";
import { createClient } from "@supabase/supabase-js";
import "react-native-url-polyfill/auto";

const supabaseUrl = process.env.EXPO_PUBLIC_DTB_URI;
const supabaseAnonKey = process.env.EXPO_PUBLIC_DTB_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
	throw new Error("Missing Supabase URL or Anon Key");
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
