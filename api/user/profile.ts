import AsyncStorage from "@react-native-async-storage/async-storage";
import { ProfileQuery } from "../query";

export async function PROFILE(id?: string) {
	console.info("[api/user/auth/profile] ===> PROFILE <supabase>");

	let user_id = await AsyncStorage.getItem("user_id");
	if (id) user_id = id;

	if (!user_id) return null;
	const query = await ProfileQuery(parseInt(user_id));
	return query;
}
