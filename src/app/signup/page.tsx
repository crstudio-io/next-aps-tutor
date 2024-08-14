"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const URL = "http://localhost:8080/auth/signup"
export default function SignupPage() {
  const router = useRouter();
  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) router.push("/");
  }, []);

  const [email, setEmail] = useState("");
  const [request, setRequest] = useState("");
  const [fetching, setFetching] = useState(false);
  const [failed, setFailed] = useState(false);
  const [success, setSuccess] = useState(false);
  const onEmailChange = (event: any) => {
    setFailed(false);
    setEmail(event.target.value);
  };

  const onRequestChange = (event: any) => {
    setFailed(false);
    setRequest(event.target.value);
  };

  const onSubmit = async (event: any) => {
    event.preventDefault();
    if (fetching || success) return;
    setFailed(false);
    setFetching(true);
    const response = await fetch(URL, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email}),
    });
    if (!response.ok) {
      setFailed(true);
      setFetching(false);
    } else {
      setSuccess(true);
      setFetching(false);
    }
  }

  return <main className="row justify-content-center">
    <div className="col-11 col-md-8 col-lg-6">
      <h1 className="mb-3">Sign Up</h1>
      <p>
        CRStudio.io is a toy project by <a href="https://github.com/aquashdw">aquashdw</a>.
        It is not intended to be a real service, therefore currently not excepting new users.
        However, if you want to try out the site&apos;s functionalities for a specific reason,
        please fill out why below, and we&apos;ll reach out soon.
      </p>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label htmlFor="email-input" className="form-label">Email: </label>
          <input id="email-input" type="email" className="form-control" value={email} onChange={onEmailChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="request-input" className="form-label">Why do you want to sign up?</label>
          <textarea id="request-input" className="form-control" value={request} onChange={onRequestChange}></textarea>
        </div>
        {failed ? <div className="alert alert-danger" role="alert">Failed</div> : null}
        {fetching ? <div className="alert alert-info" role="alert">Submitting...</div> : null}
        {success ? <div className="alert alert-success" role="alert">Sign Up request submitted.</div> : null}
        <div className="mb-3">
          <button type="submit" className="btn bg-primary-subtle" disabled={success || fetching}>Submit</button>
        </div>
      </form>
    </div>
  </main>
}