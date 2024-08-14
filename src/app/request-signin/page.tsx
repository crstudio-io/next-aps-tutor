"use client";

import { useEffect } from "react";

const URL = "http://localhost:8080/auth/signin"
export default function ProcessSignin({searchParams: {token}}: { searchParams: { token: string } }) {
  // const router = useRouter();
  useEffect(() => {
    fetch(URL + "?token=" + token)
      .then(response => response.text())
      .then(text => {
        localStorage.setItem("jwt", text);
        location.href = "/";
      });
  });

  return <main>
    <h1>Please Wait...</h1>
  </main>;
}