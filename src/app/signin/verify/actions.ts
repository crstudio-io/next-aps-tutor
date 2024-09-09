import { redirect } from "next/navigation";
import { removeSession, updateSession } from "@/lib/session";

const HOST = "http://localhost:8080";

export async function verifySignIn(token: string) {
  const response = await fetch(`${HOST}/auth/signin?token=${token}`)
  if (!response.ok) redirect("/signin/error");
  return await response.text();
}

export async function setUserInfo(token: string) {
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${token}`);
  const response = await fetch(`${HOST}/auth/user-info`, {
    headers
  });
  if (!response.ok) {
    await removeSession();
  } else {
    const json = await response.json();
    await updateSession({
      jwt: token,
      username: json.email,
      signedIn: true,
      updatedAt: Date.now(),
    });
  }
}
