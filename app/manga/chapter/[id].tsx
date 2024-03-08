import TAG from "@/api/pages/tag";
import Table from "@/components/Home/List/Table";
import UIProviders from "@/components/UIProviders";
import toCapitalize from "@/utils/captilize";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect } from "react";
import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const imageWidth = 140;
const imageSpacing = 8;

function maxNumCol() {
	return Math.floor(width / (imageWidth + imageSpacing * 2));
}

export default function TagScreen() {
	const navigation = useNavigation();
	const { id } = useLocalSearchParams();
	const { data, isFetching, refetch } = useQuery({
		queryKey: ["tag", id],
		queryFn: () => TAG(id as string)
	});
	useEffect(() => {
		navigation.setOptions({ title: "Đang tải..." });
		if (!isFetching)
			navigation.setOptions({
				title: toCapitalize(data.data.tag.name) + " (" + data._metadata.total_count + ")"
			});
	}, [isFetching]);
	return (
		<UIProviders loading={isFetching} func={refetch} className="items-center">
			<Table data={data.data.mangas} numCol={maxNumCol()} />
		</UIProviders>
	);
}
