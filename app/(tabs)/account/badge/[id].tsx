import { BadgesQuery, SearchBadgeInfo } from "@/api/query";
import { MonoText, Text, View } from "@/components/Themed";
import UIProviders from "@/components/UIProviders";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { Dimensions, Image } from "react-native";

const { width: ScreenW } = Dimensions.get("window");

export default function BadgeIDScreen() {
	const { id } = useLocalSearchParams<{ id: string }>();

	const { isFetching, data, refetch, error } = useQuery({
		queryKey: ["badges", id],
		queryFn: async () => await SearchBadgeInfo(Number(id))
	});

	if (isFetching && (error || !data))
		return (
			<View className="h-full w-full flex-col items-center justify-center">
				<Text className="mt-6 text-center">Đang kiểm tra dữ liệu...</Text>
			</View>
		);

	// @ts-ignore
	const { data: BadgeData } = data;

	if (!BadgeData)
		return (
			<View className="h-full w-full flex-col items-center justify-center">
				<Text>Không có huy hiệu nào</Text>
			</View>
		);
	return <Render data={BadgeData} loading={isFetching} refetch={refetch} />;
}

function Render({ data, loading, refetch }: { data: any; loading: boolean; refetch: () => Promise<any> }) {
	const navigation = useNavigation();
	const { isFetching, data: badge_uri } = useQuery({
		queryKey: ["badges", data.id],
		queryFn: () => BadgesQuery(data.path_dir)
	});

	const {
		data: { publicUrl: uri }
	} = badge_uri || {
		data: {
			publicUrl: ""
		}
	};

	const [{ width, height }, setDimensions] = useState({
		width: 0,
		height: 0
	});

	const [imageLoading, setImageLoading] = useState(true);

	const resizeHeightUsingWidth = (width: number, height: number, newWidth: number) =>
		(height * (newWidth - 48)) / width;

	useEffect(() => {
		navigation.setOptions({ title: data.name });
		if (!uri.length) return;
		setImageLoading(true);
		Image.getSize(uri, (width, height) => {
			setDimensions({ width: ScreenW, height: resizeHeightUsingWidth(width, height, ScreenW) });
			setImageLoading(false);
		});
	}, [data, uri]);

	return (
		<UIProviders
			loading={loading || isFetching || !uri.length || imageLoading}
			func={refetch}
			hasScrollView={false}
			className="h-full w-full p-6"
		>
			<Image
				className="mb-6 overflow-hidden rounded-lg"
				style={{
					width: width - 48,
					height
				}}
				source={{
					uri
				}}
			/>
			<MonoText className="text-center text-2xl font-bold">{data.desc}</MonoText>
		</UIProviders>
	);
}
