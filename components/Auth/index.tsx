import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
	ImageBackground,
	Keyboard,
	KeyboardAvoidingView,
	Platform,
	TouchableOpacity,
	TouchableWithoutFeedback
} from "react-native";
import { Text, View } from "../Themed";
import LoginAuthUI from "./Login";
import RegisterAuthUI from "./Register";

export default function AuthUI() {
	const [mode, setMode] = useState<"login" | "register">("login");

	return (
		<ImageBackground
			source={require("@/assets/images/background_auth.png")}
			className="h-full w-full justify-center"
			resizeMode="cover"
		>
			<KeyboardAvoidingView
				className="h-full w-full flex-col justify-end"
				style={{ flex: 1 }}
				behavior={Platform.OS === "ios" ? "padding" : "height"}
			>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
					<LinearGradient
						colors={["#00000057", "#000000b0", "#000000fb"]}
						locations={[0.1, 0.3, 1]}
						style={{
							flex: 1,
							width: "100%",
							height: "100%",
							justifyContent: "flex-end",
							padding: 20
						}}
					>
						<View
							className="mb-14 w-full flex-col items-start justify-start align-middle"
							style={{
								backgroundColor: "transparent"
							}}
						>
							<Text className="mb-5 text-4xl font-extrabold">
								{mode === "login" ? "Đăng nhập" : "Đăng ký"}
							</Text>
							<View
								className="flex-row items-center justify-center align-middle"
								style={{
									backgroundColor: "transparent"
								}}
							>
								<Text
									style={{
										color: "#999"
									}}
								>
									Bạn {mode === "login" ? "chưa" : "đã"} có tài khoản ư?{" "}
								</Text>
								<MaskedView maskElement={<Text>Đăng {mode === "login" ? "ký" : "nhập"} ngay</Text>}>
									<TouchableOpacity onPress={() => setMode(mode === "login" ? "register" : "login")}>
										<LinearGradient
											colors={["#FF6C65", "#FF29DD"]}
											start={{ x: 1, y: 1 }}
											end={{ x: 0, y: 0.33 }}
											style={{ flex: 1 }}
										>
											<Text style={{ opacity: 0 }}>
												Đăng {mode === "login" ? "ký" : "nhập"} ngay
											</Text>
										</LinearGradient>
									</TouchableOpacity>
								</MaskedView>
							</View>
						</View>
						{mode === "login" ? <LoginAuthUI /> : <RegisterAuthUI />}
					</LinearGradient>
				</TouchableWithoutFeedback>
			</KeyboardAvoidingView>
		</ImageBackground>
	);
}
