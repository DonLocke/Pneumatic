import { redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const actions = {
  default: async ({ request, cookies, locals }) => {
    const form = await request.formData();
    const username = form.get("username")?.toString() ?? "unknown";
    const result = await locals.postgres?.query("SELECT customer_id, customer_name, customer_username, customer_password FROM customers WHERE customer_username = $1", [username]);
    const user = result?.rows[0];
    
    cookies.set("sessionid", user.customer_id, { path: "/" });
    redirect(303, "/");
  },
} satisfies Actions;
