import { error } from "@sveltejs/kit";

export const load = async ({ locals, params }) => {
  const { box_id } = params;

  if (!locals?.postgres) {
    throw error(500, "Database Issue");
  }

  const result = await locals.postgres.query(
    "SELECT box_id, branches.branch_id, branch_address, branch_name FROM branches JOIN boxes ON branches.branch_id = boxes.branch_id WHERE box_id = $1",
    [params.box_id]
  );

  return result.rows[0];
};
