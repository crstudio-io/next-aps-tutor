"use client";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import NavLinks from "@/components/navbar/nav-links";
import UserMenu from "@/components/navbar/user-menu";

export default function NavbarWrapper({signedIn, username}: {
  signedIn: boolean, username: string | null
}) {
  return (
    <Navbar expand="lg" className="bg-primary-subtle">
      <Container>
        <Navbar.Brand href="/">CRStudio APS</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav"/>
        <Navbar.Collapse id="navbar-nav" className="justify-content-between">
          <NavLinks/>
          <UserMenu signedIn={signedIn} username={username}/>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}