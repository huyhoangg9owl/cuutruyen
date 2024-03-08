import { MonoText, Text } from "@/components/Themed";
import { Database } from "@/database.types";
import { Redirect } from "expo-router";
import { Fragment } from "react";
import Badge from "./Badge";
import Info from "./Info";

export type Profile = Database["public"]["Tables"]["profile"]["Row"] & {
	avatar: { uri: Database["public"]["Tables"]["avatar"]["Row"]["uri"] } | null;
	rank: { rank_id: Database["public"]["Tables"]["rank"]["Row"]["rank_id"] } | null;
	badge: {
		created_at: Database["public"]["Tables"]["badge"]["Row"]["created_at"];
		badges: Database["public"]["Tables"]["badges"]["Row"] | null;
	}[];
};

export default function Profile({ profile }: { profile: Profile }) {
	if (!profile) return <Redirect href="/" />;
	return (
		<Fragment>
			<Info {...profile} />
			<Badge data={profile.badge} />
			<MonoText className="mt-6 text-center">KHÔNG BIẾT ĐỂ GÌ Ở ĐÂY</MonoText>
			<Text className="mt-auto w-full text-center !text-orange-600">
				Trang cá nhân của bạn sẽ tự cập nhật sau 1 giờ.
			</Text>
		</Fragment>
	);
}
