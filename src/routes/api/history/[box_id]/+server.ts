import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ locals, params }) => {
  if(!locals?.postgres) {
    throw error(500, "Database Issue");
  }

  const result = await locals.postgres.query("SELECT box_id, event_type, event_date FROM box_history WHERE box_id = $1", [params.box_id]);

  return json(result.rows);
}