import { Pool } from "pg";

const pool = new Pool({
  user: "pneumatic",
  password: "pneuword",
  database: "pneumatic",
  host: Deno.env.get("PG_HOST") ?? "localhost",
  port: 5432
});

export const connectToDB = async () => await pool.connect();
