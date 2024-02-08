import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

type State = {
	user_id: number | null;
	loading: boolean;
};

type Actions = {
	login: (func: () => Promise<{ user_id: number; auth_token: string } | null>) => Promise<void>;
	logout: () => void;
	checkAuth: () => Promise<void>;
};

const AuthStore = create<State & Actions>((set) => ({
	user_id: null,
	loading: false,
	login: async (func) => {
		set(() => ({ loading: true }));
		const value = await func();

		if (value) {
			await AsyncStorage.setItem("user_id", value.user_id.toString());
			await AsyncStorage.setItem("user_token", value.auth_token.toString());
		}
		set(() => ({ user_id: (value || { user_id: null }).user_id, loading: false }));
	},
	logout: async () => {
		set(() => ({ user_id: null, loading: true }));
		await AsyncStorage.removeItem("user_id");
		set(() => ({ loading: false }));
	},
	checkAuth: async () => {
		set(() => ({ loading: true }));
		const value = await AsyncStorage.getItem("user_id");
		if (value) set(() => ({ user_id: parseInt(value), loading: false }));
		else set(() => ({ loading: false }));
	}
}));

export default AuthStore;
