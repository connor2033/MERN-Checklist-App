import React from "react";
import "./LandingPage.css";
import { Button, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="main">
      <Container style={{ minHeight: "93vh" }}>
        <Row className="createButtonDiv">
          <Link to="/newlist">
            <Button
              variant="outline-primary"
              size="lg"
              className="m-auto createButton"
            >
              Create a List
            </Button>
          </Link>
        </Row>
        <Row className="descText">
          <p>Some text about creating a new list</p>
        </Row>
      </Container>
    </div>
  );
};

export default LandingPage;
