import { MonoText, Text } from "@/components/Themed";
import { Link } from "expo-router";
import { memo } from "react";
import { Image, TouchableOpacity } from "react-native";

const Item = ({
	data
}: {
	data: {
		id: string;
		name: string;
		cover_url: string;
		newest_chapter_number: number;
		newest_chapter_created_at: string;
	};
}) => {
	const { id, name, cover_url, newest_chapter_number, newest_chapter_created_at } = data;
	return (
		<Link asChild href={`/manga/${id}`}>
			<TouchableOpacity className="m-2 w-[140px] ">
				<Image
					source={{ uri: cover_url }}
					style={{ width: 140, height: 210 }}
					className="overflow-hidden rounded"
				/>
				<Text numberOfLines={2} className="mt-2 text-center">
					{name}
				</Text>
				<MonoText className="mt-auto text-center text-xs !text-gray-500" numberOfLines={1}>
					Chap {newest_chapter_number} - {newestTime(newest_chapter_created_at)}
				</MonoText>
			</TouchableOpacity>
		</Link>
	);
};

function newestTime(time: string) {
	const date = new Date(time);
	const now = new Date();
	const diff = now.getTime() - date.getTime();
	const days = Math.floor(diff / (1000 * 60 * 60 * 24));
	const hours = Math.floor(diff / (1000 * 60 * 60));
	const minutes = Math.floor(diff / (1000 * 60));
	if (days > 0) return `${days} ngày trước`;
	if (hours > 0) return `${hours} giờ trước`;
	if (minutes > 0) return `${minutes} phút trước`;
	return "Vừa xong";
}

export default memo(Item);
