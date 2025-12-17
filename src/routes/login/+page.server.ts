import { redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const actions = {
  login: async ({ request, cookies, locals }) => {
    const form = await request.formData();
    const username = form.get("username")?.toString();
    const password = form.get("password")?.toString();
    console.log("User: ", username);
    console.log("Pass: ", password);
    const result = await locals.postgres?.query("SELECT customer_id, customer_name, customer_username, customer_password FROM customers WHERE customer_username = $1 AND customer_password = $2", [username, password]);
    
    if (result?.rowCount != 1) {
      console.error("Failed Login: Couldn't find single user in database");
      throw redirect(303, "/login");
    }
    
    const user = result?.rows[0];
    
    cookies.set("sessionid", user.customer_id, { path: '/' });
    redirect(303, "/");
  },
  logout: async ({ cookies, locals }) => {
    cookies.delete("sessionid", { path: '/' })
    locals.user = null;

    throw redirect(303, "/login");
  }
} satisfies Actions;
