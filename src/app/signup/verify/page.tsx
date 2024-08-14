"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const URL = "http://localhost:8080/auth/signup/verify"
export default function ProcessSignUp({searchParams: {token}}: { searchParams: { token: string } }) {
  const router = useRouter();

  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    fetch(URL + "?token=" + token, {
      method: "POST",
      headers
    })
      .then(response => {
        if (response.ok) setFetching(false);
        else router.push("/signup/error");
      });
  });

  return <main>
    {fetching ? <h1>Please Wait...</h1> : <h1 className="mb-3">Your request is accepted.</h1>}
    {fetching ? null : <p>Please wait until we check and accept your request.</p>}
  </main>;
}