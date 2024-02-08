import * as FileSystem from "expo-file-system";

const imagesFolder = `${FileSystem.documentDirectory}CuuTruyenOffline/`;

export const createFolder = async () => {
	const { exists } = await FileSystem.getInfoAsync(imagesFolder);
	if (!exists) {
		console.warn("Creating folder in", imagesFolder);
		await FileSystem.makeDirectoryAsync(imagesFolder, { intermediates: true });
		console.log("Folder created");
	}
};
