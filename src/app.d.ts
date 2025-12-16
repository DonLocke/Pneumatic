// See https://svelte.dev/docs/kit/types#app.d.ts

import type { PoolClient } from "pg";

// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      user: string | null;
      postgres: PoolClient | null;
    }
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }
}

export {};
