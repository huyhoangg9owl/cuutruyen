import { FlatList, ScrollView } from "react-native";
import Item from "./Item";

export default function Table({ data, numCol = 5 }: { data: any[]; numCol?: number }) {
	return (
		<ScrollView
			horizontal
			showsHorizontalScrollIndicator={false}
			directionalLockEnabled={true}
			alwaysBounceVertical={false}
		>
			<FlatList
				data={data}
				keyExtractor={(_, index) => index.toString()}
				renderItem={({ item, index }) => <Item data={item} key={index} />}
				numColumns={numCol}
				showsVerticalScrollIndicator={false}
				showsHorizontalScrollIndicator={false}
			/>
		</ScrollView>
	);
}
