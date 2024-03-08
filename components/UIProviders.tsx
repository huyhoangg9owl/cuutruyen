import { ReactNode, useCallback, useState } from "react";
import { Dimensions, RefreshControl, ScrollView } from "react-native";
import AnimatedSplashScreen from "./AnimatedSplashScreen";
import { View } from "./Themed";

const { height: HUI } = Dimensions.get("screen");

export default function UIProviders({
	children,
	loading = false,
	func,
	className = "",
	hasScrollView = true
}: {
	children: ReactNode;
	loading?: boolean;
	func?: () => Promise<any>;
	className?: string;
	hasScrollView?: boolean;
}) {
	const [refreshing, setRefreshing] = useState(false);
	const onRefresh = useCallback(async () => {
		console.info("Start refreshing");

		setRefreshing(true);
		if (!func) setRefreshing(false);
		else {
			try {
				await func();
			} catch (error) {
				console.error("Failed to fetch");
			}
		}
		setRefreshing(false);
		console.info("End refreshing");
	}, []);

	if (loading || refreshing) return <AnimatedSplashScreen />;

	if (!hasScrollView)
		return (
			<View className={"min-h-full w-full" + className} style={{ flex: 1 }}>
				{children}
			</View>
		);

	return (
		<ScrollView
			automaticallyAdjustKeyboardInsets
			contentInsetAdjustmentBehavior="automatic"
			className="min-h-full w-full"
			showsHorizontalScrollIndicator={false}
			showsVerticalScrollIndicator={false}
			refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
		>
			<View className={className} style={{ flex: 1, minHeight: HUI }}>
				{children}
			</View>
		</ScrollView>
	);
}
