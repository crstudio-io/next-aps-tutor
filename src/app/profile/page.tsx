import type { Metadata } from "next";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Profile",
};
// using client to fetch user info here in the future
export default async function Profile() {
  const session = await getSession();
  if (!session.signedIn) redirect("/signin");
  return <main>
    <h1>Nothing here...yet.</h1>
  </main>;
}