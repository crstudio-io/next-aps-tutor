import { getIronSession, SessionOptions } from "iron-session";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

const PASSWORD = process.env.SECRET ?? "!t%9v2V-rTfAKt7:~vKmuiA~MxB4uNjK";
const cookieName = "sessionid";

export type SessionData = {
  jwt: string,
  username: string,
  signedIn: boolean,
  updatedAt: number,
}

const sessionOptions: SessionOptions = {
  password: PASSWORD,
  cookieName,
}

const MILLS_IN_HOUR = 1000 * 60 * 60;
export const ironSession = async () => await getIronSession<SessionData>(cookies(), sessionOptions);
export const getSession = async () => {
  const session = await ironSession();
  const now = Date.now();
  const timeDiff = now - (session.updatedAt ?? now);
  if (timeDiff > MILLS_IN_HOUR) {
    const next = headers().get("x-last-request-url");
    return redirect(`/api/session/refresh?next=${next}`);
  }
  return session;
}

export const updateSession = async (sessionData: SessionData) => {
  const session = await ironSession();
  session.jwt = sessionData.jwt;
  session.username = sessionData.username;
  session.signedIn = sessionData.signedIn;
  session.updatedAt = sessionData.updatedAt;
  await session.save();
}

export const removeSession = async () => {
  const session = await ironSession();
  session.destroy();
}
