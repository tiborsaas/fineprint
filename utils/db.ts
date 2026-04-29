import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// ---------------------------------------------------------------------------
// Supabase client (lazy singleton)
// ---------------------------------------------------------------------------

let _client: SupabaseClient | null = null;

/**
 * Returns a singleton Supabase client.
 * Requires the following environment variables (set via .env or deployment secrets):
 *   SUPABASE_URL     — your project URL
 *   SUPABASE_ANON_KEY — your public anon key (for server-side use only)
 */
export function getSupabaseClient(): SupabaseClient {
  if (_client) return _client;

  const url = Deno.env.get("SUPABASE_URL");
  const key = Deno.env.get("SUPABASE_ANON_KEY");

  if (!url || !key) {
    throw new Error(
      "Missing Supabase credentials. Set SUPABASE_URL and SUPABASE_ANON_KEY environment variables.",
    );
  }

  _client = createClient(url, key, {
    auth: {
      // Server-side only; disable automatic session storage
      persistSession: false,
      autoRefreshToken: false,
    },
  });

  return _client;
}
