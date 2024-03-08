import { NewChapter as NewChapterProps } from "@/api/pages/home";
import { Text, View } from "@/components/Themed";
import Table from "../List/Table";

export default function NewChapter({ data }: { data: NewChapterProps[] }) {
	return (
		<View className="mb-6">
			<Text className="text-xl font-bold">Mới cập nhật</Text>
			<Table data={data} />
		</View>
	);
}
