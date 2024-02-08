import { BadgesQuery } from "@/api/query";
import { Database } from "@/database.types";
import { useQueries } from "@tanstack/react-query";
import React from "react";
import { Image, ScrollView } from "react-native";
import { Text, View } from "../Themed";

export default function Badges({
	data
}: {
	data: {
		badges: Database["public"]["Tables"]["badges"]["Row"] | null;
		created_at: Database["public"]["Tables"]["badge"]["Row"]["created_at"];
	}[];
}) {
	if (!data) return <Text>Không có huy hiệu nào</Text>;
	const queries = useQueries({
		queries: data
			.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
			.filter((badge) => badge.badges)
			.map(
				(badge) =>
					badge && {
						queryKey: ["badges", (badge.badges as { name: string }).name],
						queryFn: () =>
							badge.badges && {
								...badge.badges,
								badge_uri: BadgesQuery((badge.badges as { path_dir: string }).path_dir).data.publicUrl
							},
						refetchInterval: 1000 * 60 * 60
					}
			),
		combine: (data) => data.map(({ data }) => data)
	});
	return (
		<ScrollView horizontal showsHorizontalScrollIndicator={false} className="min-w-full">
			{queries.map(
				(badge, index) =>
					badge && (
						<View
							style={{ marginLeft: !index ? 0 : 8 }}
							key={index}
							className="w-32 max-w-32 flex-col items-center justify-start overflow-hidden rounded !bg-slate-800"
						>
							<Image source={{ uri: badge.badge_uri }} className="h-32 w-32" resizeMode="cover" />
							<View className="w-full flex-col justify-start border-t border-t-[#ffffff1a] !bg-transparent p-2">
								<Text className=" text-sm" numberOfLines={2}>
									{badge.name}
								</Text>
								<Text className="text-xs italic !text-gray-500">
									{new Date(data[index].created_at).toLocaleDateString()}
								</Text>
							</View>
						</View>
					)
			)}
		</ScrollView>
	);
}
