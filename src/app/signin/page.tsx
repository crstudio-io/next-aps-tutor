import SignInForm from "@/app/signin/form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
};

export default function SignInPage() {
  return <main className="row justify-content-center">
    <div className="col-11 col-md-8 col-lg-6">
      <h1 className="mb-3">Sign In with Email</h1>
      <SignInForm/>
    </div>
  </main>
}
