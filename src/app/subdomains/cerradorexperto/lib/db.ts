// src/lib/db.ts
import { Pool } from "@neondatabase/serverless";

if (!process.env.DATABASE_URL) {
  throw new Error("La variable de entorno DATABASE_URL no está configurada");
}

// Creamos y exportamos directamente la instancia del Pool.
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
