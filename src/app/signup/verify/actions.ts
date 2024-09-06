import { redirect } from "next/navigation";

const URL = "http://localhost:8080/auth/signup/verify"

export async function verifySignUp(token: string) {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  const response = await fetch(URL + "?token=" + token, {
    method: "POST",
    headers,
  });
  if (!response.ok) redirect("/signup/error");
}