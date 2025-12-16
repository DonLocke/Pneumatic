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

  const branchId = boxResult.rows[0].branch_id;

  const appointmentResult = await locals.postgres.query(
    "SELECT appointment_id, appointment_date, branch_id, customer_id FROM appointments WHERE branch_id = $1 AND customer_id=$2", [branchId, locals.user]
  );

  return { box: boxResult.rows[0], payment: paymentResult.rows[0], appointment: appointmentResult.rows };
};
