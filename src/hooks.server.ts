import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
  event.locals.user = event.cookies.get("sessionid") ?? "";
  return resolve(event);
};
