import { connectToDB } from "$lib/db";
import type { Handle } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";

const cookie: Handle = async ({ event, resolve }) => {
  event.locals.user = event.cookies.get("sessionid") ?? "";
  return resolve(event);
};

const database: Handle = async ({ event, resolve }) => {
  const postgress = await connectToDB();
  event.locals.postgres = postgress;

  const response = resolve(event);
  postgress.release();
  return response;
};

export const handle = sequence(cookie, database);