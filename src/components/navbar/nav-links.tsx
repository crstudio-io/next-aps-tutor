"use client";
import Nav from "react-bootstrap/Nav";
import { usePathname } from "next/navigation";

export default function NavLinks() {
  const path = usePathname();
  return (<Nav>
    <Nav.Link href="/" active={path === "/"}>Home</Nav.Link>
    <Nav.Link href="/problems" active={path.startsWith("/problems")}>Problems</Nav.Link>
  </Nav>);
}