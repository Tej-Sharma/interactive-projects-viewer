import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import logo from "../../example_studio42_logo.svg";
import Zoom from 'react-reveal/Zoom';

export class PageNavbar extends Component {
  render() {
    return (
      <div>
        <Navbar collapseOnSelect bg="dark" variant="dark" fixed="top" >
          <Navbar.Brand href="#home">
            <img
              alt=""
              src={logo}
              width="45"
              height="45"
              className="d-inline-block align-top"
            />{" "}
            Projects
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto"></Nav>
            <Nav>
              <Zoom right>
                <Nav.Link
                  target="_blank"
                  href="https://github.com/Trollgen-Studios"
                >
                  Made by Tejas
                </Nav.Link>
              </Zoom>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default PageNavbar;
