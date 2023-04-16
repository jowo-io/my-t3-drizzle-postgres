import {
  index,
  integer,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";

export const accounts = pgTable(
  "accounts",
  {
    id: varchar("id", { length: 191 }).primaryKey().notNull(),
    userId: varchar("userId", { length: 191 }).notNull(),
    type: varchar("type", { length: 191 }).notNull(),
    provider: varchar("provider", { length: 191 }).notNull(),
    providerAccountId: varchar("providerAccountId", { length: 191 }).notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: varchar("token_type", { length: 191 }),
    scope: varchar("scope", { length: 191 }),
    id_token: text("id_token"),
    session_state: varchar("sessionToken", { length: 191 }),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  },
  (account) => ({
    providerProviderAccountIdIndex: uniqueIndex(
      "accounts__provider__providerAccountId__idx"
    ).on(account.provider, account.providerAccountId),
    userIdIndex: index("accounts__userId__idx").on(account.userId),
  })
);

export const sessions = pgTable(
  "sessions",
  {
    id: varchar("id", { length: 191 }).primaryKey().notNull(),
    sessionToken: varchar("sessionToken", { length: 191 }).notNull(),
    userId: varchar("userId", { length: 191 }).notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
    created_at: timestamp("created_at").defaultNow().notNull(),
    updated_at: timestamp("updated_at").defaultNow().notNull(),
  },
  (session) => ({
    sessionTokenIndex: uniqueIndex("sessions__sessionToken__idx").on(
      session.sessionToken
    ),
    userIdIndex: index("sessions__userId__idx").on(session.userId),
  })
);

export const verificationTokens = pgTable(
  "verification_tokens",
  {
    identifier: varchar("identifier", { length: 191 }).primaryKey().notNull(),
    token: varchar("token", { length: 191 }).notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
    created_at: timestamp("created_at").defaultNow().notNull(),
    updated_at: timestamp("updated_at").defaultNow().notNull(),
  },
  (verificationToken) => ({
    tokenIndex: uniqueIndex("verification_tokens__token__idx").on(
      verificationToken.token
    ),
  })
);

export const users = pgTable(
  "users",
  {
    id: text("id").notNull().primaryKey(),
    name: text("name"),
    email: text("email").notNull(),
    emailVerified: timestamp("emailVerified", { mode: "date" }),
    image: text("image"),
    created_at: timestamp("created_at").defaultNow().notNull(),
    updated_at: timestamp("updated_at").defaultNow().notNull(),
  },
  (user) => ({
    emailIndex: uniqueIndex("users__email__idx").on(user.email),
  })
);
