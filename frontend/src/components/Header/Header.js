import { React } from "react";
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
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      searchChecklist(event);
    }
  };

  const searchChecklist = (event) => {
    event.preventDefault();
    var searchId = document.getElementById("testId").value;
    if (searchId.length > 0) {
      window.location.href = "/list/" + searchId;
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
          <Link to="/" className="siteName">
            Checkable
          </Link>
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
              onKeyPress={(e) => handleKeyPress(e)}
              id={"testId"}
            />
            <Button variant="outline-light" onClick={(e) => searchChecklist(e)}>
              Search
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
