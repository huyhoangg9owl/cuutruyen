import { Top as TopProps } from "@/api/pages/home";
import { Text, View } from "@/components/Themed";
import Table from "../List/Table";

export default function Top({ data }: { data: TopProps[] }) {
	return (
		<View className="mb-6 w-full">
			<Text className="text-xl font-bold">Nổi bật tuần này</Text>
			<Table data={data} />
		</View>
	);
}
