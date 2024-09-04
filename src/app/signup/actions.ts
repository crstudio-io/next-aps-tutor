"use server"

const URL = "http://localhost:8080/auth/signup/request";

export async function signUp(previousState: { done: boolean, failed: boolean }, formData: FormData) {
  const email = formData.get("email");
  const request = formData.get("request");
  const response = await fetch(URL, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({email, request}),
  });
  return {
    done: response.ok,
    failed: !response.ok,
  }
}