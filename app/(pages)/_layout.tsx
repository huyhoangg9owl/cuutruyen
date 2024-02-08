import { Tabs } from "expo-router";

import { TabBar } from "@/components/TabBar";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import Colors from "@/constants/Colors";

export default function TabLayout() {
	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: Colors.tint,
				headerShown: useClientOnlyValue(false, true),
				headerStyle: {
					backgroundColor: Colors.background
				},
				tabBarIconStyle: {
					fontSize: 20
				}
			}}
			tabBar={TabBar}
		>
			<Tabs.Screen
				name="auth"
				options={{
					title: "Đăng nhập",
					headerShown: false,
					tabBarStyle: {
						display: "none"
					},
					tabBarShowLabel: false
				}}
			/>
		</Tabs>
	);
}
