import HOME from "@/api/pages/home";
import { ContinueRead, Footer, NewChapter, Spotlight, Suggest4U, Tags, Top } from "@/components/Home/components";
import UIProviders from "@/components/UIProviders";
import { useQuery } from "@tanstack/react-query";

export default function HomeScreen() {
	const { data, isFetching, refetch } = useQuery({
		queryKey: ["HOME"],
		queryFn: HOME
	});

	return (
		<UIProviders loading={isFetching} func={refetch} className="p-4">
			{data && <Spotlight data={data.spotlight_mangas} />}
			<Tags />
			<ContinueRead />
			<Suggest4U />
			{data && <NewChapter data={data.new_chapter_mangas} />}
			{data && <Top data={data.top} />}
			<Footer />
		</UIProviders>
	);
}
