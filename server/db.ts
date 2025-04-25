import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

// Only set websocket constructor if we're not in a native PostgreSQL environment
if (process.env.NODE_ENV !== 'development-local') {
  neonConfig.webSocketConstructor = ws;
}

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

const poolConfig = {
  connectionString: process.env.DATABASE_URL,
  // Add SSL requirement for remote database
  ssl: process.env.NODE_ENV !== 'development-local' ? {
    rejectUnauthorized: false
  } : false
};

export const pool = new Pool(poolConfig);
export const db = drizzle({ client: pool, schema });
