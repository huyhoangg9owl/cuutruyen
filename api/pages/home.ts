import axios from "axios";

export type Spotlight = {
	id: number;
	name: string;
	panorama_url: string;
	panorama_mobile_url: string;
	panorama_dominant_color: string;
	panorama_dominant_color_2: string;
	description: string;
};

export type NewChapter = {
	id: number;
	name: string;
	cover_url: string;
	cover_mobile_url: string;
	newest_chapter_number: string;
	newest_chapter_id: number;
	newest_chapter_created_at: string;
};

export type Top = {
	id: number;
	name: string;
	cover_url: string;
	cover_mobile_url: string;
	newest_chapter_number: string;
	newest_chapter_id: number;
	newest_chapter_created_at: string;
	views_count: number;
	views_count_week: number;
	views_count_month: number;
};

async function SPOTLIGHT(): Promise<{ spotlight_mangas: Spotlight[]; new_chapter_mangas: NewChapter[] }> {
	console.info("[api/pages/home] ===> SPOTLIGHT <API>");
	return await axios.get(process.env.EXPO_PUBLIC_API_URI + "v2/home_a").then(({ data: { data } }) => data);
}

async function TOP(
	duration: "week" | "month" | "all" = "week",
	page: number = 1,
	per_page: number = 24
): Promise<Top[]> {
	console.info("[api/pages/home] ===> TOP <API>");
	return await axios
		.get(process.env.EXPO_PUBLIC_API_URI + `v2/mangas/top?duration=${duration}&page=${page}&per_page=${per_page}`)
		.then(({ data: { data } }) => data);
}

export default async function HOME() {
	console.info("[api/pages/home] ===> HOME <API>");
	return {
		...(await SPOTLIGHT()),
		top: await TOP()
	};
}
