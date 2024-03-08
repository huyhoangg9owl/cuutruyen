import { MANGA_INFO } from "@/api/pages/manga";
import CoverImage from "@/components/Manga/components/CoverImage";
import Status from "@/components/Manga/components/Status";
import { Text, View } from "@/components/Themed";
import UIProviders from "@/components/UIProviders";
import toCapitalize from "@/utils/captilize";
import { useQuery } from "@tanstack/react-query";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect } from "react";
import { Dimensions, Image } from "react-native";
import { AirbnbRating } from "react-native-ratings";

const aspectRatio = 1280 / 600;
const { width: imageWidth } = Dimensions.get("window");
const imageHeight = imageWidth / aspectRatio;

export default function TagScreen() {
	const navigation = useNavigation();
	const { id } = useLocalSearchParams();
	const { data, isFetching, refetch } = useQuery({
		queryKey: ["tag", id],
		queryFn: async () => await MANGA_INFO(id as string)
	});
	useEffect(() => {
		navigation.setOptions({ title: "Đang tải..." });
		if (!isFetching && data)
			navigation.setOptions({
				title: toCapitalize(data.name)
			});
	}, [isFetching]);
	if (!data) return null;
	return (
		<UIProviders loading={isFetching} func={refetch} className="items-center">
			<CoverImage
				img={data.panorama_mobile_url}
				size={{
					width: imageWidth,
					height: imageHeight
				}}
				name={data.name}
			/>
			<Status tags={data.tags} />
			<View className="w-full !bg-zinc-600">
				<Text>Giới thiệu</Text>
			</View>
		</UIProviders>
	);
}
