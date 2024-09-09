"use client";

import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Link from "next/link";

export default function UserMenu({signedIn, username}: {
  signedIn: boolean, username: string | null
}) {
  const onSignOutClick = async () => {
    await fetch("/api/session", {method: "DELETE", redirect: "follow"});
    // force redirect, nothing else works
    location.href = "/";
  }
  return (<Nav>
    {signedIn ?
      <NavDropdown title={username ?? "Dropdown"} id="nav-dropdown">
        <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
        <NavDropdown.Item onClick={onSignOutClick}>Sign Out</NavDropdown.Item>
      </NavDropdown> : <div>
        <Link href={"/signin"} className="btn btn-primary me-2">Sign In</Link>
        <Link href={"/signup"} className="btn btn-primary">Sign Up</Link>
      </div>}
  </Nav>)
}
