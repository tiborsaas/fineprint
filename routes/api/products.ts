import { Handlers } from "$fresh/server.ts";
import { type Product, ProductType } from "../../utils/types.ts";
import { getSupabaseClient } from "../../utils/db.ts";

export const handler: Handlers = {
  /**
   * GET /api/products
   * Returns product listings.
   * Query params:
   *   ?type=physical|algorithm_preset  — filter by product type
   *   ?artistId=<id>                   — filter by artist
   *   ?inStock=true|false              — filter by stock status
   */
  async GET(req, _ctx) {
    const url = new URL(req.url);
    const type = url.searchParams.get("type") as ProductType | null;
    const artistId = url.searchParams.get("artistId");
    const inStock = url.searchParams.get("inStock");

    try {
      const supabase = getSupabaseClient();

      let query = supabase.from("products").select("*").order("created_at", { ascending: false });

      if (type && (type === "physical" || type === "algorithm_preset")) {
        query = query.eq("type", type);
      }
      if (artistId) {
        query = query.eq("artist_id", artistId);
      }
      if (inStock !== null) {
        query = query.eq("in_stock", inStock === "true");
      }

      const { data, error } = await query;
      if (error) throw error;

      return Response.json(data as Product[]);
    } catch (err) {
      console.error("[api/products] GET error:", err);
      return Response.json({ error: "Internal server error" }, { status: 500 });
    }
  },
};
