import { error, redirect, type Actions } from "@sveltejs/kit";

export const load = async ({ locals, params }) => {
  if (!locals?.postgres) {
    throw error(500, "Database Issue");
  }

  const authorizedUsers = await locals.postgres.query(
    `SELECT customer_name, rel_code FROM customer_to_boxes 
    JOIN customers ON customer_to_boxes.customer_id = customers.customer_id 
    WHERE box_id = $1`,
    [params.box_id]
  );

  const boxResult = await locals.postgres.query(
    `SELECT
      boxes.box_id,
      box_number,
      box_cost,
      box_status,
      branches.branch_id,
      branch_address,
      branch_name,
      to_char(branch_open, 'FMHH12:MI AM') as branch_open,
      to_char(branch_close, 'FMHH12:MI AM') as branch_close,
      payment_status 
    FROM branches 
    JOIN boxes ON branches.branch_id = boxes.branch_id 
    JOIN customer_to_boxes ON boxes.box_id = customer_to_boxes.box_id
    JOIN (SELECT
        DISTINCT ON (box_id)
          box_id,
          event_type AS box_status
        FROM box_history
        ORDER BY box_id, event_date DESC
        ) events 
      ON boxes.box_id = events.box_id
    WHERE boxes.box_id = $1`,
    [params.box_id]
  );
  const paymentResult = await locals.postgres.query(
    `SELECT boxes.box_id, box_cost, payment_amount, payment_date 
    FROM payment_history 
    JOIN boxes ON payment_history.box_id = boxes.box_id 
    WHERE boxes.box_id = $1
    ORDER BY payment_date DESC`,
    [params.box_id]
  );

  const boxHistoryResult = await locals.postgres.query(
    `SELECT
      box_history.box_id,
      box_number,
      event_type,
      event_date
    FROM box_history 
    JOIN boxes ON box_history.box_id = boxes.box_id
    WHERE box_history.box_id = $1`,
    [params.box_id]
  );

  const paymentHistory = await locals.postgres.query(
    `SELECT payment_history.box_id, customer_id, payment_amount, payment_date 
    FROM payment_history 
    JOIN boxes ON payment_history.box_id = boxes.box_id 
    WHERE payment_history.box_id = $1`,
    [params.box_id]
  );

  const branchId = boxResult.rows[0].branch_id;

  const appointmentResult = await locals.postgres.query(
    `SELECT appointment_id, appointment_date, branch_id, customer_id 
    FROM appointments 
    WHERE branch_id = $1 AND customer_id=$2`,
    [branchId, locals.user]
  );

  const getAllCustomersResult = await locals.postgres.query(
    `SELECT customer_id, customer_name FROM customers`
  );

  return {
    authorizedUsers: authorizedUsers.rows,
    box: boxResult.rows[0],
    payment: paymentResult.rows[0],
    boxHistory: boxHistoryResult.rows,
    paymentHistory: paymentHistory.rows,
    appointment: appointmentResult.rows,
    customers: getAllCustomersResult.rows,
  };
};

export const actions = {
  schedule: async ({ request, locals }) => {
    // Authentication check
    if (!locals.user) {
      throw redirect(303, "/login");
    }

    if (!locals?.postgres) {
      throw error(500, "Database Issue");
    }

    // Get form data
    const form = await request.formData();
    const date = form.get("date")?.toString();
    console.log(date);
    const time = form.get("time")?.toString();
    const timeZoneOffset = "-05:00";
    const branchId = form.get("branchId")?.toString();
    const boxId = form.get("boxId")?.toString();
    const isoString = `${date}T${time}${timeZoneOffset}`;

    console.log(boxId);

    if (!date || !time) {
      throw error(400, "Missing required parameters: date and time");
    }

    // Step 1: Look up branch_id from box_number
    const customerResult = await locals.postgres.query(
      `SELECT customer_id FROM customers WHERE customer_id = $1`,
      [locals.user]
    );

    if (customerResult.rowCount === 0) {
      throw error(404, `Customer ID# ${locals.user} not found`);
    }

    const branchResult = await locals.postgres.query(
      `SELECT branch_id FROM branches WHERE branch_id = $1`,
      [branchId]
    );

    if (customerResult.rowCount === 0) {
      throw error(404, `Branch ID# ${branchId} not found`);
    }

    // Step 2: Generate next appointment_id
    const maxIdResult = await locals.postgres.query(
      `SELECT COALESCE(MAX(appointment_id), 0) + 1 AS next_id FROM appointments`
    );

    const appointmentId = maxIdResult.rows[0].next_id;

    // Step 3: Insert appointment
    const insertResult = await locals.postgres.query(
      `INSERT INTO appointments (appointment_id, customer_id, branch_id, appointment_date)
       VALUES ($1, $2, $3, $4)
       RETURNING appointment_id, customer_id, branch_id, appointment_date`,
      [appointmentId, locals.user, branchId, isoString]
    );

    if (insertResult.rowCount === 0) {
      throw error(500, "Failed to create appointment");
    }

    redirect(303, `/box-info/${boxId}`);
  },
  payment: async ({ request, locals, params }) => {
    // Get Form Data
    const form = await request.formData();
    const amount = form.get("amount")?.toString() || "0.00";

    // Submit to DB
    locals.postgres?.query(
      `
      INSERT INTO payment_history
        (box_id, customer_id, payment_amount)
      VALUES
        ($1, $2, $3)
      `,
      [params.box_id, locals.user, amount]
    );

    redirect(303, `/box-info/${params.box_id}`);
  },
  transfer: async ({ request, locals, params }) => {
    // Get Form Data
    const form = await request.formData();
    const newCustomer = form.get("customer_id")?.toString();

    // Submit to DB
    locals.postgres?.query(
      `
      UPDATE customer_to_boxes
      SET customer_id = $2
      WHERE box_id = $1
      `,
      [params.box_id, newCustomer]
    );

    redirect(303, "/");
  },
} satisfies Actions;
