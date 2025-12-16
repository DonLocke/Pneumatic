import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {

  const response = await locals.postgres?.query("SELECT customer_id, customer_name, customer_username FROM customers WHERE customer_id = $1", [locals.user]);
  const user = response?.rows[0];
  return { user: user };
};
