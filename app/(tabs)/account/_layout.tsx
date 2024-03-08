import React from "react";
import { Stack } from "expo-router";

export default function Layout() {
	return (
		<Stack>
			<Stack.Screen
				name="index"
				options={{
					headerTitle: "Quay lại",
					headerShown: false
				}}
			/>
			<Stack.Screen
				name="badge/[id]"
				options={{
					presentation: "modal",
					title: "Huy hiệu",
					gestureEnabled: true
				}}
			/>
		</Stack>
	);
}
