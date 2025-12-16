import { error } from "@sveltejs/kit";

export async function GET() {
  throw error(400, "Missing box_id");
}
