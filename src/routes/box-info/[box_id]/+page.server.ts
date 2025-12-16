import { error } from "@sveltejs/kit";

export const load = async ({ locals, params }) => {
  if (!locals?.postgres) {
    throw error(500, "Database Issue");
  }

  const authorizedUsers = await locals.postgres.query("SELECT customer_name, rel_code FROM customer_to_boxes JOIN customers ON customer_to_boxes.customer_id = customers.customer_id WHERE box_id = $1", [params.box_id]);

  const boxResult = await locals.postgres.query(
    "SELECT box_id, box_number, branches.branch_id, branch_address, branch_name, payment_status FROM branches JOIN boxes ON branches.branch_id = boxes.branch_id WHERE box_id = $1",
    [params.box_id]
  );
  const paymentResult = await locals.postgres.query(
    "SELECT boxes.box_id, box_cost, payment_amount, payment_date FROM payment_history JOIN boxes ON payment_history.box_id = boxes.box_id WHERE boxes.box_id = $1 ORDER BY payment_date DESC",
    [params.box_id]
  );
  
  const boxHistoryResult = await locals.postgres.query(
    "SELECT box_history.box_id, box_number, event_type, event_date FROM box_history JOIN boxes ON box_history.box_id = boxes.box_id WHERE box_history.box_id = $1",
    [params.box_id]
  );

  const paymentHistory = await locals.postgres.query(
    "SELECT payment_history.box_id, customer_id, payment_amount, payment_date FROM payment_history JOIN boxes ON payment_history.box_id = boxes.box_id WHERE payment_history.box_id = $1",
    [params.box_id]
  );
  
  const branchId = boxResult.rows[0].branch_id;

  const appointmentResult = await locals.postgres.query(
    "SELECT appointment_id, appointment_date, branch_id, customer_id FROM appointments WHERE branch_id = $1 AND customer_id=$2", [branchId, locals.user]
  );

  return {
    authorizedUsers: authorizedUsers.rows,
    box: boxResult.rows[0],
    payment: paymentResult.rows[0],
    boxHistory: boxHistoryResult.rows,
    paymentHistory: paymentHistory.rows,
    appointment: appointmentResult.rows
  };
};
