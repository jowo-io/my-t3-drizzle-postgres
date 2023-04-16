// drizzle.config.ts
import type { Config } from "drizzle-kit";
import "dotenv/config";

export default {
  connectionString: process.env.DATABASE_URL,
  out: "migrations",
  schema: ["./src/db/auth.ts", "./src/db/schema.ts"],
} satisfies Config;
