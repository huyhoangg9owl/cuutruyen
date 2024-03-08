import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import Colors from "@/constants/Colors";
import { Stack } from "expo-router";

export const unstable_settings = {
	initialRouteName: "index"
};

export default function TabLayout() {
	return (
		<Stack
			screenOptions={{
				headerShown: useClientOnlyValue(false, true),
				headerStyle: {
					backgroundColor: Colors.background
				}
			}}
		>
			<Stack.Screen
				name="[id]"
				options={{
					title: "Tag"
				}}
			/>
		</Stack>
	);
}
