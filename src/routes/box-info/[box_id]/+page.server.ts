import { error } from "@sveltejs/kit";

export const load = async ({ locals, params }) => {
  if (!locals?.postgres) {
    throw error(500, "Database Issue");
  }

  const boxResult = await locals.postgres.query(
    "SELECT box_id, box_number, branches.branch_id, branch_address, branch_name FROM branches JOIN boxes ON branches.branch_id = boxes.branch_id WHERE box_id = $1",
    [params.box_id]
  );

  const paymentResult = await locals.postgres.query(
    "SELECT boxes.box_id, box_cost, payment_amount, payment_date FROM payment_history JOIN boxes ON payment_history.box_id = boxes.box_id WHERE boxes.box_id = $1 ORDER BY payment_date DESC",
    [params.box_id]
  );

  const boxHistoryResult = await locals.postgres.query("SELECT box_history.box_id, box_number, event_type, event_date FROM box_history JOIN boxes ON box_history.box_id = boxes.box_id WHERE box_history.box_id = $1", [params.box_id]);

  //console.log(boxHistoryResult);

  return {box: boxResult.rows[0], payment: paymentResult.rows[0], boxHistory: boxHistoryResult.rows};
};
