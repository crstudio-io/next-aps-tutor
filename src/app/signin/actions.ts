"use server";

const URL = "http://localhost:8080/auth/signin";

export async function signIn(previousState: { done: boolean, failed: boolean }, formData: FormData) {
  const email = formData.get("email");
  const response = await fetch(URL, {
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