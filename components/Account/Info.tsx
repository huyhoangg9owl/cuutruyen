import { PoopIcon } from "@/components/CustomIcons";
import { MonoText, Text, View } from "@/components/Themed";
import { Image } from "react-native";
import { Profile } from ".";

const rankColor = {
	1: "#FFD700",
	2: "#C0C0C0",
	3: "rgb(205, 127, 50)"
};

export default function Info({ rank, avatar, name, _id, created_at }: Profile) {
	return (
		<View className="mb-8 w-full flex-row items-center justify-start">
			<View
				className="relative h-24 w-24 items-center justify-center rounded-full border"
				style={{
					backgroundColor: "#333",
					borderColor: rankColor[rank ? (rank.rank_id as 1 | 2 | 3) : 3]
				}}
			>
				{avatar && avatar.uri ? (
					<Image source={{ uri: avatar.uri }} className="h-full w-full rounded-full" />
				) : (
					<Text className="text-4xl font-bold">{name[0]}</Text>
				)}
				<PoopIcon
					fontSize={15}
					fill={rankColor[rank ? (rank.rank_id as 1 | 2 | 3) : 3]}
					style={{
						position: "absolute",
						bottom: 5,
						right: 8
					}}
				/>
			</View>
			<View className="h-full w-full flex-shrink flex-col flex-wrap items-start justify-start p-2">
				<Text className=" text-4xl font-bold">{name}</Text>
				<Text className="text-xs italic !text-gray-500">
					#{_id} - {new Date(created_at).toLocaleDateString()}
				</Text>
				<MonoText className="mt-2 text-xs italic !text-gray-100" numberOfLines={2}>
					Đời như đầu l, không biết sẽ ra sao.
				</MonoText>
			</View>
		</View>
	);
}
