import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Home",
};

export default function Home() {
  return (
    <main className="d-flex flex-column justify-content-center align-items-center">
      <h1>CRStudio APS Tutor</h1>
      <p>
        This site is a toy project by <Link href="https://aquashdw.github.io" target="_blank">aquashdw</Link>,
        to create algorithm problem solving practice service like Leetcode, Baekjoon Online Judge, Hackerrank and more.
      </p>
      <p>It is not intended to be an actual service, but feel free to have a look around.</p>
    </main>
  );
}
