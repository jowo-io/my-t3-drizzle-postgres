import cuid from "cuid";

import { db } from "@/server/db";
import { accounts, users, sessions, verificationTokens } from "@/db/auth";
import { and, eq } from "drizzle-orm/expressions";
import type { Adapter } from "next-auth/adapters";

export function DrizzleAdapter(client: typeof db): Adapter {
  return {
    async createUser(userData) {
      await client.insert(users).values({
        id: cuid(),
        email: userData.email,
        emailVerified: userData.emailVerified,
        name: userData.name || null,
        image: userData.image || null,
      });
      const rows = await client
        .select()
        .from(users)
        .where(eq(users.email, userData.email))
        .limit(1);

      const row = rows[0];

      if (!row) throw new Error("User not found");
      return row;
    },
    async getUser(id) {
      const rows = await client
        .select()
        .from(users)
        .where(eq(users.id, id))
        .limit(1);
      const row = rows[0];
      return row ?? null;
    },
    async getUserByEmail(email) {
      const rows = await client
        .select()
        .from(users)
        .where(eq(users.email, email))
        .limit(1);
      const row = rows[0];
      return row ?? null;
    },
    async getUserByAccount({ providerAccountId, provider }) {
      const rows = await client
        .select()
        .from(users)
        .innerJoin(accounts, eq(users.id, accounts.userId))
        .where(
          and(
            eq(accounts.providerAccountId, providerAccountId),
            eq(accounts.provider, provider)
          )
        )
        .limit(1);
      const row = rows[0];
      return row?.users ?? null;
    },
    async updateUser({ id, ...userData }) {
      if (!id) throw new Error("User not found");
      await client.update(users).set(userData).where(eq(users.id, id));
      const rows = await client
        .select()
        .from(users)
        .where(eq(users.id, id))
        .limit(1);
      const row = rows[0];
      if (!row) throw new Error("User not found");
      return row;
    },
    async deleteUser(userId) {
      await client.delete(users).where(eq(users.id, userId));
    },
    async linkAccount(account) {
      await client.insert(accounts).values({
        id: cuid(),
        provider: account.provider,
        providerAccountId: account.providerAccountId,
        type: account.type,
        userId: account.userId,
        // OpenIDTokenEndpointResponse properties
        access_token: account.access_token,
        expires_at: account.expires_at as number,
        id_token: account.id_token,
        refresh_token: account.refresh_token,
        scope: account.scope,
        token_type: account.token_type,
      });
    },
    async unlinkAccount({ providerAccountId, provider }) {
      await client
        .delete(accounts)
        .where(
          and(
            eq(accounts.providerAccountId, providerAccountId),
            eq(accounts.provider, provider)
          )
        );
    },
    async createSession(data) {
      await client.insert(sessions).values({
        id: cuid(),
        expires: data.expires,
        sessionToken: data.sessionToken,
        userId: data.userId,
      });
      const rows = await client
        .select()
        .from(sessions)
        .where(eq(sessions.sessionToken, data.sessionToken))
        .limit(1);
      const row = rows[0];
      if (!row) throw new Error("User not found");
      return row;
    },
    async getSessionAndUser(sessionToken) {
      const rows = await client
        .select({
          user: users,
          session: {
            id: sessions.id,
            userId: sessions.userId,
            sessionToken: sessions.sessionToken,
            expires: sessions.expires,
          },
        })
        .from(sessions)
        .innerJoin(users, eq(users.id, sessions.userId))
        .where(eq(sessions.sessionToken, sessionToken))
        .limit(1);
      const row = rows[0];
      if (!row) return null;
      const { user, session } = row;
      return {
        user,
        session: {
          id: session.id,
          userId: session.userId,
          sessionToken: session.sessionToken,
          expires: session.expires,
        },
      };
    },
    async updateSession(session) {
      await client
        .update(sessions)
        .set(session)
        .where(eq(sessions.sessionToken, session.sessionToken));
      const rows = await client
        .select()
        .from(sessions)
        .where(eq(sessions.sessionToken, session.sessionToken))
        .limit(1);
      const row = rows[0];
      if (!row) throw new Error("Coding bug: updated session not found");
      return row;
    },
    async deleteSession(sessionToken) {
      await client
        .delete(sessions)
        .where(eq(sessions.sessionToken, sessionToken));
    },
    async createVerificationToken(verificationToken) {
      await client.insert(verificationTokens).values({
        expires: verificationToken.expires,
        identifier: verificationToken.identifier,
        token: verificationToken.token,
      });
      const rows = await client
        .select()
        .from(verificationTokens)
        .where(eq(verificationTokens.token, verificationToken.token))
        .limit(1);
      const row = rows[0];
      if (!row)
        throw new Error("Coding bug: inserted verification token not found");
      return row;
    },
    async useVerificationToken({ identifier, token }) {
      // First get the token while it still exists. TODO: need to add identifier to where clause?
      const rows = await client
        .select()
        .from(verificationTokens)
        .where(eq(verificationTokens.token, token))
        .limit(1);
      const row = rows[0];
      if (!row) return null;
      // Then delete it.
      await client
        .delete(verificationTokens)
        .where(
          and(
            eq(verificationTokens.token, token),
            eq(verificationTokens.identifier, identifier)
          )
        );
      // Then return it.
      return row;
    },
  };
}
