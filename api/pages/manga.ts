import axios from "axios";

interface Title {
	id: number;
	name: string;
	primary: boolean;
}

interface Team {
	id: number;
	name: string;
	description: string;
	is_ads: boolean;
	facebook_address: string;
	views_count: number;
	translations_count: number;
	created_at: string;
	updated_at: string;
}

export interface Tag {
	name: string;
	slug: string;
	tagging_count: number;
}

export interface MangaInfo {
	id: number;
	name: string;
	cover_url: string;
	cover_mobile_url: string;
	panorama_url: string;
	panorama_mobile_url: string;
	newest_chapter_number: string;
	newest_chapter_id: number;
	newest_chapter_created_at: string;
	author: {
		name: string;
	};
	description: string;
	full_description: string;
	official_url: string;
	is_region_limited: boolean;
	is_ads: boolean;
	chapters_count: number;
	views_count: number;
	is_nsfw: boolean;
	tags: Tag[];
	team: Team;
	is_following: boolean;
	titles: Title[];
	created_at: string;
	updated_at: string;
}

export interface MangaChapter {
	id: number;
	order: number;
	number: string;
	name: string;
	views_count: number;
	comments_count: number;
	status: string;
	created_at: string;
	updated_at: string;
}

export async function MANGA_INFO(id: string): Promise<MangaInfo> {
	const {
		data: { data }
	} = await axios.get(process.env.EXPO_PUBLIC_API_URI + "v2/mangas/" + id);
	return data;
}

export async function MANGA_CHAPTERS(id: string): Promise<MangaChapter[]> {
	const {
		data: { data }
	} = await axios.get(process.env.EXPO_PUBLIC_API_URI + "v2/mangas/" + id + "/chapters");
	return data;
}
