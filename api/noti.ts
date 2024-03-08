import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export async function NOTIFICATION() {
	console.info("[api/noti] ===> NOTIFICATION <API>");
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
		.then(({ data: { data } }) => data);
}

export async function NOTIFICATION_COUNT() {
	const user_id = await AsyncStorage.getItem("user_id");
	const user_token = await AsyncStorage.getItem("user_token");
	if (!user_id) return null;
	return await axios
		.get(process.env.EXPO_PUBLIC_API_URI + "v2/notifications/unread_count", {
			headers: {
				M4U_UID: user_id,
				M4U_TOKEN: user_token
			}
		})
		.then(({ data: { data } }) => data);
}
