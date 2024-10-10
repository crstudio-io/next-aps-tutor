"use client";
import Link from 'next/link';

export default function InternalServerError() {
  return (
    <main className="d-flex flex-column justify-content-center align-items-center">
      <h1>Uh Oh...</h1>
      <p>
        Something went bad at our end. We&apos;re sorry this happened.
      </p>
      <p>
        Please send an <a href="mailto:aquashdw@gmail.com?Subject=Error Report for tutor.crstudio.io">email</a> to us
        with the details about the error,
        so we can look into it and prevent any more damage.
      </p>
      <Link href="/">Return Home</Link>
    </main>
  )
}
