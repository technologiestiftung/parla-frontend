import { createClient } from "@supabase/supabase-js";
import type { Database } from "./database";
import { EnvError } from "./errors";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;
if (SUPABASE_URL === undefined) throw new EnvError("SUPABASE_URL is undefined");
if (SUPABASE_ANON_KEY === undefined)
	throw new EnvError("SUPABASE_ANON_KEY is undefined");
const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY);
export default supabase;
