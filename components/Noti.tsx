import { Image, TouchableOpacity } from "react-native";
import { MonoText, Text, View } from "./Themed";
import { Link } from "expo-router";

interface Props {
	data: Unread[];
}

type Unread = {
	id: number;
	title: string;
	message: string;
	icon: string;
	url: string;
	created_at: string;
	read_at: string | null;
};

type Chapter = {
	id: number;
	title: string;
	icon: string;
	url: string;
	read_at: string | null;
	created_at: string;
};

type Series = {
	title: string;
	name: string;
	icon: string;
	chapters: Chapter[];
};

function ProcessNotifications(notifications: Unread[]) {
	const data: Series[] = [];
	const series: { [key: string]: Chapter[] } = {};
	notifications.forEach((noti) => {
		const url = noti.url.split("/");
		const mangaID = url[2];
		const chapterID = url[4];
		const title = noti.message.split(" vừa mới được đăng ")[0];
		const chapter = {
			id: noti.id,
			title: `Chương ${chapterID}`,
			icon: noti.icon,
			url: noti.url,
			read_at: noti.read_at,
			created_at: noti.created_at
		};
		if (series[mangaID]) {
			series[mangaID].push(chapter);
		} else {
			series[mangaID] = [chapter];
			data.push({
				title: noti.title,
				name: title,
				icon: noti.icon,
				chapters: series[mangaID]
			});
		}
	});
	return data;
}

export default function Noti({ data }: Props) {
	if (!data || !data.length) return <Text className="!text-gray-500">Không có thông báo nào.</Text>;
	return (
		<View className="w-full flex-col items-start justify-center">
			{ProcessNotifications(data).map((noti, index: number) => (
				<View key={index} className="mb-14 w-full flex-col items-start justify-center">
					<View className="w-full">
						<Link
							// @ts-ignore
							href={"/manga/" + noti.chapters[0].url.split("/")[2]}
							asChild
						>
							<TouchableOpacity className="w-full flex-row items-center justify-between rounded !bg-zinc-800">
								<View className="w-full flex-[6] !bg-transparent pl-6">
									<Text className="font-bold !text-gray-300" numberOfLines={1}>
										{noti.name}
									</Text>
									<MonoText className="!text-slate-400">Có {noti.chapters.length} thông báo</MonoText>
								</View>
								<Image source={{ uri: noti.icon }} className="ml-2 h-16 w-16 rounded" />
							</TouchableOpacity>
						</Link>
						<View className="ml-auto w-full flex-row flex-wrap items-center justify-center gap-2 rounded-b !bg-zinc-700 px-8 py-4">
							{noti.chapters.map((chapter, index) => (
								<Link
									// @ts-ignore
									href={chapter.url}
									key={index}
									asChild
								>
									<TouchableOpacity className="rounded !bg-sky-700 px-4 py-2">
										<Text className="!text-gray-300">{chapter.title.replace("Chương ", "")}</Text>
									</TouchableOpacity>
								</Link>
							))}
						</View>
					</View>
				</View>
			))}
		</View>
	);
}
