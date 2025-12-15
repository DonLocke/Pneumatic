import { json } from "@sveltejs/kit";

export async function GET(event: Event) {
  const response = { status: "Success", message: "Hello World" };
  return json(response);
}
