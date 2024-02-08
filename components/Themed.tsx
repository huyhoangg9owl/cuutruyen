import { Text as DefaultText, View as DefaultView } from "react-native";

import Colors from "@/constants/Colors";

type ThemeProps = {
	lightColor?: string;
	darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText["props"];
export type ViewProps = ThemeProps & DefaultView["props"];

export function useThemeColor(props: { light?: string; dark?: string }, colorName: keyof typeof Colors) {
	const theme = "dark";
	const colorFromProps = props[theme];

	if (colorFromProps) {
		return colorFromProps;
	} else {
		return Colors[colorName];
	}
}

export function Text(props: TextProps) {
	const { style, lightColor, darkColor, ...otherProps } = props;
	const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

	return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function MonoText(props: TextProps) {
	return <Text {...props} style={[props.style, { fontFamily: "SpaceMono" }]} />;
}

export function View(props: ViewProps) {
	const { style, lightColor, darkColor, ...otherProps } = props;
	const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, "background");

	return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}
