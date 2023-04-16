import { varchar, timestamp, pgTable } from "drizzle-orm/pg-core";

export const example = pgTable("example", {
  id: varchar("id", { length: 191 }).primaryKey().notNull(),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});
