import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Failed",
};

export default function ProcessSignin() {
  return <main>
    <h1 className="mb-3">Something went wrong</h1>
    <p>It seems like you provided an invalid link for logging in. Please try signing in again.</p>
    <p>If the problem persists, please contact me.</p>
  </main>;
}