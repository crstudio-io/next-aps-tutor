import { redirect } from "next/navigation";
import { updateSession } from "@/lib/session";

const URL = "http://localhost:8080/auth/signin"

export async function verifySignIn(token: string) {
  const response = await fetch(URL + "?token=" + token);
  if (!response.ok) redirect("/signin/error");
  return await response.text();
}

export async function setUserInfo(token: string) {
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${token}`);
  const response = await fetch("http://localhost:8080/auth/user-info", {
    headers
  });
  const json = await response.json();
  await updateSession({
    jwt: token,
    username: json.email,
    signedIn: true,
  });
}