import { redirect } from "next/navigation";
import { removeSession, updateSession } from "@/lib/session";

const HOST = process.env.HOST ?? "http://localhost:8080";

export async function verifySignIn(token: string) {
  const response = await fetch(`${HOST}/auth/signin?token=${token}`)
  if (!response.ok) redirect("/signin/error");
  return await response.text();
}

export async function setUserInfo(jwt: string) {
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${jwt}`);
  const response = await fetch(`${HOST}/auth/user-info`, {
    headers
  });
  if (!response.ok) {
    await removeSession();
  } else {
    const json = await response.json();
    await updateSession({
      jwt: jwt,
      username: json.email,
      signedIn: true,
      updatedAt: Date.now(),
    });
  }
}
