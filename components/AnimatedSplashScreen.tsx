import Colors from "@/constants/Colors";
import React from "react";
import { ActivityIndicator, Dimensions, Image } from "react-native";
import { MonoText, View } from "./Themed";

const { width: WIDTH } = Dimensions.get("screen");

export default function AnimatedSplashScreen() {
	return (
		<View className="flex h-full w-full flex-1 flex-col items-center justify-center align-middle">
			<Image
				source={require("@/assets/images/icon.png")}
				style={{
					width: WIDTH / 1.5,
					height: WIDTH / 1.5,
					resizeMode: "contain",
					borderRadius: 9999
				}}
				className="mb-4"
			/>
			<ActivityIndicator size="large" color={Colors.text} />
			<MonoText className="mt-4">Đang tải dữ liệu...</MonoText>
		</View>
	);
}
