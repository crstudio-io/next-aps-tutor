"use server";

const HOST = process.env.HOST ?? "http://localhost:8080";

export async function signIn(previousState: { done: boolean, failed: boolean }, formData: FormData) {
  const email = formData.get("email");
  const response = await fetch(`${HOST}/auth/signin`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({email}),
  });
  return {
    done: response.ok,
    failed: !response.ok,
  };
}