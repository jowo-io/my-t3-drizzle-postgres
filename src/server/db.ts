import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const queryConnection = postgres(process.env.DATABASE_URL!);

export const db = drizzle(queryConnection);
