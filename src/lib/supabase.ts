import { createClient } from "@supabase/supabase-js";
import type { Database } from "./database";

const supabase = createClient<Database>(
	import.meta.env.SUPABASE_URL,
	import.meta.env.SUPABASE_ANON_KEY
)
export default supabase