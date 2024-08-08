"use client";

import { usePathname } from "next/navigation";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { fetchUserInfo, selectSignedIn, selectUserEmail, signOut } from "@/lib/features/user/user-slice";
import Link from "next/link";

export default function Navigation() {
  const path = usePathname();
  const dispatch = useAppDispatch();
  const signedIn = useAppSelector(selectSignedIn);
  const email = useAppSelector(selectUserEmail);
  useEffect(() => {
    dispatch(fetchUserInfo());
  });
  const onSignOut = () => {
    dispatch(signOut());
  }
  return (
    <Navbar expand="lg" className="bg-primary-subtle">
      <Container>
        <Navbar.Brand href="/">CRStudio APS</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav"/>
        <Navbar.Collapse id="navbar-nav" className="justify-content-between">
          <Nav>
            <Nav.Link href="/" active={path === "/"}>Home</Nav.Link>
            <Nav.Link href="/problems" active={path.startsWith("/problems")}>Problems</Nav.Link>
          </Nav>
          <Nav>
            {signedIn ? null : <Link href={"/signin"} className="btn btn-primary">Sign In</Link>}
            {signedIn ? <NavDropdown title={email ?? "Dropdown"} id="nav-dropdown">
              <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
              <NavDropdown.Item onClick={onSignOut}>Sign Out</NavDropdown.Item>
            </NavDropdown> : null}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
