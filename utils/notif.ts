import notifee, { AndroidImportance, AndroidVisibility, Notification } from "@notifee/react-native";

export async function PushNotification(noti: Notification) {
	console.info("[NOTIFICATION]: Push notification...");
	return await notifee.displayNotification(noti);
}

export async function RegisterPushNotificationsAsync() {
	await notifee.requestPermission();

	const channelId = await notifee.createChannel({
		id: "notification",
		name: "Thông báo",
		importance: AndroidImportance.HIGH,
		visibility: AndroidVisibility.PUBLIC,
		description: "Thông báo từ ứng dụng",
		sound: "notification",
		badge: true,
		vibration: true
	});

	return channelId;
}
