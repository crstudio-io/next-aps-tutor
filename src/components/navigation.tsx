"use client";

import { usePathname } from "next/navigation";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

export default function Navigation() {
  const path = usePathname();
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
            <NavDropdown title="User Menu" id="nav-dropdown">
              <NavDropdown.Item href="/signin">Sign In</NavDropdown.Item>
              <NavDropdown.Divider/>
              <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
              <NavDropdown.Item href="/signout">Sign Out</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
