import { MonoText, Text, View } from "@/components/Themed";

export default function ContinueRead() {
	return (
		<View className="mb-8 w-full">
			<Text className="text-xl font-bold">Đọc tiếp</Text>
			<MonoText className="text-center !text-gray-500">Bạn chưa đọc truyện nào!</MonoText>
		</View>
	);
}
