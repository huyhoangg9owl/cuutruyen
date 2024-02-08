import MaskedView from "@react-native-masked-view/masked-view";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { LinearGradient } from "expo-linear-gradient";
import { ReactNode, useEffect } from "react";
import { Animated, View as RNView, TouchableOpacity } from "react-native";
import { View } from "./Themed";

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

function GradientButton({
	children,
	onPress,
	size = 20,
	focused
}: {
	children: ReactNode;
	onPress: () => void;
	size?: number;
	focused: boolean;
}) {
	const scaleValue = new Animated.Value(1);
	const colors = (haveColor: boolean) => (haveColor ? ["#FF6C65", "#FF29DD"] : ["#35383d", "#36393f"]);
	useEffect(() => {
		if (focused)
			Animated.sequence([
				Animated.timing(scaleValue, { toValue: 0.8, duration: 200, useNativeDriver: true }),
				Animated.timing(scaleValue, { toValue: 1.2, duration: 200, useNativeDriver: true })
			]).start();
		return () => {
			Animated.timing(scaleValue, { toValue: 1, duration: 200, useNativeDriver: true }).stop();
		};
	}, [focused]);
	return (
		<AnimatedTouchable
			onPress={onPress}
			className={`flex-col items-center justify-center align-middle ${!focused ? "bg-[rgba(0,0,0,0.05)]" : ""} rounded-lg p-2`}
			style={{
				transform: [{ scale: scaleValue }]
			}}
		>
			<MaskedView
				style={{
					height: size,
					width: size
				}}
				maskElement={<RNView className="flex-col items-center justify-center align-middle">{children}</RNView>}
			>
				<LinearGradient colors={colors(focused)} style={{ flex: 1, width: size, height: size }} />
			</MaskedView>
		</AnimatedTouchable>
	);
}

export const TabBar = (props: BottomTabBarProps) => {
	const { state, descriptors, navigation } = props;
	const tabBarStyle = descriptors[state.routes[state.index].key].options.tabBarStyle;
	if (tabBarStyle && (tabBarStyle as { display: string }).display === "none") return null;

	return (
		<View className="relative h-20 w-full flex-row items-center justify-evenly self-start border-t-[0.2px] border-t-[rgba(255,255,255,0.1)] border-opacity-10 align-middle">
			<RNView className="absolute right-0 top-0 h-full w-full flex-row bg-gray-800 opacity-20" />
			{state.routes.map((route, index) => {
				const { options } = descriptors[route.key];
				const isFocused = state.index === index;
				if (!options.tabBarIcon) return null;

				const onPress = () => {
					const event = navigation.emit({
						type: "tabPress",
						target: route.key,
						canPreventDefault: true
					});
					if (!isFocused && !event.defaultPrevented) {
						navigation.navigate(route.name);
					}
				};

				return (
					<GradientButton
						focused={isFocused}
						key={route.key}
						size={options.tabBarIconStyle ? (options.tabBarIconStyle as { fontSize: number }).fontSize : 20}
						onPress={onPress}
					>
						{options.tabBarIcon({
							focused: isFocused,
							color: options.tabBarIconStyle
								? (options.tabBarIconStyle as { color: string }).color
								: "#fff",
							size: options.tabBarIconStyle
								? (options.tabBarIconStyle as { fontSize: number }).fontSize
								: 20
						})}
					</GradientButton>
				);
			})}
		</View>
	);
};
