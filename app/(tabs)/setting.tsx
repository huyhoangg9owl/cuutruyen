import MusicSetting from "@/components/Setting/Music";
import UIProviders from "@/components/UIProviders";
import AuthStore from "@/store/Auth";
import { Redirect } from "expo-router";
import { Button } from "react-native";

export default function SettingScreen() {
	const { logout, user_id } = AuthStore();
	if (!user_id) return <Redirect href="/auth" />;
	return (
		<UIProviders className="p-4">
			<MusicSetting />
			<Button title="Đăng xuất" onPress={logout} color="coral" />
		</UIProviders>
	);
}
