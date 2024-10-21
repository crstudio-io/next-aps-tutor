import { Metadata } from "next";
import SignUpForm from "@/app/signup/form";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Sign Up"
};

export default async function SignUpPage() {
  const session = await getSession();
  if (session.signedIn) redirect("/");
  return <main className="row justify-content-center">
    <div className="col-11 col-md-8 col-lg-6">
      <h1 className="mb-3">Sign Up</h1>
      <p>
        CRStudio.io is a toy project by <a href="https://github.com/aquashdw">aquashdw</a>.
        It is not intended to be an open service, and cannot sign up as is.
      </p>
      <SignUpForm/>
    </div>
  </main>
}