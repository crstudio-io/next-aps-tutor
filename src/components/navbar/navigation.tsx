import { getSession } from "@/lib/session";
import NavbarWrapper from "@/components/navbar/navbar-wrapper";

export default async function Navigation() {
  const session = await getSession();
  return <NavbarWrapper signedIn={session.signedIn} username={session.username}/>
}
