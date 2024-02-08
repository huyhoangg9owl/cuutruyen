import { ReactNode, useCallback, useState } from "react";
import { RefreshControl, ScrollView } from "react-native";
import AnimatedSplashScreen from "./AnimatedSplashScreen";
import { View } from "./Themed";

export default function UIProviders({
	children,
	loading = false,
	func,
	className = "",
	hasscrollView = true
}: {
	children: ReactNode;
	loading?: boolean;
	func?: () => Promise<any>;
	className?: string;
	hasscrollView?: boolean;
}) {
	const [refreshing, setRefreshing] = useState(false);
	const onRefresh = useCallback(() => {
		setRefreshing(true);
		if (!func) return setRefreshing(false);
		func()
			.then(() => setRefreshing(false))
			.catch(() => {
				setRefreshing(false);
				throw new Error("Failed to fetch");
			});
	}, []);

	if (loading || refreshing) return <AnimatedSplashScreen />;

	if (!hasscrollView) return <View className={className}>{children}</View>;

	return (
		<ScrollView
			automaticallyAdjustKeyboardInsets
			contentInsetAdjustmentBehavior="automatic"
			className="min-h-full w-full"
			style={{ flex: 1 }}
			refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
		>
			<View className={className} style={{ flex: 1, minHeight: "100%" }}>
				{children}
			</View>
		</ScrollView>
	);
}
