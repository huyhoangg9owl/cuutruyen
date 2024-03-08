import { MonoText, Text, View } from "@/components/Themed";

export default function Footer() {
	return (
		<View className="mt-10 w-full items-center">
			<Text>Cảm ơn bạn đã sử dụng app!</Text>
			<MonoText className="!text-gray-500">fb.com/9owlsama</MonoText>
		</View>
	);
}
