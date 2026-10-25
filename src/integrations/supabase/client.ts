import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

// Values are inlined by Vite at build time from .env / the hosting provider's env vars.
const SUPABASE_URL: string | undefined = import.meta.env["VITE_SUPABASE_URL"];
const SUPABASE_PUBLISHABLE_KEY: string | undefined =
  import.meta.env["VITE_SUPABASE_PUBLISHABLE_KEY"];

if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
  const missing = [
    ...(!SUPABASE_URL ? ["VITE_SUPABASE_URL"] : []),
    ...(!SUPABASE_PUBLISHABLE_KEY ? ["VITE_SUPABASE_PUBLISHABLE_KEY"] : []),
  ];
  throw new Error(`Missing Supabase environment variable(s): ${missing.join(", ")}.`);
}

// The single Supabase client for the whole app. Import it like this:
// import { supabase } from "@/integrations/supabase/client";
export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: typeof window !== "undefined" ? window.localStorage : undefined,
    persistSession: true,
    autoRefreshToken: true,
  },
});
