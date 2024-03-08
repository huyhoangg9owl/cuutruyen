import { Text, View } from "@/components/Themed";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "react-native";

interface Props {
	img: string;
	size: {
		width: number;
		height: number;
	};
	name: string;
}

export default function CoverImage({ img, size, name }: Props) {
	return (
		<View className="relative w-full flex-col justify-center">
			<Image source={{ uri: img }} width={size.width} height={size.height} />
			<LinearGradient
				className="absolute h-full w-full"
				colors={["rgba(0,0,0,0.5)", "rgba(0,0,0,0)"]}
				locations={[1, 0]}
			>
				<View className="h-full w-full items-start justify-end !bg-transparent p-5">
					<Text className="!bg-transparent text-2xl font-bold" numberOfLines={2}>
						{name}
					</Text>
				</View>
			</LinearGradient>
		</View>
	);
}
