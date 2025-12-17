import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "../$types";

export const load: PageServerLoad = async ({ locals }) => {

  if (!locals?.postgres) {
    throw error(500, "Database Issue");
  }

  const branchResults = await locals.postgres.query(`
    SELECT
      branch_id,
      branch_name
    FROM branches
    `);

  return { branches: branchResults.rows };
}