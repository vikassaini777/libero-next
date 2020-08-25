import React from "react";
import { Navbar } from "react-bootstrap";

function Header() {
  return (
    <div>
      <Navbar bg="light" variant="dark">
        <Navbar.Brand href="#home">
          <img
            alt=""
            src="../../static/images/notes_logo.svg"
            height="40"
            className="d-inline-block align-top"
          />{" "}
        </Navbar.Brand>
      </Navbar>
    </div>
  );
}

export default Header;
