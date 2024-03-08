import { AVPlaybackSource, Audio } from "expo-av";
import { create } from "zustand";
import ytdl from "react-native-ytdl";
import AsyncStorage from "@react-native-async-storage/async-storage";

type State = {
	musicChannel: Audio.Sound | null;
	enableMusic: boolean;
	musicURI: AVPlaybackSource;
};

type Actions = {
	registerMusic: () => Promise<void>;
	startMusic: () => Promise<void>;
	toggleEnableMusic: (returnURI?: boolean) => Promise<AVPlaybackSource | void>;
	changeMusic: (uri: string) => void;
	removeMusic: () => void;
};

async function convertYTDL(uri: string): Promise<string> {
	const urls = await ytdl(uri, { quality: "highestaudio", format: "mp3" });
	return urls[0].url;
}

const MusicStore = create<State & Actions>((set, get) => ({
	musicChannel: null,
	enableMusic: false,
	musicURI: require("@/assets/sounds/music.mp3"),
	registerMusic: async () => {
		const enableMusic = await AsyncStorage.getItem("enableMusic");
		set({ enableMusic: enableMusic === "true" });
		if (get().musicChannel) return;
		await Audio.setAudioModeAsync({
			staysActiveInBackground: false,
			shouldDuckAndroid: true,
			playThroughEarpieceAndroid: false
		});
		await get().startMusic();
	},
	startMusic: async () => {
		if (!get().enableMusic) return;
		const musicStorage = await AsyncStorage.getItem("musicURI");

		if (musicStorage) set({ musicURI: { uri: musicStorage } });

		let musicURI = get().musicURI;
		if (musicStorage) musicURI = { uri: await convertYTDL(musicStorage) };

		const { sound: Sound } = await Audio.Sound.createAsync(musicURI, {
			shouldPlay: true,
			isLooping: true,
			volume: 0.2
		});

		set({ musicChannel: Sound });
	},
	toggleEnableMusic: async (returnURI = false) => {
		const { musicChannel, enableMusic, startMusic } = get();
		await AsyncStorage.setItem("enableMusic", (!enableMusic).toString());
		set({ enableMusic: !enableMusic });
		if (musicChannel) {
			if (enableMusic) musicChannel.pauseAsync();
			else musicChannel.playAsync();
		} else {
			await startMusic();
		}
		if (returnURI) return get().musicURI;
	},
	changeMusic: async (uri) => {
		const url = await convertYTDL(uri);
		set({ musicURI: { uri: url } });
		await AsyncStorage.setItem("musicURI", uri);
		if (get().musicChannel) {
			get().musicChannel?.unloadAsync();
			set({ musicChannel: null });
		}
		get().startMusic();
	},
	removeMusic: async () => {
		await AsyncStorage.removeItem("musicURI");
		set({ musicURI: require("@/assets/sounds/music.mp3") });
		if (get().musicChannel) {
			get().musicChannel?.unloadAsync();
			set({ musicChannel: null });
		}
		get().startMusic();
	}
}));

export default MusicStore;
