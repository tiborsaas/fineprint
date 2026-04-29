import { Handlers } from "$fresh/server.ts";
import { type Artist } from "../../utils/types.ts";
import { getSupabaseClient } from "../../utils/db.ts";

export const handler: Handlers = {
  /**
   * GET /api/artists
   * Returns all artist profiles.
   * Query params:
   *   ?id=<artistId>  — return a single artist
   */
  async GET(req, _ctx) {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    try {
      const supabase = getSupabaseClient();

      if (id) {
        const { data, error } = await supabase
          .from("artists")
          .select("*")
          .eq("id", id)
          .single();

        if (error || !data) {
          return Response.json({ error: "Artist not found" }, { status: 404 });
        }
        return Response.json(data as Artist);
      }

      const { data, error } = await supabase.from("artists").select("*").order("created_at", {
        ascending: false,
      });

      if (error) throw error;
      return Response.json(data as Artist[]);
    } catch (err) {
      console.error("[api/artists] GET error:", err);
      return Response.json({ error: "Internal server error" }, { status: 500 });
    }
  },
};
