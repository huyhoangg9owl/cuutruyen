import { Text, View } from "@/components/Themed";
import React from "react";

export default function RegisterAuthUI() {
	return (
		<View
			style={{
				backgroundColor: "transparent"
			}}
			className="h-40 w-full items-center justify-center"
		>
			<Text className="text-center text-3xl">Qua web cức truyện để đăng ký tài khoản nha {"<"}3</Text>
		</View>
	);
}
