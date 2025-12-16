import { error } from "@sveltejs/kit";

export const load = async ({ locals, params }) => {
  if(!locals?.postgres) {
    throw error(500, "Database Issue");
  }

  const result = await locals.postgres.query("SELECT box_id, box_number, branches.branch_id, branch_address, branch_name FROM branches JOIN boxes ON branches.branch_id = boxes.branch_id WHERE box_id = $1", [params.box_id]);
  
  const boxHistoryResult = await locals.postgres.query("SELECT box_history.box_id, box_number, event_type, event_date FROM box_history JOIN boxes ON box_history.box_id = boxes.box_id WHERE box_history.box_id = $1", [params.box_id]);

  return {box: result.rows[0], boxHistory: boxHistoryResult.rows[0]};
};
