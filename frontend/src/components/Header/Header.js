import { React, useState } from "react";
import {
  Navbar,
  Nav,
  Container,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = () => {
  const [searchString, setSearchString] = useState("");

  const searchChecklist = async () => {
    if (searchString.length > 0) {
      console.log("/list/" + searchString);
      window.location.href = "/list/" + searchString;
    }
  };

  return (
    <Navbar
      bg="primary"
      expand="lg"
      variant="dark"
      sticky="top"
      className="myNavbar"
    >
      <Container>
        <Navbar.Brand>
          <Link to="/">Checkable</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/newlist">
              New List
            </Nav.Link>
          </Nav>
          <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="Checkable Code"
              className="me-2"
              aria-label="Search"
              onChange={(e) => setSearchString(e.target.value)}
            />
            <Button variant="outline-light" onClick={searchChecklist}>
              Search
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
