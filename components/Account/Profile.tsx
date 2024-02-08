import { Database } from "@/database.types";
import { Redirect } from "expo-router";
import { Fragment } from "react";
import { Image } from "react-native";
import { PoopIcon } from "../CustomIcons";
import { MonoText, Text, View } from "../Themed";
import Badges from "./Badges";
import { useQuery } from "@tanstack/react-query";
import { NOTIFICATION } from "@/api/profile";

type Profile = Database["public"]["Tables"]["profile"]["Row"] & {
	avatar: { uri: Database["public"]["Tables"]["avatar"]["Row"]["uri"] } | null;
	rank: { rank_id: Database["public"]["Tables"]["rank"]["Row"]["rank_id"] } | null;
	badge: {
		created_at: Database["public"]["Tables"]["badge"]["Row"]["created_at"];
		badges: Database["public"]["Tables"]["badges"]["Row"] | null;
	}[];
};

const rankColor = {
	1: "#FFD700",
	2: "#C0C0C0",
	3: "#CD7F32"
};

export default function Profile({ profile }: { profile: Profile }) {
	if (!profile) return <Redirect href="/" />;

	const { data, error, isFetching } = useQuery({
		queryKey: ["notification"],
		queryFn: NOTIFICATION
	});

	return (
		<Fragment>
			<View className="mb-8 w-full flex-row items-center justify-start">
				<View
					className="relative h-24 w-24 items-center justify-center rounded-full border"
					style={{
						backgroundColor: "#333",
						borderColor: rankColor[profile.rank ? (profile.rank.rank_id as 1 | 2 | 3) : 3]
					}}
				>
					{profile.avatar ? (
						<Image source={{ uri: profile.avatar.uri }} className="h-full w-full rounded-full" />
					) : (
						<Text className="text-4xl font-bold">{profile.name[0]}</Text>
					)}
					<PoopIcon
						fontSize={15}
						fill={rankColor[profile.rank ? (profile.rank.rank_id as 1 | 2 | 3) : 3]}
						style={{
							position: "absolute",
							bottom: 5,
							right: 8
						}}
					/>
				</View>
				<View className="h-full w-full flex-shrink flex-col flex-wrap items-start justify-start p-2">
					<Text className=" text-4xl font-bold">{profile.name}</Text>
					<Text className="text-xs italic !text-gray-500">
						#{profile._id} - {new Date(profile.created_at).toLocaleDateString()}
					</Text>
					<MonoText className="mt-2 text-xs italic !text-gray-100" numberOfLines={2}>
						Đời như đầu l, không biết sẽ ra sao.
					</MonoText>
				</View>
			</View>
			<View className="mb-12 w-full flex-col items-start justify-center">
				<Text className="mb-2 text-4xl font-bold italic !text-gray-300">#Huy hiệu</Text>
				{profile.badge.length ? (
					<Badges data={profile.badge} />
				) : (
					<Text className="!text-gray-500">Chưa có huy hiệu nào.</Text>
				)}
			</View>
			<View className="mb-12 w-full flex-col items-start justify-center">
				<Text className="mb-2 text-4xl font-bold italic !text-gray-300">#Thông báo</Text>
			</View>
			{!isFetching && <Text className="!text-gray-600">{JSON.stringify(data, null, 4)}</Text>}
			<Text className="mt-auto w-full text-center !text-orange-600">
				Trang cá nhân của bạn sẽ tự cập nhật sau 1 giờ.
			</Text>
		</Fragment>
	);
}
