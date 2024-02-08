import { TouchableOpacity } from "react-native";

import { Text } from "@/components/Themed";
import UIProviders from "@/components/UIProviders";
import AuthStore from "@/store/Auth";

export default function HomeScreen() {
	const { logout } = AuthStore();

	return (
		<UIProviders>
			<TouchableOpacity
				onPress={logout}
				// className="self-start rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
			>
				<Text>Refetch</Text>
			</TouchableOpacity>
		</UIProviders>
	);
}
