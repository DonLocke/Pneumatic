import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ locals }) => {

  if(!locals?.postgres) {
    throw error(500, "Database Issue");
  }

  // Test Query
  const result = await locals.postgres.query("SELECT box_number, branch_address FROM boxes JOIN branches ON boxes.branch_id = branches.branch_id");

  return json(result.rows);
}