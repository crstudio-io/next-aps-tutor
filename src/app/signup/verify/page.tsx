import type { Metadata } from "next";
import { verifySignUp } from "@/app/signup/verify/actions";

export const metadata: Metadata = {
  title: "Sign Up",
};

export default async function ProcessSignUp({searchParams}: { searchParams: { [key: string]: string | undefined } }) {
  await verifySignUp(searchParams.token ?? "");
  return <main>
    <h1 className="mb-3">Your request is accepted.</h1>
    <p>Please wait until we check and accept your request.</p>
  </main>;
}
