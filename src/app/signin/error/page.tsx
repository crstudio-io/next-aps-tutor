import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Failed",
};

export default function SignInError() {
  return <main>
    <h1 className="mb-3">Something went wrong</h1>
    <p>It seems like you provided an invalid link for signing in. Please try again.</p>
    <p>If the problem persists, please contact us.</p>
  </main>;
}
