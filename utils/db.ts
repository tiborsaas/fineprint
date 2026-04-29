import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { type Artist, type Product } from "./types.ts";

// ---------------------------------------------------------------------------
// Supabase client (lazy singleton)
// Deno uses a single-threaded event loop, so the lazy init is safe against
// true race conditions; at worst two clients are briefly created in the same
// microtask turn and one is discarded.
// ---------------------------------------------------------------------------

let _client: SupabaseClient | null = null;

/**
 * Returns a singleton Supabase client.
 * Requires the following environment variables (set via .env or deployment secrets):
 *   SUPABASE_URL      — your project URL
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

// ---------------------------------------------------------------------------
// Row mappers: Supabase returns snake_case; our interfaces use camelCase
// ---------------------------------------------------------------------------

// deno-lint-ignore no-explicit-any
export function toArtist(row: Record<string, any>): Artist {
  return {
    id: row.id,
    name: row.name,
    bio: row.bio ?? "",
    avatarUrl: row.avatar_url ?? "",
    portfolioUrl: row.portfolio_url ?? "",
    createdAt: row.created_at,
  };
}

// deno-lint-ignore no-explicit-any
export function toProduct(row: Record<string, any>): Product {
  return {
    id: row.id,
    artistId: row.artist_id,
    title: row.title,
    description: row.description ?? "",
    type: row.type,
    priceCents: row.price_cents,
    currency: row.currency ?? "HUF",
    imageUrl: row.image_url ?? "",
    inStock: row.in_stock ?? true,
    createdAt: row.created_at,
    printDetails: row.dimensions_mm
      ? {
        dimensionsMm: row.dimensions_mm,
        paperGsm: row.paper_gsm,
        paperType: row.paper_type ?? "",
        editionSize: row.edition_size,
        editionNumber: row.edition_number,
        isSigned: row.is_signed ?? false,
      }
      : undefined,
    presetDetails: row.algorithm_id
      ? {
        algorithmId: row.algorithm_id,
        params: row.preset_params ?? {},
        previewUrl: row.preview_url ?? "",
      }
      : undefined,
  };
}
