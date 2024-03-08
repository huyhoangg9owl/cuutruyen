import { NOTIFICATION } from "@/api/noti";
import Noti from "@/components/Noti";
import UIProviders from "@/components/UIProviders";
import { useQuery } from "@tanstack/react-query";

export default function NotificationsScreen() {
	const { data, isFetching, refetch } = useQuery({
		queryKey: ["notification"],
		queryFn: NOTIFICATION
	});

	return (
		<UIProviders loading={isFetching} func={refetch} className="p-4">
			<Noti data={(data || { unread: [] }).unread} />
		</UIProviders>
	);
}
