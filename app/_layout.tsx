import FontAwesome from "@expo/vector-icons/FontAwesome";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import * as SplashScreenExpo from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-url-polyfill/auto";

import "@/global.css";
import AuthStore from "@/store/Auth";
import { Stack } from "expo-router";

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
	initialRouteName: "(tabs)"
};

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false
		}
	}
});

SplashScreenExpo.preventAutoHideAsync();

export default function RootLayout() {
	const date = new Date();
	console.info(`[${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}]`);

	const [loaded, error] = useFonts({
		SpaceMono: require("@/assets/fonts/SpaceMono-Regular.ttf"),
		...FontAwesome.font
	});

	const { checkAuth } = AuthStore();

	useEffect(() => {
		if (error) throw error;
		if (loaded) checkAuth().then(() => SplashScreenExpo.hideAsync());
	}, [error, loaded]);

	if (!loaded) return null;
	return (
		<QueryClientProvider client={queryClient}>
			<RootLayoutNav />
		</QueryClientProvider>
	);
}

function RootLayoutNav() {
	return (
		<ThemeProvider value={DarkTheme}>
			<Stack>
				<Stack.Screen
					name="(tabs)"
					options={{
						headerShown: false
					}}
				/>
				<Stack.Screen
					name="(pages)"
					options={{
						headerShown: false
					}}
				/>
				<Stack.Screen name="modal" options={{ presentation: "modal" }} />
			</Stack>
		</ThemeProvider>
	);
}
