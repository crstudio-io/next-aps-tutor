"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const URL = "http://localhost:8080/auth/signin"
export default function ProcessSignIn({searchParams: {token}}: { searchParams: { token: string } }) {
  const router = useRouter();
  useEffect(() => {
    fetch(URL + "?token=" + token)
      .then(response => {
        if (!response.ok) router.push("/request-signin/error");
        else return response.text();
      })
      .then(text => {
        if (text) {
          localStorage.setItem("jwt", text);
          location.href = "/";
        }
      });
  });

  return <main>
    <h1>Please Wait...</h1>
  </main>;
}