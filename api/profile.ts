import AsyncStorage from "@react-native-async-storage/async-storage";
import { ProfileQuery } from "./query";
import axios from "axios";

export async function PROFILE() {
	console.info("[api/auth/profile] ===> PROFILE <supabase>");

	const user_id = await AsyncStorage.getItem("user_id");
	if (!user_id) return null;
	const query = await ProfileQuery(parseInt(user_id));
	return query;
}

export async function NOTIFICATION() {
	console.info("[api/auth/notification] ===> NOTIFICATION <supabase>");
	const user_id = await AsyncStorage.getItem("user_id");
	const user_token = await AsyncStorage.getItem("user_token");
	if (!user_id) return null;
	return await axios
		.get(process.env.EXPO_PUBLIC_API_URI + "v2/notifications", {
			headers: {
				M4U_UID: user_id,
				M4U_TOKEN: user_token
			}
		})
		// FK API :)
		.then(({ data: { data } }) => data);
}
