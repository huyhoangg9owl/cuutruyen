import MusicStore from "@/store/Music";
import { Fragment, useState } from "react";
import { Switch, TextInput, TouchableOpacity } from "react-native";
import { Text, View } from "../Themed";

export default function MusicSetting() {
	const { enableMusic, toggleEnableMusic, changeMusic, musicURI, removeMusic } = MusicStore();
	const [enable, setEnable] = useState(enableMusic);
	const [uri, setURI] = useState(typeof musicURI === "number" ? "default" : musicURI.uri);

	return (
		<View className="mb-6 w-full">
			<View className="flex-row items-center justify-between">
				<Text className="text-xl">Nhạc nền</Text>
				<Switch
					trackColor={{ false: "#767577", true: "#81b0ff" }}
					onValueChange={() => {
						toggleEnableMusic(true).then((music) => {
							if (!music) return;
							if (typeof music === "number") {
								setURI("default");
							} else {
								setURI(music.uri);
							}
							setEnable(!enable);
						});
					}}
					value={enableMusic}
				/>
			</View>
			{enable && enableMusic && (
				<Fragment>
					<View className="flex-row">
						<TextInput
							value={uri}
							placeholder="Đường dẫn nhạc"
							onChangeText={setURI}
							enablesReturnKeyAutomatically
							className="mt-4 h-10 w-full flex-[6] rounded rounded-r-none px-4 font-semibold text-white"
							style={{
								backgroundColor: "rgba(255, 255, 255, 0.3)"
							}}
						/>
						<TouchableOpacity
							onPress={() => changeMusic(uri)}
							className="mt-4 h-10 w-full flex-[2] items-center justify-center bg-blue-500"
						>
							<Text className="font-semibold text-white">Thay đổi</Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => {
								removeMusic();
								setURI("default");
							}}
							className="mt-4 h-10 w-full flex-[2] items-center justify-center rounded rounded-l-none bg-red-500"
						>
							<Text className="font-semibold text-white">Xóa</Text>
						</TouchableOpacity>
					</View>
					<Text className="mt-4 text-center text-sm !text-gray-400">Sẽ mất một lúc để cập nhật nhạc</Text>
				</Fragment>
			)}
		</View>
	);
}
