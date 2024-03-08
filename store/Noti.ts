import { create } from "zustand";

type State = {
	channelID: string | null;
};

type Actions = {
	setChannelID: (channelID: string) => void;
};

const NotiStore = create<State & Actions>((set) => ({
	channelID: null,
	setChannelID: (channelID) => set({ channelID })
}));

export default NotiStore;
