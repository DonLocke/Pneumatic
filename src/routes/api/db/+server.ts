import { Client } from "pg";
import { json } from "@sveltejs/kit";

const client = new Client({
  user: "pneumatic",
  password: "pneuword",
  database: "pneumatic",
  hostname: "localhost",
  port: 5432
});

export async function GET(event: Event) {
  // Connect to Local DB
  try {
    await client.connect();
  } catch (e) {
    console.error(e);
  }

  // Test Query
  const result = await client.query("SELECT box_number, branch_address FROM boxes JOIN branches ON boxes.branch_id = branches.branch_id");

  // End Connetion
  //await client.end();

  return json(result.rows);
}