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
  let jwt;

  const getUserInfo = async () => {
    jwt = localStorage.getItem("jwt");
    if (!jwt) return;
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${localStorage.getItem("jwt")}`);
    const response = await fetch("http://localhost:8080/auth/user-info", {
      headers
    });
    if (!response.ok) return;
    const json = await response.json();
    setUserInfo({username: json.email, signedIn: true});
    setFetching(false);
    console.log("fetch complete")
  }

  useEffect(() => {
    getUserInfo();
  }, []);

  const path = usePathname();
  const onSignOut = () => {
    localStorage.removeItem("jwt");
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
            {userInfo.signedIn ? null : <Link href={"/signin"} className="btn btn-primary">Sign In</Link>}
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
