import { json } from "@sveltejs/kit";

export async function GET(event: Event) {
  return json("1");
}
