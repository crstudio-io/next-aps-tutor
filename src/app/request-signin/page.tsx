"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const URL = "http://localhost:8080/auth/signin"
export default function ProcessSignin({searchParams: {token}}: { searchParams: { token: string } }) {
  const router = useRouter();
  useEffect(() => {
    fetch(URL + "?token=" + token)
      .then(response => response.text())
      .then(text => {
        localStorage.setItem("jwt", text);
        router.push("/");
      });
  });

  return <main>
    <h1>Please Wait...</h1>
  </main>;
}