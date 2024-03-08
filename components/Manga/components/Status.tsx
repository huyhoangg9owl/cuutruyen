import { Tag } from "@/api/pages/manga";
import { Text, View } from "@/components/Themed";
import toCapitalize from "@/utils/captilize";
import { AirbnbRating } from "react-native-ratings";

export default function Status({ tags }: { tags: Tag[] }) {
	return (
		<View className="w-full flex-row items-center justify-between !bg-zinc-800 p-4">
			<Text className="rounded bg-gray-700 px-4 py-2 font-bold">
				{toCapitalize(
					(
						tags.find((tag) => tag.name === "chưa hoàn thành" || tag.name === "đã hoàn thành") || {
							name: "chưa rõ"
						}
					).name
				)}
			</Text>
			<View className="rounded !bg-gray-700 p-1">
				<AirbnbRating
					count={5}
					showRating={false}
					reviews={["Rất tệ", "Tệ", "Bình thường", "Chấp nhận được", "Tốt"]}
					defaultRating={0}
					size={14}
					isDisabled
				/>
			</View>
		</View>
	);
}
