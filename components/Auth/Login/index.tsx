import { LOGIN } from "@/api/user/auth";
import { MonoText, Text, View } from "@/components/Themed";
import AuthStore from "@/store/Auth";
import MaskedView from "@react-native-masked-view/masked-view";
import { useQuery } from "@tanstack/react-query";
import { LinearGradient } from "expo-linear-gradient";
import { Link, Redirect } from "expo-router";
import React, { Fragment, ReactNode, useState } from "react";
import { TextInput, TouchableOpacity } from "react-native";

export default function LoginAuthUI() {
	const { login, user_id } = AuthStore();
	const [auth, setAuth] = useState<{ username: string | null; password: string | null }>({
		username: null,
		password: null
	});
	const [error, setError] = useState<string | null>(null);
	const { isFetching, refetch } = useQuery({
		queryKey: ["login"],
		queryFn: fetching,
		enabled: false
	});

	async function fetching() {
		if (!auth.username || !auth.password) {
			setError("Tên tài khoản hoặc mật khẩu không được để trống");
			return;
		}
		return await LOGIN(auth.username, auth.password);
	}

	const disabled = !auth.username || !auth.password;

	const handleUsername = (text: string) => {
		setAuth({ ...auth, username: text });
		if (error) setError(null);
		if (!text.length) setError("Tên tài khoản không được để trống");
	};
	const handlePassword = (text: string) => {
		setAuth({ ...auth, password: text });
		if (error) setError(null);
		if (!text.length) setError("Mật khẩu không được để trống");
	};

	const submitHandle = async () => {
		if (!auth.username || !auth.password) {
			setError("Tên tài khoản hoặc mật khẩu không được để trống");
			return null;
		}
		setError(null);
		const query = await refetch();
		const { data, status } = query;

		if (status === "error" || !data) {
			setError("Lỗi không xác định! Chụp màn hình và gửi cho admin!" + JSON.stringify(query));
			return null;
		}
		if (data.status === 422 || data.data.error) setError("Tên tài khoản hoặc mật khẩu không đúng!");
		else {
			setError(null);
			return data.data;
		}
	};

	if (isFetching) return <Text>Loading...</Text>;

	if (user_id) return <Redirect href="/account/" />;

	return (
		<Fragment>
			<View
				className="mb-8 w-full"
				style={{
					backgroundColor: "transparent"
				}}
			>
				<Input value={auth.username ?? ""} handle={handleUsername} placeholder="Tên tài khoản" />
				<Input
					value={auth.password ?? ""}
					handle={handlePassword}
					placeholder="Mật khẩu (Không xem dược đâu)"
				/>
				{error && (
					<Text
						className="mt-2"
						style={{
							color: "#FF6C65"
						}}
					>
						{error}
					</Text>
				)}
			</View>
			<MaskedView maskElement={<Button auth={auth} disabled={disabled} linear={false} />}>
				<Button auth={auth} disabled={disabled} linear handle={() => login(submitHandle)} />
			</MaskedView>
			<Text className="m-4 text-center !text-[#5e5e66]">Hoặc</Text>
			<MonoText className="mb-20 text-center">Chưa hỗ trợ các nền tảng khác!</MonoText>
			<Link href="/" asChild replace>
				<TouchableOpacity className="mx-auto">
					<Text
						style={{
							color: "#5e5e66"
						}}
					>
						Quay lại trang chủ
					</Text>
				</TouchableOpacity>
			</Link>
		</Fragment>
	);
}

function Button({
	disabled,
	linear,
	handle
}: {
	auth: { username: string | null; password: string | null };
	disabled: boolean;
	linear: boolean;
	handle?: () => void;
}) {
	const Linear = ({ children }: { children: ReactNode }) =>
		linear ? (
			<TouchableOpacity
				onPress={handle}
				disabled={disabled}
				className="h-12 w-full"
				style={{
					opacity: disabled ? 0.5 : 1
				}}
			>
				<LinearGradient
					colors={["#FF6C65", "#FF29DD"]}
					start={{ x: 1, y: 1 }}
					end={{ x: 0, y: 0.33 }}
					style={{
						height: 48,
						width: "100%",
						alignItems: "center",
						justifyContent: "center",
						borderRadius: 4,
						overflow: "hidden",
						flex: 1
					}}
				>
					{children}
				</LinearGradient>
			</TouchableOpacity>
		) : (
			<View className="h-12 w-full items-center justify-center">{children}</View>
		);
	return (
		<Linear>
			<Text className="font-semibold text-white">Đăng nhập</Text>
		</Linear>
	);
}

function Input(props: { handle: (value: string) => void; value: string; placeholder: string }) {
	return (
		<View className="mb-4 h-12 w-full overflow-hidden rounded-sm">
			<TextInput
				secureTextEntry={props.placeholder.includes("Mật khẩu")}
				value={props.value}
				onChangeText={props.handle}
				placeholder={props.placeholder}
				className="h-full w-full bg-[#5e5e66] px-4 font-semibold text-white"
			/>
		</View>
	);
}
