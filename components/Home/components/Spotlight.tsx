import { Spotlight as SpotlightType } from "@/api/pages/home";
import { router } from "expo-router";
import { Image, Pressable } from "react-native";
import PagerView from "react-native-pager-view";
import { MonoText, Text, View } from "@/components/Themed";
import { Fragment } from "react";

export default function Spotlight({ data }: { data: SpotlightType[] }) {
	return (
		<PagerView
			initialPage={0}
			layoutDirection="ltr"
			pageMargin={10}
			orientation="horizontal"
			style={{
				width: "100%",
				height: 180,
				marginBottom: 40
			}}
		>
			{data.map((spotlight) => (
				<View key={spotlight.id} collapsable={false} className="relative overflow-hidden rounded-xl">
					<Pressable onPress={() => router.push(`/manga/${spotlight.id}`)}>
						{({ pressed }) => (
							<Fragment>
								<Image
									source={{ uri: spotlight.panorama_mobile_url }}
									style={{ width: "100%", height: 180 }}
								/>
								<View
									className="absolute bottom-0 right-0 h-full w-full !bg-[rgba(0,0,0,.8)] p-2"
									style={{
										opacity: pressed ? 1 : 0.8
									}}
								>
									<Text className="mb-4 mt-auto text-2xl" numberOfLines={3}>
										{spotlight.name}
									</Text>
									<MonoText className="pl-2 text-sm" numberOfLines={5}>
										{spotlight.description}
									</MonoText>
								</View>
							</Fragment>
						)}
					</Pressable>
				</View>
			))}
		</PagerView>
	);
}
