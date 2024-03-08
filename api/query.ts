import { Database } from "@/database.types";
import { supabase } from "@/utils/database";

export const ProfileQuery = (user_id: number) =>
	supabase
		.from("profile")
		.select(
			`
			_id,
			name,
			created_at,
			updated_at,
			noti_token,
			avatar ( uri ),
			rank ( rank_id ),
			badge (
				created_at,
				badges ( * )
			)
		`
		)
		.eq("_id", user_id)
		.single();

export const BadgesQuery = (path_dir: Database["public"]["Tables"]["badges"]["Row"]["path_dir"]) =>
	supabase.storage.from("badges").getPublicUrl(path_dir);

export const SearchBadgeInfo = (badge_id: number) => supabase.from("badges").select("*").eq("id", badge_id).single();
