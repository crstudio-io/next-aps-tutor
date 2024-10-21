import type { Metadata } from "next";
import { verifySignUp } from "@/app/signup/verify/actions";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sign Up",
};

export default async function ProcessSignUp({searchParams}: { searchParams: { [key: string]: string | undefined } }) {
  await verifySignUp(searchParams.token ?? "");
  return <main>
    {searchParams.code !== undefined ? <CodeMessage/> : <RequestMessage/>}
  </main>;
}

function CodeMessage() {
  return <>
    <h1 className="mb-3">Your account is ready!</h1>
    <p><Link href={`/signin`}>Try signing in</Link></p>
  </>
}

function RequestMessage() {
  return <>
    <h1 className="mb-3">Your request is accepted.</h1>
    <p>Please wait until we check and accept your request.</p>
  </>
}
