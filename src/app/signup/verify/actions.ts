import { redirect } from "next/navigation";

const HOST = "http://localhost:8080";

export async function verifySignUp(token: string) {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const response = await fetch(`${HOST}/auth/signup/verify?token=${token}`, {
    method: "POST",
    headers,
  });
  if (!response.ok) redirect("/signup/error");
}