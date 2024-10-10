import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="d-flex flex-column justify-content-center align-items-center">
      <h1>Not Found</h1>
      <p>You&apos;ve stumbled into a dead end.</p>
      <Link href="/">Return Home</Link>
    </main>
  );
}
