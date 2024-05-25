import { Lucia } from "lucia";
import { BetterSqlite3Adapter } from "@lucia-auth/adapter-sqlite";
import { cookies } from "next/headers";

import db from "./db";

const adapter = new BetterSqlite3Adapter(db, {
  user: "users",
  session: "sessions",
});

const lucia = new Lucia(adapter, {
  sessionCookie: {
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
});

//Creating the session in the database.
export async function createAuthSession(userId) {
  const session = await lucia.createSession(userId, {});
  const sessionCokie = lucia.createSessionCookie(session.id);
  //   Craeting and setting the session
  cookies().set(sessionCokie.name, sessionCokie.value, sessionCokie.attributes);
}

// Verify the coolie attached with request that is valid cookie or not.
export async function verifyAuth() {
  const sessionCokie = cookies().get(lucia.sessionCookieName);

  // No cookie is avalible at request. the return null
  if (!sessionCokie) {
    return {
      user: null,
      session: null,
    };
  }

  // No session id is avalible mmean the cookie is not valid or expired.
  const sessionId = sessionCokie.value;
  if (!sessionId) {
    return {
      user: null,
      session: null,
    };
  }

  // Validating that the session is avaible in the database.
  const result = await lucia.validateSession(sessionId);

  try {
    //   we have to refresh or recreate the session if it true.
    if (result.session && result.session.fresh) {
      const sessionCokie = lucia.createSessionCookie(result.session.id);
      //   Craeting and setting the session
      cookies().set(
        sessionCokie.name,
        sessionCokie.value,
        sessionCokie.attributes
      );
    }
    if (!result.session) {
      const sessionCokie = lucia.createBlankSessionCookie();
      //   Craeting and setting the session with empty data.
      cookies().set(
        sessionCokie.name,
        sessionCokie.value,
        sessionCokie.attributes
      );
    }
  } catch (error) {}
  // the result is the same shap as the following.
  // return {
  //   user: null,
  //   session: null,
  // };
  return result;
}
