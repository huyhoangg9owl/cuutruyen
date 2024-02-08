import { PROFILE } from "@/api/profile";
import Profile from "@/components/Account/Profile";
import { Text } from "@/components/Themed";
import UIProviders from "@/components/UIProviders";
import AuthStore from "@/store/Auth";
import { useQuery } from "@tanstack/react-query";
import { Redirect } from "expo-router";

export default function AccountScreen() {
	const { loading, user_id } = AuthStore();

	if (!user_id) return <Redirect href="/auth" />;

	const { isFetching, data, error, refetch } = useQuery({
		queryKey: [`profile ${user_id}`],
		queryFn: PROFILE,
		refetchInterval: 1000 * 60 * 60
	});

	if (error || (data && data.error)) return <Text>Error: {JSON.stringify({ error, data }, null, 4)}</Text>;

	return (
		<UIProviders loading={loading || isFetching} func={refetch} className="w-full p-4">
			{data && data.data ? <Profile profile={data.data} /> : <Redirect href="/" />}
		</UIProviders>
	);
}
