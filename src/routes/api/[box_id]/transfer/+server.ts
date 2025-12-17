export async function POST({ locals, params }) {
  let result;

  const getBoxOwners = await locals.postgres?.query(
    `SELECT customer_id FROM customer_to_boxes WHERE box_id = $1`,
    [params.box_id]
  );

  console.log(getBoxOwners?.rows);

  const result1 = await locals.postgres?.query(
    `UPDATE customer_to_boxes 
    SET customer_id = $1 
    WHERE box_id = $2`,
    [5, params.box_id] // Example new customer ID
  );

  console.log("Transferring Box #", params.box_id);
  if (params.box_id == "1") {
    const response = await fetch("http://box-100.locke.casa/transfer", {
      method: "PATCH",
      headers: { "Content-Type": "text/json" },
      body: JSON.stringify({ new_customer_id: params.box_id }), // Example new customer ID
    });

    result = await response.text();
    console.log("Transfer Response: ", result);
  }

  return new Response();
}
