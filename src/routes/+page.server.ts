import { error} from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ locals }) => {
  if (!locals.user) {
    throw redirect(303, '/login');
  }
  
  if (!locals?.postgres) {
    throw error(500, "Database Issue");
  }

  const userResult = await locals.postgres.query("SELECT customer_id, customer_name, customer_username FROM customers WHERE customer_id = $1", [locals.user]);
    
  const boxResults = await locals.postgres.query("SELECT boxes.box_id, box_number, branch_name FROM boxes JOIN branches ON boxes.branch_id = branches.branch_id JOIN customer_to_boxes ON customer_to_boxes.box_id = boxes.box_id WHERE customer_to_boxes.customer_id = $1", [locals.user]);

  return { user: userResult.rows[0], boxes: boxResults.rows};
};
