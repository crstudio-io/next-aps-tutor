"use client"
// import { useActionState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { signUp } from "@/app/signup/actions";

export default function SignUpForm() {
  const [state, formAction] = useFormState(signUp, {done: false, failed: false});
  // const [state, formAction, pending] = useActionState(signIn, {done: false, failed: false});
  const {done, failed} = state;
  return (<form action={formAction}>
    <div className="mb-3">
      <label htmlFor="email-input" className="form-label">Email: </label>
      <input id="email-input" type="email" name="email" className="form-control"/>
    </div>
    <div className="mb-3">
      <label htmlFor="request-input" className="form-label">Why do you want to sign up?</label>
      <input id="request-input" name="request" className="form-control"/>
    </div>
    <Button failed={failed} done={done}/>
  </form>);
}

function Button({failed, done}: { failed: boolean, done: boolean }) {
  const status = useFormStatus();
  const {pending} = status;
  return (<div>
    {failed ? <div className="alert alert-danger" role="alert">Failed</div> : null}
    {pending ? <div className="alert alert-info" role="alert">Submitting...</div> : null}
    {done ? <div className="alert alert-success" role="alert">Check Email</div> : null}
    <div className="mb-3">
      <button type="submit" className="btn bg-primary-subtle" disabled={pending || done}>Submit</button>
    </div>
  </div>);
}