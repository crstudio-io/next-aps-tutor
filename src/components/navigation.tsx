"use client";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NavItem } from "react-bootstrap";

export default function Navigation() {
  const path = usePathname();
  const [fetching, setFetching] = useState(true);
  const [session, setSession] = useState({
    signedIn: false,
    username: null,
  });

  useEffect(() => {
    fetch("/api/session")
      .then(response => response.json())
      .then(setSession);
    setFetching(false);
  }, []);
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
            {fetching ? <NavItem>Loading...</NavItem> : null}
            {!fetching ? (session.signedIn ?
                <NavDropdown title={session.username ?? "Dropdown"} id="nav-dropdown">
                  <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                  <NavDropdown.Item>Sign Out</NavDropdown.Item>
                </NavDropdown> : <div>
                  <Link href={"/signin"} className="btn btn-primary me-2">Sign In</Link>
                  <Link href={"/signup"} className="btn btn-primary">Sign Up</Link>
                </div>)
              : null}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
