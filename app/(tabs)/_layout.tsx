import { NOTIFICATION_COUNT } from "@/api/noti";
import { BellIcon, GearIcon, HomeIcon, OpenBookIcon, SearchIcon, UserIcon } from "@/components/CustomIcons";
import { TabBar } from "@/components/TabBar";
import { View } from "@/components/Themed";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import Colors from "@/constants/Colors";
import { useQuery } from "@tanstack/react-query";
import { Link, Tabs } from "expo-router";
import { Pressable } from "react-native";

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
						<Link href="/notifications" asChild>
							<Pressable>
								{({ pressed }) => {
									const { data } = useQuery({
										queryKey: ["notification_count"],
										queryFn: NOTIFICATION_COUNT,
										refetchInterval: 1000
									});

									return (
										<View className="relative mr-4">
											<BellIcon
												fontSize={20}
												fill={Colors.tabIconDefault}
												style={{
													opacity: pressed ? 0.5 : 1
												}}
											/>
											{data && (
												<View className="absolute bottom-1/2 left-1/2 h-3 w-3 rounded-full !bg-red-300 text-xs" />
											)}
										</View>
									);
								}}
							</Pressable>
						</Link>
					)
				}}
			/>
			<Tabs.Screen
				name="setting"
				options={{
					title: "Cài đặt",
					tabBarIcon: ({ size, color }) => <GearIcon fontSize={size} fill={color} />
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
		</Tabs>
	);
}
