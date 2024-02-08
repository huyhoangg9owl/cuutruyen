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
