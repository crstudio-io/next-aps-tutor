"use client";

import { useState } from "react";

const URL = "http://localhost:8080/auth/signin"

export default function SigninPage() {
  const [email, setEmail] = useState("");
  const [fetching, setFetching] = useState(false);
  const [failed, setFailed] = useState(false);
  const [success, setSuccess] = useState(false);
  const onChange = (event: any) => {
    setFailed(false);
    setEmail(event.target.value);
  }

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
      <h1 className="mb-3">Sign In with Email</h1>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label htmlFor="email-input" className="form-label">Email: </label>
          <input id="email-input" type="email" className="form-control" value={email} onChange={onChange}/>
        </div>
        {failed ? <div className="alert alert-danger" role="alert">Failed</div> : null}
        {fetching ? <div className="alert alert-info" role="alert">Trying to login...</div> : null}
        {success ? <div className="alert alert-success" role="alert">Check Email</div> : null}
        <div className="mb-3">
          <button type="submit" className="btn bg-primary-subtle" disabled={success}>Submit</button>
        </div>
      </form>
    </div>
  </main>
}
