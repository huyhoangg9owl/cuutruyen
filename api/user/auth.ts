import { supabase } from "@/utils/database";
import axios from "axios";
import { getExpoPushTokenAsync } from "expo-notifications";
import Constants from "expo-constants";

export async function LOGIN(username: string, password: string) {
	const config = {
		credentials: "include",
		headers: {
			Accept: "application/json",
			"Accept-Language": "en-US,en;q=0.5",
			"Content-Type": "application/json"
		}
	};
	console.info("[api/user/auth/login] ===>", process.env.EXPO_PUBLIC_API_URI + "v1/login");

	const _LOGIN: any = await new Promise((res) => {
		axios
			.post(
				process.env.EXPO_PUBLIC_API_URI + "v1/login",
				{
					username,
					password
				},
				config
			)
			.then((resp) => res(resp))
			.catch((err) => res({ data: err.response.data, status: "422" }));
	});

	const { data: checkLogin, status } = _LOGIN;

	if (checkLogin && status === "422") return { data: checkLogin, status };

	const raw_token = await getExpoPushTokenAsync({
		// @ts-ignore
		projectId: Constants.expoConfig.extra.eas.projectId
	});

	const token = raw_token.data.replace("ExponentPushToken[", "").replace("]", "");

	const { data: checkProfileExist } = await supabase
		.from("profile")
		.select("*")
		.eq("_id", checkLogin.user_id)
		.single();

	if (!checkProfileExist) {
		const {
			data: { data }
		} = await axios.get(process.env.EXPO_PUBLIC_API_URI + "v1/users/" + checkLogin.user_id, config);

		await supabase.from("profile").insert([
			{
				_id: data.id,
				name: data.attributes.username,
				noti_token: token,
				created_at: data.attributes.created_at,
				updated_at: data.attributes.updated_at
			}
		]);
		await supabase.from("avatar").insert([
			{
				profile_id: data.id
			}
		]);
		await supabase.from("badge").insert([
			{
				profile_id: data.id,
				badge_id: 3
			}
		]);
		await supabase.from("rank").insert([{ profile_id: data.id, rank_id: 3 }]);
	}

	return { data: checkLogin, status };
}
