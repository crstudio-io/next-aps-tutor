import { Metadata } from "next";
import SignUpForm from "@/app/signup/form";

export const metadata: Metadata = {
  title: "Sign Up"
};

export default function SignUpPage() {
  return <main className="row justify-content-center">
    <div className="col-11 col-md-8 col-lg-6">
      <h1 className="mb-3">Sign Up</h1>
      <p>
        CRStudio.io is a toy project by <a href="https://github.com/aquashdw">aquashdw</a>.
        It is not intended to be a real service, therefore currently not excepting new users.
        However, if you want to try out the site&apos;s functionalities for a specific reason,
        please fill out why below, and we&apos;ll reach out soon.
      </p>
      <SignUpForm/>
    </div>
  </main>
}