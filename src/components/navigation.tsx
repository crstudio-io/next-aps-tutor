"use client";

import { usePathname, useRouter } from "next/navigation";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navigation() {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState({
    username: "",
    signedIn: false,
  });
  const [fetching, setFetching] = useState(true);
  const getUserInfo = async () => {
    const jwt = localStorage.getItem("jwt");
    if (!jwt) {
      setFetching(false);
      return;
    }
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${localStorage.getItem("jwt")}`);
    const response = await fetch("http://localhost:8080/auth/user-info", {
      headers
    });
    if (!response.ok) {
      localStorage.removeItem("jwt");
      setFetching(false);
      return;
    }
    const json = await response.json();
    setUserInfo({username: json.email, signedIn: true});
    setFetching(false);
  }

  useEffect(() => {
    getUserInfo();
  }, []);

  const path = usePathname();
  const onSignOut = () => {
    localStorage.removeItem("jwt");
    setUserInfo({
      username: "",
      signedIn: false,
    });
    router.push("/");
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
          {fetching ? null : <Nav>
            {userInfo.signedIn ? null : <div>
              <Link href={"/signin"} className="btn btn-primary me-2">Sign In</Link>
              <Link href={"/signup"} className="btn btn-primary">Sign Up</Link>
            </div>}
            {!userInfo.signedIn ? null : <NavDropdown title={userInfo.username ?? "Dropdown"} id="nav-dropdown">
              <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
              <NavDropdown.Item onClick={onSignOut}>Sign Out</NavDropdown.Item>
            </NavDropdown>}
          </Nav>}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
