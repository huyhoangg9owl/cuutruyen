import TAG from "@/api/pages/tag";
import Item from "@/components/Home/List/Item";
import UIProviders from "@/components/UIProviders";
import toCapitalize from "@/utils/captilize";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect } from "react";
import { Dimensions } from "react-native";
import { FlatList } from "react-native-bidirectional-infinite-scroll";

const { width } = Dimensions.get("window");
const imageWidth = 140;
const imageSpacing = 8;

function maxNumCol() {
	return Math.floor(width / (imageWidth + imageSpacing * 2));
}

export default function TagScreen() {
	const navigation = useNavigation();
	const { id } = useLocalSearchParams();
	const {
		data: TagInfo,
		isFetching,
		refetch
	} = useQuery({
		queryKey: ["tag", id],
		queryFn: () => TAG(id as string)
	});

	const { data: DataFetch, fetchNextPage } = useInfiniteQuery({
		queryKey: ["infinite scroll"],
		queryFn: ({ pageParam = 1 }) => TAG(id as string, pageParam),
		initialPageParam: 1,
		getNextPageParam: ({ _metadata: { current_page, total_pages } }) =>
			current_page < total_pages && current_page + 1,
		enabled: !!TagInfo
	});

	useEffect(() => {
		navigation.setOptions({ title: "Đang tải..." });
		if (!isFetching) {
			navigation.setOptions({
				title: toCapitalize(TagInfo.data.tag.name) + " (" + TagInfo._metadata.total_count + ")"
			});
		}
	}, [isFetching]);

	if (!DataFetch) return null;

	return (
		<UIProviders hasScrollView={false} loading={isFetching} func={refetch} className="items-center">
			<FlatList
				data={DataFetch.pages.map((page) => page.data.mangas).flat()}
				renderItem={({ item }) => <Item data={item} />}
				keyExtractor={(_, index) => index.toString()}
				// @ts-ignore IDK why this fking error type
				onEndReached={fetchNextPage}
				initialNumToRender={maxNumCol() * 2}
				onEndReachedThreshold={0.5}
				numColumns={maxNumCol()}
				contentContainerClassName="items-center g-4"
			/>
		</UIProviders>
	);
}
