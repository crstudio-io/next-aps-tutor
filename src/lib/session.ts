import { getIronSession, SessionOptions } from "iron-session";
import { cookies } from "next/headers";

const password = "!t%9v2V-rTfAKt7:~vKmuiA~MxB4uNjK";
const cookieName = "sessionid";

type SessionData = {
  jwt: string,
  username: string,
  signedIn: boolean,
}

const sessionOptions: SessionOptions = {
  password,
  cookieName,
}

const ironSession = async () => await getIronSession<SessionData>(cookies(), sessionOptions);
export const getSession = async () => {
  return await ironSession();
}

export const updateSession = async (sessionData: SessionData) => {
  const session = await ironSession();
  session.jwt = sessionData.jwt;
  session.username = sessionData.username;
  session.signedIn = sessionData.signedIn;
  await session.save();
}

export const removeSession = async () => {
  const session = await ironSession();
  session.destroy();
}
