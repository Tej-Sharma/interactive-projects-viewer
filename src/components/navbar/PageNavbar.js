import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

export class PageNavbar extends Component {
  render() {
    return (
      <div>
        <Navbar
          collapseOnSelect
          bg="dark"
          variant="dark"
          fixed="top"
        >
          <Navbar.Brand href="">View Studio42's projects </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto"></Nav>
            <Nav>
              <Nav.Link
                target="_blank"
                href="https://github.com/Trollgen-Studios"
              >
                Made by Tejas
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default PageNavbar;
