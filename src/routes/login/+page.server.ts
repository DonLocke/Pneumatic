import { redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const actions = {
  default: async ({ request, cookies }) => {
    const form = await request.formData();
    const username = form.get("username")?.toString() ?? "unknown";
    cookies.set("sessionid", username, { path: "/" });
    redirect(303, "/");
  },
} satisfies Actions;
