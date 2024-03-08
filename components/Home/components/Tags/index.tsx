import TagsQuery from "@/constants/Tags";
import { FlatList, ScrollView } from "react-native";
import Tag from "./Tag";

function sortAlternateTitleTags(tags: { title: string; slug: string }[]) {
	const sortedTags = [];
	for (let i = 0; i < tags.length; i += 2) {
		sortedTags.push(tags[i]);
	}
	for (let i = 1; i < tags.length; i += 2) {
		sortedTags.push(tags[i]);
	}
	return sortedTags;
}

export default function Tags() {
	const numberOfColumns = Math.ceil(TagsQuery.length / 2);

	return (
		<ScrollView
			horizontal
			showsHorizontalScrollIndicator={false}
			directionalLockEnabled={true}
			alwaysBounceVertical={false}
			className="mb-8"
		>
			<FlatList
				columnWrapperClassName="my-2"
				numColumns={numberOfColumns}
				showsVerticalScrollIndicator={false}
				showsHorizontalScrollIndicator={false}
				data={sortAlternateTitleTags(TagsQuery)}
				renderItem={({ item, index }) => <Tag item={item} key={index} />}
			/>
		</ScrollView>
	);
}
