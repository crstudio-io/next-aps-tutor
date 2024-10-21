"use server"

const HOST = process.env.HOST ?? "http://localhost:8080";

export async function signUp(previousState: { done: boolean, failed: boolean }, formData: FormData) {
  const email = formData.get("email");
  const code = formData.get("code");
  const request = formData.get("request");
  const response = await fetch(`${HOST}/auth/signup/${code ? 'code' : 'request'}`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({email, code, request}),
  });
  return {
    done: response.ok,
    failed: !response.ok,
  }
}