import TAG from "@/api/pages/tag";
import { Text } from "@/components/Themed";
import { useQuery } from "@tanstack/react-query";
import { Link } from "expo-router";
import React from "react";
import { TouchableOpacity } from "react-native";

export default function Tag({ item }: { item: { title: string; slug: string } }) {
	const { data, isLoading } = useQuery({
		queryKey: ["tag", item.slug],
		queryFn: () => TAG(item.slug)
	});

	return (
		<Link href={`/tags/${item.slug}`} asChild>
			<TouchableOpacity className="mx-2 h-10 rounded !bg-slate-700 p-2">
				<Text className="capitalize">
					{item.title}
					{!isLoading && " (" + data._metadata.total_count + ")"}
				</Text>
			</TouchableOpacity>
		</Link>
	);
}
