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
  const [searchString, setSearchString] = useState("abc");

  const searchChecklist = async () => {
    console.log("/list/" + searchString);
    window.location.href = "/list/" + searchString;
  };

  return (
    <Navbar bg="primary" expand="lg" variant="dark" sticky="top">
      <Container>
        <Navbar.Brand>
          <Link to="/">MyList</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link>
              <Link to="/">Home</Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/newlist">New List</Link>
            </Nav.Link>
          </Nav>
          <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="MyList Code"
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
