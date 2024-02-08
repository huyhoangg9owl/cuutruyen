import { Link, Tabs } from "expo-router";
import { Pressable } from "react-native";

import { BellIcon, GearIcon, HomeIcon, OpenBookIcon, SearchIcon, UserIcon } from "@/components/CustomIcons";
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
				name="search"
				options={{
					title: "Tìm kiếm",
					tabBarIcon: ({ size, color }) => <SearchIcon fontSize={size} fill={color} />
				}}
			/>
			<Tabs.Screen
				name="history"
				options={{
					title: "Lịch sử",
					tabBarIcon: ({ size, color }) => <OpenBookIcon fontSize={size} fill={color} />
				}}
			/>
			<Tabs.Screen
				name="index"
				options={{
					title: "Trang Chủ",
					tabBarIcon: ({ size, color }) => <HomeIcon fontSize={size} fill={color} />,
					headerRight: () => (
						<Link href="/modal" asChild>
							<Pressable>
								{({ pressed }) => (
									<BellIcon
										fontSize={20}
										fill={Colors.tabIconDefault}
										style={{
											marginRight: 15,
											opacity: pressed ? 0.5 : 1
										}}
									/>
								)}
							</Pressable>
						</Link>
					)
				}}
			/>
			<Tabs.Screen
				name="account"
				options={{
					title: "Tài khoản",
					unmountOnBlur: true,
					tabBarIcon: ({ size, color }) => <UserIcon fontSize={size} fill={color} />
				}}
			/>
			<Tabs.Screen
				name="setting"
				options={{
					title: "Cài đặt",
					tabBarIcon: ({ size, color }) => <GearIcon fontSize={size} fill={color} />
				}}
			/>
		</Tabs>
	);
}
