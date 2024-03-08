import { BadgesQuery } from "@/api/query";
import { Database } from "@/database.types";
import { useQueries } from "@tanstack/react-query";
import { Link } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, Pressable, ScrollView } from "react-native";
import { Text, View } from "../Themed";

type Data = {
	badges: Database["public"]["Tables"]["badges"]["Row"] | null;
	created_at: Database["public"]["Tables"]["badge"]["Row"]["created_at"];
};

type Item = {
	badge: {
		badge_uri: string;
		desc: string;
		id: number;
		name: string;
		path_dir: string;
	};
	marginLeft: boolean;
};

function rewriteData(data: Data[]) {
	return data
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
						}
				}
		);
}

export default function Badge({ data }: { data: Data[] }) {
	if (!data) return <Text>Không có huy hiệu nào</Text>;
	const queries = useQueries({
		queries: rewriteData(data),
		combine: (data) => data.map(({ data }) => data)
	});
	return (
		<View className="mb-12 w-full flex-col items-start justify-center">
			<Text className="mb-2 text-4xl font-bold italic !text-gray-300">#Huy hiệu</Text>
			{data.length ? (
				<ScrollView horizontal showsHorizontalScrollIndicator={false} className="min-w-full">
					{queries.map((badge, index) => {
						if (!badge) return;
						return <BadgeItem badge={badge} key={index} marginLeft={!!index} />;
					})}
				</ScrollView>
			) : (
				<Text className="!text-gray-500">Chưa có huy hiệu nào.</Text>
			)}
		</View>
	);
}

function BadgeItem(props: Item) {
	const [{ width, height }, setDimensions] = useState({
		width: 0,
		height: 0
	});

	const resizeWidthUsingHeight = (width: number, height: number, newHeight: number) => (width / height) * newHeight;

	useEffect(() => {
		Image.getSize(props.badge.badge_uri, (width, height) =>
			setDimensions({ width: resizeWidthUsingHeight(width, height, 80), height: 80 })
		);
	}, [props.badge.badge_uri]);

	return (
		<Link className="flex-row" asChild href={`/account/badge/${props.badge.id}`}>
			<Pressable
				className="overflow-hidden rounded-md !bg-slate-700"
				style={{
					marginLeft: props.marginLeft ? 12 : 0
				}}
			>
				{({ pressed }) => (
					<Image
						style={{
							flex: 1,
							width,
							height,
							opacity: pressed ? 0.5 : 1
						}}
						source={{ uri: props.badge.badge_uri }}
						resizeMode="contain"
					/>
				)}
			</Pressable>
		</Link>
	);
}
