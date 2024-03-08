import axios from "axios";

export default async function TAG(slug: string, page: number = 1) {
	const { data } = await axios.get(`${process.env.EXPO_PUBLIC_API_URI}v2/tags/${slug}?page=${page}`);
	return data;
}
