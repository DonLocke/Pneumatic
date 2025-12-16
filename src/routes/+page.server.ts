import type { PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ locals }) => {
if(!locals.user)
{
  throw redirect(303, '/login');
}
  const response = await locals.postgres?.query("SELECT customer_id, customer_name, customer_username FROM customers WHERE customer_id = $1", [locals.user]);
  const user = response?.rows[0];
  return { user: user };
};
