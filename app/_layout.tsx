import "@/global.css";
import AuthStore from "@/store/Auth";
import MusicStore from "@/store/Music";
import NotiStore from "@/store/Noti";
import { RegisterPushNotificationsAsync } from "@/utils/notif";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { setNotificationHandler } from "expo-notifications";
import { Stack } from "expo-router";
import { hideAsync, preventAutoHideAsync } from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-gesture-handler";
import "react-native-url-polyfill/auto";

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

setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: true,
		shouldSetBadge: true
	})
});

function readyForRender(loaded: boolean) {
	const checkAuth = AuthStore(({ checkAuth }) => checkAuth);
	const setChannelID = NotiStore(({ setChannelID }) => setChannelID);
	const { musicChannel, registerMusic } = MusicStore();

	useEffect(() => {
		if (loaded) {
			checkAuth()
				.then(hideAsync)
				.then(async () => {
					const channel = await RegisterPushNotificationsAsync();
					setChannelID(channel);
					await registerMusic();
				});
		}
		return () => {
			if (musicChannel) {
				console.log("Unloading background music");
				musicChannel.unloadAsync();
			}
		};
	}, [loaded, musicChannel]);
}

preventAutoHideAsync();

export default function RootLayout() {
	const date = new Date();
	console.info(`[${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}]`);

	const [loaded] = useFonts({
		SpaceMono: require("@/assets/fonts/SpaceMono-Regular.ttf"),
		...FontAwesome.font
	});

	readyForRender(loaded);

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
						headerTitle: "Chức năng chính",
						headerShown: false
					}}
				/>
				<Stack.Screen
					name="auth"
					options={{
						headerTitle: "Đăng nhập",
						headerShown: false
					}}
				/>
				<Stack.Screen
					name="tags"
					options={{
						headerTitle: "Tags",
						headerShown: false
					}}
				/>
				<Stack.Screen
					name="manga"
					options={{
						headerTitle: "Manga",
						headerShown: false
					}}
				/>
				<Stack.Screen
					name="notifications"
					options={{
						headerTitle: "Thông báo",
						headerShown: true,
						presentation: "modal"
					}}
				/>
			</Stack>
		</ThemeProvider>
	);
}
