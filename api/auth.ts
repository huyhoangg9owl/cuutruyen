import axios from "axios";

export async function LOGIN(username: string, password: string) {
	console.info("[api/auth/login] ===>", process.env.EXPO_PUBLIC_API_URI + "v1/login");
	const { data, status } = await axios
		.post(process.env.EXPO_PUBLIC_API_URI + "v1/login", {
			username,
			password
		})
		.then((res) => res)
		.catch((err) => err.response);
	return { data, status };
}
